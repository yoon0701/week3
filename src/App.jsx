import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AppProvider from "./context/AppContext";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import "./App.css";

const Home = () => {
  const [isSignup, setIsSignup] = useState(false); // 로그인/회원가입 화면 전환
  const [formData, setFormData] = useState({
    name: "",
    id: "",
    password: "",
  });
  const navigate = useNavigate();

  // 폼 입력 핸들러
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  // 로그인 버튼 클릭 시
  const handleLogin = (e) => {
    e.preventDefault(); // 기본 새로고침 방지
    if (!formData.id || !formData.password) {
      alert("아이디와 비밀번호를 입력해주세요!");
      return;
    }
    console.log("Login Data:", { id: formData.id, password: formData.password });
    alert("로그인 성공!");
    navigate("/page1"); // Page1으로 이동
  };

  // 회원가입 버튼 클릭 시
  const handleSignup = (e) => {
    e.preventDefault(); // 기본 새로고침 방지
    if (!formData.name || !formData.id || !formData.password) {
      alert("모든 필드를 입력해주세요!");
      return;
    }
    console.log("Signup Data:", formData);
    alert("회원가입이 완료되었습니다!");
    setIsSignup(false); // 로그인 화면으로 전환
  };

  return (
    <div>
      {/* 상단 고정된 GIF 배너 */}
      <div className="top-banner"></div>

      {/* 로그인 또는 회원가입 폼 */}
      <div className="background" style={{ marginTop: "100px" }}>
        <h1>콩나물 밭에 오신걸 환영합니다</h1>

        {/* 로그인 폼 */}
        {!isSignup && (
          <form onSubmit={handleLogin}>
            <div className="input-group">
              <input
                type="text"
                name="id"
                placeholder="Id"
                value={formData.id}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="password"
                name="password"
                placeholder="Pw"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="login-button">
                Login
              </button>
              <button type="button" className="signup-button" onClick={() => setIsSignup(true)}>
                Sign Up
              </button>
            </div>
          </form>
        )}

        {/* 회원가입 폼 */}
        {isSignup && (
          <form onSubmit={handleSignup}>
            <div className="input-group">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="text"
                name="id"
                placeholder="Id"
                value={formData.id}
                onChange={handleInputChange}
                className="input-field"
              />
              <input
                type="password"
                name="password"
                placeholder="Pw"
                value={formData.password}
                onChange={handleInputChange}
                className="input-field"
              />
            </div>
            <div className="button-group">
              <button type="submit" className="signup-button">
                Sign Up
              </button>
              <button type="button" className="back-button" onClick={() => setIsSignup(false)}>
                Back to Login
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/page1" element={<Page1 />} />
          <Route path="/page2" element={<Page2 />} />
          <Route path="/page3" element={<Page3 />} />
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;
