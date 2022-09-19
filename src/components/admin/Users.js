import React, { useState } from "react";
import { deleteUser, updateTransaction } from "../../contexts/controllers";
import useTransaction from "../../hooks/useTransaction";
import useUsers from "../../hooks/useUsers";
import classes from "../../styles/Users.module.css";
import Button from "../Button";
import Form from "../Form";
import TextInput from "../TextInput";

export const Users = () => {
  const { users } = useUsers();
  const [userId, setUserId] = useState();
  const [isUpdate, setIsUpdate] = useState(false);
  const [refund, setRefund] = useState();
  const { transaction } = useTransaction(userId);

  function deleteSingleUser(id) {
    deleteUser(id);
  }
  function transactionHandler(id) {
    setUserId(id);
    setIsUpdate(true);
  }
  function handleSubmit() {
    const updateObj = {
      refund: transaction?.refund + Number(refund),
    };
    updateTransaction(transaction?._id, updateObj);
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
          <Form style={{ height: "500px" }} onSubmit={handleSubmit}>
            <TextInput
              type="text"
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
