import React, { useRef, useState, useContext } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalStateContext";

export default function Login() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const formRef = useRef(null);
  const [responseMessage, setResponseMessage] = useState("");
  const { setIsLoading, API_BASE_URL, setToken } = useGlobalState();

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/Auth/Login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
        }),
      });

      const json = await response.text();
      if (response.status === 200) {
        setToken(json);
      } else {
        setResponseMessage(json);
        setIsLoading(false);
      }
    } catch (ex) {
      console.log(ex);
    }
  };
  return (
    <>
      <form onSubmit={onSubmit} ref={formRef} className="login">
        <h3>כניסה למערכת</h3>
        <div>
          <label htmlFor="Username">שם משתמש</label>
          <input required ref={usernameRef} />
        </div>
        <div>
          <label htmlFor="Password">סיסמא</label>
          <input required type="password" minLength="6" ref={passwordRef} />
        </div>
        <input type="submit" value={"כניסה"} />
      </form>
      <h3>{responseMessage}</h3>
      <Link to="/register">להרשמה</Link>
    </>
  );
}
