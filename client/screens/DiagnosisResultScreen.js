import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Modal, StyleSheet } from 'react-native';
import tw from 'twrnc';
import { Ionicons } from '@expo/vector-icons';

export default function DiagnosisResultScreen({ route, navigation }) {
  const { diseaseName, details, treatment, recommendation } = route.params;
  const [activeTab, setActiveTab] = useState('Details');
  const [isModalVisible, setIsModalVisible] = useState(false);

  const handleTabChange = (tabName) => {
    setActiveTab(tabName);
  }

  const openModal = () => {
    setIsModalVisible(true);
  }

  const closeModal = () => {
    setIsModalVisible(false);
  }

  return (
    <ScrollView style={{ flex: 1 }}>
      <View style={{ backgroundColor: "white" }}>
        <TouchableOpacity style={tw`mt-7 ml-4 absolute z-10`} onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back" size={32} color="#007bff" />
        </TouchableOpacity>

        <View style={tw`w-full mt-2`}>
          <Image source={require('../assets/Doctor.png')} style={tw`w-full h-80`} />
        </View>
        <View style={tw`h-20 bg-blue-400 w-full -mt-7 rounded-t-3xl flex px-4`}>
          <Text style={tw`mt-4 text-lg font-bold text-white`}>{diseaseName}</Text>
        </View>
        <View style={tw`h-20 bg-white w-full -mt-5 rounded-t-3xl h-[100%] py-3 px-3`}>
          <View style={tw`flex flex-row justify-around`}>
            <TouchableOpacity onPress={() => handleTabChange('Details')} style={[tw`px-2 py-1`, activeTab === 'Details' ? { backgroundColor: 'white' } : {}]}>
              <Text style={[tw`text-sm font-semibold`, activeTab === 'Details' ? { color: '#007bff' } : { color: 'gray' }]}>Details</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabChange('Treatment')} style={[tw`px-2 py-1`, activeTab === 'Treatment' ? { backgroundColor: 'white' } : {}]}>
              <Text style={[tw`text-sm font-semibold`, activeTab === 'Treatment' ? { color: '#007bff' } : { color: 'gray' }]}>Treatment</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => handleTabChange('Recommendation')} style={[tw`px-2 py-1`, activeTab === 'Recommendation' ? { backgroundColor: 'white' } : { }]}>
              <Text style={[tw`text-sm font-semibold`, activeTab === 'Recommendation' ? { color: '#007bff' } : { color: 'gray' }]}>Recommendation</Text>
            </TouchableOpacity>
          </View>
          <View>
            {activeTab === 'Details' && (
              <View>
                <View style={tw`flex flex-row gap-20 m-auto mt-4`}>
                  <Image source={require('../assets/stethoscope-2-svgrepo-com.png')} style={tw`w-10 h-10`} />
                  <Image source={require('../assets/health-checklist-svgrepo-com.png')} style={tw`w-10 h-10`} />
                </View>
                <Text style={tw`text-base text-black font-bold mt-4`}>Details</Text>
                <Text style={tw`text-sm text-gray-600 font-regular mt-3`}>{details}</Text>
              </View>
            )}
            {activeTab === 'Treatment' && (
              <View>
                <View style={tw`flex flex-row gap-20 m-auto mt-4`}>
                  <Image source={require('../assets/pill-svgrepo-com.png')} style={tw`w-10 h-10`} />
                  <Image source={require('../assets/heal-svgrepo-com.png')} style={tw`w-10 h-10`} />
                </View>
                <Text style={tw`text-base text-black font-bold mt-3`}>Treatment</Text>
                <Text style={tw`text-sm text-gray-600 font-regular mt-3`}>{treatment}</Text>
              </View>
            )}
            {activeTab === 'Recommendation' && (
              <View>
                <View style={tw`flex flex-row gap-20 m-auto mt-4`}>
                  <Image source={require('../assets/hospital-ambulance-svgrepo-com.png')} style={tw`w-10 h-10`} />
                  <Image source={require('../assets/location-svgrepo-com.png')} style={tw`w-10 h-10`} />
                </View>
                <Text style={tw`text-base text-black font-bold mt-3`}>Recommendation</Text>
                <Text style={tw`text-sm text-gray-600 font-regular mt-3`}>{recommendation.Message}</Text>
                <TouchableOpacity style={tw`w-[90%] flex ml-auto py-2 rounded-full mt-5 bg-blue-400`} onPress={openModal}>
                  <Text style={tw`text-center text-base font-bold text-white`}>{recommendation.HospitalInfo.HospitalName}</Text>
                  <Text style={tw`text-center text-sm font-regular text-white`}>{recommendation.HospitalInfo.Location}</Text>
                </TouchableOpacity>
                <Modal visible={isModalVisible} transparent animationType="slide">
                  <View style={tw`flex-1 justify-center items-center bg-gray-900 bg-opacity-90`}>
                    <View style={styles.modalContent}>
                      <TouchableOpacity style={styles.closeButton} onPress={closeModal}>
                        <Ionicons name="close-circle" size={40} color="#000" />
                      </TouchableOpacity>
                      <Text style={styles.modalTitle}>Hospital Information</Text>
                      <View style={styles.infoContainer}>
                        <InfoItem label="Hospital Name" value={recommendation.HospitalInfo.HospitalName} />
                        <InfoItem label="History" value={recommendation.HospitalInfo.History} />
                        <InfoItem label="Speciality" value={recommendation.HospitalInfo.Speciality} />
                        <InfoItem label="Additional Info" value={recommendation.HospitalInfo.AdditionalInfo} />
                      </View>
                    </View>
                  </View>
                </Modal>
              </View>
            )}
          </View>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  modalContent: {
    backgroundColor: 'white',
    padding: 16,
    width: '90%', 
    borderRadius: 10,
    elevation: 5, 
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    width:50,
    height:50,
  },
  modalTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 16,
    color: '#000', 
  },
  infoContainer: {
    padding: 20,
  },
});

function InfoItem({ label, value }) {
  return (
    <View style={tw`flex flex-row mt-2`}>
      <Text style={tw`text-sm font-bold w-1/3`}>{label}:</Text>
      <Text style={tw`text-sm w-2/3`}>{value}</Text>
    </View>
  );
}
