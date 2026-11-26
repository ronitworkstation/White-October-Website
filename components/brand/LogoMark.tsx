"use client";

import { useEffect, useRef, useState } from "react";
import { MARK_PATHS, MARK_VIEWBOX } from "./mark-paths";

// The WO mark as inline SVG. With `smileOnView`, the smile is hidden until the mark scrolls into view,
// then swings into place around the ball's centre: the logo literally smiles back at you.
// Ball centre in mark coordinates (from the vector file): x 278.5, y 184.
export function LogoMark({
  tone = "white",
  smileOnView = false,
  className = "",
  style,
  title = "White October",
}: {
  tone?: "white" | "black";
  smileOnView?: boolean;
  className?: string;
  style?: React.CSSProperties;
  title?: string;
}) {
  const ref = useRef<SVGSVGElement>(null);
  const [smiling, setSmiling] = useState(!smileOnView);

  useEffect(() => {
    if (!smileOnView || !ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) setSmiling(true);
      },
      { threshold: 0.35 },
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, [smileOnView]);

  const fill = tone === "white" ? "#ffffff" : "#0e0e0e";
  return (
    <svg ref={ref} viewBox={MARK_VIEWBOX} role="img" aria-label={title} className={className} style={style}>
      <path fill={fill} fillRule="evenodd" d={MARK_PATHS.square} />
      <path fill={fill} fillRule="evenodd" d={MARK_PATHS.ball} />
      {/* The ball has the smile cut out of it; this patch keeps it whole until the smile arrives. */}
      <g style={{ opacity: smiling ? 0 : 1, transition: "opacity 0.3s ease 0.5s" }}>
        {MARK_PATHS.smile.map((d, i) => (
          <path key={i} fill={fill} fillRule="evenodd" d={d} />
        ))}
      </g>
      <g
        style={{
          transformBox: "view-box",
          transformOrigin: "278.5px 184px",
          transform: smiling ? "rotate(0deg)" : "rotate(-70deg)",
          opacity: smiling ? 1 : 0,
          transition: "transform 1.1s cubic-bezier(0.34, 1.56, 0.64, 1) 0.15s, opacity 0.4s ease 0.15s",
        }}
      >
        {MARK_PATHS.smile.map((d, i) => (
          <path key={i} fill="#ff7200" fillRule="evenodd" d={d} />
        ))}
      </g>
    </svg>
  );
}
