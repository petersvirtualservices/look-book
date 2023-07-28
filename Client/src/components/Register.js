import React, { useEffect, useState } from "react";
import { Link, Navigate, useNavigate } from "react-router-dom";
import ValidationError from "./ValidationError";

function Register() {
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoggedIn, setIsLoggedIn] = useState(null);
  const history = useNavigate();
   
  async function handleRegister(e) {
    e.preventDefault();
    const form = e.target;
    const user = {
      firstName: form[0].value,
      lastName: form[1].value,
      username: form[2].value,
      password: form[3].value,
      confirmPassword: form[4].value,
     
    };
  
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: {
          "Content-type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
        body: JSON.stringify(user),
      });
      const data = await res.json();
      console.log(data);
      setIsLoggedIn(data);
      setErrorMessage(data.message);
      window.location.replace("/loginUser");
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    fetch("/api/isUserAuth", {
      method: "GET",
      headers: {
        "x-access-token": localStorage.getItem("token"),
        "Content-type": "application/json",
        "Access-Control-Allow-Origin": "*",
      },
    })
      .then((res) => res.json())
      .then((data) => (data.isLoggedIn ? history.push("/user/:userId") : null))
      .catch((err) => console.log(err));
  }, [isLoggedIn, history]);

  return (
    <>
      <div className="contentBox">
        <div className="registerSection">
          <h4> Register</h4>
          <form onSubmit={(e) => handleRegister(e)} className="registerForm">
            <p>
              {errorMessage == "Success" ? (
                <Navigate to="/loginUser" />
              ) : (
                <ValidationError message={errorMessage} />
              )}
            </p>
            <label htmlFor="firstName">Firstname</label>
            <input
              className="input-field"
              type="text"
              name="firstName"
              id="firstName"
            />

            <label htmlFor="lastName">LastName</label>
            <input
              className="input-field"
              type="text"
              name="lastName"
              id="lastName"
            />

            <label htmlFor="username">Email</label>
            <input
              className="input-field"
              type="text"
              name="username"
              id="username"
            />

            <label htmlFor="password">Password</label>
            <input
              className="input-field"
              type="password"
              name="password"
              id="password"
            />

            <label htmlFor="confirmPassword">Confirm Password</label>
            <input
              className="input-field"
              type="password"
              name="confirmPassword"
              id="confirmPassword"
            />
            <br></br>
            <div>
          
        </div>
            <input className="submitBtn" type="submit" value="REGISTER" />
            <br></br>
            <div className="">
              <h6>Already have an account?</h6>
              <Link className="link" to="/loginUser">
                LOGIN
              </Link>
            </div>
          </form>
        </div>
      </div>
      <br></br>
      <br></br>
    </>
  );
}
export default Register;