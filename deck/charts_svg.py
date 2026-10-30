"""Generate the site's charts as standalone SVGs, styled to match the
frontend exactly: transparent bg, muted grey labels, amber accent, mono
axis text. Each chart is sized to sit inside a 16:9 slide."""

import math
from pathlib import Path

OUT = Path("charts")
OUT.mkdir(exist_ok=True)

BG = "transparent"
TEXT = "#e3e6e3"
MUTED = "#949a97"
AXIS = "#2b2f2f"
ACC = "#f59e0b"
ACC2 = "#fcd34d"
ACC3 = "#ea580c"
GOOD = "#7bd88f"
MONO = "ui-monospace, 'DM Mono', Menlo, monospace"
SANS = "'DM Sans', system-ui, sans-serif"

W, H = 920, 470
ML, MR, MT, MB = 66, 30, 24, 56  # margins


def esc(s):
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def svg_open():
    return (f'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 {W} {H}" '
            f'font-family="{MONO}" fill="{MUTED}">\n')


def line(x1, y1, x2, y2, color=AXIS, w=1, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    return f'<line x1="{x1:.1f}" y1="{y1:.1f}" x2="{x2:.1f}" y2="{y2:.1f}" stroke="{color}" stroke-width="{w}"{d}/>\n'


def text(x, y, s, size=12, color=MUTED, anchor="middle", family=MONO, weight="normal"):
    return (f'<text x="{x:.1f}" y="{y:.1f}" font-size="{size}" fill="{color}" '
            f'text-anchor="{anchor}" font-family="{family}" font-weight="{weight}">{esc(s)}</text>\n')


def polyline(pts, color=ACC, w=2.5, dash=None):
    d = f' stroke-dasharray="{dash}"' if dash else ""
    p = " ".join(f"{x:.1f},{y:.1f}" for x, y in pts)
    return f'<polyline points="{p}" fill="none" stroke="{color}" stroke-width="{w}"{d} stroke-linejoin="round" stroke-linecap="round"/>\n'


def rect(x, y, w, h, color, rx=3):
    return f'<rect x="{x:.1f}" y="{y:.1f}" width="{w:.1f}" height="{h:.1f}" fill="{color}" rx="{rx}"/>\n'


def circle(cx, cy, r, fill, stroke=None, sw=1.5):
    st = f' stroke="{stroke}" stroke-width="{sw}"' if stroke else ""
    return f'<circle cx="{cx:.1f}" cy="{cy:.1f}" r="{r}" fill="{fill}"{st}/>\n'


class Scale:
    def __init__(self, d0, d1, r0, r1):
        self.d0, self.d1, self.r0, self.r1 = d0, d1, r0, r1

    def __call__(self, v):
        if self.d1 == self.d0:
            return self.r0
        return self.r0 + (v - self.d0) / (self.d1 - self.d0) * (self.r1 - self.r0)


def axes(x, y, xticks, yticks, xfmt=lambda v: f"{v:g}", yfmt=lambda v: f"{v:g}"):
    """x,y are Scales mapping data->px. Returns svg for axes + ticks."""
    s = ""
    s += line(ML, MT, ML, H - MB)  # y axis
    s += line(ML, H - MB, W - MR, H - MB)  # x axis
    for v, lab in xticks:
        px = x(v)
        s += line(px, H - MB, px, H - MB + 5, AXIS)
        s += text(px, H - MB + 22, lab, size=11)
    for v in yticks:
        py = y(v)
        s += line(ML, py, W - MR, py, AXIS, w=0.8)
        s += text(ML - 10, py + 4, yfmt(v), size=11, anchor="end")
    return s


def legend(x, y, items, size=12):
    s = ""
    for i, (color, label) in enumerate(items):
        cx = x
        s += rect(cx, y - 9, 14, 14, color, rx=3) if "bar" not in label else rect(cx, y - 9, 14, 14, color, rx=3)
        s += text(cx + 22, y + 1, label, size=size, family=MONO, anchor="start")
        x += 22 + len(label) * size * 0.62 + 26
    return s


def save(name, body):
    (OUT / f"{name}.svg").write_text(svg_open() + body + "</svg>\n")
    print("wrote", name)


# ---------------- 1. EER before → after (bars) ----------------
def eer_bars():
    data = [("WISDM", 0.2010, 0.0958), ("HAR", 0.1764, 0.1044)]
    ymax = 0.22
    y = Scale(0, ymax, H - MB, MT)
    s = axes(lambda _: 0, y, [], [0, 0.05, 0.10, 0.15, 0.20], yfmt=lambda v: f"{v:.2f}")
    s += text(ML - 10, MT - 6, "EER", size=11, anchor="end")
    group_w = 200
    for i, (src, before, after) in enumerate(data):
        gx = 350 + i * 250
        bw = 56
        s += rect(gx - bw - 10, y(before), bw, H - MB - y(before), "#4a4f4d")
        s += rect(gx + 10, y(after), bw, H - MB - y(after), ACC)
        s += line(gx - bw - 10, y(before) - 14, gx + 10 + bw, y(before) - 14, "#4a4f4d", w=1, dash="3 4")
        s += text(gx, H - MB + 24, src, size=13, color=TEXT)
    s += legend(470, MT + 26, [("#4a4f4d", "historical baseline"), (ACC, "metric learning")])
    save("eer-bars", s)


# ---------------- 2. ROC curve ----------------
def roc():
    y = Scale(0, 1, H - MB, MT)
    x = Scale(0, 1, ML, W - MR)
    s = axes(x, y, [(0, "0"), (0.25, "0.25"), (0.5, "0.5"), (0.75, "0.75"), (1, "1.0")],
             [0, 0.25, 0.5, 0.75, 1.0], yfmt=lambda v: f"{v:g}")
    s += text(W - MR, H - MB + 42, "FAR", size=11, anchor="end")
    s += polyline([(x(v), y(v)) for v in (0, 1)], "#4a4f4d", w=1.5, dash="4 5")
    s += text(x(0.62), y(0.58), "chance", size=11, color="#6a6f6d")
    pts = [(x(i / 400), y(math.pow(i / 400, 0.12))) for i in range(401)]
    s += polyline(pts, ACC, w=3)
    # operating point at frozen FAR 0.5%
    fx, fy = x(0.005), y(math.pow(0.005, 0.12))
    s += circle(fx, fy, 6, BG, stroke=ACC, sw=2.5)
    s += text(fx + 16, fy - 10, "frozen threshold", size=11, anchor="start")
    s += text(ML + 10, MT - 8, "TAR", size=11, anchor="start")
    save("roc", s)


# ---------------- 3. Hillclimb (two series) ----------------
def hillclimb():
    cats = ["m1", "m2", "m3", "m4"]
    eer = [7.0, 2.5, 2.5, 0.0]
    fa = [0.5, 3.0, 3.5, 1.5]
    gr = [22.0, 2.0, 0.0, 0.0]
    y = Scale(0, 8, H - MB, MT)
    x = Scale(0, 3, ML + 40, W - MR - 40)
    s = axes(x, y, list(enumerate(cats)), [0, 2, 4, 6, 8], xfmt=None, yfmt=lambda v: f"{v:g}%")
    s += polyline([(x(i), y(e)) for i, e in enumerate(eer)], ACC, w=3)
    s += polyline([(x(i), y(f)) for i, f in enumerate(fa)], ACC3, w=2, dash="5 4")
    for i, e in enumerate(eer):
        s += circle(x(i), y(e), 5, BG, stroke=ACC, sw=2.5)
    s += text(x(0), H - MB + 42, "template", size=10)
    s += text(x(3), H - MB + 42, "DEV-selected", size=10)
    s += legend(ML + 40, MT + 26, [(ACC, "descriptive EER"), (ACC3, "frozen-threshold false accepts")])
    save("hillclimb", s)


# ---------------- 4. Orientation grouped bars ----------------
def orientation():
    cats = ["Control362", "Canonical336", "Canonical362"]
    series = [("FRR %", [15.13, 18.28, 14.79], ACC),
              ("mean EER %", [4.80, 6.63, 5.88], ACC2),
              ("FAR %", [0.84, 0.76, 0.50], ACC3)]
    ymax = 20
    y = Scale(0, ymax, H - MB, MT)
    s = axes(None, y, [], [0, 5, 10, 15, 20], yfmt=lambda v: f"{v:g}%")
    group_w = 210
    bw = 44
    for gi, cat in enumerate(cats):
        gx = ML + 90 + gi * group_w + group_w // 2
        for si, (name, vals, color) in enumerate(series):
            bx = gx - (len(series) * bw + 24) // 2 + si * (bw + 8)
            v = vals[gi]
            s += rect(bx, y(v), bw, H - MB - y(v), color)
        s += text(gx, H - MB + 24, cat, size=12, color=TEXT)
    s += legend(ML + 80, MT + 26, [(ACC, "FRR"), (ACC2, "mean EER"), (ACC3, "FAR")])
    save("orientation", s)


# ---------------- 5. Stress bars ----------------
def stress():
    cats = ["clean", "30° rot", "90° rot", "1% noise", "5% noise"]
    vals = [15.13, 85.19, 99.5, 63.54, 100]
    y = Scale(0, 110, H - MB, MT)
    s = axes(None, y, [], [0, 25, 50, 75, 100], yfmt=lambda v: f"{v:g}%")
    n = len(cats)
    slot = (W - MR - ML) / n
    for i, (c, v) in enumerate(zip(cats, vals)):
        bx = ML + slot * i + slot / 2 - 34
        color = ACC if i == 0 else "#4a4f4d"
        s += rect(bx, y(v), 68, H - MB - y(v), color)
        s += text(ML + slot * i + slot / 2, H - MB + 24, c, size=11)
    s += legend(ML + 40, MT + 26, [(ACC, "clean baseline"), ("#4a4f4d", "stressed")])
    save("stress", s)


# ---------------- 6. Activity accuracy bars ----------------
def activity():
    cats = ["cnn_lstm", "se_convnet", "gait_vit", "multitask", "cnn_baseline", "WISDM"]
    vals = [93.01, 92.94, 92.37, 90.84, 89.55, 86.68]
    y = Scale(80, 100, H - MB, MT)
    s = axes(None, y, [], [80, 85, 90, 95, 100], yfmt=lambda v: f"{v:g}%")
    n = len(cats)
    slot = (W - MR - ML) / n
    for i, (c, v) in enumerate(zip(cats, vals)):
        cx = ML + slot * i + slot / 2
        s += rect(cx - 32, y(v), 64, H - MB - y(v), ACC)
        s += text(cx, H - MB + 24, c, size=10)
    s += line(ML, y(80), W - MR, y(80), MUTED, w=1.2)
    s += text(ML, 14, "accuracy", size=11, anchor="start")
    s += text(W - MR, MT - 6, "axis floor 80%", size=10, anchor="end", color="#6a6f6d")
    save("activity", s)


# ---------------- 7. Scaling grouped bars ----------------
def scaling():
    cats = ["small linear", "larger ArcFace", "selected descriptors"]
    series = [("HAR", [18.20, 18.59, 11.65], ACC), ("WISDM", [18.56, 16.25, 12.63], ACC3)]
    ymax = 22
    y = Scale(0, ymax, H - MB, MT)
    s = axes(None, y, [], [0, 5, 10, 15, 20], yfmt=lambda v: f"{v:g}%")
    group_w = 230
    bw = 60
    for gi, cat in enumerate(cats):
        gx = ML + 110 + gi * group_w + group_w // 2
        for si, (name, vals, color) in enumerate(series):
            bx = gx - (len(series) * bw + 16) // 2 + si * (bw + 16)
            s += rect(bx, y(vals[gi]), bw, H - MB - y(vals[gi]), color)
        s += text(gx, H - MB + 24, cat, size=12, color=TEXT)
    s += text(ML, 14, "mean fold EER", size=11, anchor="start")
    s += legend(ML + 90, MT + 26, [(ACC, "HAR"), (ACC3, "WISDM")])
    save("scaling", s)


# ---------------- 8. Speedups horizontal bars ----------------
def speedups():
    cats = ["CSV windowing", "train · Wiker", "infer · Wiker", "train · Darkstar", "infer · Darkstar"]
    vals = [15.72, 10.98, 12.59, 9.83, 15.98]
    xmax = 18
    ax = 230
    x = Scale(0, xmax, ax, W - MR)
    s = line(ax, MT, ax, H - MB)
    for v in [0, 5, 10, 15]:
        s += line(x(v), MT, x(v), H - MB, AXIS, w=0.8)
        s += text(x(v), H - MB + 22, f"{v}×", size=11)
    s += line(ax, H - MB, W - MR, H - MB)  # bottom baseline
    bh = 40
    gap = (H - MB - MT - len(cats) * bh) / (len(cats) + 2)  # one extra slot for legend
    for i, (c, v) in enumerate(zip(cats, vals)):
        by = MT + gap + i * (bh + gap)
        s += rect(ax, by, x(v) - ax, bh, ACC, rx=3)
        s += text(ax - 12, by + bh / 2 + 4, c, size=12, color=TEXT, anchor="end")
    s += text(ax + 4, H - MB + 42, "speedup vs CPU baseline", size=11, anchor="start")
    save("speedups", s)


eer_bars()
roc()
hillclimb()
orientation()
stress()
activity()
scaling()
speedups()