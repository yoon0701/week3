import React from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import AppProvider from "./context/AppContext";
import Page1 from "./pages/Page1";
import Page2 from "./pages/Page2";
import Page3 from "./pages/Page3";
import "./App.css";

const Home = () => {
  const navigate = useNavigate(); // 페이지 이동을 위한 훅 사용

  const handleLogin = () => {
    navigate("/page1"); // Login 버튼 클릭 시 Page1으로 이동
  };

  return (
    <div>
      {/* 상단 고정된 GIF 배너 */}
      <div className="top-banner"></div>
      
      {/* 로그인 콘텐츠 */}
      <div className="background" style={{ marginTop: "100px" }}> {/* 상단 바 높이만큼 여백 추가 */}
        <h1>콩나물 밭에 오신걸 환영합니다</h1>
        <button className="login-button" onClick={handleLogin}>
          Login
        </button>
      </div>
    </div>
  );
};

const App = () => {
  return (
    <AppProvider> {/* Context API로 감싸기 */}
      <Router>
        <Routes>
          <Route path="/" element={<Home />} /> {/* 로그인 페이지 */}
          <Route path="/page1" element={<Page1 />} /> {/* Page1 */}
          <Route path="/page2" element={<Page2 />} /> {/* Page2 */}
          <Route path="/page3" element={<Page3 />} /> {/* Page3 */}
        </Routes>
      </Router>
    </AppProvider>
  );
};

export default App;