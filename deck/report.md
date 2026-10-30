---
title: "Gait-Based Passive User Authentication from Inertial Signals"
subtitle: "A Metric-Learning Baseline with Paper-Inspired Classification and Efficiency Comparisons"
author: "Amaan (data pipeline) . Aditya (deep learning) . Nimisha (evaluation)"
date: 2026-10-28
---

# Abstract

We built and evaluated a complete gait-based user-authentication pipeline: inertial
signals from smartphones and wearables are windowed, embedded, and compared to
decide whether the person carrying the device is still the enrolled user. Across
two public datasets we reduced the equal-error rate (EER) from 0.2010 to 0.0958 on
WISDM and from 0.1764 to 0.1044 on HAR — improvements of 52.3% and 40.8%
respectively. On the Santos v7 cross-day protocol we reached 7.0% EER with an ROC
AUC of 0.9888. We implemented seven paper-inspired model tracks, ran a controlled
robustness study that exposed orientation and noise fragility (FRR rising from
15.13% to as much as 100%), and measured concrete engineering speedups of up to
15.98$\times$ from a CPU to a CUDA pipeline. All thresholds were frozen before final
evaluation, and negative results are reported alongside positive ones.

# 1. Introduction

Passwords and fingerprints authenticate a user once, at a moment of explicit
action. Gait authentication instead asks a cheaper, continuous question: *is the
person currently carrying the device the enrolled user?* Every stride leaves a
signature in the accelerometer and gyroscope streams, and we set out to test
whether that signature is discriminative enough to be useful.

Our contribution is a small but complete system:

1. a reproducible data pipeline over UCI HAR, the authentic WISDM AR v1.1 corpus,
   and the public Santos v7 dataset;
2. a verification stack combining descriptor-based methods and deep metric
   learning, with every threshold frozen before final evaluation;
3. a robustness and efficiency study that quantifies exactly where the approach
   works and where it breaks.

# 2. Data and Pipeline

We used three public sources (Table 1). The pipeline produces 128-sample windows
with stride 64, exports NPZ feature files, and ships a frozen `data/adapter.py`
contract so that every downstream experiment reads the same tensors.

Table: Datasets and windowing.

| Dataset | Role | Windows |
|---------|------|---------|
| UCI HAR | activity classification, scaling study | 2,947 test windows |
| WISDM AR v1.1 | verification, activity transfer | 128-sample, stride 64 |
| Santos v7 | cross-day verification (day-1 vs day-2) | 5 users, 15/5/5 split |

Restoring the real WISDM participant IDs (rather than anonymised row labels) was
a prerequisite for any subject-level verification number; without it, impostor
pairs are not honest impostors.

# 3. Models

We implemented seven tracks (B1–B7), each an adaptation of a published model:

Table: Implemented tracks.

| Track | Paper | Implementation |
|-------|-------|----------------|
| B1 | Dehzangi et al. 2017 (*Sensors*) | multi-sensor fusion CNN |
| B2 | Chen et al. 2020 (*IMWUT*) | METIER multi-task activity+user |
| B3 | Mekruksavanich & Jitpattanakul | DeepConvLSTM |
| B4 | Sheng & Li 2020 (*Neurocomputing*) | Siamese denoising autoencoder |
| B5 | 2024 (*Computers MDPI*) | SE-DeepConvNet |
| B6 | Ruiz-Barroso et al. 2025 (*Sci Rep*) | pruning / quantisation / ONNX |
| B7 | Hrudya & Poornachandran 2025 | GaitViT |

On top of the tracks we built a metric-learning extension: batch-hard triplet
mining, contrastive heads, and multiscale encoders ensembled at comparison time.

# 4. Results

## 4.1 Verification EER

The headline result is the halving of the verification error on WISDM and a
41% reduction on HAR (Figure 1). The improvement came from the descriptor route
with covariance normalisation — notably, the largest neural model *worsened*
(HAR neural winner EER 0.2146), so the gain is from representation design, not
model size.

![](charts_pdf/eer-bars.pdf)

Figure 1: Verification EER before and after metric learning on both datasets.
WISDM 0.2010 $\to$ 0.0958 ($-$52.3%); HAR 0.1764 $\to$ 0.1044 ($-$40.8%).

## 4.2 Cross-day authentication (Santos v7)

On the harder cross-day protocol — day-1 enrollment against day-2 probes from
five untouched users — we measured EER 7.0% and ROC AUC 0.9888, with the
calibration-frozen threshold yielding FAR 0.5% at FRR 22% (Figure 2).

![](charts_pdf/roc.pdf)

Figure 2: Cross-day ROC with the frozen-threshold operating point.

