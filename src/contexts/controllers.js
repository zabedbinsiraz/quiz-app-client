// quiz controllers

// delete single quiz function
export async function deleteQuiz(id) {
  const url = `http://localhost:4000/quiz/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
    });
    console.log(res);
    const result =await res.json();
    return result;
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}
export async function updateQuiz(id, updateData) {
  const url = `http://localhost:4000/quiz/${id}`;

  try {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    console.log(response);
    const result = await response.json();
    return result;
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

// user controllers
// delete single user function
export async function deleteUser(id) {
  const url = `http://localhost:4000/user/${id}`;

  try {
    const res = await fetch(url, {
      method: "DELETE",
    });
    const result = res.json();
    return result;
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

// update user

export async function updateUser(id, updateData) {
  const url = `http://localhost:4000/user/${id}`;

  try {
    let response = await fetch(url, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    console.log(response);
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

// participants controllers
// create participant
export async function submitParticipant(participantObj) {
  const url = `http://localhost:4000/quiz/user/participation`;

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(participantObj),
    });
    let result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

//transaction controllers
// create transaction
export async function submitTransaction(price = 0, userId) {
  const obj = {
    balance: 0,
    transaction: price,
    refund: 0,
    user: userId,
  };
  const url = `http://localhost:4000/user/transaction`;

  try {
    let response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(obj),
    });
    let result = await response.json();
    console.log(result);
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}

// update transaction
export async function updateTransaction(id, updateData) {
  console.log(id, updateData);

  const url = `http://localhost:4000/user/transaction/${id}`;

  try {
    let response = await fetch(url, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updateData),
    });
    return await response.json();
  } catch (err) {
    console.error(err);
    // Handle errors here
  }
}
