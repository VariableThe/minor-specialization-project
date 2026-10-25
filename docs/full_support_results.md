# Full-support canonical comparison: retain the frozen method

The single registered DEV attempt does not favor the full-support estimator.
It adds **32,600 distinct valid rows** through 588 historical windows plus 297
endcaps on the same 299 historical trials. Clean FRR increases relative to the
matched aggregation control, and **14 of 33** replacement gates fail.
Canonical362 remains selected.

| Method | Clean FAR | Clean FRR | Clean EER | Repeated false accepts | Repeated genuine rejects |
| --- | ---: | ---: | ---: | ---: | ---: |
| R: frozen Canonical362 | 0.500000% | 14.787356% | 5.876437% | 6/1,192 | 88/596 |
| H: historical-support aggregation control | 0.583333% | 15.126437% | 5.551724% | 7/1,192 | 90/596 |
| F: full-support candidate | 0.750000% | 16.655172% | 6.551724% | 9/1,192 | 99/596 |

Percentages are equal-fold means over twenty overlapping folds of fifteen reused
DEV identities. Counts are dependent repeated claim appearances, not extra
people or independent trials. The primary F−H clean FRR difference is exactly
`133/8700`, or **+1.528736 percentage points**; F's FAR also rises over H.

R retains its original window embeddings followed by normalized trial means.
H averages descriptors before its own metric training. F keeps H's aggregation
order while adding endcaps with exact source-row multiplicity weights. Thus
R→H changes aggregation and training units; H→F tests the full-support estimator,
including endcap placement and weights. F−R does not isolate a pure tail effect.
H remains diagnostic and cannot be nominated instead.

Both prescribed rotations preserve each arm's clean decisions. Gain/noise
weaknesses persist; at 5% noise every arm rejects all 596 genuine claim
appearances. Subject 9 remains 40/40 rejected in every condition and arm.

All 121 preflight contexts and 11,373 required windows pass. The run completes
200 new fits and restores 100 original R states without fitting. Full source,
feature, model, score, threshold and decision replay verifies all 660 score sets
with zero fits. An independent read-only audit reproduces all scores bit for bit
and all 33 gate decisions. Original CALIB and TEST stayed closed. The previous
TEST operating point remains 3/200 false accepts (1.5%); this study supplies no
new TEST result or population FAR guarantee.

The report and cached-decision evidence are published in the
[main repository](https://github.com/VariableThe/gait-biometrics/tree/research/full-support-canonical-20261025/reports/2026-10-25-full-support)
and the
[Student B mirror](https://github.com/VariableThe/gait-biometrics-student-b/tree/research/full-support-canonical-20261025/reports/2026-10-25-full-support).
The mirror is not independent replication. The compact publication distinguishes
cached-decision replay from the retained full local model/feature/source bundle.

[IDNet §6](https://arxiv.org/html/1606.03238v3#S6) motivates investigating more
walking evidence, not this feature-mean estimator. [WCCN §2](https://www.isca-archive.org/interspeech_2006/hatch06_interspeech.pdf)
grounds TRAIN within-class covariance; [Bolle et al.](https://research.ibm.com/publications/an-evaluation-of-error-confidence-interval-estimation-methods)
addresses dependence in biometric error estimation. These guide adaptations;
this is not a full-system paper reproduction or deployment validation.

The [N446 waveform stop](native_waveform_results.md) remains final. This separate
nonsegmented comparison changes no waveform parameters and authorizes no retry
of that candidate.
