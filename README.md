# Minor Specialization Project — Gait-Based User Authentication

**Team:** Student A (data pipeline), Student B (deep learning), Student C (evaluation). **Mentor:** Manjunath Hegde, MAHE.

This project studies passive user authentication from phone/wearable inertial gait signals. The complete pipeline runs, but authentication errors and unverified session generalization still make it a research system.

## Latest research — 25 October 2026

The [paired nuisance-covariance study](docs/nuisance_covariance_results.md) reduces mean gain/noise rejection from 45.607% to 15.241%, but fails thirteen safety gates because clean errors and some stressed false-accept behavior worsen. Retain Canonical362. All 200 fits, 440 score sets and 541 geometry contexts verify; no new TEST result is claimed.

The [canonical orientation follow-up](docs/canonical_orientation_results.md) nominates an IDNet-inspired low-FAR DEV alternative: mean FAR 0.836%→0.500%, FRR 15.126%→14.787%, with 10/15 users no worse. Under the specified 30°/90° constant-coordinate rotations, its FRR stays 14.787% versus 85.190%/99.500% for control. EER worsens, five users have higher rejection, and noise/gain weaknesses remain. This is an exploratory DEV nomination, with no new TEST result or phone-deployment claim.

The [robustness and simulation round](docs/robustness_results.md) completed 300 CPU covariance fits, 660 score replays and 297 timed synthetic policy replays. Neither full nor matrix-log covariance beats the retained control under all clean DEV gates. Fixed-threshold probe stresses expose large rotation/noise rejection failures. No original CALIB/TEST data was opened, and no published TEST result changes. Main and Student B suites pass 996/992 tests, each with 1,545 subtests.

The [multisensor and calibrated-decision hillclimb](docs/hillclimb_results.md) adds six-axis fusion, rotation invariants, lagged covariance and enrollment-score blending. On five **previously inspected** Santos cross-day users, the latest DEV-selected method has descriptive EER 0%, but its independently calibrated operating threshold still accepts **3/200 impostor claims (1.5%)**, with **0/50 genuine rejections**. The matched lagcov control accepts 7/200 and rejects 0/50. This exploratory result does not prove perfect authentication or meet the intended 1% test FAR. Full candidate matrices, failed audit compute, per-user errors, source hashes and CPU timings accompany the code.

