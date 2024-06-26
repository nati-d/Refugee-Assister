import React from 'react';
import { View, Text } from 'react-native';
import { useTranslation } from 'react-i18next';
import { Picker } from '@react-native-picker/picker';
import tw from 'twrnc';

// Import translation files for each language
import enTranslation from '../translations/en.json';
import esTranslation from '../translations/es.json';
import frTranslation from '../translations/fr.json';
import arTranslation from '../translations/ar.json';
import haTranslation from '../translations/ha.json';
import swTranslation from '../translations/sw.json';
import zuTranslation from '../translations/zu.json';
import amTranslation from '../translations/am.json';

// Initialize i18next and configure it with translation resources
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: enTranslation },
    es: { translation: esTranslation },
    fr: { translation: frTranslation },
    ar: { translation: arTranslation },
    ha: { translation: haTranslation },
    sw: { translation: swTranslation },
    zu: { translation: zuTranslation },
    am: { translation: amTranslation },
  },
  lng: 'en',             // Default language
  fallbackLng: 'en',     // Fallback language in case of missing translations
  interpolation: {
    escapeValue: false,
  },
});

/**
 * Demo component for language selection using a dropdown menu.
 */
const Demo = () => {
  const { i18n } = useTranslation();

  const options = [
    { label: 'English', value: 'en' },
    { label: 'Spanish', value: 'es' },
    { label: 'French', value: 'fr' },
    { label: 'Arabic', value: 'ar' },
    { label: 'Hausa', value: 'ha' },
    { label: 'Zulu', value: 'zu' },
    { label: 'Swahili', value: 'sw' },
    { label: 'Amharic', value: 'am' },
  ];

  /**
   * Handle a change in the selected language and update the i18n configuration.
   * @param {string} language - The selected language code.
   */
  const handleLanguageChange = (language) => {
    i18n.changeLanguage(language);
  };

  /**
   * Render language options for the Picker component.
   */
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
        style={{ width: 30 }}
      >
        {renderOptions()}
      </Picker>
    </View>
  );
};

export default Demo;
