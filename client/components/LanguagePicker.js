import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';


// Import translation files for each language
import enTranslation from '../translations/en.json';
import esTranslation from '../translations/es.json';
import frTranslation from '../translations/fr.json';
import itTranslation from '../translations/it.json';
import ptTranslation from '../translations/pt.json';

// Initialize i18next
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
    fr: { translation: frTranslation },
    it: { translation: itTranslation },
    pt: { translation: ptTranslation },
  },
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
});

const Demo = () => {
  const { i18n } = useTranslation();

  const options = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'Italian', value: 'it' },
    { label: 'Portuguese', value: 'pt' },
  ];

  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  const renderOptions = () => {
    return options.map((option, index) => (
      <Picker.Item 
        key={index} 
        label={option.label}  
        value={option.value} 
      />
    ));
  };

  return (
    <View style={tw `flex-row justify-center items-center`}>
      <Text style={tw `text-gray-700`}>{i18n.language}</Text>
      <Picker
        selectedValue={i18n.language}
        onValueChange={handleLanguageChange}
        style={{ width: 35 }}
      >
        {renderOptions()}
      </Picker>
    </View>
  );
};

export default Demo;