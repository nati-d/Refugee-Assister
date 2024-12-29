import React from 'react';
import { colors } from './themes/colors';
import { ThemeProvider } from './themes/ThemeProvider';
import { StatusBar } from 'react-native';
import 'intl-pluralrules'; 
import Navigation from './navigation/navigation';

const App = ()=> {
  return(
    <>
      
      <ThemeProvider><Navigation /></ThemeProvider>

    </>
  );
};

export default App;

