import { useEffect, useState } from "react";

export default function useQuestions(QuizId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/quiz/${QuizId}`)
      .then((res) => res.json())
      .then((result) => {
        setLoading(false);
        setQuiz(result.data);
        console.log(result.data.questions)
        setQuestions(result.data.questions);
      })
      .catch((err) => setError(err));
  }, [QuizId]);

  return {
    loading,
    error,
    questions,
    quiz,
  };
}
