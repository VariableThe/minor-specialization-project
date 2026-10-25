# Paired nuisance covariance — retain Canonical362

The registered 200-fit DEV study improves gain/noise sensitivity but does not
pass its complete safety criteria. Across gain0.9, gain1.1 and 1% injected noise,
mean genuine rejection falls **45.607% → 15.241%**. Fourteen people improve and
one ties on that objective. The experiment fails **13 of 33 distinct** frozen gates, so
the unchanged canonical baseline remains selected.

| Clean DEV diagnostic | Baseline | Candidate |
| --- | ---: | ---: |
| Mean FAR | 0.500% | 0.583% |
| Mean FRR | 14.787% | 14.960% |
| Mean EER | 5.876% | 6.040% |
| Repeated false accepts | 6/1192 | 7/1192 |
| Repeated genuine rejects | 88/596 | 89/596 |

The displayed rates are equal-fold means; pooled repeated counts are separate.
Clean rejection improves for one person, ties for twelve and worsens for two.
Subject 9 remains completely rejected. Gain/noise stresses create additional
high-FAR folds and false accepts targeting some claimants. All condition mean
FARs stay below 1%, which does not establish a population guarantee or satisfy
those stronger registered protections. At 5% noise both methods still reject
all genuine claims at frozen clean cutoffs.

The method adds an identity-balanced uncentered covariance of paired TRAIN-only
gain/noise feature displacements to the existing WCCN covariance. Clean
centering/scaling/shrinkage uses original rows only; each inner model derives
its perturbation scale from its own nine TRAIN identities, each refit from
twelve. Four held triples calibrate clean policy-C thresholds before refitting.
This is an adaptation of WCCN and controlled augmentation literature, not a
paper reproduction. No stressed calibration or post-result gate change occurs.

Main source snapshot: `4c0b840226e55fba69058487c2baab1ad688a9da`.
Strict replay verifies **200 models, 440 scores and 541 geometry contexts**;
all 50 source fingerprints and 1,201 numeric artifact hashes are retained.
The baseline exactly matches the previous Canonical362 states and scores.
Main and Student B suites pass **1,167 / 1,163 tests**, with **1,592 subtests**
each. The source review's zero-RMS diagnostic persistence bug was fixed before
real DEV execution.

See the [complete report, primary references, audit and evidence](https://github.com/VariableThe/gait-biometrics/blob/research/nuisance-covariance-20261025/reports/2026-10-25-nuisance/README.md)
and [registered protocol](https://github.com/VariableThe/gait-biometrics/blob/4c0b840226e55fba69058487c2baab1ad688a9da/docs/nuisance_covariance_study.md).
The compact public bundle includes score/threshold payloads and all hashes;
full model/geometry payloads remain in the original local archive and are
needed for full strict replay, or must be reproduced from the registered source.

These reused, dependent DEV observations follow prior stress and TEST
inspection. Original CALIB/TEST payloads stayed closed. No published TEST
threshold changes, independent confirmation, phone deployment, or performance
ceiling is claimed.
