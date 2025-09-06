import { Button } from "../components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../components/ui/select"
import { Slider } from "../components/ui/slider"

type Props = {
    n: number
    onSizeChange: (n: number) => void
    speedMs: number
    onSpeedChange: (ms: number) => void
    canPlay: boolean
    playing: boolean
    onCompute: () => void
    onPlayPause: () => void
    onReset: () => void
}

export default function Controls({
                                     n,
                                     onSizeChange,
                                     speedMs,
                                     onSpeedChange,
                                     canPlay,
                                     playing,
                                     onCompute,
                                     onPlayPause,
                                     onReset,
                                 }: Props) {
    return (
        <Card className="w-full">
            <CardHeader>
                <CardTitle>Controls</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                    {/* Board size */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Board size</label>
                        <Select value={String(n)} onValueChange={(v) => onSizeChange(Number(v))}>
                            <SelectTrigger className="w-full">
                                <SelectValue placeholder="Select size" />
                            </SelectTrigger>
                            <SelectContent>
                                {[5, 6, 7, 8, 9, 10, 11, 12].map((size) => (
                                    <SelectItem key={size} value={String(size)}>
                                        {size} × {size}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Playback speed */}
                    <div className="space-y-2">
                        <label className="text-sm font-medium">Playback speed (ms/step)</label>
                        <Slider
                            value={[speedMs]}
                            min={30}
                            max={600}
                            step={10}
                            onValueChange={(vals) => onSpeedChange(vals[0] ?? speedMs)}
                        />
                        <div className="text-xs text-muted-foreground">{speedMs} ms</div>
                    </div>
                </div>

                <div className="flex flex-wrap gap-2">
                    <Button variant="secondary" onClick={onCompute}>Compute tour</Button>
                    <Button onClick={onPlayPause} disabled={!canPlay}>
                        {playing ? "Pause" : "Play"}
                    </Button>
                    <Button variant="outline" onClick={onReset}>Reset</Button>
                </div>

                <p className="text-xs text-muted-foreground">
                    Tip: click any square to set the starting position before computing.
                </p>
            </CardContent>
        </Card>
    )
}
