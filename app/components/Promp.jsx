import React from "react";

function Promp(props) {
  return (
    <div className="mt-1">
      <p className="leading-7">
        <ul className="my-6 ml-6">
          <li>
            <h2 className="ml-5 scroll-m-20 text-2xl font-semibold tracking-tight transition-colors text-cyan-100 no-underline-on-hover">
              {props.promps}
            </h2>
          </li>
        </ul>
      </p>
    </div>
  );
}

export default Promp;
