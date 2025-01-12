import React from "react";
import { useLocation } from "react-router-dom";
import "./Page2.css";

const Page2 = () => {
  const location = useLocation();
  const images = location.state?.images || []; // 전달받은 이미지 리스트

  return (
    <div className="page2-container">
      <div className="sidebar">
        <h2>선택된 악보들</h2>
      </div>
      <div className="image-scroll">
        {images.map((image, index) => (
          <img key={index} src={image} alt={`악보 ${index + 1}`} className="scroll-image" />
        ))}
      </div>
    </div>
  );
};

export default Page2;
