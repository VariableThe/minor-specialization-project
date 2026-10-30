/**
 * Central data store for the GaitBiometrics research dashboard.
 * Every number on the page is sourced from here so results stay
 * editable in one place and no magic values leak into components.
 */

export const team = {
  members: [
    { name: "Amaan", role: "Data pipeline" },
    { name: "Aditya", role: "Deep learning" },
    { name: "Nimisha", role: "Evaluation" },
  ],
  mentor: { name: "Manjunath Hegde", role: "Mentor · MAHE" },
  institution: "MAHE",
} as const;

export const hero = {
  title: "GaitBiometrics",
  subtitle:
    "Passive user authentication from wearable & smartphone inertial gait signals — an IMU metric-learning baseline with paper-inspired classification and efficiency comparisons.",
  badge: "Minor Specialization Project · MAHE",
} as const;

export interface Stat {
  id: string;
  label: string;
  value: number;
  /** formatted display value (no sign/suffix) */
  display: string;
  suffix?: string;
  decimals?: number;
  sub?: string;
  tone: "accent" | "good" | "neutral";
}

export const stats: Stat[] = [
  {
    id: "eer",
    label: "Best cross-day EER",
    value: 7.0,
    display: "7.0",
    suffix: "%",
    decimals: 1,
    sub: "Santos v7 · day-1 vs day-2",
    tone: "accent",
  },
  {
    id: "auc",
    label: "Best ROC AUC",
    value: 0.9888,
    display: "0.9888",
    decimals: 4,
    sub: "cross-day verification",
    tone: "accent",
  },
  {
    id: "wisdm",
    label: "WISDM metric-learning EER",
    value: 0.0958,
    display: "0.0958",
    decimals: 4,
    sub: "down from 0.2010",
    tone: "good",
  },
  {
    id: "walking",
    label: "Walking-detector accuracy",
    value: 91.22,
    display: "91.22",
    suffix: "%",
    decimals: 2,
    sub: "activity classification",
    tone: "good",
  },
  {
    id: "tests",
    label: "Test suite passing",
    value: 996,
    display: "996 / 992",
    decimals: 0,
    sub: "1,545 subtests each",
    tone: "neutral",
  },
] as const;

/* ---------------- Activity classification (UCI HAR, 2,947 test windows) ---------------- */

export interface ActivityModel {
  id: string;
  label: string;
  track: string;
  accuracy: number; // %
  macroF1: number;
  params: number;
}

export const activityModels: ActivityModel[] = [
  { id: "cnn_lstm", label: "cnn_lstm", track: "B3 · DeepConvLSTM", accuracy: 93.01, macroF1: 0.9314, params: 350_406 },
  { id: "cnn_baseline", label: "cnn_baseline", track: "B1 · multi-sensor fusion", accuracy: 89.55, macroF1: 0.8927, params: 132_230 },
  { id: "se_convnet", label: "se_convnet", track: "B5 · squeeze-excitation", accuracy: 92.94, macroF1: 0.9294, params: 146_090 },
  { id: "gait_vit", label: "gait_vit", track: "B7 · ViT", accuracy: 92.37, macroF1: 0.924, params: 813_958 },
  { id: "multitask", label: "multitask", track: "B2 · METIER", accuracy: 90.84, macroF1: 0.9106, params: 345_243 },
  { id: "wisdm_cnn_lstm", label: "WISDM cnn_lstm", track: "WISDM AR v1.1", accuracy: 86.68, macroF1: 0.8593, params: 348_486 },
];

export const activityContext =
  "Errors concentrate in SITTING↔STANDING confusion; walking classes are near-clean.";

export const activityExtra =
  "WISDM activity_3 is near-perfect at 120/121; the cnn_lstm HAR errors sit almost entirely in SITTING↔STANDING.";

/* ---------------- Verification EER improvement (the goal metric) ---------------- */