A subsequent [DEV-only calibration comparison](https://github.com/VariableThe/gait-biometrics/blob/main/reports/2026-10-24-calibration/README.md) nominates pooled calibration followed by metric refitting: mean validation FAR 0.917%→0.836% and FRR 19.276%→15.126%, with 12/15 users no worse. One user remains completely rejected. It opens no original CALIB/TEST data and does not change the published test result; exact count-based gates, the discarded first attempt and full per-user outcomes are retained.

The [existing-data engineering follow-up](https://github.com/VariableThe/gait-biometrics/blob/main/reports/2026-10-24-engineering/README.md) closes audited trainer/setup/numerical bugs, adds exact raw-sample exclusion, recoverable CPU/CUDA training, a source-bound walking gate and continuous inference/fallback tools, and pins CPU/CUDA environments with CI. The walking detector reached 91.22% balanced accuracy on six held DEV users; this is an activity result. The 100-fit raw/Z/S follow-up retains raw scoring: S reduces mean FRR to 12.45% but increases high-FAR splits, failing the registered gate. No published TEST threshold changes.

## Repositories

- [Merged runnable project](https://github.com/VariableThe/gait-biometrics): model-facing data adapter, A's standalone pipeline, B's models, C's evaluation and reproducible full experiments.
- [Student B + C](https://github.com/VariableThe/gait-biometrics-student-b/tree/feat/student-b-models): separate implementation history; default branch `feat/student-b-models`.
- [Student A standalone](https://github.com/128Amaan/minor_specialisation_studentA): source data pipeline and NPZ exports. Its pending standalone contribution is also mirrored in the merged project.

This hub contains [the original reading plan](Research_Reading_Plan_Gait.docx), `papers/student_b/`, `papers/common/`, the [primary literature/fidelity audit](docs/research_audit.md), and [the original mentor dataset link](link.md). Use the runnable merged repository for experiments.

## Current state — 23 October 2026

Authentic WISDM IDs are restored through the explicit **`wisdm_v1`** source from the official AR v1.1 raw release. The existing processed CSVs really are anonymous; the assertion that WISDM itself has no identities was incorrect. No IDs are guessed. Walking is explicitly label 0 in the new source; the semantic encoding of old numeric CSV labels remains unverified.

Windows stay inside identity/activity/recording boundaries. Activity checkpoints are selected on validation loss; Siamese checkpoints on validation EER with held-out subjects. Test thresholds are calibrated only on validation scores. CPU/CUDA execution, bounded sampling and process-local raw caching are implemented.

Frozen-code full 20-epoch walking results on Darkstar:

| Source | EER | ROC AUC | Validation-calibrated test FAR / FRR |
| --- | ---: | ---: | ---: |
| UCI HAR | 0.1764 | 0.9252 | 0.0358 / 0.3728 |
| WISDM AR v1.1 | 0.2010 | 0.8686 | 0.1520 / 0.2468 |

These are held-out-subject comparisons within existing recordings. They do not demonstrate cross-session continuous authentication. The historical HAR EER 0.4162 used all activities and a different pair protocol and is not a directly comparable baseline. The fixed-threshold errors above remain too high for deployment.

All five activity tracks also completed fresh 20-epoch full-data runs. A separate local four-validation-subject DeepConvLSTM run reached HAR activity accuracy 0.936885; the five-subject sweep has different results, all included in the [complete measured report](https://github.com/VariableThe/gait-biometrics/blob/d006d0a/reports/2026-10-23/README.md).

Controlled equal-output CSV windowing is 15.72x faster. Identical synthetic embedding workloads measured CPU-to-CUDA training/inference speedups of 10.98x/12.59x on Wiker and 9.83x/15.98x on Darkstar. These are execution measurements, separate from biometric quality. The full report includes hardware, raw timings, changed real-data retention, validation cohorts, complete metrics and limitations.

## Research extensions

The identity/protocol PRs are now merged in all three owned repositories. The [research-extension evidence](https://github.com/VariableThe/gait-biometrics/blob/feat/research-metric-learning/reports/2026-10-23-quality/README.md) records 36 final 40-epoch neural runs, three seeds per method, statistical baselines and a separate enrollment protocol.

| Source and method | Baseline EER | New EER | Evidence |
| --- | ---: | ---: | --- |
| WISDM multiscale batch-hard ensemble | 0.2010 | **0.0958** | Validation-locked primary comparison |
| HAR descriptors + covariance normalization | 0.1764 | **0.1044** | Exploratory subject-CV follow-up; test already inspected |

The primary HAR neural winner worsened to EER 0.2146 despite low validation EER. This negative result is retained; the secondary HAR method selects its transformation using three disjoint folds over training identities, reserving four other identities for calibration. It needs a fresh cohort for confirmation. WISDM fixed test FAR/FRR fell to 0.0826/0.1072; secondary HAR reached 0.0054/0.3046. These errors still do not establish usable passive authentication.

Implemented methods include identity-balanced batches, batch-hard and supervised contrastive objectives, multiscale/temporal encoders, train-only frozen normalization, physical sensor augmentation, statistics fusion, covariance-normalized descriptors, uniform seed ensembles and prefix-template enrollment. All candidates and complete histories are reported. New models use less stored parameter space but can be slower; latency and numerical-equivalence benchmarks are separate from biometric results. See the [reproduction guide](https://github.com/VariableThe/gait-biometrics/blob/feat/research-metric-learning/docs/research_experiments.md).

## Controlled scaling and cross-day follow-up

The next [48-run GPU study](https://github.com/VariableThe/gait-biometrics/blob/04e824ca4aa07046d7b13cc9f4d40ac141dfc9b7/reports/2026-10-23-scaling/README.md)
compares width 32/96 encoders and linear/ArcFace identity heads with three subject
folds, two seeds and 40 fixed final epochs. Four other users per source calibrate
thresholds after selection. Source TEST is never loaded in this study.

| Development mean fold EER | Small linear | Larger ArcFace | Selected descriptors |
| --- | ---: | ---: | ---: |
| HAR | 18.203% | 18.593% | **11.647%** |
| WISDM | 18.560% | 16.250% | **12.633%** |

These are development comparisons. Scaling helps WISDM, slightly worsens HAR,
and loses to descriptor controls on both. BF16 was slower in every matched GPU
shape, so FP32 remains the default. All candidates, histories, raw timings and
failures are retained; mirrors are the same experiments, not replications.

The [first genuine cross-day experiment](https://github.com/VariableThe/gait-biometrics/blob/f9bcf48/reports/2026-10-23-cross-day/README.md)
uses the public Santos v7 dataset and a predeclared 15/5/5 development/calibration/test
identity split. Day1 enrollment against day2 probes from five untouched users
gives **7.0% EER**, **0.9888 AUC**, and calibration-frozen **0.5% FAR / 22% FRR**.
There are only 50 genuine and 200 impostor claims; user 6 has 8/10 genuine claims rejected.
This establishes a small controlled leg-sensor result, with substantial usability
limits. Its scores cannot be treated as a controlled improvement over another
dataset. The archive, actual day labels, source/config/metric hashes, calibration
lock and single test attempt are preserved.

New contributions: [scaling origin](https://github.com/VariableThe/gait-biometrics/pull/3),
[scaling mirror](https://github.com/VariableThe/gait-biometrics-student-b/pull/6),
[cross-day origin](https://github.com/VariableThe/gait-biometrics/pull/4),
[cross-day mirror](https://github.com/VariableThe/gait-biometrics-student-b/pull/7).
Local final suites passed 331 tests + 311 subtests in the merged project and 327 + 311
in Student B. Source/lock/evidence reviews are separate from those test runs.

## Run the project

```bash
git clone https://github.com/VariableThe/gait-biometrics.git
cd gait-biometrics
uv sync --frozen --extra cpu --compile-bytecode
uv run --frozen --extra cpu python -m scripts.run_experiments --prepare --device cpu
```

The downloader uses checksum-verified public HAR/Fordham releases and retains source documentation; OneDrive login and Git LFS are unnecessary for this route. The two default configs train 20 full epochs each and immediately evaluate. Use `--out-root` to preserve prior runs. The merged README covers all five activity models, tests, benchmarks, compression and source contracts.

The original CI-2026 archives remain useful for legacy CSV comparisons. `source=wisdm` returns `y_subject=None`; verification must use authentic subject-bearing data instead. WISDM v1.1 has accelerometer channels only, not invented gyro readings. UCI 507 is a separate 51-person/18-activity collection and is not silently parsed as v1.1.

## Next scientific deliverables

Expand the cross-day population and add genuine repeated phone sessions; preserve separate enrollment, calibration and later-session probes; measure per-user error uncertainty and actual takeover delay; test device/orientation shift and device costs. Walking gating, causal decisions, fallback latching and censored-delay accounting now have tested implementations; their real phone behavior remains unvalidated. The [remaining-problem register](https://github.com/VariableThe/gait-biometrics/blob/main/docs/open_problems.md) records those boundaries. [The research audit](docs/research_audit.md) explains which papers guide these experiments and which supplied papers use different modalities. No architecture is claimed as an exact paper reproduction without evidence.
