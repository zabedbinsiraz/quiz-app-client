import { useEffect, useState } from "react";

export default function useQuestions(QuizId) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [quiz, setQuiz] = useState({});

  useEffect(() => {
    setError(false);
    setLoading(true);
    fetch(`http://localhost:4000/quiz/${QuizId}`)
      .then((res) => res.json())
      .then((data) => {
        setLoading(false);
        console.log(data);
        setQuiz(data.results);
        setQuestions(data.results.questions);
      })
      .catch((err) => setError(true));
  }, [QuizId]);

  return {
    loading,
    error,
    questions,
    quiz,
  };
}
