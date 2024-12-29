// ThemeProvider.js
import React, { createContext, useContext, useState } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  const [customBackgroundColor, setCustomBackgroundColor] = useState(['#FFFFFF', '#FFFFFF']); // Default gradient

  return (
    <ThemeContext.Provider value={{ customBackgroundColor, setCustomBackgroundColor }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => useContext(ThemeContext);
