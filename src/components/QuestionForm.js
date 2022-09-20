import React, { useState } from "react";
import classes from "../styles/TextInput.module.css";
import { useAuth } from "./../contexts/AuthContext";
import Button from "./Button";
import Form from "./Form";
import TextInput from "./TextInput";

export const QuestionForm = ({
  setQuestions,
  setIsOpenQuestion,
  setOpenQuestionBtn,
  id,
}) => {
  const { createQuestion } = useAuth();
  const [question, setQuestion] = useState("");
  const [totalOptions, setTotalOptions] = useState(1);
  const [option1, setOption1] = useState();
  const [option2, setOption2] = useState();
  const [option3, setOption3] = useState();
  const [option4, setOption4] = useState();
  const [option5, setOption5] = useState();
  const [option6, setOption6] = useState();

  const [totalAnswer, setTotalAnswer] = useState(1);
  const [answer1, setAnswer1] = useState();
  const [answer2, setAnswer2] = useState();
  const [answer3, setAnswer3] = useState();

  function outAll(){
    setQuestions((q) => q + 1);
      setIsOpenQuestion(false);
      setOpenQuestionBtn(true);
  }
  async function handleQuestion(e) {
    e.preventDefault();
   

    const arr1 = [
      { title: option1 },
      { title: option2 },
      { title: option3 },
      { title: option4 },
      { title: option5 },
      { title: option6 },
    ];
    if (arr1.length) {
      setOption1("");
      setOption2("");
      setOption3("");
      setOption4("");
      setOption5("");
      setOption6("");
    }
    const arr2 = [answer1, answer2, answer3];
    if (arr2.length) {
      setAnswer1("");
      setAnswer2("");
      setAnswer3("");
    }

    arr1.length = Number(totalOptions);
    arr2.length = Number(totalAnswer);

    const ansArr = arr1.map((a) => {
      if (arr2.includes(a.title)) {
        return { ...a, correct: true };
      } else {
        return { ...a, correct: false };
      }
    });

    let questionObj = {
      question: question,
      totalOptions: totalOptions,
      options: arr1,
      totalAnswers: totalAnswer,
      answers: ansArr,
      id: id,
    };
    console.log(questionObj);

    try {
      const res = await createQuestion(questionObj);
      console.log(res.message);
      outAll();
      
    } catch (error) {
      console.log(error);
    }
  }
  return (
    <Form style={{ width: "800px" }} onSubmit={handleQuestion}>
      <label>Question Add Here</label>
      <TextInput
        type="text"
        required
        placeholder="question type here.."
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
      />
      <label>Total options</label>
      <select
        className={classes.textInput}
        value={totalOptions}
        onChange={(e) => setTotalOptions(e.target.value)}
      >
        {" "}
        <option value="0">0</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
      </select>

      <label>Option 1</label>
      <TextInput
        type="text"
        required
        placeholder="option1"
        value={option1}
        onChange={(e) => setOption1(e.target.value)}
      />
      <label>Option 2</label>
      <TextInput
        type="text"
        required
        placeholder="option2"
        value={option2}
        onChange={(e) => setOption2(e.target.value)}
      />
      <label>Option 3</label>
      <TextInput
        type="text"
        placeholder="option3"
        value={option3}
        onChange={(e) => setOption3(e.target.value)}
      />
      <label>Option 4</label>
      <TextInput
        type="text"
        placeholder="option4"
        value={option4}
        onChange={(e) => setOption4(e.target.value)}
      />
      <label>Option 5</label>
      <TextInput
        type="text"
        placeholder="option5"
        value={option5}
        onChange={(e) => setOption5(e.target.value)}
      />
      <label>Option 6</label>
      <TextInput
        type="text"
        placeholder="option6"
        value={option6}
        onChange={(e) => setOption6(e.target.value)}
      />

      <label>Total Answers</label>
      <select
        className={classes.textInput}
        value={totalAnswer}
        onChange={(e) => setTotalAnswer(e.target.value)}
      >
        {" "}
        <option value="0">0</option>
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
      </select>

      <label>Answer 1</label>
      <TextInput
        type="text"
        required
        placeholder="answer 1"
        value={answer1}
        onChange={(e) => setAnswer1(e.target.value)}
      />
      <label>Answer 2</label>
      <TextInput
        type="text"
        placeholder="answer 2"
        value={answer2}
        onChange={(e) => setAnswer2(e.target.value)}
      />
      <label>Answer 3</label>
      <TextInput
        type="text"
        placeholder="answer 3"
        value={answer3}
        onChange={(e) => setAnswer3(e.target.value)}
      />

      <Button type="submit">
        <span>Add Quiz</span>
      </Button>
    </Form>
  );
};
