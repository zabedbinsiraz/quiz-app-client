// // import { useState } from "react";
// // import { useNavigate } from "react-router-dom";
// // import { useAuth } from "../contexts/AuthContext";
// // import Button from "./Button";
// // import Form from "./Form";
// // import TextInput from "./TextInput";

// // export default function QuizForm() {
// //   const [quizName, setQuizName] = useState("");
// //   const [desc, setDesc] = useState("");
// //   const [file, setFile] = useState();

// //   const [error, setError] = useState();
// //   const [loading, setLoading] = useState();

// //   const { createQuiz } = useAuth();
// //   const navigate = useNavigate();

// //   const fileChange = (e) => {
// //     setFile(e.target.files[0]);
// //   };

// //   async function handleSubmit(e) {
// //     e.preventDefault();
// //     // do validation

// //     // Create an object of formData
// //     let quizData = new FormData();
// //     quizData.append("quizName", quizName);
// //     quizData.append("description", desc);
// //     quizData.append("image", file);

// //     try {
// //       setError("");
// //       setLoading(true);
// //       const result = await createQuiz(quizData);
// //       if (result.errors) {
// //         setError("Failed to create quiz!");
// //         setLoading(false);
// //       } else {
// //         // console.log(result);
// //         setLoading(false);
// //         console.log(result);
// //         navigate("/admin", { replace: true });
// //       }
// //     } catch (err) {
// //       // console.log(err);
// //       setError("Failed to create quiz!");
// //       setLoading(false);
// //     }
// //   }

// //   return (
// //     <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
// //       <TextInput
// //         type="text"
// //         placeholder="Enter name"
// //         icon="person"
// //         required
// //         value={quizName}
// //         onChange={(e) => setQuizName(e.target.value)}
// //       />

// //       <TextInput
// //         type="text"
// //         required
// //         placeholder="Write quiz description"
// //         icon="alternate_email"
// //         value={desc}
// //         onChange={(e) => setDesc(e.target.value)}
// //       />
// //       <TextInput type="file" name="image" onChange={fileChange} />

// //       <Button disabled={loading} type="submit">
// //         <span>Submit Now</span>
// //       </Button>

// //       {error && <p className="error">{error}</p>}
// //     </Form>
// //   );
// // }

// import React, { useReducer, useState } from "react";
// import classes from "../styles/TextInput.module.css";
// import { useAuth } from "./../contexts/AuthContext";
// import Button from "./Button";
// import Checkbox from "./Checkbox";
// import Form from "./Form";
// import TextInput from "./TextInput";

// const initialState = [];

// const reducer = (state, action) => {
//   switch (action.type) {
//     case "answer":
//       action.options[action.optionIndex].checked = action.value;

//       return action.options;
//     default:
//       return state;
//   }
// };

// export  const QuizForm = () => {
//   const { createQuestion } = useAuth();
//   const [question, setQuestion] = useState("");
//   const [totalOptions, setTotalOptions] = useState(1);
//   const [option1, setOption1] = useState();
//   const [option2, setOption2] = useState();
//   const [option3, setOption3] = useState();
//   const [option4, setOption4] = useState();
//   const [option5, setOption5] = useState();
//   const [option6, setOption6] = useState();

//   const [totalAnswer, setTotalAnswer] = useState(1);
//   // const [answer1, setAnswer1] = useState();
//   // const [answer2, setAnswer2] = useState();
//   // const [answer3, setAnswer3] = useState();

//   const [newOptions, dispatch] = useReducer(reducer, initialState);

//   const optionArr = [
//     { title: option1 },
//     { title: option2 },
//     { title: option3 },
//     { title: option4 },
//     { title: option5 },
//     { title: option6 },
//   ];

//   optionArr.length = Number(totalOptions);
//   console.log('optionArr',optionArr)
//   const options = optionArr.map((option) => {
//     return { ...option, checked: false };
//   });

//   function handleAnswerChange(e, index) {
//     dispatch({
//       type: "answer",
//       options:options,
//       optionIndex: index,
//       value: e.target.checked,
//     });
//   }

//   const answers = newOptions.map((opt)=>{
//     if (opt.checked) {
//       return { ...opt, correct: true };
//     } else {
//       return { ...opt, correct: false };
//     }
//   })

