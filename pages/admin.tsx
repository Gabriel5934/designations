import { signInWithEmailAndPassword } from "firebase/auth";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { useState } from "react";

import { auth } from "../firebase";

const Admin: NextPage = () => {
  const router = useRouter();

  const [loginForm, setLoginForm] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;

    setLoginForm({
      ...loginForm,
      [name]: value,
    });
  };

  const login = () => {
    signInWithEmailAndPassword(auth, loginForm.email, loginForm.password)
      .then((userCredential) => {
        const user = userCredential.user;

        router.push("/dashboard");
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;

        alert(errorMessage);
      });
  };

  return (
    <div className="p-8 text-center flex flex-col gap-8">
      <span className="title">Área de Admin</span>
      <div className="form-control items-center">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="input w-full max-w-xs mb-2"
          onChange={handleInputChange}
          value={loginForm.email}
        />
        <input
          type="password"
          name="password"
          placeholder="Senha"
          className="input w-full max-w-xs mb-4"
          onChange={handleInputChange}
          value={loginForm.password}
        />
        <button className="btn w-full max-w-xs" type="button" onClick={login}>
          Login
        </button>
      </div>
    </div>
  );
};

export default Admin;
