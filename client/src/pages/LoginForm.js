// 參考網址:https://codepen.io/hurick/pen/Kyrvrj
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, registerUser } from "../store/userSlice";
import "./LoginStyle/LoginForm.css"; // 保留原 SCSS 編譯成 CSS 檔

const LoginForm = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { error } = useSelector((state) => state.user);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isRegister, setIsRegister] = useState(false);

  const handleAuth = async (e) => {
    e.preventDefault();
    try {
      if (isRegister) {
        await dispatch(registerUser({ username, password })).unwrap();
        alert("註冊成功，請登入");
        setIsRegister(false);
      } else {
        await dispatch(loginUser({ username, password })).unwrap();
        navigate("/home");
      }
    } catch (err) {
      alert(`操作失敗：${err}`);
    }
  };

  const handleToggleMode = () => {
    setIsRegister(!isRegister);
  };

  return (
    <section className="user">
      <div className="user_options-container">
        <div className="user_options-text">
          <div className="user_options-unregistered">
            <h2 className="user_unregistered-title">還沒有帳號嗎?</h2>
            <p className="user_unregistered-text">請按下方註冊鍵來註冊帳戶</p>
            <button
              className="user_unregistered-signup"
              onClick={() => setIsRegister(true)}
            >
              <img src="/images/login_signup_gry.png" alt="" />
            </button>
          </div>

          <div className="user_options-registered">
            <h2 className="user_registered-title">已經有帳號了嗎?</h2>
            <p className="user_registered-text">請按下方登入鍵來進行登入</p>
            <button
              className="user_registered-login"
              onClick={() => setIsRegister(false)}
            >
              <img src="/images/login_login_gry.png" alt="" />
            </button>
          </div>
        </div>

        <div
          className={`user_options-forms ${
            isRegister ? "bounceLeft" : "bounceRight"
          }`}
        >
          <div className={`user_forms-login ${isRegister ? "" : "active"}`}>
            <h2 className="forms_title">登入</h2>
            <form className="forms_form" onSubmit={handleAuth}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Username(這會當作玩家名字)"
                    className="forms_field-input"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <button
                  type="button"
                  className="forms_buttons-forgot"
                  onClick={() => alert("忘記密碼功能未實作")}
                >
                  Forgot password?
                </button>
                <input
                  type="submit"
                  value="登入"
                  className="forms_buttons-action"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>

          <div className={`user_forms-signup ${isRegister ? "active" : ""}`}>
            <h2 className="forms_title">註冊</h2>
            <form className="forms_form" onSubmit={handleAuth}>
              <fieldset className="forms_fieldset">
                <div className="forms_field">
                  <input
                    type="text"
                    placeholder="Username"
                    className="forms_field-input"
                    required
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                </div>
                <div className="forms_field">
                  <input
                    type="password"
                    placeholder="Password"
                    className="forms_field-input"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </fieldset>
              <div className="forms_buttons">
                <input
                  type="submit"
                  value="註冊"
                  className="forms_buttons-action"
                />
              </div>
              {error && <p className="text-red-500">{error}</p>}
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LoginForm;
