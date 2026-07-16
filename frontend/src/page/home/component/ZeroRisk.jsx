import { useEffect, useState } from "react";
import "./ZeroRisk.css";
export const ZeroRisk = () => {
  const text = "Zero Risk";
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    let timeout;

    if (!isDeleting && displayText.length < text.length) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length + 1));
      }, 150);
    } else if (!isDeleting && displayText.length === text.length) {
      timeout = setTimeout(() => {
        setIsDeleting(true);
      }, 1500); // pause after typing
    } else if (isDeleting && displayText.length > 0) {
      timeout = setTimeout(() => {
        setDisplayText(text.slice(0, displayText.length - 1));
      }, 100);
    } else {
      timeout = setTimeout(() => {
        setIsDeleting(false);
      }, 500);
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting]);

  return (
    <div className="mt-5">
      <h1 className="hero">Master the Stock Market</h1>
      <h1 className="hero">
        {" "}
        with {""}
        <span className="text" id="zero">
          {displayText}
        </span>
        <span className="cursor">|</span>
      </h1>
    </div>
  );
};
