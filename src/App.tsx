import {useEffect, useRef, useState} from "react"
import Chessboard from "./components/Chessboard"
import Controls from "./components/Controls"
import Legend from "./components/Legend"
import {knightsTour} from "./algorithms/knightsTour"
import type {Coord, TourState} from "./types"
import {Card, CardContent} from "./components/ui/card"
import {Badge} from "./components/ui/badge"
import "./index.css"

export default function App() {
    const [n, setN] = useState(8)
    const [start, setStart] = useState<Coord | null>(null)
    const [state, setState] = useState<TourState>("idle")
    const [path, setPath] = useState<Coord[] | null>(null)
    const [idx, setIdx] = useState(0)
    const [speedMs, setSpeedMs] = useState(120)
    const timerRef = useRef<number | null>(null)

    // stop timer on unmount
    useEffect(() => {
        return () => {
            if (timerRef.current !== null) {
                window.clearInterval(timerRef.current)
            }
        }
    }, [])

    // reset when board size changes
    useEffect(() => {
        onReset()
        setStart(null)
    }, [n])

    const canPlay = Boolean(path && (state === "ready" || state === "paused"))

    function stopTimer() {
        if (timerRef.current !== null) {
            window.clearInterval(timerRef.current)
            timerRef.current = null
        }
    }

    function onPickStart(c: Coord) {
        if (state === "playing") return
        setStart(c)
        setState("idle")
        setPath(null)
        setIdx(0)
    }

    function onCompute() {
        if (!start) return
        setState("computing")
        const res = knightsTour(n, start)
        if (!res) {
            setPath(null)
            setIdx(0)
            setState("failed")
            return
        }
        setPath(res)
        setIdx(0)
        setState("ready")
    }

    function onPlayPause() {
        if (!path) return
        if (state === "playing") {
            stopTimer()
            setState("paused")
            return
        }
        setState("playing")
        stopTimer()
        timerRef.current = window.setInterval(() => {
            setIdx((prev) => {
                if (!path) return prev
                if (prev >= path.length - 1) {
                    stopTimer()
                    setState("done")
                    return prev
                }
                return prev + 1
            })
        }, Math.max(10, speedMs))
    }

    function onReset() {
        stopTimer()
        setIdx(0)
        if (path) setState("ready")
        else setState("idle")
    }

    const statusText = (() => {
        switch (state) {
            case "idle":
                return "Pick a start square and compute."
            case "computing":
                return "Computing tour…"
            case "ready":
                return "Tour ready — press Play."
            case "playing":
                return "Playing…"
            case "paused":
                return "Paused."
            case "done":
                return "Completed."
            case "failed":
                return "No tour found (try another start/size)."
            default:
                return ""
        }
    })()

    return (
        <div className="min-h-screen bg-background text-foreground">
            <header className="container mx-auto px-4 py-6">
                <div className="flex flex-wrap items-center justify-between gap-4">
                    <div>
                        <h1 className="text-2xl font-semibold tracking-tight">Knight&apos;s Tour</h1>
                        <p className="text-sm text-muted-foreground">
                            A modern, interactive visualization of Warnsdorff&apos;s heuristic.
                        </p>
                    </div>
                    <Badge className="hidden sm:inline-flex">React • TypeScript • shadcn/ui</Badge>
                </div>
            </header>

            <main className="container mx-auto grid gap-6 px-4 pb-10 lg:grid-cols-3">
                <Card className="lg:col-span-2"> <CardContent className="p-4 sm:p-6">
                    <div className="mb-4 flex items-center justify-between">
                        <Legend /> <Badge variant="outline">{statusText}</Badge>
                    </div>
                    <Chessboard
                        n={n}
                        start={start}
                        onPickStart={onPickStart}
                        path={path ? path.slice(0, idx + 1) : null}
                        currentIndex={idx}
                    /> </CardContent> </Card>

                <div className="space-y-6">
                    <Controls
                        n={n}
                        onSizeChange={setN}
                        speedMs={speedMs}
                        onSpeedChange={setSpeedMs}
                        canPlay={canPlay}
                        playing={state === "playing"}
                        onCompute={onCompute}
                        onPlayPause={onPlayPause}
                        onReset={onReset}
                    />

                    <Card> <CardContent className="space-y-3 p-6 text-sm text-muted-foreground">
                        <p>
                            This demo uses <strong>Warnsdorff&apos;s rule</strong>: always move the knight to the square with the fewest onward moves (lowest degree). On an 8×8 board it’s fast and usually succeeds.
                        </p>
                        <p>
                            How to use: choose a start square, click <em>Compute tour</em>, then <em>Play</em> to animate. Adjust board size and playback speed to explore different paths.
                        </p>
                    </CardContent> </Card>
                </div>
            </main>

            <footer className="container mx-auto px-4 pb-10 text-center text-xs text-muted-foreground">
                Built with ❤️ — if you enjoy it, consider starring the repo.
            </footer>
        </div>
    )
}
