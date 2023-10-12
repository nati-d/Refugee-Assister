// MultilingualText.js
import React from 'react';
import { Text } from 'react-native';
import { useTranslation } from 'react-i18next';

const MultilingualText = ({ text }) => {
  const { t } = useTranslation();
  return t(text);
};

export default MultilingualText;