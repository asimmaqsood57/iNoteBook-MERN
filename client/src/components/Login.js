import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Login = (props) => {
  let history = useHistory();

  const [email, setemail] = useState("");
  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3001/api/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    });

    const json = await response.json(); // parses JSON response into native JavaScript objects

    console.log(json);

    if (json.success) {
      // save the auth token and redirect

      localStorage.setItem("token", json.authToken);

      props.showAlert("You are logged in", "success");
      history.push("/");
    } else {
      props.showAlert("invalid Credentials", "danger");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            onChange={(e) => setemail(e.target.value)}
            value={email}
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
          />
          <div id="emailHelp" className="form-text">
            We'll never share your email with anyone else.
          </div>
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            className="form-control"
            id="exampleInputPassword1"
            onChange={(e) => {
              setpassword(e.target.value);
            }}
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Login;
