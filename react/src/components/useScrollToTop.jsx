import { useEffect } from "react";

const useScrollToTop = () => {
  useEffect(() => {
    const handleScrollToTop = () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    };
    window.addEventListener("scrollToTop", handleScrollToTop);
    return () => {
      window.removeEventListener("scrollToTop", handleScrollToTop);
    };
  }, []);
};
export default useScrollToTop;
