import { View, Text, Image, TouchableOpacity } from "react-native";
import tw from 'twrnc';
import { signOut } from 'firebase/auth';
import { auth } from '../config/firebase';

export default function ProfilePage() {
    const handleLogout = async() => {
        await signOut(auth);
    }

    const fetchUser = async () => {
        try {
          const response = await axios.get(`https://192.168.1.9:3000/getUser?userEmail=${user.email}`);
          
          if (response?.data?.getUser) {
            setUser(response.data.getUser);
          }
        } catch (err) {
          console.error('Error fetching chat history:', err.message);
        }
      };
      
      useEffect(() => {
        fetchUser(); 
      }, []); 
    return (
        <View style={tw`flex-1 items-center bg-white `}>
            <View style={tw`w-full h-100 `}>
                <Image source={require("../assets/portrait.jpg")} style={tw`w-full h-full bg-cover`} />
            </View>
            <View style={tw`relative bg-red  flex-1 flex-column w-full`}>

            <View style={tw`absolute w-full flex-1 -mt-6 bg-white p-5 rounded-t-3xl`}>
                <Text style={tw`font-bold text-3xl`}>Nathnael Desalegn</Text>
                <Text style={tw`font-semibold text-base`}>nathnaeldes@gmail.com</Text>
                <TouchableOpacity onPress ={handleLogout}style={tw`bg-red-600 w-[75%] m-auto py-3 rounded-t-md rounded-b-md mt-10`}>
                    <Text style={tw`text-center text-white font-semibold`}>Sign out</Text>
                </TouchableOpacity>
                

            </View>
            </View>

        </View>
    );
}
