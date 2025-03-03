import React from "react";

function Title(props) {
  return (
    <div>
      <h1
        className="mt-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white drop-shadow-xl

">
        {props.title}
      </h1>
    </div>
  );
}

export default Title;
