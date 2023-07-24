import React from "react";
import "../index.css"; // CSS 파일 불러오기

interface LoadingSpinnerProps {
  size?: number; // 로딩바 크기 (기본값: 50)
}

const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({ size = "10vw" }) => {
  return (
    <div
      className="loading-spinner"
      style={{ width: size, height: size }}
    ></div>
  );
};

export default LoadingSpinner;
