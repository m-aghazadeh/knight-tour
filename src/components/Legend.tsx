import { Badge } from "../components/ui/badge"

export default function Legend() {
    const Item = ({ color, label }: { color: string; label: string }) => (
        <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-sm border border-black/20" style={{ background: color }} />
            <span className="text-xs text-muted-foreground">{label}</span>
        </div>
    )

    return (
        <div className="flex flex-wrap items-center gap-3">
            <Badge variant="outline" className="gap-2">
                <Item color="#ffd54f" label="Start" />
            </Badge>
            <Badge variant="outline" className="gap-2">
                <Item color="#a5d6a7" label="Visited" />
            </Badge>
            <Badge variant="outline" className="gap-2">
                <Item color="#ef9a9a" label="Current" />
            </Badge>
            <Badge variant="outline" className="gap-2">
                <Item color="#eeeeee" label="Unvisited" />
            </Badge>
        </div>
    )
}
