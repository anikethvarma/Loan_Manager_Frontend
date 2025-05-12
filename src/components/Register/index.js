import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import Cookies from "js-cookie";
import { useNavigate, Link, Navigate } from "react-router-dom";
import { useState } from "react";
import "./index.css";

const Register = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  if(Cookies.get("jwtToken") !== undefined) return <Navigate to="/"/>

  const submitForm = async (e) => {
    e.preventDefault();
    const express_url = "https://loan-manager-backend-d3wt.onrender.com";
    if (username === "" || password === "") {
      setError("Please Enter the Details");
    } else if (password !== confirmPassword) {
      setError("Password did not match. Please Check");
    } else {
      const response = await fetch(`${express_url}/api/register`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password, type: "user" }),
      });
      const data = await response.json();
      if (data.jwtToken) {
        Cookies.set("jwtToken", data.jwtToken);
        navigate("/");
      } else {
        setError(data);
      }
    }
  };

  return (
    <div className="main-card-bg">
      <Form className="main-card" onSubmit={submitForm}>
        <h1 className="logo">CREDIT APP</h1>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
          <Form.Label>Username</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Your Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput2">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="exampleForm.ControlInput3">
          <Form.Label>Enter Password Again</Form.Label>
          <Form.Control
            type="password"
            placeholder="Enter Your Password Again"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
        </Form.Group>
        <p className="error">{error}</p>
        <Button variant="success" onClick={submitForm}>
          Login
        </Button>
        <p>
          Have an account? Please <Link to="/login">Login</Link>
        </p>
      </Form>
    </div>
  )
};

export default Register;
