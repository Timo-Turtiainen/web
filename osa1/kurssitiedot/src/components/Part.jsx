import React from "react";

function Part({ part, key }) {
  return (
    <div key={key}>
      {part.name} : {part.exercises}
    </div>
  );
}

export default Part;
