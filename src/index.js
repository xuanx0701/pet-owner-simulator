// // src/index.js
// import React from "react";
// import ReactDOM from "react-dom/client";
// import App from "./App";
// import { GoogleOAuthProvider } from "@react-oauth/google";
// import { UserProvider } from "./context/UserContext";
// import { BrowserRouter } from "react-router-dom"; // ✅ 加入 Router

// const root = ReactDOM.createRoot(document.getElementById("root"));

// root.render(
//   <GoogleOAuthProvider clientId="676155910651-mp2jjflfbrpirta2jt2id1f32fbofdmo.apps.googleusercontent.com">
//     <UserProvider>
//       <BrowserRouter>
//         {" "}
//         {/* ✅ 包住 App */}
//         <App />
//       </BrowserRouter>
//     </UserProvider>
//   </GoogleOAuthProvider>
// );
// src/index.js
import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { Provider } from "react-redux";
import store from "./store";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));

root.render(
  <Provider store={store}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </Provider>
);
