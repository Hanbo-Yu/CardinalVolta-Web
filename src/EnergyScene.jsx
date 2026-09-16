function Scene({ mobile = false }) {
  const source = mobile ? [100, 100] : [130, 165];
  const recovery = mobile ? [100, 350] : [535, 165];
  const output = mobile ? [310, 350] : [875, 165];
  const sourcePath = mobile ? "M100 158V215" : "M202 165H320";
  const recoveryPath = mobile ? "M100 215V288" : "M320 165H473";
  const releasePath = mobile
    ? "M100 215H260Q310 215 310 165V85"
    : "M320 165V288Q320 320 354 320H900";
  const powerPath = mobile ? "M162 350H264" : "M597 165H830";
  return (
    <svg
      className={
        mobile
          ? "energy-drawing energy-mobile"
          : "energy-drawing energy-desktop"
      }
      viewBox={mobile ? "0 0 420 530" : "0 0 1040 405"}
      fill="none"
      aria-hidden="true"
    >
      <g className="energy-guides">
        <path d={sourcePath} />
        <path d={recoveryPath} />
        <path d={releasePath} />
        <path d={powerPath} />
      </g>
      <path className="energy-stream heat-stream" d={sourcePath} />
      <path
        className="energy-stream heat-stream recovery-stream"
        d={recoveryPath}
      />
      <path className="energy-stream release-stream" d={releasePath} />
      <path className="energy-stream power-stream" d={powerPath} />
      <g transform={`translate(${source.join(" ")})`}>
        <rect
          className="source-frame"
          x="-72"
          y="-58"
          width="144"
          height="116"
          rx="2"
        />
        {[-40, -20, 0, 20, 40].map((x, i) => (
          <path
            key={x}
            className="source-wave"
            style={{ animationDelay: `${i * -0.35}s` }}
            d={`M${x} 32c-20-22 20-40 0-64`}
          />
        ))}
        <text className="energy-label" y="-84" textAnchor="middle">
          Industrial process
        </text>
        <text className="energy-sub" y="86" textAnchor="middle">
          Heat source
        </text>
      </g>
      <g
        className="converter-node"
        transform={`translate(${recovery.join(" ")})`}
      >
        <rect
          className="converter-frame"
          x="-62"
          y="-62"
          width="124"
          height="124"
          rx="62"
        />
        <g className="converter-rotor">
          <circle r="34" />
          <path d="M0-34 10-10 34 0 10 10 0 34-10 10-34 0-10-10Z" />
          <circle r="8" />
        </g>
        <text className="energy-label" y="-84" textAnchor="middle">
          Heat recovery
        </text>
        <text className="energy-sub" y="90" textAnchor="middle">
          Conversion
        </text>
      </g>
      <g className="output-node" transform={`translate(${output.join(" ")})`}>
        <circle className="power-halo" r="57" />
        <circle className="power-disc" r="44" />
        <path className="power-bolt" d="m4-24-20 28H0l-4 22L19-4H3Z" />
        <text className="energy-label" y="-84" textAnchor="middle">
          Electricity
        </text>
        <text className="energy-sub" y="90" textAnchor="middle">
          Useful output
        </text>
      </g>
      <g
        className="release-label"
        transform={mobile ? "translate(310 85)" : "translate(900 320)"}
      >
        <circle r="5" />
        <text
          className="energy-sub"
          x={mobile ? 0 : -5}
          y={mobile ? -30 : 34}
          textAnchor={mobile ? "middle" : "end"}
        >
          Heat released
        </text>
      </g>
      <text
        className="heat-route-label energy-sub"
        x={mobile ? 119 : 290}
        y={mobile ? 239 : 137}
      >
        Waste heat
      </text>
    </svg>
  );
}
export default function EnergyScene({ recovery }) {
  return (
    <div
      className={`energy-canvas ${recovery ? "with-recovery" : "without-recovery"}`}
      role="img"
      aria-label={
        recovery
          ? "Some industrial waste heat is recovered to generate electricity. Remaining heat is released. Illustrative, not to scale."
          : "Industrial waste heat is released without generating electricity."
      }
    >
      <Scene />
      <Scene mobile />
    </div>
  );
}
