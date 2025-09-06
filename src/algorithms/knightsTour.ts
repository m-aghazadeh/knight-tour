import type { Coord } from "../types";

const MOVES: Coord[] = [
    { r: -2, c: -1 }, { r: -2, c: +1 },
    { r: -1, c: -2 }, { r: -1, c: +2 },
    { r: +1, c: -2 }, { r: +1, c: +2 },
    { r: +2, c: -1 }, { r: +2, c: +1 },
];

export function inBounds(n: number, r: number, c: number) {
    return r >= 0 && c >= 0 && r < n && c < n;
}

export function neighbors(n: number, pos: Coord): Coord[] {
    const res: Coord[] = [];
    for (const d of MOVES) {
        const r = pos.r + d.r, c = pos.c + d.c;
        if (inBounds(n, r, c)) res.push({ r, c });
    }
    return res;
}

function degree(n: number, pos: Coord, visited: boolean[][]) {
    let d = 0;
    for (const nb of neighbors(n, pos)) {
        if (!visited[nb.r][nb.c]) d++;
    }
    return d;
}

/**
 * Knight's Tour using Warnsdorff heuristic.
 * برمی‌گرداند: مسیر کامل  n*n  یا null اگر شکست.
 */
export function knightsTour(n: number, start: Coord): Coord[] | null {
    const visited = Array.from({ length: n }, () =>
        Array.from({ length: n }, () => false)
    );
    const path: Coord[] = [{ ...start }];
    visited[start.r][start.c] = true;

    for (let step = 1; step < n * n; step++) {
        const candidates = neighbors(n, path[path.length - 1])
            .filter(p => !visited[p.r][p.c])
            .map(p => ({ p, deg: degree(n, p, visited) }));

        if (candidates.length === 0) return null;

        // مرتب‌سازی بر اساس کمترین درجه، سپس Tie-break ثابت بر اساس (r,c)
        candidates.sort((a, b) =>
            a.deg - b.deg || a.p.r - b.p.r || a.p.c - b.p.c
        );

        const next = candidates[0].p;
        visited[next.r][next.c] = true;
        path.push(next);
    }
    return path;
}