//   async function handleQuestion(e) {
//     e.preventDefault();

//     // const arr1 = [
//     //   { title: option1 },
//     //   { title: option2 },
//     //   { title: option3 },
//     //   { title: option4 },
//     //   { title: option5 },
//     //   { title: option6 },
//     // ];
//     // if (arr1.length) {
//     //   setOption1("");
//     //   setOption2("");
//     //   setOption3("");
//     //   setOption4("");
//     //   setOption5("");
//     //   setOption6("");
//     // }
//     // const arr2 = [answer1, answer2, answer3];
//     // if (arr2.length) {
//     //   setAnswer1("");
//     //   setAnswer2("");
//     //   setAnswer3("");
//     // }

//     // arr1.length = Number(totalOptions);
//     // arr2.length = Number(totalAnswer);

//     //reducer starts
    

//     //reducer ends

//     // const ansArr = arr1.map((a) => {
//     //   if (arr2.includes(a.title)) {
//     //     return { ...a, correct: true };
//     //   } else {
//     //     return { ...a, correct: false };
//     //   }
//     // });

//     let questionObj = {
//       question: question,
//       totalOptions: totalOptions,
//       options: optionArr,
//       totalAnswers: totalAnswer,
//       answers: answers,
//       // id: id,
//     };
//     console.log(questionObj);

//     // try {
//     //   const res = await createQuestion(questionObj);
//     //   console.log(res.message);
//     //   setQuestions((q) => q + 1);
//     //   setIsOpenQuestion(false);
//     //   setOpenQuestionBtn(true);
//     // } catch (error) {
//     //   console.log(error);
//     // }
//   }
//   return (
//     <Form style={{ width: "800px" }} onSubmit={handleQuestion}>
//       <label>Question Add Here</label>
//       <TextInput
//         type="text"
//         required
//         placeholder="question type here.."
//         value={question}
//         onChange={(e) => setQuestion(e.target.value)}
//       />
//       <label>Total options</label>
//       <select
//         className={classes.textInput}
//         value={totalOptions}
//         onChange={(e) => setTotalOptions(e.target.value)}
//       >
//         {" "}
//         <option value="0">0</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//         <option value="4">4</option>
//         <option value="5">5</option>
//         <option value="6">6</option>
//       </select>

//       <label>Option 1</label>
//       <TextInput
//         type="text"
//         required
//         placeholder="option1"
//         value={option1}
//         onChange={(e) => setOption1(e.target.value)}
//       />
//       <label>Option 2</label>
//       <TextInput
//         type="text"
//         required
//         placeholder="option2"
//         value={option2}
//         onChange={(e) => setOption2(e.target.value)}
//       />
//       <label>Option 3</label>
//       <TextInput
//         type="text"
//         placeholder="option3"
//         value={option3}
//         onChange={(e) => setOption3(e.target.value)}
//       />
//       <label>Option 4</label>
//       <TextInput
//         type="text"
//         placeholder="option4"
//         value={option4}
//         onChange={(e) => setOption4(e.target.value)}
//       />
//       <label>Option 5</label>
//       <TextInput
//         type="text"
//         placeholder="option5"
//         value={option5}
//         onChange={(e) => setOption5(e.target.value)}
//       />
//       <label>Option 6</label>
//       <TextInput
//         type="text"
//         placeholder="option6"
//         value={option6}
//         onChange={(e) => setOption6(e.target.value)}
//       />

//       <label>Total Answers</label>
//       <select
//         className={classes.textInput}
//         value={totalAnswer}
//         onChange={(e) => setTotalAnswer(e.target.value)}
//       >
//         {" "}
//         <option value="0">0</option>
//         <option value="1">1</option>
//         <option value="2">2</option>
//         <option value="3">3</option>
//       </select>

//       {
//         options.length > 0 && options.map((option,index)=><Checkbox
//         key={index}
//         text={option.title}
//         value={index}
//         checked={option.checked}
//         onChange={(e) => handleAnswerChange(e, index)}
//       />)
//       }

//       <Button type="submit">
//         <span>Create Quiz</span>
//       </Button>
//     </Form>
//   );
// };
