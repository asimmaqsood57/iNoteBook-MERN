import React, { useState } from "react";
import { useHistory } from "react-router-dom";

const Signup = () => {
  const history = useHistory();
  const [name, setname] = useState("");
  const [email, setemail] = useState("");

  const [password, setpassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch(`http://localhost:3001/api/auth/createuser`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",

        "User-Agent": "Thunder Client (https://www.thunderclient.io)",
      },
      body: JSON.stringify({
        email: email,
        name: name,
        password: password,
      }),
    });

    const json = await response.json(); // parses JSON response into native JavaScript objects

    console.log(json);

    if (json.success) {
      // save the auth token and redirect

      localStorage.setItem("token", json.authToken);

      history.push("/");
    } else {
      alert("There is an error internal  server");
    }
  };

  return (
    <div className="container">
      <h1 className="text-center">Signup</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Name
          </label>
          <input
            type="text"
            className="form-control"
            value={name}
            onChange={(e) => setname(e.target.value)}
            id="name"
            name="name"
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputEmail1" className="form-label">
            Email address
          </label>
          <input
            type="email"
            className="form-control"
            id="email"
            name="email"
            value={email}
            onChange={(e) => setemail(e.target.value)}
            aria-describedby="emailHelp"
          />
        </div>
        <div className="mb-3">
          <label for="exampleInputPassword1" className="form-label">
            Password
          </label>
          <input
            type="password"
            value={password}
            name="password"
            onChange={(e) => setpassword(e.target.value)}
            className="form-control"
            id="password"
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>
    </div>
  );
};

export default Signup;