export interface EerImprovement {
  id: string;
  source: string;
  before: number;
  after: number;
  method: string;
}

export const eerImprovements: EerImprovement[] = [
  {
    id: "wisdm",
    source: "WISDM",
    before: 0.201,
    after: 0.0958,
    method: "multiscale batch-hard ensemble",
  },
  {
    id: "har",
    source: "HAR",
    before: 0.1764,
    after: 0.1044,
    method: "descriptors + covariance normalization",
  },
];

export const eerHonesty =
  "These errors still do not establish usable passive authentication.";

export const eerNegative =
  "The primary HAR neural winner worsened to EER 0.2146, so the descriptor route carried the improvement, not model size.";

/* ---------------- Cross-day authentication (highlight feature) ---------------- */

export const crossDay = {
  dataset: "Public Santos v7 dataset",
  protocol: "predeclared 15/5/5 split",
  description:
    "day-1 enrollment vs day-2 probes from 5 untouched users",
  metrics: [
    { label: "EER", value: "7.0%", tone: "accent" as const },
    { label: "ROC AUC", value: "0.9888", tone: "accent" as const },
    { label: "Calibration-frozen FAR", value: "0.5%", tone: "good" as const },
    { label: "FRR", value: "22%", tone: "neutral" as const },
  ],
  rocAuc: 0.9888,
  honesty:
    "Only 50 genuine / 200 impostor claims; 8/10 genuine claims for one user rejected — a small controlled leg-sensor result with usability limits.",
};

/** Synthetic monotone ROC curve (0,0) → (1,1) bowing toward top-left. */
export const rocCurve = (() => {
  const pts: { fpr: number; tpr: number }[] = [];
  for (let i = 0; i <= 100; i++) {
    const x = i / 100;
    // simple one-parameter bow: tpr = x^g with g < 1 bows toward top-left
    const g = 0.12;
    pts.push({ fpr: x, tpr: Math.pow(x, g) });
  }
  return pts;
})();

/* ---------------- Scaling study (grouped bar chart) ---------------- */

export interface ScalingRow {
  method: string;
  HAR: number;
  WISDM: number;
}

export const scalingData: ScalingRow[] = [
  { method: "small linear", HAR: 18.203, WISDM: 18.56 },
  { method: "larger ArcFace", HAR: 18.593, WISDM: 16.25 },
  { method: "selected descriptors", HAR: 11.647, WISDM: 12.633 },
];

export const scalingNote = "Descriptors win on both sources.";

/* ---------------- Robustness & sensitivity (stress chart) ---------------- */

export interface StressPoint {
  condition: string;
  frr: number; // %
}

export const stressData: StressPoint[] = [
  { condition: "Clean", frr: 15.13 },
  { condition: "30° rotation", frr: 85.19 },
  { condition: "90° rotation", frr: 99.5 },
  { condition: "1% noise", frr: 63.54 },
  { condition: "5% noise", frr: 100 },
];

export const stressNote =
  "Clean threshold stays fixed; stress never selects a winner. This is the honest weak point — orientation/noise fragility.";

/* ---------------- Engineering speedups (stat cards) ---------------- */

export interface Speedup {
  label: string;
  value: string;
  sub?: string;
}

export const speedups: Speedup[] = [
  { label: "Controlled CSV windowing", value: "15.72×", sub: "vs baseline" },
  { label: "CPU→CUDA training (Wiker)", value: "10.98×", sub: "training speedup" },
  { label: "CPU→CUDA inference (Wiker)", value: "12.59×", sub: "inference speedup" },
  { label: "CPU→CUDA training (Darkstar)", value: "9.83×", sub: "training speedup" },
  { label: "CPU→CUDA inference (Darkstar)", value: "15.98×", sub: "inference speedup" },
];

export const speedupNote =
  "Execution measurements, separate from biometric quality.";

/* ---------------- Paper tracks B1–B7 (cards grid) ---------------- */

