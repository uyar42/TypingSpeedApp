import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { wordsSelector, inputSelector, continues } from "../redux/wordSlice";

function Main() {
  const words = useSelector(wordsSelector);

  const index = useSelector((state) => state.words.index);

  // burda kaldkık

  const dispatch = useDispatch();
  const lang = useSelector((state) => state.words.lang);
  const filtered = useSelector((state) => state.words.filtered);
  // console.log(filtered);
  useEffect(() => {
    if (index > 29) {
      dispatch(continues(true));
    }
  }, [index]);

  return (
    <div className="flex  m-8 justify-center ">
      <div className="p-4 w-3/4  bg-white rounded-xl border-1 shadow-lg py-6 ">
        {words?.map((w, idx) => (
          <span
            className={`
            ${
              w.status === true
                ? "text-green-500 "
                : w.status === false
                ? "text-red-500"
                : "text-black-500"
            }
            ${
              index === idx
                ? filtered.length > 0
                  ? w[lang].includes(filtered)
                    ? "bg-blue-500 rounded-md "
                    : "bg-red-500 rounded-md  "
                  : "bg-gray-200 rounded-md  "
                : ""
            } text-2xl tracking-tighter m-4 p-2 leading-10 `}
            key={w.id}
          >
            {w[lang] + " "}
          </span>
        ))}
      </div>
    </div>
  );
}

export default Main;
