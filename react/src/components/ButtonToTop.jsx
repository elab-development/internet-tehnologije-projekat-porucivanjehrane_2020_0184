import React from "react";
import { FaArrowTurnUp } from "react-icons/fa6";
import useScrollToTop from "./useScrollToTop";

function ButtonToTop() {
  useScrollToTop();
  return (
    <div
      className="button-ToTop"
      onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
    >
      <FaArrowTurnUp />
    </div>
  );
}

export default ButtonToTop;