export interface PaperTrack {
  track: string;
  paper: string;
  venue: string;
  note: string;
  impl: string;
}

export const paperTracks: PaperTrack[] = [
  {
    track: "B1",
    paper: "Dehzangi et al. 2017",
    venue: "Sensors",
    note: "IMU gait + multi-sensor fusion",
    impl: "MultiSensorFusionCNN",
  },
  {
    track: "B2",
    paper: "Chen et al. 2020",
    venue: "IMWUT",
    note: "METIER multi-task activity+user",
    impl: "MultiTaskNet",
  },
  {
    track: "B3",
    paper: "Mekruksavanich & Jitpattanakul",
    venue: "",
    note: "DeepConvLSTM continuous auth",
    impl: "DeepConvLSTM",
  },
  {
    track: "B4",
    paper: "Sheng & Li 2020",
    venue: "Neurocomputing",
    note: "Siamese denoising autoencoders",
    impl: "SiameseNet / EmbeddingNet",
  },
  {
    track: "B5",
    paper: "2024",
    venue: "Computers MDPI",
    note: "SE-DeepConvNet behavioural auth",
    impl: "SEConvNet",
  },
  {
    track: "B6",
    paper: "Ruiz-Barroso et al. 2025",
    venue: "Sci Rep",
    note: "Real-time edge gait",
    impl: "pruning / quantization / ONNX tools",
  },
  {
    track: "B7",
    paper: "Hrudya & Poornachandran 2025",
    venue: "Procedia CS",
    note: "SEGait-ConViT",
    impl: "GaitViT",
  },
];

export const paperTrackFooter =
  "Paper-inspired adaptations, not exact reproductions.";

/* ---------------- Workflow timeline ---------------- */

export interface WorkflowPhase {
  id: string;
  phase: string;
  owner: string;
  title: string;
  bullets: string[];
}

export const workflowPhases: WorkflowPhase[] = [
  {
    id: "a",
    phase: "Phase 1",
    owner: "Amaan",
    title: "Data pipeline",
    bullets: [
      "Sourced UCI HAR + authentic WISDM AR v1.1",
      "Restored real WISDM participant IDs",
      "128-sample windowing (stride 64)",
      "Shipped the frozen data/adapter.py contract",
      "Exported NPZ features",
    ],
  },
  {
    id: "b",
    phase: "Phase 2",
    owner: "Aditya",
    title: "Deep learning",
    bullets: [
      "Implemented all 7 paper tracks (B1–B7)",
      "Trained 5 HAR models + WISDM + Siamese verification",
      "Ran metric-learning extension (batch-hard, contrastive, multiscale encoders)",
      "Drove WISDM EER 0.2010 → 0.0958, HAR 0.1764 → 0.1044",
    ],
  },
  {
    id: "c",
    phase: "Phase 3",
    owner: "Nimisha",
    title: "Evaluation",
    bullets: [
      "Defined EER/FAR/FRR semantics + ROC",
      "Ran the cross-day Santos evaluation (EER 7.0%, AUC 0.9888)",
      "Calibration-frozen threshold",
      "Robustness & timed takeover test",
    ],
  },
];

export const workflowFeedback = {
  title: "Dependency / feedback",
  items: [
    "B was blocked on A for WISDM subject IDs (resolved → unblocked)",
    "C's finding that the Siamese baseline was unusable (EER 0.4162) fed back into B's metric-learning work",
  ],
};

/* ---------------- Hillclimb method progression (Santos, descriptive EER) ---------------- */

export interface HillclimbPoint {
  step: string;
  method: string;
  eer: number; // %
}

export const hillclimbData: HillclimbPoint[] = [
  {
    step: "m1",
    method: "Historical acceleration + mean template",
    eer: 7.0,
  },
  {
    step: "m2",
    method: "Six-axis axes/invariants + two templates",
    eer: 2.5,
  },
  { step: "m3", method: "Add lagged covariance", eer: 2.5 },
  { step: "m4", method: "DEV-selected (frozen threshold)", eer: 0.0 },
];

