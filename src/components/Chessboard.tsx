import type { Coord } from "../types";

type Props = {
    n: number;
    start: Coord | null;
    onPickStart: (c: Coord) => void;
    path: Coord[] | null;       // مسیر کامل (اگر آماده)
    currentIndex: number;       // اندیسِ گام در انیمیشن
};

function cellKey(r: number, c: number) { return `${r}-${c}`; }

export default function Chessboard({
                                       n, onPickStart, path, currentIndex
                                   }: Props) {
    // Map سریع برای دسترسی به شماره‌ی قدم هر خانه
    const stepIndex: Record<string, number> = {};
    if (path) {
        path.forEach((p, i) => { stepIndex[cellKey(p.r, p.c)] = i; });
    }

    const size = Math.min(560, Math.min(window.innerWidth - 40, 560));
    const cell = Math.floor(size / n);
    const boardPx = cell * n;

    return (
        <div
            style={{
                width: boardPx, height: boardPx, display: "grid",
                gridTemplateColumns: `repeat(${n}, ${cell}px)`,
                gridTemplateRows: `repeat(${n}, ${cell}px)`,
                border: "1px solid #ddd", borderRadius: 10, overflow: "hidden",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)"
            }}
        >
            {Array.from({ length: n * n }).map((_, idx) => {
                const r = Math.floor(idx / n);
                const c = idx % n;
                const isDark = (r + c) % 2 === 1;

                const key = cellKey(r, c);
                const inPath = stepIndex[key] !== undefined;
                const step = inPath ? stepIndex[key] : -1;
                const isCurrent = step === currentIndex;

                const bg = isCurrent
                    ? "#ef9a9a"
                    : step >= 0
                        ? (step === 0 ? "#ffd54f" : "#a5d6a7")
                        : isDark ? "#bdbdbd" : "#eeeeee";

                return (
                    <div
                        key={key}
                        onClick={() => onPickStart({ r, c })}
                        title={`(${r}, ${c})${inPath ? ` • step ${step + 1}` : ""}`}
                        style={{
                            position: "relative",
                            width: cell, height: cell,
                            background: bg,
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontFamily: "ui-monospace, SFMono-Regular, Menlo, Consolas, monospace",
                            fontSize: 12, cursor: "pointer", userSelect: "none",
                            borderRight: c !== n - 1 ? "1px solid rgba(0,0,0,0.06)" : undefined,
                            borderBottom: r !== n - 1 ? "1px solid rgba(0,0,0,0.06)" : undefined,
                            transition: "background 120ms linear"
                        }}
                    >
                        {isCurrent ? "♞" : step >= 0 ? step + 1 : ""}
                    </div>
                );
            })}
        </div>
    );
}
