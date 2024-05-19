import React from "react";
import { useSelector } from "react-redux";

const ThemeProvider = ({ children }) => {
  const theme = useSelector((state) => state.theme.theme);
  return (
    <div className={theme}>
      <div className="bg-white text-gray-600 dark:bg-black dark:text-white ">
        {children}
      </div>
    </div>
  );
};

export default ThemeProvider;
