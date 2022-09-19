import React, { useState } from "react";
import { deleteQuiz, updateQuiz } from "../../contexts/controllers";
import classes from "../../styles/Users.module.css";
import Button from "../Button";
import Form from "../Form";
import TextInput from "../TextInput";

export const QuizList = () => {
  const [quizes, setQuizes] = useState([]);
  const [id, setId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);

  const [quizName, setQuizName] = useState();
  const [type, setType] = useState();
  const [ansShow, setAnsShow] = useState();
  const [retakeNo, setRetakeNo] = useState();
  const [quesTime, setQuesTime] = useState();
  const [quizTime, setQuizTime] = useState();

  function quizList() {
    fetch("http://localhost:4000/quiz")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setQuizes(result.data);
      })
      .catch((err) => console.log(err));
  }
  quizList();

  function editQuiz(id) {
    setIsUpdate(true);
    fetch(`http://localhost:4000/quiz/${id}`)
      .then((res) => res.json())
      .then((result) => {
        setQuizName(result.data.quizName);
        setType(result.data.quizType);
        setAnsShow(result.data.ansShow);
        setRetakeNo(result.data.retake);
        setQuesTime(result.data.questionTime);
        setQuizTime(result.data.quizTime);
        setId(result.data._id);
      })
      .catch((err) => console.log(err));
  }

  function deleteSingleQuiz(id) {
    deleteQuiz(id);
    quizList();
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
