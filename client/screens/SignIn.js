import { View, Text, Image, TextInput } from "react-native";
import tw from'twrnc';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";

const logo = require('../assets/images/logo.png');

const SignIn = ({ navigation }) => {

    const [emailInputValue, setEmailInputValue] = useState('');
    const [passwordInputValue, setPasswordInputValue] = useState('');


    const handleEmailText = (text) => {
      setEmailInputValue(text);
    };

    const handlePasswordText = (text) => {
        setPasswordInputValue(text);
      };
  


    return (

        <View style={tw `flex-1 justify-center items-center bg-white`}>
            <View style={tw `flex justify-center items-center mt-20`}>
                <Image 
                    source={logo}
                    style={tw `w-80 h-50`}
                    resizeMode="contain"
                />
                <Text style={tw `text-2xl font-bold`}>Welcome Back!</Text>
                <Text>Sign In to Continue Your Journey</Text>
            </View>
            <View style={tw `w-105 flex-1 items-center bg-blue-400 rounded-t-15 mt-20 p-15`}>
                <View style={tw `flex justify-center items-center`}>
                    <TouchableOpacity>
                        <TextInput 
                            style={tw `w-80 h-15 text-center rounded-full bg-white`}
                            placeholder="Email"
                            value={emailInputValue}
                            onChangeText={handleEmailText}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <TextInput 
                            style={tw `w-80 h-15 text-center rounded-full bg-white mt-10`}
                            placeholder="Password"
                            value={passwordInputValue}
                            onChangeText={handlePasswordText}
                        />
                    </TouchableOpacity>
                </View>
                <View style={tw `w-90 p-7`}>
                    <Text style={tw `text-right`}>Forgot Password?</Text>
                </View>
                <View style={tw `flex justify-center mt-5`}>
                    <TouchableOpacity style={tw `w-60 bg-white rounded-3`}>
                        <Text style={tw `text-blue-400 text-center p-5`}>Sign In</Text>
                    </TouchableOpacity>
                    <TouchableOpacity
                        onPress={() => navigation.navigate('SignUp')}
                    >
                        <Text style={tw `mt-5 font-bold text-center`}>Don't have an account? Sign Up</Text>

                    </TouchableOpacity>
                </View>
            </View>
        </View>
    )
}

export default SignIn;



