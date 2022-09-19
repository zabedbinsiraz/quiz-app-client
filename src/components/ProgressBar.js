import { useEffect, useRef, useState } from "react";
import classes from "../styles/ProgressBar.module.css";
import Button from "./Button";

export default function ProgressBar({ quiz, next, submit, progress }) {
  const [tooltip, setTooltip] = useState(false);
  const tooltipRef = useRef();
  const [quesTime, setQuesTime] = useState(1);
  const [quizTime, setQuizTime] = useState(10);

  function toggleTooltip() {
    if (tooltip) {
      setTooltip(false);
      tooltipRef.current.style.display = "none";
    } else {
      setTooltip(true);
      tooltipRef.current.style.left = `calc(${progress}% - 65px)`;
      tooltipRef.current.style.display = "block";
    }
  }
  useEffect(() => {
    setQuesTime(quiz?.questionTime);
    const question = setInterval(next, quesTime * 60000);
    return () => clearInterval(question);
  }, [quesTime, next, quiz]);

  useEffect(() => {
    setQuizTime(quiz?.quizTime);
    const quizInterval = setInterval(submit, quizTime * 60000);
    return () => clearInterval(quizInterval);
  }, [quizTime, submit, quiz]);

  const nextHandler = () => {
    next();
    setQuesTime(quesTime);
  };

  return (
    <div className={classes.progressBar}>
      <div className={classes.rangeArea}>
        <div className={classes.tooltip} ref={tooltipRef}>
          {progress}% Complete!
        </div>
        <div className={classes.rangeBody}>
          <div
            className={classes.progress}
            style={{ width: `${progress}%` }}
            onMouseOver={toggleTooltip}
            onMouseOut={toggleTooltip}
          ></div>
        </div>
      </div>
      <Button
        className={classes.next}
        onClick={progress === 100 ? submit : nextHandler}
      >
        <span>{progress === 100 ? "Submit Quiz" : "Next Question"}</span>
        <span className="material-icons-outlined"> arrow_forward </span>
      </Button>
    </div>
  );
}
