import React from "react";
import { useDispatch } from "react-redux";
import { selectLang } from "../redux/wordSlice";

function Header() {
  const dispatch = useDispatch();
  const optionsClass = "bg-white text-lg";
  return (
    <div className="flex p-4  justify-center">
      <select
        className="border rounded-lg p-4 bg-red-100 focus:outline-none hover:object-none  w-3/12  hover:outline-none text-lg font-mono "
        onChange={(e) => dispatch(selectLang(e.target.value))}
      >
        <option className={optionsClass} value={"turkish"}>
          Turkish
        </option>
        <option className={optionsClass} value={"english"}>
          English
        </option>
      </select>
    </div>
  );
}

export default Header;
