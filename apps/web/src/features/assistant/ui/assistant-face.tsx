type AssistantFaceProps = {
  lit?: boolean;
};

export function AssistantFace({ lit = false }: AssistantFaceProps) {
  return (
    <>
      <path fill="#2C1810" d="M5 0h14v4H5ZM3 2h2v4H3Zm16 0h2v4h-2Z" />
      <path fill="#E8845A" d="M3 4h18v14H3Z" />
      <path fill="#D4704A" d="M1 7h2v6H1Zm20 0h2v6h-2Z" />
      <path fill="#E8845A" d="M9 18h6v2H9Z" />
      <path fill="#F5F0E8" d="M3 20h18v4H3ZM1 21h2v3H1Zm20 0h2v3h-2Z" />

      {lit && <rect className="assistant-glow" x="3" y="4" width="18" height="14" fill="#A8E6D7" />}

      <g className="assistant-eyes">
        <g className="assistant-eye">
          <rect x="5" y="8" width="5" height="5" fill="#2C1810" />
          {lit && (
            <rect className="assistant-glint" x="6" y="11" width="3" height="1" fill="#A8E6D7" />
          )}
        </g>
        <g className="assistant-eye">
          <rect x="14" y="8" width="5" height="5" fill="#2C1810" />
          {lit && (
            <rect className="assistant-glint" x="15" y="11" width="3" height="1" fill="#A8E6D7" />
          )}
        </g>
      </g>
    </>
  );
}
