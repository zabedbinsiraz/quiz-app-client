// import useQuizList from "../hooks/useQuizList";
import { useEffect, useState } from "react";
import InfiniteScroll from "react-infinite-scroll-component";
import { Link } from "react-router-dom";
import Quiz from "./Quiz";

export default function AllQuiz() {
  const [quizes, setQuizes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    fetch("http://localhost:4000/quiz/")
      .then((res) => res.json())
      .then((result) => setQuizes(result.data))
      .catch((err) => setError(err));
    setLoading(false);
  }, []);

  let url = "http://localhost:4000/";

  return (
    <div>
      {quizes.length > 0 && (
        <InfiniteScroll dataLength={quizes.length} loader="Loading...">
          {quizes.map((quiz) =>
            Number(quiz.totalQuestion) > 0 ? (
              <Link
                to={{
                  pathname: `/quiz/${quiz._id}`,
                  state: {
                    quizTitle: quiz.quizName,
                  },
                }}
                key={quiz._id}
              >
                <Quiz
                  title={quiz.quizName}
                  id={quiz._id}
                  noq={Number(quiz.totalQuestion)}
                  image={url + quiz.image}
                  quizType={quiz.quizType}
                  price={quiz.price}
                />
              </Link>
            ) : (
              <Quiz
                title={quiz.quizName}
                id={quiz._id}
                noq={Number(quiz.totalQuestion)}
                image={url + quiz.image}
                key={quiz._id}
                quizType={quiz.quizType}
                price={quiz.price}
              />
            )
          )}
        </InfiniteScroll>
      )}
      {!loading && quizes.length === 0 && <div>No data found!</div>}
      {error && <div>There was an error!</div>}
      {loading && <div>Loading...</div>}
    </div>
  );
}
