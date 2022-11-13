// import React, { useState } from "react";
// import { useSelector, useDispatch } from "react-redux";
// import { addBook, deleteBook, updateBook } from "../redux/BookSlice";

// export const Home = () => {
//   const [isEdit, setIsEdit] = useState(false);
//   const [editableId, setEditableId] = useState();
//   const [bookName, setBookName] = useState();
//   const dispatch = useDispatch();
//   const allBooks = useSelector((state) => state.booksReducer.books);
//   const allcomments = useSelector((state) => state.commentsReducer.comments);
//   const bookNo = allBooks.length;
//   console.log(allBooks);
//   console.log(allcomments);
//   // return <AllQuiz />;
//   console.log(addBook);
//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newBook = { id: bookNo + 1 + 1000, name: bookName };
//     console.log(newBook);
//     dispatch(addBook(newBook));
//   };
//   const handleDelete = (id) => {
//     dispatch(deleteBook(id));
//   };

//   const handleEdit = (id, name) => {
//     setIsEdit(true);
//     setBookName(name);
//     setEditableId(id);
//   };

//   const handleUpdate = (e) => {
//     e.preventDefault()
//     const book = {
//       id: editableId,
//       name: bookName,
//     };
//     console.log(updateBook);
//     dispatch(updateBook(book));
//     setIsEdit(false);
//   };

//   return (
//     <div>
//       <h4>Book list</h4>
//       {allBooks &&
//         allBooks.map((book) => (
//           <p key={book.id}>
//             {book.name}{" "}
//             <button onClick={() => handleDelete(book.id)}>Delete</button>{" "}
//             <button onClick={() => handleEdit(book.id, book.name)}>
//               Edit
//             </button>
//           </p>
//         ))}

//       {isEdit ? (
//         <form onSubmit={handleUpdate}>
//           <input
//             type="text"
//             name=""
//             value={bookName}
//             onChange={(e) => setBookName(e.target.value)}
//           />
//           <button type="submit">Add book</button>
//         </form>
//       ) : (
//         <form onSubmit={handleSubmit}>
//           <input
//             type="text"
//             name=""
//             value={bookName}
//             onChange={(e) => setBookName(e.target.value)}
//           />
//           <button type="submit">Add book</button>
//         </form>
//       )}
//     </div>
//   );
// };

import React from 'react';
import AllQuiz from './../components/AllQuiz';

export const Home = () => {
  return <AllQuiz />
}
