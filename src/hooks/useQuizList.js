import { useEffect, useState } from "react";

export default function useQuizList() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [quizes, setQuizes] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch("http://localhost:4000/quiz")
      .then((res) => res.json())
      .then((result) => {
        console.log(result.data);
        setQuizes(result.data);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, []);

  return {
    loading,
    error,
    quizes,
  };
}
