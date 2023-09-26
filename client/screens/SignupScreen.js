import { View, Text, ScrollView, TextInput } from 'react-native'
import React from 'react'
import {MdPerson} from 'react-icons/md'

export default function SignupScreen() {
  return (
    <View>
        <View>
            <Text>Lets's Get Started</Text>
            <Text>Begin Your Journey, Sign Up Now.</Text>        
        </View>
        <ScrollView>
            <View>
                <View>
                    <MdPerson/>
                    <TextInput placeholder='Full Name' />
                </View>
            </View>
        </ScrollView>
    </View>
  )
}