# Cycle feasibility and exact failure-inclusive ROC

The [longer-window addendum](https://github.com/VariableThe/gait-biometrics/tree/research/cycle-feasibility-20261025/reports/2026-10-25-cycle-length)
extends only the fixed synthetic support, from 256 to 768 samples. Both lag rules
give 959/1,280 finite outputs, one missing-pair failure, 320 gyro guard failures
and 96 finite half-period aliases. The 5,120 saved comparison rows preserve all
failures; the larger guard count reflects weak signals that previously failed
earlier for missing pairs. A separate, outcome-informed twelve-fixture plateau
regression fixes the remaining equal-adjacent-sample minimum, raising finite
extraction from 8/12 to 9/12 per lag rule while retaining three guard failures
and three finite aliases. Independent reviews verify both bundles. A preserved
JSON-key-order fingerprint defect has a separate erratum; the original failed
audit is not relabelled a strict pass. This remains synthetic numerical work,
not a cycle DEV model or new authentication result.

Keep Canonical362 as the exploratory DEV nominee. The proposed cycle descriptor
needs a revised protocol before a DEV model fit. A fixed synthetic feasibility
check found limitations in the current 256-sample, 100 Hz support:

| Outcome before the unapplied TRAIN quality gate | Count |
| --- | ---: |
| Finite cycle features | 848 / 1,280 |
| Missing eligible minima pair | 192 / 1,280 |
| Degenerate feature channel | 240 / 1,280 |
| Half-stride aliases among finite outputs | 96 / 848 |

Ten stipulated periods, 32 phases and four six-axis analytic families comprise
the grid. The gravity family's period-200 signal yields finite features in only
6/32 phases. These are synthetic extraction counts, not observed gait error or
authentication rates. Magnitude periodicity alone does not identify anatomical
stride. Longer support may improve phase coverage; it needs its own registered
test and does not resolve every harmonic ambiguity.

The new pure NumPy/standard-library `engine.gated_roc` utility keeps every
original genuine/impostor denominator, uses explicit nullable scores and validity
masks, and always rejects failed claims. Exact integer fractions determine tied
ROC crossings and empirical FAR-constrained calibration. At 20% valid coverage
in both classes, perfectly ranked surviving scores give conditional EER 0,
while the failure-inclusive path has no EER crossing and ends at FAR/FRR .2/.8.
That coverage loss cannot be hidden by reporting the conditional metric alone.

The frozen prototype has two related floating-subtraction edge cases: an exact
conditional 1/3 is labelled interpolation, and an exact terminal 1/3 can be
labelled undefined. Its raw bytes are preserved with an explicit erratum. The
separate utility handles both and includes dedicated regressions. It changes
no historical experiment or threshold. A same-runtime relocated replay reproduced
the frozen scientific fields exactly while recording a new source fingerprint;
the original absolute-path prototype is never reset or overwritten.

Independent reviews checked the frozen records, hashes, bounds and ROC counts,
then tested the new API against 25,488 independent synthetic cases. Root's focused
validation passes 268 tests in each code repository, including 69 gated-ROC tests;
Ruff and ty pass. There is no new full-suite claim for this isolated addition.

The method is a limited two-magnitude adaptation of
[IDNet's preprocessing](https://arxiv.org/html/1606.03238#S3), omitting its eight
channels, adaptive templates, CNN, one-class SVM and sequential system.
[Derawi et al. (2010)](https://doi.org/10.1109/IIHMSP.2010.84) studied longer walks;
their reported cycles do not establish this short-window coverage. Neither paper's
authentication results are reproduced here.

The full [source/evidence report](https://github.com/VariableThe/gait-biometrics/tree/research/cycle-feasibility-20261025/reports/2026-10-25-cycle)
preserves all 1,280 records, source/runtime hashes, corrected ROC examples,
independent audits, logs and safe replay helpers. The Student B bundle mirrors
the same experiment, not an independent replication. No TRAIN/DEV/CALIB/TEST
payload was opened and no model fitted in this round. Earlier inspected TEST
evidence still has 3/200 false accepts (1.5%); no new TEST or deployment claim
is made.
