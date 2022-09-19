import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import classes from "../styles/TextInput.module.css";
import { useAuth } from "./../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import { QuestionForm } from "./QuestionForm";
import TextInput from "./TextInput";

export default function ExtraForm() {
  const [quizName, setQuizName] = useState("");
  const [desc, setDesc] = useState("");
  const [file, setFile] = useState();
  const [type, setType] = useState("free");
  const [totalQ, setTotalQ] = useState(5);
  const [subSystem, setSubSystem] = useState("All Answers");
  const [ansShow, setAnsShow] = useState("retake complete");
  const [retakeNo, setRetakeNo] = useState(1);
  const [quesTime, setQuesTime] = useState(1);
  const [quizTime, setQuizTime] = useState(5);
  const [newQuizId, setNewQuizId] = useState();

  const { createQuiz, error, loading } = useAuth();
  //question related states
  const [questions, setQuestions] = useState(0);

  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [openQuestionBtn, setOpenQuestionBtn] = useState(false);
  const [isOpenQuiz, setIsOpenQuiz] = useState(true);

  const openQuestionForm = () => {
    if (questions < Number(totalQ)) {
      setIsOpenQuestion(true);
    } else {
      setIsOpenQuestion(false);
    }
  };

  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    console.log(subSystem, type);
    const dataObject = {
      id: uuidv4(),
      quizName: quizName,
      description: desc,
      image: file,
      quizType: type,
      totalQuestion: Number(totalQ),
      submitSystem: subSystem,
      ansShow: ansShow,
      retake: Number(retakeNo),
      questionTime: Number(quesTime),
      quizTime: Number(quizTime),
    };
    let quizData = new FormData();
    Object.entries(dataObject).map((e) => quizData.append(e[0], e[1]));

    try {
      const res = await createQuiz(quizData);

      setNewQuizId(res.id);
      console.log(res.id, res.message);
      openQuestionForm();
      setIsOpenQuiz(false);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <>
      {isOpenQuiz && (
        <Form onSubmit={handleSubmit}>
          <label>Quiz Title</label>
          <TextInput
            type="text"
            placeholder="write quiz title"
            required
            value={quizName}
            onChange={(e) => setQuizName(e.target.value)}
          />

          <label>Description</label>
          <TextInput
            type="text"
            required
            placeholder="Quiz description here..."
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
          />

          <label> Upload Quiz Image (Only pnj/jpg/jpeg) </label>
          <TextInput required type="file" name="image" onChange={fileChange} />

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
          <TextInput
            type="text"
            required
            placeholder="Total question"
            value={totalQ}
            onChange={(e) => setTotalQ(e.target.value)}
          />
          <label>Question Submit System</label>
          <select
            className={classes.textInput}
            value={subSystem}
            onChange={(e) => setSubSystem(e.target.value)}
          >
            {" "}
            <option value="Single Answer">Single Answer</option>
            <option value="All Answer">All Answers</option>
          </select>
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

          <Button disabled={loading} type="submit">
            <span>Add Questions</span>
          </Button>

          {error && <p className="error">{error}</p>}
        </Form>
      )}

      {openQuestionBtn && (
        <TextInput
          type="button"
          required
          value="Add Question"
          onClick={() => openQuestionForm()}
        />
      )}
      {isOpenQuestion && (
        <QuestionForm
          setOpenQuestionBtn={setOpenQuestionBtn}
          setIsOpenQuestion={setIsOpenQuestion}
          setQuestions={setQuestions}
          id={newQuizId}
        />
      )}
    </>
  );
}
