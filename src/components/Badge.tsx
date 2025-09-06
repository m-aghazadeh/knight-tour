import React from "react";

export default function Badge({ children }: { children: React.ReactNode }) {
    return (
        <span
            style={{
                padding: "0.2rem 0.6rem",
                borderRadius: "999px",
                fontSize: 12,
                border: "1px solid rgba(0,0,0,0.12)",
                background: "rgba(0,0,0,0.04)",
            }}
        >
      {children}
    </span>
    );
}
