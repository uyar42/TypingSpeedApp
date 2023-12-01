import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { timeSelector, continues, countdown, start } from "../redux/wordSlice";
import Stats from "./Stats";

function Footer({ isStarted, handleReset, countKeyDown }) {
  const times = useSelector(timeSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isStarted) {
      const timer = times > 0 && setInterval(() => dispatch(countdown()), 1000);

      return () => clearInterval(timer);
    }
  }, [isStarted]);

  const handleResetButton = () => {
    handleReset();
    dispatch(continues());
  };

  return (
    <div className="flex flex-row space-x-8 justify-center items-center ">
      <button
        className={`${times === 0 && "animate-bounce"}
          p-4 m-4 border-black border-2   bg-yellow-400 rounded-md hover:bg-yellow-500 text-lg font-semibold font-mono active:bg-yellow-600`}
        onClick={() => handleResetButton()}
      >
        Reset
      </button>
      <div
        className={`${
          times < 5
            ? "bg-red-700"
            : times < 10
            ? "bg-red-500"
            : times < 25
            ? "bg-orange-500"
            : "bg-cyan-600"
        } border-black border-2 text-3xl p-1 rounded-md font-mono text-center w-14`}
      >
        {times}
      </div>
      <>{times === 0 && <Stats countKeyDown={countKeyDown}></Stats>}</>
    </div>
  );
}

export default Footer;
