import Image from "next/image";
import Footer from "./components/Footer";
import Questions from "./components/Questions";

export default function Home() {
  return (
    <div className="flex flex-col items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 bg-sky-700 ">
     <Questions/>
    </div>
  );
}
