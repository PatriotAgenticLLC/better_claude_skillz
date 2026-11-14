"""Drift guard for the writing-style skill's machine-readable word lists.

SKILL.md is the single source of Nick's writing rules (decision 2026-11-13). The
ABOSS Cowork instructions (section 7), pa-dev-starter and better_claude_skillz carry
synced copies, and pa-ops-hub vendors the word lists for its style checker. The lists
next to SKILL.md are derived from it by hand:

- banned.txt            fail: Tier 1 words with no qualifier, plus banned phrases
- review.txt            flag for a human: Tier 1 words with a qualifier, banned only
                        in one sense (navigate when metaphorical, and so on)
- avoid-clustering.txt  warn: Tier 2 transitions and phrases

These tests fail if the lists and SKILL.md drift apart. `matches` is the reference
matcher the banned.txt header describes. Set WRITING_STYLE_DIR to check another copy
of the skill folder (used to prove the tests fail on a deliberately broken copy).
"""
import os
import re
from pathlib import Path

import pytest

SKILL_DIR = Path(os.environ.get("WRITING_STYLE_DIR", Path(__file__).resolve().parent.parent))
PAREN = re.compile(r"\([^)]*\)")
QUOTED = re.compile(r'"([^"]+)"')
LISTS = ("banned.txt", "review.txt", "avoid-clustering.txt")


def section(text, start, stop_prefixes):
    lines = text.splitlines()
    out = []
    for line in lines[lines.index(start) + 1:]:
        if line.startswith(stop_prefixes):
            break
        out.append(line)
    return out


def comma_terms(line):
    """Split a '**Label:** a, b (qualifier), c' line into (plain, qualified) sets."""
    plain, qualified = set(), set()
    for raw in re.split(r",(?![^(]*\))", line.split(":**", 1)[1]):
        term = PAREN.sub("", raw).strip().lower()
        if term:
            (qualified if "(" in raw else plain).add(term)
    return plain, qualified


def quoted_terms(line):
    return {q.strip(" .").lower() for q in QUOTED.findall(PAREN.sub("", line))}


def skill_lists():
    text = (SKILL_DIR / "SKILL.md").read_text()
    tier1, review = set(), set()
    for line in section(text, "### Tier 1: Never Use", ("### ", "## ")):
        if line.startswith("**"):
            plain, qualified = comma_terms(line)
            tier1 |= plain
            review |= qualified
    tier2 = set()
    for line in section(text, "### Tier 2: Avoid Clustering", ("### ", "## ")):
        if line.startswith("**Transitions:**"):
            tier2 |= set().union(*comma_terms(line))
        elif line.startswith("**Phrases:**"):
            tier2 |= quoted_terms(line)
    phrases = set()
    for line in section(text, "## Banned Phrases", ("## ",)):
        if line.startswith("- "):
            phrases |= quoted_terms(line)
    return text, tier1, review, phrases, tier2


def read_list(name):
    terms = [
        line.strip()
        for line in (SKILL_DIR / name).read_text().splitlines()
        if line.strip() and not line.lstrip().startswith("#")
    ]
    assert all(t == t.lower() for t in terms), f"{name} has a non-lowercase term"
    assert len(terms) == len(set(terms)), f"{name} has duplicate terms"
    return set(terms)


def matches(term, text):
    """Reference matcher: case-insensitive, curly apostrophes normalized, word
    boundaries only where the term starts or ends with a word character."""
    text = text.replace("\u2019", "'").lower()
    left = r"(?<!\w)" if term[0].isalnum() else ""
    right = r"(?!\w)" if term[-1].isalnum() else ""
    return re.search(left + re.escape(term) + right, text) is not None


def diff(expected, actual, name):
    return f"in SKILL.md only: {sorted(expected - actual)}; in {name} only: {sorted(actual - expected)}"


def test_parser_is_live():
    # Control: an empty parse would make every equality check below meaningless.
    _, tier1, review, phrases, tier2 = skill_lists()
    assert len(tier1) > 50 and len(review) > 10 and len(phrases) > 15 and len(tier2) > 10


def test_banned_txt_matches_skill():
    _, tier1, _, phrases, _ = skill_lists()
    expected, actual = tier1 | phrases, read_list("banned.txt")
    assert actual == expected, diff(expected, actual, "banned.txt")


def test_review_txt_matches_skill():
    expected, actual = skill_lists()[2], read_list("review.txt")
    assert actual == expected, diff(expected, actual, "review.txt")


def test_avoid_clustering_txt_matches_skill():
    expected, actual = skill_lists()[4], read_list("avoid-clustering.txt")
    assert actual == expected, diff(expected, actual, "avoid-clustering.txt")


def test_tiers_do_not_overlap():
    sets = {name: read_list(name) for name in LISTS}
    for a, b in [(0, 1), (0, 2), (1, 2)]:
        both = sets[LISTS[a]] & sets[LISTS[b]]
        assert not both, f"{LISTS[a]} and {LISTS[b]} share {sorted(both)}"


def test_brand_book_words_are_banned():
    match = re.search(r"Its banned words \(([^)]+)\)", skill_lists()[0])
    assert match, "Brand terms section lost its banned-words list"
    brand = {w.strip().lower() for w in match.group(1).split(",")}
    assert brand <= read_list("banned.txt"), sorted(brand - read_list("banned.txt"))


def test_frontmatter_keeps_model_only():
    frontmatter = (SKILL_DIR / "SKILL.md").read_text().split("\n---\n", 1)[0]
    assert re.search(r"^user-invocable: false$", frontmatter, re.M)


def test_no_em_dash_en_dash_or_rule():
    for name in ("SKILL.md",) + LISTS:
        text = (SKILL_DIR / name).read_text()
        assert "\u2014" not in text and "\u2013" not in text, f"dash in {name}"
    body = (SKILL_DIR / "SKILL.md").read_text().split("\n---\n", 1)[1]
    assert not [l for l in body.splitlines() if re.fullmatch(r"\s*(-{3,}|\*{3,}|_{3,})\s*", l)]


@pytest.mark.parametrize("sentence", [
    "Certainly! Here it is.",
    "I hope this helps!",
    "In today\u2019s fast-paced world, owners need answers.",
    "Let me know if you have any questions.",
    "We leveraged the data.",  # inflection: matched by the stem rule in banned.txt notes
])
def test_slop_is_caught(sentence):
    banned = read_list("banned.txt")
    stems = {t + suffix for t in banned for suffix in ("", "s", "d", "ed", "ing")}
    assert any(matches(t, sentence) for t in stems), sentence


@pytest.mark.parametrize("sentence", [
    "In today's call we fixed the login bug.",
    "Let me know if Tuesday works.",
    "Of course the invoice went out on Monday.",
    "The test harness runs the query optimizer on every build.",
])
def test_plain_writing_passes(sentence):
    hits = [t for t in read_list("banned.txt") if matches(t, sentence)]
    assert not hits, f"{sentence!r} hit {hits}"


if __name__ == "__main__":
    raise SystemExit(pytest.main([__file__, "-q"]))
