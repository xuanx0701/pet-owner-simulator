// src/components/Login.js
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { jwtDecode } from "jwt-decode";

const Login = ({ onLoginSuccess }) => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-blue-50">
      <h1 className="text-4xl font-bold mb-8">飼主模擬器</h1>
      <GoogleLogin
        onSuccess={(credentialResponse) => {
          const decoded = jwtDecode(credentialResponse.credential);
          console.log("登入成功", decoded);
          onLoginSuccess(decoded);
        }}
        onError={() => {
          console.log("登入失敗");
        }}
      />
    </div>
  );
};

export default Login;
