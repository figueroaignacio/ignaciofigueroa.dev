/**
 * The laptop, its screen, and the hands on it — drawn once for every scene the
 * bot works in. It sits on a 32-wide grid with the keyboard at y25, so a body
 * whose shoulders end there gets it right on the lap.
 */
export function AssistantLaptop() {
  return (
    <g className="assistant-laptop">
      <g className="assistant-lid">
        <rect x="8" y="17" width="16" height="8" fill="#2C1810" />
        <rect className="assistant-screen" x="9" y="18" width="14" height="6" fill="#14201F" />
        <g className="assistant-code">
          <rect className="assistant-code-line" x="10" y="19" width="9" height="1" fill="#A8E6D7" />
          <rect className="assistant-code-line" x="12" y="21" width="6" height="1" fill="#E8845A" />
          <rect
            className="assistant-code-line"
            x="10"
            y="23"
            width="10"
            height="1"
            fill="#A8E6D7"
          />
          <rect className="assistant-caret" x="21" y="23" width="1" height="1" fill="#F5F0E8" />
        </g>
      </g>

      <rect x="6" y="25" width="20" height="3" fill="#2C1810" />
      <rect x="8" y="26" width="16" height="1" fill="#D4704A" />
      <rect x="5" y="27" width="22" height="1" fill="#D4704A" />

      <g className="assistant-hands">
        <g className="assistant-hand">
          <rect x="9" y="25" width="4" height="2" fill="#E8845A" />
          <rect x="9" y="25" width="4" height="1" fill="#D4704A" />
        </g>
        <g className="assistant-hand">
          <rect x="19" y="25" width="4" height="2" fill="#E8845A" />
          <rect x="19" y="25" width="4" height="1" fill="#D4704A" />
        </g>
      </g>
    </g>
  );
}
