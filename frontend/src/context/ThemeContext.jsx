import React, { createContext, useState } from "react";

export const ThemeContext = createContext(null);

export const ThemeContextProvider = (props) => {
  const [theme, setTheme] = useState("light");

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {props.children}
    </ThemeContext.Provider>
  );
};
