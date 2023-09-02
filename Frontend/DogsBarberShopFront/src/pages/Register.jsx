import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useGlobalState } from "../context/GlobalStateContext";

export default function Register() {
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const fullnameRef = useRef(null);
  const formRef = useRef(null);
  const { setIsLoading, API_BASE_URL } = useGlobalState();
  const [responseMessage, setResponseMessage] = useState("");

  const onSubmit = async (e) => {
    try {
      e.preventDefault();
      setIsLoading(true);
      const response = await fetch(`${API_BASE_URL}/Auth/Register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username: usernameRef.current.value,
          password: passwordRef.current.value,
          fullname: fullnameRef.current.value,
        }),
      });
      const text = await response.text();
      if (response.status == 200) {
        formRef.current.reset();
      }

      setResponseMessage(text);
    } catch (ex) {
      console.log(ex);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={onSubmit} ref={formRef} className="login">
        <h3>הרשמה למערכת</h3>
        <div>
          <label htmlFor="Username">שם משתמש</label>
          <input required ref={usernameRef} />
        </div>
        <div>
          <label htmlFor="Password">סיסמא</label>
          <input required minLength="6" type="password" ref={passwordRef} />
        </div>
        <div>
          <label htmlFor="Fullname">שם מלא</label>
          <input required type="text" minLength="4" ref={fullnameRef} />
        </div>
        <input type="submit" value={"הרשמה"} />
      </form>
      <h3>{responseMessage}</h3>
      <Link to="/">כניסה למערכת</Link>
    </>
  );
}
