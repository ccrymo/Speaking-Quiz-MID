"use client";

import React, { useState } from "react";
import questions from "../questions/questions.json";
import Title from "./Title";
import Promp from "./Promp";
import { Button } from "@/components/ui/button";
import Timer from "./Timer";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function ButtonWithIcon(props) {
  return (
    <Button onClick={props.onClick} variant="secondary" className="w-full h-16">
      <p className="text-lg pt-6 pb-6">{props.text}</p>
    </Button>
  );
}

function SpeakingQuestions() {
  const [randomIndex, setRandomIndex] = useState(0);
  const [resetTimer, setResetTimer] = useState(false);

  const handleRandomIndex = () => {
    setResetTimer(true); // Set resetTimer to true to indicate reset is needed
    setRandomIndex(
      Math.floor(Math.random() * questions.speaking_points.length)
    );
  };

  const { instructions, prompts } = questions.speaking_points[randomIndex];

  return (
    <div className="mx-20 mt-16">
      <Title title={instructions} />
      <div className="mt-20 flex flex-row items-center justify-between">
        <ButtonWithIcon
          onClick={handleRandomIndex}
          text={
            <Timer reset={resetTimer} onResetComplete={handleRandomIndex} />
          }
        />
      </div>
      <Accordion type="single" collapsible className="w-full mt-6">
        <AccordionItem value="item-3">
          <AccordionTrigger>
            <h2 className=" ml-5 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-cyan-100">
              Prompt 1
            </h2>
          </AccordionTrigger>
          <AccordionContent>
            <Promp promps={prompts[0]} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Accordion type="single" collapsible className="w-full">
        <AccordionItem value="item-1">
          <AccordionTrigger>
            <h3 className="ml-5 mt-10 scroll-m-20 pb-2 text-3xl font-semibold tracking-tight transition-colors first:mt-0 text-cyan-100">
              Prompt 2
            </h3>
          </AccordionTrigger>
          <AccordionContent>
            <Promp promps={prompts[1]} />
          </AccordionContent>
        </AccordionItem>
      </Accordion>
    </div>
  );
}

export default SpeakingQuestions;
