import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  start,
  setInputs,
  timeSelector,
  setFiltered,
} from "../redux/wordSlice";
import Footer from "./Footer";

function Input() {
  const [input, setInput] = useState("");
  const lang = useSelector((state) => state.words.lang);

  const isStarted = useSelector((state) => state.words.start);
  const [keyDown, setKeyDown] = useState(0);

  const times = useSelector(timeSelector);

  const dispatch = useDispatch();

  useEffect(() => {
    setInput("");
  }, [lang]);

  useEffect(() => {
    if (times === 0) {
      dispatch(start(false));
    }
  }, [times]);
  const handleInput = (e) => {
    if (isStarted && times > 0) {
      setInput(e.target.value.trim());
      dispatch(setFiltered(e.target.value.trim()));
    }
  };
  const onKeyDownHandler = (e) => {
    if (times > 0) dispatch(start(true));
    e && e.keyCode !== 32 && times > 0 && setKeyDown(keyDown + 1);
    if (e.keyCode === 32) {
      dispatch(setInputs(input));
      setInput("");
    }
  };

  const handleReset = () => {
    setInput("");
  };

  return (
    <div className="justify-content  space-x-4 w-3/9 flex-row flex items-center mx-auto ">
      <input
        tabIndex={1}
        onKeyDown={onKeyDownHandler}
        className=" focus:outline-none  border-black border-2 p-4 rounded-xl text-2xl w-96 mx-auto bg-zinc-400"
        value={input}
        onChange={(e) => handleInput(e)}
      ></input>
      <Footer
        countKeyDown={keyDown}
        isStarted={isStarted}
        handleReset={handleReset}
      />
    </div>
  );
}

export default Input;
