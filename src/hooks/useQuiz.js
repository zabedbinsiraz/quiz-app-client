import { useEffect, useState } from "react";

export default function useQuiz(id) {
  const [quiz, setQuiz] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:4000/quiz/${id}`)
      .then((res) => res.json())
      .then((result) => setQuiz(result.data))
      .catch((err) => console.log(err));
  }, [id]);

  return {
    quiz,
  };
}
