import React, { useState, useEffect } from "react";
import { gql, useMutation } from "@apollo/client";
import { Button, Form } from "react-bootstrap";
import { decodeToken } from "react-jwt";
import { useHistory } from "react-router-dom";

const SIGNUP = gql`
  mutation Signup($email: String!, $password: String!) {
    signin(credentials: { email: $email, password: $password }) {
      userErrors {
        message
      }
      token
    }
  }
`;

export default function Signin() {
  const [signup, { data, loading }] = useMutation(SIGNUP);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  let history = useHistory();

  const handleClick = () => {
    signup({
      variables: {
        email,
        password,
      },
    }).then((res) => {
      const myDecodedToken = decodeToken(res.data.signin.token);
      setTimeout(() => {
        history.push(`/profile/${myDecodedToken.userId}`);
      }, 500);
    });
  };

  const [error, setError] = useState(null);

  useEffect(() => {
    if (data) {
      if (data.signin.userErrors.length) {
        setError(data.signin.userErrors[0].message);
      }
      if (data.signin.token) {
        localStorage.setItem("token", data.signin.token);
      }
    }
  }, [data]);

  return (
    <div>
      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="text"
            placeholder=""
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder=""
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        {error && <p>{error}</p>}
        <Button variant="primary" onClick={handleClick}>
          Signin
        </Button>
      </Form>
    </div>
  );
}
