import React from "react";

function Title(props) {
  // Split the title into sentences using a regex that matches periods, question marks, or exclamation marks
  // followed by optional whitespace, preserving the punctuation
  const sentences = props.title.split(/(?<=[.!?])\s+/).filter((sentence) => sentence.trim() !== "");

  return (
    <div>
      {sentences.map((sentence, index) => (
        <h1
          key={index}
          className="mt-10 scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl text-white drop-shadow-xl"
        >
          {sentence}
        </h1>
      ))}
    </div>
  );
}

export default Title;