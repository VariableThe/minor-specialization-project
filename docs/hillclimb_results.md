# Multisensor and calibrated-decision results

The [complete model-repository report](https://github.com/VariableThe/gait-biometrics/blob/main/reports/2026-10-24-hillclimb/README.md)
contains the full candidate matrices, calibration/test counts, per-person errors,
compressed original artifacts, source fingerprints, measured execution costs
and reproduction commands. Student B mirrors the same experiment.

All Santos results below reuse five already inspected test identities. Day1
trials enroll each person; day2 trials provide fifty genuine and two hundred
directed impostor claims. The sensors are controlled leg-mounted IMUs, not a
phone in an arbitrary pocket. Claims reuse people/templates/trials and are not
independent observations. No population confidence interval is claimed.

| Method | Descriptive EER | Frozen-threshold false accepts | Genuine rejections |
| --- | ---: | ---: | ---: |
| Historical acceleration + mean template | 7.0% | 1/200 (0.5%) | 11/50 (22%) |
| Six-axis axes/invariants + two templates | 2.5% | 6/200 (3.0%) | 1/50 (2%) |
| Add lagged covariance | 2.5% | 7/200 (3.5%) | 0/50 (0%) |
| Blend mean and two-template scores | 0.0% | 3/200 (1.5%) | 0/50 (0%) |

Each method has its own threshold frozen using five separate calibration
people at empirical FAR at most 1%. Thresholds are unchanged after TEST. Zero
EER describes perfect score separation in this small reused set; the frozen
operating threshold still produces false accepts and exceeds the 1% target.
Selecting a threshold from the test gap would invalidate calibration.

The research proceeded in three separate, fully retained studies:

1. Thirty fixed multisensor/representation/enrollment candidates across five
   development folds, including forty neural CV fits of forty epochs each.
   A preceding forty-fit attempt failed cross-GPU replay and was discarded.
   Historical cost is eighty CV fits/3,200 run-epochs, not forty. Descriptors
   won, so no final neural training was required. Mean DEV EER improved from
   11.736% for the matched control to 6.678%.
2. Six session/calibration backends across twenty balanced overlapping splits.
   Lagged covariance won at DEV EER 4.874% versus 5.885% for the multisensor
   control. Its improved calibration/genuine acceptance did not control TEST
   false accepts. An unbalanced DEV-only pilot was discarded and excluded.
3. Fifteen fixed candidates evaluated with nine metric-fitting, three
   calibration and three validation people per split. All twenty splits keep
   those roles disjoint. Selection targets independently calibrated decisions:
   mean validation FAR at most 1%, then minimum FRR. The equal score blend was
   the only eligible candidate, with mean validation FAR 0.917% versus 3.178%
   and FRR 19.276% versus 23.684% for its matched control. This comparison uses
   fewer fitting people than study two and its averages must remain separate.

All additional selection was confined to development people. It remains
adaptive research on the same small population, so role separation within each
split does not make the selected result an unbiased population estimate.
Three-person inner calibration is particularly coarse: only sixty impostor
claims. Fresh people and recording conditions are needed for confirmation.

Separate development-only HAR/WISDM invariance comparisons improved mean EER
from 12.027% to 9.560% and 13.107% to 8.713%. These are within-recording subject
folds, not additional cross-day confirmations.

The final method's Wiker CPU raw-window embedding median is 3.816 ms at batch
one and 15.230 ms for batch 32, over thirty warm repeats with two numerical
threads. With descriptors precomputed, complete fifteen-person DEV enrollment
and 2,250 directed claim scoring take 54.165 ms median. Loading, sensor
acquisition, cold starts and phone energy are excluded; no phone latency or
speedup claim follows. Full local suites pass 459 tests in main and 455 in
Student B, plus 759 subtests each.

The remaining product work is a continuous walking/quality gate, evidence
accumulation, takeover-delay and false-prompt evaluation, and measured phone
battery cost. Fresh repeated-day phone recordings across pockets, orientations
and walking conditions are the next confirmation requirement. Research papers
and implementation fidelity distinctions are linked from the model report's
method documentation.
