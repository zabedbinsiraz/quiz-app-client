import React, { useState } from "react";
import style from "../styles/Form.module.css";
import classes from "../styles/TextInput.module.css";
import { useAuth } from "./../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export const StartQuiz = ({
  setIsEnroll,
  retake,
  ansShow,
  setRetake,
  setAnsShow,
  setPayment,
  quiz,
}) => {
  const { participantData } = useAuth();
  const [isStart, setIsStart] = useState(false);

  function handleSubmit(e) {
    e.preventDefault();

    setIsStart(true);
  }
  function handleBtn() {
    setIsEnroll(true);
    setIsStart(false);
  }
  function handleRetake() {
    setIsStart(true);
  }

  return (
    <div>
      {!isStart ? (
        participantData?.quiz !== quiz?._id ? (
          <Form className={style.form} onSubmit={handleSubmit}>
            <label>When show the quiz answers</label>
            <select
              className={classes.textInput}
              value={ansShow}
              onChange={(e) => setAnsShow(e.target.value)}
            >
              {" "}
              <option value="quiz submit">quiz submit</option>
              <option value="retake complete">retake submit</option>
            </select>
            <label>Choose Your Retake</label>
            <select
              className={classes.textInput}
              value={retake}
              onChange={(e) => setRetake(Number(e.target.value))}
            >
              {" "}
              <option value="0">No</option>
              <option value="1">once</option>
            </select>
            <br />
            <br />
            <br />
            <br />
            <br />
            <br />
            <label>You need to pay $69 to participate this quiz</label>
            <TextInput
              className={classes.textInput}
              type="number"
              required
              value={0}
              onChange={(e) => setPayment(e.target.value)}
            />
            <Button className={style.button} type="submit">
              <span>
                {participantData?.user ? "Take Retake" : "Complete Payment"}
              </span>
            </Button>
          </Form>
        ) : (
          <Button className={style.button} onClick={handleRetake}>
            Take Retake
          </Button>
        )
      ) : (
        <Button className={style.button} onClick={handleBtn}>
          <span>Start Now</span>
        </Button>
      )}
    </div>
  );
};
