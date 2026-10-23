# Minor Specialization Project — Gait-Based User Authentication

**Team:** Student A (data pipeline), Student B (deep learning), Student C (evaluation). **Mentor:** Manjunath Hegde, MAHE.

This project studies passive user authentication from phone/wearable inertial gait signals. The complete pipeline runs, but authentication errors and unverified session generalization still make it a research system.

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

## Run the project

```bash
git clone https://github.com/VariableThe/gait-biometrics.git
cd gait-biometrics
# Until merged, use the contribution branch:
git switch fix/reproducible-gait-authentication
uv venv --python 3.14
uv pip install --python .venv/bin/python --compile-bytecode -r requirements-dev.txt
uv run --no-project --python .venv/bin/python python -m scripts.run_experiments --prepare --device auto
```

The downloader uses checksum-verified public HAR/Fordham releases and retains source documentation; OneDrive login and Git LFS are unnecessary for this route. The two default configs train 20 full epochs each and immediately evaluate. Use `--out-root` to preserve prior runs. The merged README covers all five activity models, tests, benchmarks, compression and source contracts.

The original CI-2026 archives remain useful for legacy CSV comparisons. `source=wisdm` returns `y_subject=None`; verification must use authentic subject-bearing data instead. WISDM v1.1 has accelerometer channels only, not invented gyro readings. UCI 507 is a separate 51-person/18-activity collection and is not silently parsed as v1.1.

## Next scientific deliverables

Collect or recover genuine session/date/recording metadata; separate enrollment, calibration and later-session probes; exclude overlapping genuine probes; measure per-user error uncertainty and takeover detection delay; test device/orientation shift; implement and evaluate online walking gating and fallback decisions. [The research audit](docs/research_audit.md) explains which papers guide these experiments and which supplied papers use different modalities. No architecture is claimed as an exact paper reproduction without evidence.
