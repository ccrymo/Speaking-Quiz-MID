import React from "react";

function Promp(props) {
  return (
    <div className="mt-1">
      <p className="leading-7 ">
        <ul className="my-6 ml-6 list-disc ">
          <li> <h2 className=" ml-5 mt-1 scroll-m-20 pb-1 text-3xl font-semibold tracking-tight transition-colors text-cyan-100">
  
  {props.promps}</h2></li>
        </ul>
      </p>
    </div>
  );
}

export default Promp;