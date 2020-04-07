import React from "react";


function DrawingLine({ line }) {
  const pathData = "M " + 
    line
    .map(p => p.get("x") + " " + p.get("y"))
    .join(" L ");

    return <path className="path" d={pathData} />;
}

function Drawing({ lines }) {
  return (
    <svg className="drawing">
      { lines.map((line, ndx) => <DrawingLine key={ndx} line={line} />) }
    </svg>
  );
}


export default Drawing;