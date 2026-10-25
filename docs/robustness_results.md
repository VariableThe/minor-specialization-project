# Existing-data robustness and simulation — 25 October 2026

This round extends verification with primary-paper mathematical baselines,
deterministic sensor sensitivities and explicitly timed takeover simulation.
It does not establish a state-of-the-art or maximum-attainable result.

## Covariance comparison: retain control

| Clean DEV representation | Mean FAR | Mean FRR | Decision |
| --- | ---: | ---: | --- |
| Existing spectrum/fusion control | 0.8362% | 15.1264% | Retain |
| Full lag covariance/fusion | 1.2500% | 18.2989% | Reject |
| Matrix-log lag covariance/fusion | 1.0862% | 17.1322% | Reject |

The registered experiment uses twenty overlapping DEV folds, policy C, automatic
WCCN and the same mean/two-medoid score blend throughout: 300 fits, 240 inner
score sets and 420 outer comparisons over seven fixed conditions. Exact count
fractions control nomination; rates above are equal-fold means, not pooled
independent claim counts. Original CALIB/TEST payloads remain closed. Neither
new arm passes every predeclared clean-data gate.

The mathematical adaptation uses
[Barachant et al., ESANN2012](https://www.esann.org/sites/default/files/proceedings/legacy/es2012-130.pdf).
The paper studies EEG covariance kernels. This gait feature adaptation is not
an EEG reproduction or pure Riemannian-distance classifier.

## Measured synthetic sensitivity

For the retained control, a probe-only common x rotation of 30 degrees raises
mean FRR from 15.13% to 85.19%; rotation of 90 degrees reaches 99.5%. Gaussian
noise at 1% of TRAIN-derived triad dynamic RMS raises mean FRR to 63.54%; 5%
noise rejects every genuine claim for all three representations. Clean thresholds
and enrollment stay fixed; stress outcomes never select a winner or threshold.

[Um et al.2017](https://arxiv.org/abs/1706.00527) motivates rotation/scaling/noise
tests and warns that transformations may not preserve labels.
[Hoang et al.2015](https://arxiv.org/abs/1602.03199) motivates gait orientation
evaluation. The prescribed stresses are engineering probes, not measured phone
error distributions, physical gait recreation or new independent sessions.

## Timed policy simulation

Ten injected scenarios, nine seeds and three fixed policies produce 270 cells.
For the existing 2-of-3 contradiction-veto policy, abrupt low-score takeover
challenges after four seconds, bursts after ten seconds and silence/gate blackout
after eight seconds in the specified schedule. Replay/overlap fallback is
attributed to the provenance guard, not biometric discrimination.

Short recording-reset attacks remain censored at eighteen seconds. Extending
this diagnostic to 24 attacker windows adds 27 cells; 2-of-3 and 3-of-5 then
challenge at authentication expiry, 28 seconds after handoff. Nine deliberately
injected owner challenges per policy remain visible as false challenges and
already-challenged handoffs. No failed warmup is discarded. Null censored
latency, seeds, explicit exposure and full traces are retained.

The simulation output reproduced byte-for-byte. Seeds perturb artificial scores
without changing these fixture decisions; they do not represent independent
people. These are software/timing checks, not empirical detection probabilities,
real takeover latencies or daylong owner challenge estimates. The current quorum
is not the sequential likelihood-ratio baseline in
[IDNet, section6](https://arxiv.org/html/1606.03238).

## Evidence and next target

[The full origin report](https://github.com/VariableThe/gait-biometrics/blob/f2a7bc0/reports/2026-10-25-robustness/README.md)
publishes all 660 score caches, compact count evidence, frozen registrations,
numeric inventory, complete compressed simulation traces and audit scope.
Large numeric model states remain in the documented local experiment archive.
Source freeze is `b5a014c`; no earlier registration was rewritten.

Independent review checked 35 source hashes, 980 numeric artifact hashes, model
assignments, score graphs, exact selection and exact simulation recreation.
Final full suites pass **996 main / 992 Student B tests**, each with **1,545
subtests**. Ruff, ty and the frozen dependency audit pass. Student B mirrors the
same experiment; it is not an independent replication.

The next representation baseline should address the demonstrated orientation
and noise weaknesses while retaining a clean-usability gate. Existing recordings
support further exploratory comparisons and source-bound replay. Actual phone,
session and device generalization still needs appropriate fresh observations.
The previously inspected TEST point remains 3/200 false accepts, or 1.5%, above
the intended 1% FAR target; this round does not change it.
