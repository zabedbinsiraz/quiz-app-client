import classes from "../styles/Quiz.module.css";
import Button from './Button';

export default function Quiz({ quizType, price, title, image, noq }) {
  return (
    <div className={classes.quiz}>
      <h4>{title}</h4>
      <img src={image} alt={title} />
      <p>{price}</p>
      <div className={classes.qmeta}>
        <p>{noq} Questions</p>
        <p>Total points : {noq * 5}</p>
        <p>{quizType}</p>
      </div>
      <Button>Enroll</Button>
      
    </div>
  );
}