We must be explicit about scale: this is 50 genuine and 200 impostor claims, and
one user had 8 of 10 genuine claims rejected. It is a controlled leg-sensor
result with usability limits, not a deployment claim.

## 4.3 Method progression on Santos

Across the four Santos methods the descriptive EER fell monotonically (Figure 3):
mean-template acceleration (7.0%), six-axis two-template matching (2.5%),
lagged covariance (2.5%), and the DEV-selected method with frozen threshold
(0.0%). Under the frozen threshold, false accepts moved 1/200 $\to$ 6/200 $\to$ 7/200 $\to$
3/200 (1.5% final), while genuine rejections collapsed 11/50 $\to$ 0/50.

![](charts_pdf/hillclimb.pdf)

Figure 3: Descriptive EER across the four Santos methods.

The frozen 3/200 result does not meet our own 1% test-FAR target — the
descriptive 0.0% EER and the frozen operating point tell different stories, and
we report both.

## 4.4 Activity classification (UCI HAR)

All five HAR-trained models sit within 3.4 percentage points of each other
(Figure 4), with DeepConvLSTM (B3) best at 93.01% accuracy / 0.9314 macro-F1
with only 350k parameters. Errors concentrate almost entirely in the
SITING$\leftrightarrow$STANDING pair; walking classes are near-clean, and WISDM activity_3 is
120/121.

![](charts_pdf/activity.pdf)

Figure 4: UCI HAR accuracy across models (axis floored at 80%).

## 4.5 Scaling study

A deliberately small linear model is within 0.4 points of the larger ArcFace
run (Figure 5) — and the selected descriptor method beats both by 5–6 points
on each source. On this task, capacity is not the constraint; representation is.

![](charts_pdf/scaling.pdf)

Figure 5: Mean fold EER by method on both sources.

# 5. Robustness

We ran a predeclared stress study with the clean threshold frozen (Figure 6):
FRR rises from 15.13% clean to 85.19% under 30$^\circ$ rotation, 99.50% under 90$^\circ$
rotation, 63.54% under 1% noise, and 100% under 5% noise. This is the honest
weak point of the whole approach: raw thresholds do not survive orientation or
sensor-noise change.

![](charts_pdf/stress.pdf)

Figure 6: FRR under stress with the clean threshold frozen.

Canonical orientation normalisation removes most of the rotation sensitivity
(Figure 7): under constant 30$^\circ$/90$^\circ$ rotation, FRR stays at 14.79% versus 85–100%
for the control, at the cost of a slightly worse clean EER (4.80% $\to$ 5.88%).
Across 20 folds, folds with FAR above 2% fell from 3/20 to 2/20.

![](charts_pdf/orientation.pdf)

Figure 7: FAR / FRR / mean EER across the three orientation configurations.

Two further predeclared candidates failed their gates and were retained or
stopped: nuisance covariance reduced mean genuine rejection from 45.61% to
15.24% but failed 13 of 33 frozen safety gates; full-support comparison added
32,600 valid rows but worsened clean FRR to 16.66% with 14 of 33 gates failing.
A six-run verification sweep (HAR Siamese) could not beat its own 0.4162
baseline (best 0.4174), ruling out optimiser budget and embedding width as the
constraint. We count these negative results as part of the methodological
contribution.

# 6. Efficiency

All five engineering speedups are measured wall-clock executions, separate from
biometric quality (Figure 8): controlled CSV windowing 15.72$\times$, CPU$\to$CUDA training
10.98$\times$ (Wiker) and 9.83$\times$ (Darkstar), CPU$\to$CUDA inference 12.59$\times$ (Wiker) and
15.98$\times$ (Darkstar).

![](charts_pdf/speedups.pdf)

Figure 8: Measured execution speedups, CPU baseline vs tuned pipeline.

# 7. Conclusion

Gait-based passive authentication produced quantifiable improvements — EER
halved on WISDM, cross-day AUC 0.9888 — but the stress study shows exactly
where the boundary of usability lies today. Orientation normalisation and
calibration-frozen thresholds make the honest numbers reachable, and the
descriptor route outperformed scale on every dataset we touched.

# Team contributions

- **Amaan — data pipeline.** Dataset sourcing and licensing checks, WISDM
  participant-ID restoration, windowing and the frozen adapter contract.
- **Aditya — deep learning.** All seven tracks (B1–B7), training of five HAR
  models plus WISDM and Siamese verification, and the metric-learning
  extension that drove EER 0.2010 $\to$ 0.0958.
- **Nimisha — evaluation.** EER/FAR/FRR semantics, the cross-day Santos
  evaluation, calibration-frozen thresholds, and the robustness and timed
  takeover studies.

Mentored by Manjunath Hegde, MAHE. Test suite: 996/992 passing
(1,545 subtests each).