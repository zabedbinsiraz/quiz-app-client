import React, { useState } from "react";
import { deleteUser, updateTransaction } from "../../contexts/controllers";
import classes from "../../styles/Users.module.css";
import Button from "../Button";
import Form from "../Form";
import TextInput from "../TextInput";

export const Users = () => {
  const [users, setUsers] = useState([]);
  const [userId, setUserId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [refund, setRefund] = useState(0);
  const [transaction,setTransaction]=useState();

  function getUsers() {
    fetch("http://localhost:4000/user")
      .then((res) => res.json())
      .then((data) => {
        setUsers(data.result);
      })
      .catch((err) => console.log(err));
  }
  getUsers();

  function deleteSingleUser(id) {
    deleteUser(id);
    getUsers();
  }
  function transactionHandler(userId) {
    fetch(`http://localhost:4000/user/transaction/${userId}`)
      .then((res) => res.json())
      .then((result) => {
        setTransaction(result.data);
      })
      .catch((err) => console.log(err));
    setIsUpdate(true);
  }
 async function handleSubmit(e) {
    e.preventDefault();

    try {
      const updateObj = {
        refund: transaction?.refund + Number(refund),
      };
     if(transaction){
      const res = await updateTransaction(transaction?._id, updateObj);
      console.log(res);
      setIsUpdate(false);
     }else{
      alert("This user has no transaction yet!!")
      setIsUpdate(false);

     }
    } catch (error) {
      
    }
  }
  return (
    <div className={classes.manageUserContainer}>
      <div className={classes.title}>
        <h2>Manage Users</h2>
      </div>

      <div className={classes.usersTable}>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Delete</th>
              <th>Refund</th>
            </tr>
          </thead>
          <tbody>
            {/* akhane map kre data patanu hbe */}

            {users.map((user) => (
              <tr key={user._id}>
                <td className={classes.name}>
                  <span>{user.name}</span>
                </td>
                <td style={{ color: "white" }}>{user.email}</td>
                <td>
                  <Button onClick={() => deleteSingleUser(user._id)}>
                    Delete
                  </Button>
                </td>
                <td>
                  <Button
                    style={{ marginLeft: "70px" }}
                    onClick={() => transactionHandler(user._id)}
                  >
                    Refund
                  </Button>
                </td>
              </tr>
            ))}

            {/* akhane map ses hbe */}
          </tbody>
        </table>
        {isUpdate && (
          <Form style={{ height: "100px",width:'300px' }} onSubmit={handleSubmit}>
            <TextInput
              type="number"
              required
              value={refund}
              onChange={(e) => setRefund(e.target.value)}
            />

            <Button type="submit">
              <span>Send Refund</span>
            </Button>
          </Form>
        )}
      </div>
    </div>
  );
};
