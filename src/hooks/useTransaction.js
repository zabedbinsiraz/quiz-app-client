import { useEffect, useState } from "react";

export default function useTransaction(userId) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [transaction, setTransaction] = useState();

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/user/transaction/${userId}`)
      .then((res) => res.json())
      .then((result) => {
        setTransaction(result.data);
        setLoading(false);
      })
      .catch((err) => setError(err));
  }, [userId]);

  return {
    loading,
    error,
    transaction,
  };
}
