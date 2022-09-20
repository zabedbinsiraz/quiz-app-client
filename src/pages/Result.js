import _ from "lodash";
import { useNavigate, useParams } from "react-router-dom";
import {
  submitParticipant,
  submitTransaction,
  updateTransaction
} from "../contexts/controllers";

import { useEffect, useState } from 'react';
import Analysis from "../components/Analysis";
import Button from "../components/Button";
import Summary from "../components/Summary";
import useQuestions from "../hooks/useQuestions";
import { useAuth } from "./../contexts/AuthContext";

export default function Result() {
  const { id } = useParams();
  const { qna, participantData, setParticipantData, currentUser } = useAuth();
  const navigate = useNavigate();

  const { loading, error, questions, quiz } = useQuestions(id);
  const [transaction,setTransaction] = useState();
  const userId = currentUser.userId;

  function calculate() {
    let score = 0;

    questions.forEach((question, index1) => {
      let correctIndexes = [],
        checkedIndexes = [];

      question.answers.forEach((option, index2) => {
        if (option.correct) correctIndexes.push(index2);
        if (qna[index1].options[index2].checked) {
          checkedIndexes.push(index2);
          option.checked = true;
        }
      });

      if (_.isEqual(correctIndexes, checkedIndexes)) {
        score = score + 5;
      }
    });

    return score;
  }

  useEffect(() => {
    
    fetch(`http://localhost:4000/user/transaction/${userId}`)
      .then((res) => res.json())
      .then((result) => {
        setTransaction(result.data);
        
      })
      .catch((err) => console.log(err));
  }, [userId]);

  const userScore = calculate();

  const participantObj = { ...participantData, marks: userScore };

 async function handleFinish() {
    if (transaction) {
      console.log("inside if");
     await updateTransaction(transaction._id, {
        transaction: transaction.transaction + participantData.payment,
      });
    } else {
    await  submitTransaction(quiz.price, currentUser.userId);
    }
   await submitParticipant(participantObj);
    navigate("/home", { replace: true });
    setParticipantData({});
  }

  return (
    <>
      {loading && <div>Loading...</div>}
      {error && <div>There was an error!</div>}

      {questions && questions.length > 0 && (
        <>
          <Summary score={userScore} noq={questions.length} />
          <Analysis answers={questions} />
          <Button onClick={handleFinish}>Finish Quiz</Button>
        </>
      )}
    </>
  );
}
