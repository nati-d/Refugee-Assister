import { Text, View, TextInput } from "react-native"
import tw from 'twrnc';
import { TouchableOpacity } from "react-native-gesture-handler";
import { useState } from "react";



const SignUp2 = ({ navigation }) => {

    const [skill, setSkill] = useState('');
    const [work, setWork] = useState('');
    const [experience, setExperience] = useState('');
    const [origin, setOrigin] = useState('');
    const [language, setLanguage] = useState('');


    return (
        <View style={tw `flex-1 justify-center items-center bg-white`}>
            <View style={tw `flex items-center mt-20`}>
                <Text style={tw `text-5 font-bold`}>Personalize Your Profile</Text>
            </View>
            <View style={tw `w-80 mt-5`}>
                    <TextInput 
                        placeholder='Skill'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300 mt-7`}
                        value={skill}
                        onChangeText={setSkill}                    
                    />

                    <TextInput 
                        placeholder='Do you have any Work Experience?'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300 mt-7`}
                        value={work}
                        onChangeText={setWork}                    
                    />

                    <TextInput 
                        placeholder='Write about your Experience'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300 mt-7`}
                        value={experience}
                        onChangeText={setExperience}                    
                    />

                    <TextInput 
                        placeholder='Country of Origin'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300 mt-7`}
                        value={origin}
                        onChangeText={setOrigin}                    
                    />

                    <TextInput 
                        placeholder='Language'
                        style={tw `h-14 text-center rounded-full bg-gray-100 border border-gray-300 mt-7`}
                        value={language}
                        onChangeText={setLanguage}                    
                    />

            </View>
            <View style={tw `flex justify-center mt-20`}>
                <TouchableOpacity style={tw `w-60 bg-blue-400 rounded-2`}>
                    <Text style={tw `text-white font-bold text-center p-5`}>Sign Up</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('SignIn')}
                >
                    <Text style={tw `mt-5`}>Already have an account? Sign In</Text>
                </TouchableOpacity>
            </View>
        </View>
    )
}

export default SignUp2;