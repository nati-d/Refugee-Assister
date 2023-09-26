import React, { useRef, useState } from 'react';

import { SafeAreaView, StyleSheet, Dimensions, StatusBar, FlatList, TouchableWithoutFeedback, View, TouchableOpacity } from 'react-native';
const { width, heigth } = Dimensions.get('window');
const Colors = { Blue: '#28C2FF', Gray: '#AEB7B3',white:'#fff '};
const slides =
    [
        {
            id: '1',
            image: require('./assets/photo_2023-09-19_13-22-15.jpg'),

        },
        {
            id: '2',
            image: require('./assets/photo_2023-09-22_09-40-10.jpg'),
            title: 'Guiding Resiliance'
        },
        {
            id: '3',
            image: require('./assets/photo_2023-09-22_09-40-10.jpg'),
            title: 'Healing Paths',
            description: 'Guiding Mental Health and Medical Wellness Toward a Balanced, Resilient, and Fulfilling Life Journey.',

        },
        {
            id: '4',
            image: require('./assets/photo_2023-09-22_09-40-10.jpg'),
            title: 'Chatbot Compass',
            description: 'Navigating Your Journey with AI for Smart and Helpful Conversational Guidance and Support.',

        },
        {
            id: '5',
            image: require('./assets/photo_2023-09-22_09-39-52.jpg'),
            title: 'Universal Connection',
            description: 'Bridging Language Barriers and Simplifying Tasks with Voice-Powered Chatbot Guidance and Support.',

        }
    ];
const slide = ({ item }) => {
    return (
        <View style={{ alignItems: 'center' }}>
            <Image source={item.image} style={{ heigth: '75%', width, resizeMode: "contain" }} />
            <Text style=
                {StyleSheet.item}>{item.tiitle}</Text>
            <Text style=
                {StyleSheet.item}>{item.description}</Text>

        </View>
    )
}
const spalshscreen = ({ navigation }) => {
    const [currentSlideIndex,setcurrentSlideIndex]=useState(0);
    const ref = useRef();
    const Footer = () => {
        return (
            <View style={{
                heigth: heigth * 0.25, justifycontent: 'space-between',
                paddinghorizontal: 20,
            }}>
                <View style={{ flexdirection: 'row', justifycontent: 'center', marginTop: 20 }}>
                    {slides.map((_,index)=>(
                        <View key={index} style={[styles.indicator,currentSlideIndex == index && { backgroundColor:Colors.Blue,
                        width:15,
                    }
                    ]}/>
                    ))}
                </View>
                <View style={{marginBottom:20}}
                >
                    (currentSlideIndex==slide.length-1 ? <View style ={{heigth:50}}>
                     <TouchableOpacity style={[styles.btn]} onPress={()=>navigation.replace('HomeScreen')}>
                             <Text style={{fontWeight:'bold',fontSize:15}}>GET STARTED</Text>
                         </TouchableOpacity>
                     </View>)
                   : (<View style={{flexDirection:'row'}}>
                   <TouchableOpacity style={[styles.btn,{backgroundColor:'transparent',borderWidth:1,borderColor:none}]} onPress={skip}>
                       <Text style={{fontWeight:'bold',fontSize:15}}>Skip</Text>
                   </TouchableOpacity>
                   <View style={{width:15}}/>
                   <TouchableOpacity style={[styles.btn]}>
                       <Text style={{fontWeight:'bold',fontSize:15}}>Next</Text>
                   </TouchableOpacity>
               </View>)
           </View>
           </View>
   );
                   }
                     
                   
    // };
    function updateCurrentIndex(e) {
        const contentOffSet = e.nativeEvent.contentOffSet.x;
        const currentIndex = Math.round(contentOffSet / width);
        setcurrentSlideIndex(currentIndex);
    }  
    const goNextSlide  = ()=>{
        const nextSlideIndex=currentSlideIndex+1;
        if(nextSlideIndex!=slide.lenght){
            const offset=nextSlideIndex*width;
            ref?.current?.scrollToOffset({offset});
            setcurrentSlideIndex(nextSlideIndex)
        }
        

    }; 
    const skip =()=>{
        const lastSlideIndex=slide.length-1;
        const offset=lastSlideIndex*width;
        ref?.current?.scrollToOffset({offset});
        setcurrentSlideIndex(currentSlideIndex+1) // or tplastSlideIndex
    }

        return (<SafeAreaView style={{ flex: 1, backgroundColor: Colors.Blue }}>
        <StatusBar style={{ backgroundColor: Colors.Blue }} />
        <FlatList
        ref={ref}
            pagingEnabled
            data={slides}
            contententContainerStyle={{ height: heigth * 0.75 }}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => <slide item={item} />
            } />
        <Footer />
    </SafeAreaView>);

        };
const styles = StyleSheet.create({
    title: {
        color: Colors.Gray,
        fontSize: 22,
        fontWeight: 'bold',
        marginTop: 30,
    },
    description: {
        color: Colors.Gray,
        fontSize: 13,
        maxWidth: '75%',
        marginTop: 10,
        textAlign: center,
        lineHeight: 23,

    },
    indicator: {
        height: 2.5,
        width: 10,
        backgroundColor: 'white',
        marginHorizontal: 20,

    },
    btn:{
        flex:1,
        height:50,
        borderRadius:5,
        backgroundColor:Colors.white,
        justifyContent:'center',
        alignItems:'center',
    }

})

export default spalshscreen;