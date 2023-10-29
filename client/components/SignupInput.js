import React from 'react';
import { View, Text, TextInput } from 'react-native'; // Import required dependencies
import tw from 'twrnc';

/**
 * SignupInput component for rendering an input field with a label.
 * @param {string} placeholder - The label for the input field.
 * @param {string} value - The current value of the input.
 * @param {function} onChangeText - A callback function to handle text changes.
 * @param {string} error - An optional error message to display if there's an error.
 */
function SignupInput({ placeholder, value, onChangeText, error }) {
    return (
        <View>
            <Text style={tw`text-base font-bold mb-2 text-gray-800`}>{placeholder}:</Text>
            <TextInput
                style={[
                    tw`border rounded-md h-12 p-2 px-3 border-gray-400 text-gray-800`,
                    { borderColor: error ? 'red' : 'gray', shadowColor: error ? 'red' : 'transparent' },
                ]}
                value={value}
                onChangeText={onChangeText}
                placeholder={`Your ${placeholder}`}
                secureTextEntry={placeholder === 'Password' || placeholder === 'Confirm Password'}
            />
            {error ? <Text style={tw`text-red-600`}>{error}</Text> : null}
        </View>
    );
}

export default SignupInput;