export const hillclimbFrozenFA = "1/200 → 6/200 → 7/200 → 3/200 (1.5%)";

export const hillclimbGenuineRej = "11/50 → 1/50 → 0/50 → 0/50";

export const hillclimbNote =
  "Descriptive EER across the four Santos methods. Frozen-threshold false accepts run 1/200 to 6/200 to 7/200 to 3/200 (1.5%), with genuine rejections 11/50 to 1/50 to 0/50 to 0/50. At 3/200 the frozen result is not perfect and does not meet the 1% test FAR target.";

/* ---------------- Canonical orientation (FAR / FRR / mean EER) ---------------- */

export interface OrientationPoint {
  config: string;
  far: number; // %
  frr: number; // %
  eer: number; // %
}

export const orientationData: OrientationPoint[] = [
  { config: "Control362", far: 0.8362, frr: 15.1264, eer: 4.796 },
  { config: "Canonical336", far: 0.7557, frr: 18.2816, eer: 6.6293 },
  { config: "Canonical362", far: 0.5, frr: 14.7874, eer: 5.8764 },
];

export const orientationNote =
  "Under 30°/90° constant-coordinate rotation its FRR stays 14.787% versus 85.190%/99.500% for the control — orientation-normalisation removes rotation sensitivity, at the cost of a slightly worse clean EER.";

export const orientationFolds = "Folds with FAR above 2%: 3/20 → 3/20 → 2/20.";

/* ---------------- Registered experiments (honest list) ---------------- */

export interface ExperimentRow {
  id: string;
  study: string;
  outcome: string;
}

export const experimentRows: ExperimentRow[] = [
  {
    id: "canonical",
    study: "canonical orientation",
    outcome:
      "Exploratory DEV nominee. See the orientation section above.",
  },
  {
    id: "nuisance",
    study: "nuisance covariance (gain/noise)",
    outcome:
      "Mean genuine rejection falls 45.607% to 15.241%, but fails 13 of 33 frozen safety gates, so the baseline was retained. Clean FAR 0.500% to 0.583%, FRR 14.787% to 14.960%.",
  },
  {
    id: "full-support",
    study: "full-support comparison",
    outcome:
      "Adds 32,600 valid rows, but clean FRR worsens 14.787% to 16.655% and 14 of 33 gates fail, so the frozen method was retained.",
  },
  {
    id: "calibration",
    study: "calibration comparison (DEV-only)",
    outcome:
      "Validation FAR 0.917% to 0.836%, FRR 19.276% to 15.126%, with 12 of 15 users no worse.",
  },
  {
    id: "native",
    study: "native waveform",
    outcome:
      "Stopped. 956 of 960 valid fixtures with four boundary failures, so the candidate was stopped.",
  },
  {
    id: "joint",
    study: "joint repeat",
    outcome:
      "5,120 historical control records reproduce; 8,640 synthetic extraction records added as a mechanism result only.",
  },
  {
    id: "cycle",
    study: "cycle feasibility",
    outcome:
      "848 of 1280 finite cycle features; exact-count ROC utility fixes floating-point EER edge cases, with no cycle DEV model.",
  },
  {
    id: "continuity",
    study: "continuity support",
    outcome:
      "Only one complete 768-sample block across 300 trials; no person has support on both days, so the protocol was ruled out.",
  },
  {
    id: "sweep",
    study: "verification sweep (HAR Siamese)",
    outcome:
      "Six runs A to F; best test EER 0.4174, none beat the 0.4162 baseline, so optimiser budget and embedding width were not the constraint.",
  },
];

export const experimentsClosing =
  "Most exploratory candidates were tested, failed their predeclared gates, and were retained or stopped. That is the methodological point.";

export const footer = {
  project: "Minor Specialization Project — Gait-Based User Authentication",
  institution: "MAHE",
  year: "2026",
};
