import Link from "next/link";
import React from "react";

type TButton = {
  text: string;
  to?: string;
  target?: string;
};

export const Button1 = ({ text, to, target }: TButton) => {
  return (
    <>
      {!to ? (
        <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
          <span className="w-48 h-48 rounded rotate-[-40deg] bg-darker absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-dark transition-colors duration-300 ease-in-out group-hover:text-white">
            {text}
          </span>
        </button>
      ) : !target ? (
        <Link
          href={to}
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
        >
          <span className="w-48 h-48 rounded rotate-[-40deg] bg-darker absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-dark transition-colors duration-300 ease-in-out group-hover:text-white">
            {text}
          </span>
        </Link>
      ) : (
        <Link
          href={to}
          target={target}
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
        >
          <span className="w-48 h-48 rounded rotate-[-40deg] bg-darker absolute bottom-0 left-0 -translate-x-full ease-out duration-500 transition-all translate-y-full mb-9 ml-9 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-dark transition-colors duration-300 ease-in-out group-hover:text-white">
            {text}
          </span>
        </Link>
      )}
    </>
  );
};

export const Button2 = ({ text, to, target }: TButton) => {
  return (
    <>
      {!to ? (
        <button className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#15734a] rounded group">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-darker rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="relative">{text}</span>
        </button>
      ) : !target ? (
        <Link
          href={to}
          className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#15734a] rounded group"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-darker rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="relative">{text}</span>
        </Link>
      ) : (
        <Link
          href={to}
          target={target}
          className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#15734a] rounded group"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-darker rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="relative">{text}</span>
        </Link>
      )}
    </>
  );
};

export const Button3 = ({ text, to, target }: TButton) => {
  return (
    <>
      {!to ? (
        <button className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group">
          <span className="w-48 h-48 rounded rotate-[-0deg] bg-primary absolute bottom-0 left-0 -translate-x-full ease-in-out duration-500 transition-all translate-y-full mb-0 ml-0 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-dark transition-colors duration-300 ease-in-out group-hover:text-white">
            {text}
          </span>
        </button>
      ) : !target ? (
        <Link
          href={to}
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
        >
          <span className="w-48 h-48 rounded rotate-[-0deg] bg-primary absolute bottom-0 left-0 -translate-x-full ease-in-out duration-500 transition-all translate-y-full mb-0 ml-0 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-dark transition-colors duration-300 ease-in-out group-hover:text-white">
            {text}
          </span>
        </Link>
      ) : (
        <Link
          href={to}
          target={target}
          className="relative inline-flex items-center justify-start px-6 py-3 overflow-hidden font-medium transition-all bg-white rounded hover:bg-white group"
        >
          <span className="w-48 h-48 rounded rotate-[-0deg] bg-primary absolute bottom-0 left-0 -translate-x-full ease-in-out duration-500 transition-all translate-y-full mb-0 ml-0 group-hover:ml-0 group-hover:mb-32 group-hover:translate-x-0"></span>
          <span className="relative w-full text-left text-dark transition-colors duration-500 ease-in-out group-hover:text-white">
            {text}
          </span>
        </Link>
      )}
    </>
  );
};

export const Button4 = ({ text, to, target }: TButton) => {
  return (
    <>
      {!to ? (
        <button className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#ffd54f] rounded group">
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-darker rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="relative text-primary group-hover:text-white duration-500 ease-in-out">{text}</span>
        </button>
      ) : !target ? (
        <Link
          href={to}
          className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#ffd54f] rounded group"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-darker rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="relative text-primary group-hover:text-white duration-500 ease-in-out">{text}</span>
        </Link>
      ) : (
        <Link
          href={to}
          target={target}
          className="relative inline-flex items-center justify-center px-10 py-3 overflow-hidden font-mono font-medium tracking-tighter text-white bg-[#ffd54f] rounded group"
        >
          <span className="absolute w-0 h-0 transition-all duration-500 ease-out bg-darker rounded-full group-hover:w-56 group-hover:h-56"></span>
          <span className="relative text-primary group-hover:text-white duration-500 ease-in-out">{text}</span>
        </Link>
      )}
    </>
  );
};