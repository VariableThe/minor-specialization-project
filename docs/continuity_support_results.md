# Continuity support before a cycle experiment

The registered saved-metadata inventory finds **one** complete 768-sample block
across 300 Santos DEV trials. It belongs to subject 9, day 1, trial 8. No person
has that support on both days, so this proposed protocol cannot retain the
fifteen-person cohort.

| Support definition | Units | Covered valid rows | Supported trials | Both-day identities |
| --- | ---: | ---: | ---: | ---: |
| Historical 256-sample tiling | 588 | 150,528 | 299/300 | 15/15 |
| Fixed 768-sample blocks | 1 | 768 | 1/300 | 0/15 |
| Whole continuity segments | 328 | 184,338 | 300/300 | 15/15 |

These are raw-support units with different lengths, not independent training
examples. Whole segments include 33,810 valid rows omitted by the historical
tiling—22.4609375% more than its covered rows. They include 29 fragments shorter
than 256 samples. The minimum/median/maximum segment lengths are 1/605/931.

All twenty original folds and claim arrays remain unchanged. Subject 19/day 2/
trial 1 is source-present with 470 valid rows in 22 segments and zero historical
tiles. Its newly visible raw support does not add claims to the original graph.

The single inventory and both saved-only replays used standard-library code,
fixed source/runtime/input hashes, zero raw-member reads/fits, and the registered
one-CPU/512-MiB/60-CPU-second ceilings. Independent evidence review reproduced
every metadata field. Full suites pass 1,272 main and 1,268 Student B tests,
each with 1,805 subtests. The two repositories mirror one inventory, rather than
providing independent data replications.

The [main report](https://github.com/VariableThe/gait-biometrics/tree/research/santos-support-inventory-20261025/reports/2026-10-25-support)
and [Student B report](https://github.com/VariableThe/gait-biometrics-student-b/tree/research/santos-support-inventory-20261025/reports/2026-10-25-support)
include exact input snapshots, the full losslessly compressed result, hashes,
access reports, test logs and a fresh-directory saved-only replay helper.
Historical raw payload hashes were not reverified.

[IDNet section 3.2](https://arxiv.org/html/1606.03238v3#S3.SS2) motivates
investigating continuous traces through iterative cycle-template matching. Our
earlier magnitude prototypes reproduce only part of that idea. The next real
experiment still needs registered extraction, failure handling, enrollment and
matched observation-support controls. Complete-segment support does not prove
cycle extraction or better authentication. Canonical362 remains the exploratory
nominee; no TEST result or threshold changes here.
