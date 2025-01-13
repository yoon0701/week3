import React, { createContext, useState } from "react";

export const AppContext = createContext();

const AppProvider = ({ children }) => {
  const [allImages, setAllImages] = useState([]); // 대표 이미지 리스트
  const [imageGroups, setImageGroups] = useState([]); // 업로드된 이미지 그룹 리스트
  const [lastViewedImages, setLastViewedImages] = useState([]); // 마지막으로 본 이미지 그룹

  return (
    <AppContext.Provider
      value={{
        allImages,
        setAllImages,
        imageGroups,
        setImageGroups,
        lastViewedImages,
        setLastViewedImages, // 추가됨
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export default AppProvider;