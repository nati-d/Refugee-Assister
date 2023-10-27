import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import tw from 'twrnc';
import { useNavigation } from '@react-navigation/native';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../config/firebase';
import axios from 'axios';

export default function SignupScreen() {
    const navigation = useNavigation();
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [emailError, setEmailError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [confirmPasswordError, setConfirmPasswordError] = useState('');

    const handleSignup = async () => {
        // Validate email
        if (!isValidEmail(email)) {
            setEmailError('Please enter a valid email address');
            return;
        } else {
            setEmailError('');
        }
    
        // Validate password
        if (!password) {
            setPasswordError('Password is required');
            return;
        } else {
            setPasswordError('');
        }
    
        // Validate confirm password
        if (!confirmPassword || confirmPassword !== password) {
            setConfirmPasswordError('Passwords do not match');
            return;
        } else {
            setConfirmPasswordError('');
        }
    
        try {
            const response = await axios.post('https://assisterapp.onrender.com/addUser', { 
                email: email,
                firstName:firstName,
                lastName:lastName 
            });

            await createUserWithEmailAndPassword(auth, email, password);
            console.log('User added successfully:', response.data);
        } catch (error) {
            if (error.response) {
                console.error('Signup error:', error.response.data);
            } else {
                console.error('Signup error:', error.message);
            }
        }
    };
    
    const isValidEmail = (email) => {
        // Regular expression for checking valid email address
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    return (
        <View style={[tw`flex-1 mt-10`, styles.container]}>
            <View style={tw`w-full p-5`}>
                <Text style={tw`font-extrabold text-2xl text-center text-gray-800`}>Let's Get Started!</Text>
                <Text style={tw`text-base text-center text-gray-800`}>Begin Your Journey, Sign Up Now.</Text>
                <View style={tw`flex-row justify-between mt-5`}>
                    <View style={tw`w-[48%]`}>
                        <Text style={tw`text-base font-bold mb-2 text-gray-800`}>First Name:</Text>
                        <TextInput
                            style={[tw`border rounded-md h-12 p-2 px-3 border-gray-400 text-gray-800`]}
                            value={firstName}
                            onChangeText={(text) => setFirstName(text)}
                            placeholder='Your First Name'
                        />
                    </View>
                    <View style={tw`w-[48%]`}>
                        <Text style={tw`text-base font-bold mb-2 text-gray-800`}>Last Name:</Text>
                        <TextInput
                            style={[tw`border rounded-md h-12 p-2 px-3 border-gray-400 text-gray-800`]}
                            value={lastName}
                            onChangeText={(text) => setLastName(text)}
                            placeholder='Your Last Name'
                        />
                    </View>
                </View>
                <View style={tw`mt-2`}>
                    <Text style={tw`text-base font-bold mb-2 text-gray-800`}>Email:</Text>
                    <TextInput
                        style={[
                            tw`border rounded-md h-12 p-2 px-3 border-gray-400 text-gray-800`,
                            { borderColor: emailError ? '#FF0000' : 'gray', shadowColor: emailError ? '#FF0000' : 'transparent' },
                        ]}
                        value={email}
                        onChangeText={(text) => setEmail(text)}
                        placeholder='Your Email'
                    />
                    {emailError ? <Text style={tw`text-red-600`}>{emailError}</Text> : null}
                </View>
                <View style={tw`mt-2`}>
                    <Text style={tw`text-base font-bold mb-2 text-gray-800`}>Password:</Text>
                    <TextInput
                        style={[
                            tw`border rounded-md h-12 p-2 px-3 border-gray-400 text-gray-800`,
                            { borderColor: passwordError ? '#FF0000' : 'gray', shadowColor: passwordError ? '#FF0000' : 'transparent' },
                        ]}
                        value={password}
                        onChangeText={(text) => setPassword(text)}
                        placeholder='Your Password'
                        secureTextEntry={true}
                    />
                    {passwordError ? <Text style={tw`text-red-600`}>{passwordError}</Text> : null}
                </View>
                <View style={tw`mt-2`}>
                    <Text style={tw`text-base font-bold mb-2 text-gray-800`}>Confirm Password:</Text>
                    <TextInput
                        style={[
                            tw`border rounded-md h-12 p-2 px-3 border-gray-400 text-gray-800`,
                            { borderColor: confirmPasswordError ? '#FF0000' : 'gray', shadowColor: confirmPasswordError ? '#FF0000' : 'transparent' },
                        ]}
                        value={confirmPassword}
                        onChangeText={(text) => setConfirmPassword(text)}
                        placeholder='Confirm Password'
                        secureTextEntry={true}
                    />
                    {confirmPasswordError ? <Text style={tw`text-red-600`}>{confirmPasswordError}</Text> : null}
                </View>
                <TouchableOpacity style={[styles.button, tw`p-4 mt-4 rounded-md shadow-md`]} onPress={handleSignup}>
                    <Text style={tw`text-white text-center font-bold`}>Signup</Text>
                </TouchableOpacity>
            </View>
            <View style={tw`flex-row mt-5`}>
                <Text style={tw`text-center`}>Already have an account? </Text>
                <TouchableOpacity onPress={() => navigation.navigate('Login')}>
                    <Text style={tw`font-bold text-blue-600`}>Login</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#F5F5F5',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
    },
    button: {
        backgroundColor: '#007BFF',
    },
    buttonGoogle: {
        backgroundColor: '#4285F4',
    },
});
