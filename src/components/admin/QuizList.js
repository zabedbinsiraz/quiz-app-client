import React, { useState } from "react";
import { deleteQuiz, updateQuiz } from "../../contexts/controllers";
import useQuizList from "../../hooks/useQuizList";
import classes from "../../styles/Users.module.css";
import Button from "../Button";
import Form from "../Form";
import TextInput from "../TextInput";
import useQuiz from "./../../hooks/useQuiz";

export const QuizList = () => {
  const { quizes } = useQuizList();
  const [id, setId] = useState();
  const { quiz } = useQuiz(id);
  const [isUpdate, setIsUpdate] = useState(false);

  const [quizName, setQuizName] = useState(quiz?.quizName);
  const [type, setType] = useState(quiz?.type);
  const [ansShow, setAnsShow] = useState(quiz?.ansShow);
  const [retakeNo, setRetakeNo] = useState(quiz?.retake);
  const [quesTime, setQuesTime] = useState(quiz?.questionTime);
  const [quizTime, setQuizTime] = useState(quiz?.quizTime);

  function editQuiz(id) {
    setId(id);
    setIsUpdate(true);
  }

  function deleteSingleQuiz(id) {
    deleteQuiz(id);
  }

  function handleSubmit() {
    const dataObject = {
      quizName: quizName,
      quizType: type,
      ansShow: ansShow,
      retake: Number(retakeNo),
      questionTime: Number(quesTime),
      quizTime: Number(quizTime),
    };
    updateQuiz(id, dataObject);

    setIsUpdate(false);
  }
  return (
    <>
      <div className={classes.manageUserContainer}>
        <div className={classes.title}>
          <h2>Manage Quizzes</h2>
        </div>

        <div className={classes.usersTable}>
          <table>
            <thead>
              <tr>
                <th>Quiz Tittle</th>
                <th>Quiz Type</th>
                <th>Delete</th>
                <th>Update Settings</th>
              </tr>
            </thead>
            <tbody>
              {/* akhane map kre data patanu hbe */}
              {quizes.map((quiz) => {
                return (
                  <tr key={quiz._id}>
                    <td className={classes.name}>
                      <span>{quiz.quizName}</span>
                    </td>
                    <td style={{ color: "white" }}>{quiz.quizType}</td>
                    <td>
                      <Button onClick={() => deleteSingleQuiz(quiz._id)}>
                        Delete
                      </Button>
                    </td>
                    <td>
                      <Button
                        style={{ marginLeft: "100px" }}
                        onClick={() => editQuiz(quiz._id)}
                      >
                        settings
                      </Button>
                    </td>
                  </tr>
                );
              })}

              {/* akhane map ses hbe */}
            </tbody>
          </table>
          {isUpdate && (
            <div
              style={{
                background: "white",
                padding: "10px",
                borderRadius: "5px",
              }}
            >
              <Form onSubmit={handleSubmit}>
                <label>Quiz Title</label>
                <TextInput
                  type="text"
                  placeholder="write quiz title"
                  required
                  value={quizName}
                  onChange={(e) => setQuizName(e.target.value)}
                />

                <label>Quiz Type</label>
                <select
                  className={classes.textInput}
                  value={type}
                  onChange={(e) => setType(e.target.value)}
                >
                  {" "}
                  <option value="free">Free</option>
                  <option value="paid">Paid</option>
                </select>

                <label>Total Questions</label>

                <label>When will show answers</label>
                <select
                  className={classes.textInput}
                  value={ansShow}
                  onChange={(e) => setAnsShow(e.target.value)}
                >
                  {" "}
                  <option value="quiz submit">quiz submit</option>
                  <option value="retake complete">retake submit</option>
                </select>

                <label>Retake Number</label>
                <TextInput
                  type="text"
                  required
                  placeholder="Retake Number"
                  value={retakeNo}
                  onChange={(e) => setRetakeNo(e.target.value)}
                />
                <label>Per Question Time (mins)</label>
                <TextInput
                  type="text"
                  required
                  placeholder="per question time"
                  value={quesTime}
                  onChange={(e) => setQuesTime(e.target.value)}
                />
                <label>Quiz Time (mins)</label>
                <TextInput
                  type="text"
                  required
                  placeholder="quiz time"
                  value={quizTime}
                  onChange={(e) => setQuizTime(e.target.value)}
                />

                <Button type="submit">
                  <span>Update Settings</span>
                </Button>
              </Form>
            </div>
          )}
        </div>
      </div>
    </>
  );
};
