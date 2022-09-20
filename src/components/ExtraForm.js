import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
  const [price, setPrice] = useState(0);

  const { createQuiz } = useAuth();
  //question related states
  const [questions, setQuestions] = useState(0);

  const [isOpenQuestion, setIsOpenQuestion] = useState(false);
  const [openQuestionBtn, setOpenQuestionBtn] = useState(false);
  const [isOpenQuiz, setIsOpenQuiz] = useState(true);
  const [newQuizId,setNewQuizId] = useState();
  const navigate = useNavigate();

  const openQuestionForm = () => {
    if (questions < Number(totalQ)) {
      setIsOpenQuestion(true);
      setOpenQuestionBtn(false);
    } else {
      setIsOpenQuestion(false);
      navigate('/home',{replace:true})
    }
  };

  const fileChange = (e) => {
    setFile(e.target.files[0]);
  };

  async function handleSubmit(e) {
    e.preventDefault();
    openQuestionForm();
      setIsOpenQuiz(false);
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
      retake:Number(retakeNo),
      questionTime: Number(quesTime),
      quizTime: Number(quizTime),
      price:Number(price),
    };
    console.log(dataObject);
    let quizData = new FormData();
    Object.entries(dataObject).map((e) => quizData.append(e[0], e[1]));

    try {
      const res = await createQuiz(quizData);
      console.log(res);
      setNewQuizId(res.id)
      openQuestionForm();
      setIsOpenQuiz(false);
    } catch (error) {
      console.log(error);
    }
  }
  console.log(questions,openQuestionBtn,isOpenQuestion,isOpenQuiz)

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

          <label> Upload Quiz Image (Only pnj/jpg/jpeg file less than 1 mb) </label>
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

          <label>Price</label>
          <TextInput
            type="text"
            required
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
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
            <option value="All Answers">All Answers</option>
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

          <Button type="submit">
            <span>Add Questions</span>
          </Button>

          
        </Form>
      )}

      {openQuestionBtn && (
        <TextInput
          type="button"
          required
          value={questions===Number(totalQ)?"Submit Quiz":"Next Question"}
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
