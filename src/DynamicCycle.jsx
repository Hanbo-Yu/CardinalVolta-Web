const parts = [
  { name: "Evaporator", x: 190, y: 112 },
  { name: "Expander + generator", x: 530, y: 112 },
  { name: "Condenser", x: 530, y: 332 },
  { name: "Pump", x: 190, y: 332 },
];
const routes = ["M190 112H530", "M530 112V332", "M530 332H190", "M190 332V112"];
const phases = [
  "Heat enters",
  "Power is generated",
  "Heat is rejected",
  "Fluid returns",
];
export default function DynamicCycle({ active, label, detail }) {
  return (
    <div className={`dynamic-cycle stage-${active}`}>
      <div className="cycle-scene-heading">
        <span>ORGANIC RANKINE CYCLE</span>
        <span>
          Closed loop <i aria-hidden="true" />
        </span>
      </div>
      <svg
        className="cycle-machine"
        viewBox="0 0 720 445"
        fill="none"
        role="img"
        aria-label={`Simplified ORC. Highlighted stage: ${parts[active].name}. Working fluid circulates in a closed loop. Heat input, electrical output and cooling are separate.`}
      >
        <g className="cycle-track">
          {routes.map((d) => (
            <path key={d} d={d} />
          ))}
        </g>
        {routes.map((d, i) => (
          <path
            key={d}
            className={`cycle-fluid fluid-${i} ${active === i ? "fluid-active" : ""}`}
            d={d}
          />
        ))}
        <g
          className={`external-flow external-heat ${active === 0 ? "external-active" : ""}`}
        >
          <path d="M15 112H141" />
          <text x="22" y="86">
            Heat in
          </text>
        </g>
        <g
          className={`external-flow external-power ${active === 1 ? "external-active" : ""}`}
        >
          <path d="M579 112H706" />
          <text x="610" y="86">
            Power out
          </text>
        </g>
        <g
          className={`external-flow external-cooling ${active === 2 ? "external-active" : ""}`}
        >
          <path d="M579 332H706" />
          <text x="607" y="305">
            Heat out
          </text>
        </g>
        {parts.map((part, i) => (
          <g
            className={`machine-part machine-part-${i} ${active === i ? "part-active" : ""}`}
            key={part.name}
            transform={`translate(${part.x} ${part.y})`}
          >
            <circle className="part-aura" r="61" />
            <rect
              className="part-body"
              x="-48"
              y="-45"
              width="96"
              height="90"
              rx={i === 1 || i === 3 ? 45 : 8}
            />
            {i === 0 && (
              <>
                <path className="evaporator-level" d="M-35 26H35" />
                {[-20, 0, 20].map((x, j) => (
                  <path
                    className="evaporator-vapor"
                    key={x}
                    style={{ animationDelay: `${j * -0.5}s` }}
                    d={`M${x} 14c-14-14 14-19 0-35`}
                  />
                ))}
              </>
            )}
            {i === 1 && (
              <g className="machine-rotor">
                <circle r="31" />
                <path d="M0-29 8-8 29 0 8 8 0 29-8 8-29 0-8-8Z" />
                <circle r="6" />
              </g>
            )}
            {i === 2 && (
              <>
                <path
                  className="condenser-coil"
                  d="M-32-23H23a8 8 0 0 1 0 16h-46a8 8 0 0 0 0 16h46a8 8 0 0 1 0 16H-32"
                />
                <circle className="condensate" cx="-25" cy="32" r="3" />
                <circle className="condensate" cx="0" cy="32" r="3" />
                <circle className="condensate" cx="25" cy="32" r="3" />
              </>
            )}
            {i === 3 && (
              <g className="pump-rotor">
                <circle r="29" />
                <path d="M-13-19 22 0-13 19Z" />
              </g>
            )}
            <text className="machine-label" textAnchor="middle" y="82">
              {part.name}
            </text>
            <text className="machine-number" x="-37" y="-62">
              0{i + 1}
            </text>
          </g>
        ))}
        <g className="cycle-center" textAnchor="middle">
          <text x="360" y="215">
            WORKING FLUID
          </text>
          <text className="cycle-phase" x="360" y="240">
            {phases[active]}
          </text>
        </g>
      </svg>
      <div className="dynamic-cycle-caption" key={active}>
        <span>{label}</span>
        <p>{detail}</p>
      </div>
    </div>
  );
}
