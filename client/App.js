import React from 'react';
import { colors } from './themes/colors';
import { StatusBar } from 'react-native';
import Navigation from './navigation/navigation';

const App = ()=> {
  return(
    <>
      <StatusBar backgroundColor={colors.background} barStyle="dark-content" />
      <Navigation/>
    </>
  );
};

export default App;

