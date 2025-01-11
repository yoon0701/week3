import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Page1 from "./pages/Page1";
import "./App.css";

const Home = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅 사용

  const handleLogin = () => {
    navigate("/page1"); // Login 버튼 클릭 시 Page1으로 이동
  };

  return (
    <div className="background">
      <h1>콩나물 밭에 오신걸 환영합니다</h1>
      <button className="login-button" onClick={handleLogin}>
        Login
      </button>
    </div>
  );
};

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/page1" element={<Page1 />} />
      </Routes>
    </Router>
  );
};

export default App;