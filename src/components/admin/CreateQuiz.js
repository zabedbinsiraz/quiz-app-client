import React from "react";
import classes from "../../styles/Users.module.css";
import ExtraForm from "../ExtraForm";

export const CreateQuiz = () => {
  return (
    <div
      style={{ background: "#00b3bd" }}
      className={classes.manageUserContainer}
    >
      <div className={classes.title}>
        <h2>Create Quiz</h2>
      </div>
      <ExtraForm />
    </div>
  );
};
