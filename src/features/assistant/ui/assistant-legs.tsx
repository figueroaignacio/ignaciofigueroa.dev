/**
 * Two frames of walk and one of sit, all three drawn, only one shown at a time.
 *
 * A walk cycle is cheap at this size: legs apart, legs together, and a body
 * that bobs a pixel between them. Swapping whole frames — rather than animating
 * a rect's x — is what keeps it pixel art instead of a rubber band.
 */
type AssistantLegsProps = {
  /** The walking frames. A bot perched on an edge has no use for them. */
  walk?: boolean;
  /** The seated pose. A bot that never sits down has no use for it. */
  dangle?: boolean;
};

export function AssistantLegs({ walk = true, dangle = true }: AssistantLegsProps) {
  return (
    <>
      {walk && (
        <g className="assistant-legs-walk">
          <g className="assistant-leg-frame">
            <rect x="10" y="24" width="3" height="3" fill="#E8845A" />
            <rect x="19" y="24" width="3" height="3" fill="#E8845A" />
            <rect x="9" y="27" width="4" height="1" fill="#D4704A" />
            <rect x="19" y="27" width="4" height="1" fill="#D4704A" />
          </g>
          <g className="assistant-leg-frame">
            <rect x="12" y="24" width="3" height="3" fill="#E8845A" />
            <rect x="17" y="24" width="3" height="3" fill="#E8845A" />
            <rect x="12" y="27" width="3" height="1" fill="#D4704A" />
            <rect x="17" y="27" width="3" height="1" fill="#D4704A" />
          </g>
        </g>
      )}

      {/* Hanging off the rule, one shoe swinging a pixel behind the other. */}
      {dangle && (
        <g className="assistant-legs-sit">
          <g className="assistant-leg-dangle">
            <rect x="12" y="24" width="3" height="5" fill="#E8845A" />
            <rect x="11" y="29" width="4" height="1" fill="#D4704A" />
          </g>
          <g className="assistant-leg-dangle">
            <rect x="17" y="24" width="3" height="5" fill="#E8845A" />
            <rect x="17" y="29" width="4" height="1" fill="#D4704A" />
          </g>
        </g>
      )}
    </>
  );
}
