# Canonical orientation — exploratory DEV nomination

The next fixed experiment uses IDNet-inspired gravity/PCA coordinates and retains
the existing crossfit policy, automatic WCCN and enrollment-score blend. It
completed 300 CPU fits, 660 score replays and 141 row-preserving geometry contexts.
The control exactly reproduces the prior DEV result; original CALIB/TEST payloads
remain closed.

| Clean equal-fold mean | Control362 | Canonical336 | Canonical362 |
| --- | ---: | ---: | ---: |
| FAR | 0.8362% | 0.7557% | **0.5000%** |
| FRR | 15.1264% | 18.2816% | **14.7874%** |
| Folds FAR >2% | 3/20 | 3/20 | **2/20** |
| People no worse | 15/15 | 9/15 | **10/15** |
| Mean EER | **4.7960%** | 6.6293% | 5.8764% |

Canonical362 alone passes all four predeclared operating-point gates. The gain
is small on clean genuine claims: 88/596 repeated rejects instead of 90/596;
false accepts fall 6/1192 versus 10/1192. These pooled repeated counts are
distinct from the equal-fold means above, and are not independent observations.
Ranking EER and AUC worsen. Four people improve, six tie and five worsen;
subject 9 remains 40/40 rejected. Five of the six canonical false accepts target
identity 24. No significance or uniform-protection claim follows from the means.

## The rotation result is larger

| Probe-only condition | Control mean FRR | Canonical362 mean FRR |
| --- | ---: | ---: |
| Clean | 15.126% | 14.787% |
| Constant common x rotation 30° | 85.190% | 14.787% |
| Constant common x rotation 90° | 99.500% | 14.787% |
| Both-triad gain 0.9 | 41.764% | 45.207% |
| Both-triad gain 1.1 | 37.828% | 39.828% |
| Gaussian noise 1% of TRAIN dynamic RMS | 63.540% | 51.787% |
| Gaussian noise 5% | 100.000% | 100.000% |

Clean enrollment and thresholds stay fixed. Both canonical arms have zero
threshold-decision changes under the specified 30°/90° common coordinate changes.
This does not establish robustness to physical phone relocation, orientation
changing during a window, device shift or new walking sessions. Gain rejection
is worse; noise remains a serious failure. Synthetic stresses never select a
winner or recalibrate a cutoff.

## Primary paper and implementation limits

[IDNet 3.3, equations 5–13](https://arxiv.org/html/1606.03238#S3.SS3) supplies the
gravity-mean/horizontal-PCA frame construction. Both inertial vectors share one
proper frame. Both ambiguous PCA signs receive equal feature weight before
metric learning. Canonical362 appends the original lag-spectrum block to the
canonical336 descriptors. This fixed-window adaptation does not reproduce
IDNet's cycle extraction, filtering, CNN, one-class SVM or paper accuracy.

Independent review caught an inherited exact spectral-peak tie that could switch
frequency under roundoff. A local canonical-only 64-epsilon low-frequency tie
rule resolves the counterexample across 512 additional rotations; the historical
control extractor stays unchanged. Numerical frame identifiability does not prove
walking, physical gravity or a noise-error bound. Invalid rows retain NaNs and
their source keys; any invalid required frame aborts before fitting.

## Reproduction and evidence

[The complete origin report](https://github.com/VariableThe/gait-biometrics/blob/1c861bfc2104b204c7262d931d8cffa19cc6e676/reports/2026-10-25-canonical/README.md)
contains all candidates, seven stresses, per-person results, source exclusions,
the independent audit and reproduction limits. Frozen source is `108a559`.
The bundle publishes 660 score caches, 141 geometry files, 20 thresholds and
1,121 numeric-artifact hashes. Large matrices/full template metadata remain in
the documented local experiment archive; Student B mirrors the same experiment.

All 41 source hashes, runtime/registration links, source-row and model assignments,
exact pooled thresholds and nomination checked independently. All 588 clean
source windows are identifiable across 141 contexts; these are repeated windows,
not 588 users or independent sessions. Final suites pass 1,047 main / 1,043
Student B tests, each with 1,592 subtests; Ruff and ty pass.

This nominates an operating-point alternative and reduces the measured constant
coordinate-rotation sensitivity. It does not establish a state-of-the-art ceiling.
Actual phone generalization and separately calibrated live-window decisions
remain open. The previously inspected TEST point stays 1.5% FAR; 0.5% here is a
DEV mean, not a new TEST or deployment result.
