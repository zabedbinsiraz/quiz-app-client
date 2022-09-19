import _ from "lodash";
import { useEffect, useReducer, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Answers from "../components/Answers";
import ProgressBar from "../components/ProgressBar";
import { StartQuiz } from "../components/StartQuiz";
import { useAuth } from "../contexts/AuthContext";
import useQuestions from "../hooks/useQuestions";

const initialState = [];

const reducer = (state, action) => {
  switch (action.type) {
    case "questions":
      action.value.forEach((question) => {
        question.options.forEach((option) => {
          option.checked = false;
        });
      });
      return action.value;
    case "answer":
      const questions = _.cloneDeep(state);
      questions[action.questionID].options[action.optionIndex].checked =
        action.value;

      return questions;
    default:
      return state;
  }
};

export default function QuizPage() {
  const { id } = useParams();
  const { loading, error, questions, quiz } = useQuestions(id);
  const [currentQuestion, setCurrentQuestion] = useState(0);

  const [qna, dispatch] = useReducer(reducer, initialState);
  const { currentUser, setQna, setParticipantData } = useAuth();
  const navigate = useNavigate();

  const [retake, setRetake] = useState(0);
  const [ansShow, setAnsShow] = useState("");
  const [isEnroll, setIsEnroll] = useState(false);
  const [payment, setPayment] = useState(0);

  useEffect(() => {
    dispatch({
      type: "questions",
      value: questions,
    });
  }, [questions]);

  function handleAnswerChange(e, index) {
    dispatch({
      type: "answer",
      questionID: currentQuestion,
      optionIndex: index,
      value: e.target.checked,
    });
  }

  const { userId } = currentUser;
  const submitObj = {
    user: userId,
    quiz: id,
    payment: payment,
    quizName: quiz?.quizName,
  };

  function nextQuestion() {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevCurrent) => prevCurrent + 1);
    } else {
      setQna(qna);
      setParticipantData(submitObj);
      navigate(`/result/${id}`, { replace: true });
    }
  }

  // submit quiz
  async function submit() {
    if (ansShow === "retake complete") {
      if (retake > 0) {
        setRetake((r) => r - 1);
        setParticipantData(submitObj);
        navigate(`/retake/${id}`, { replace: true });
      } else {
        setQna(qna);
        setParticipantData(submitObj);
        navigate(`/result/${id}`, { replace: true });
      }
    } else {
      setQna(qna);
      setParticipantData(submitObj);
      navigate(`/result/${id}`, { replace: true });
    }
  }

  // calculate percentage of progress
  const percentage =
    questions.length > 0 ? ((currentQuestion + 1) / questions.length) * 100 : 0;

  return (
    <>
      {isEnroll ? (
        <>
          {loading && <div>Loading ...</div>}
          {error && <div>There was an error!</div>}
          {!loading && !error && qna && qna.length > 0 && (
            <>
              <h1>{qna[currentQuestion]?.question}</h1>
              <h4>Question can have multiple answers</h4>
              <Answers
                input
                options={qna[currentQuestion]?.options}
                handleChange={handleAnswerChange}
                submit={nextQuestion}
              />
              <ProgressBar
                next={nextQuestion}
                progress={percentage}
                submit={submit}
                quiz={quiz}
              />
            </>
          )}
        </>
      ) : (
        <StartQuiz
          setIsEnroll={setIsEnroll}
          setRetake={setRetake}
          setAnsShow={setAnsShow}
          setPayment={setPayment}
          retake={retake}
          ansShow={ansShow}
          quiz={quiz}
        />
      )}
    </>
  );
}
