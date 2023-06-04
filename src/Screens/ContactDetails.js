import {
  View,
  Text,
  TouchableOpacity,
  Image,
  Linking,
  PermissionsAndroid,
} from 'react-native';
import React from 'react';
import {useRoute} from '@react-navigation/native';
import Contacts from 'react-native-contacts';
import Communications from 'react-native-communications';

const ContactDetails = ({navigation}) => {
  const route = useRoute();
  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        Contacts.deleteContact({recordID: route.params.data.recordID}).then(
          recordId => {
            // contact deleted
            navigation.goBack();
          },
        );
      }
    });
  };

  return (
    <View style={{flex: 1, backgroundColor: '#0a3d62'}}>
      <View
        style={{
          width: '100%',
          height: 60,
          flexDirection: 'row',
          alignItems: 'center',
          paddingLeft: 20,
        }}>
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            source={require('../images/back.png')}
            style={{width: 24, height: 24, tintColor: '#fff'}}
          />
        </TouchableOpacity>
      </View>
      <Image
        source={
          route.params.data?.hasThumbnail
            ? {uri: route.params.data?.thumbnailPath}
            : require('../images/user.png')
        }
        style={{
          width: 100,
          height: 100,
          marginTop: 50,
          alignSelf: 'center',
          borderRadius: 50,
        }}
      />
      <Text
        style={{
          color: '#fff',
          alignSelf: 'center',
          marginTop: 20,
          fontSize: 40,
          fontWeight: 'bold',
        }}>
        {route.params.data?.displayName}
      </Text>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 70,
          alignSelf: 'center',
          borderColor: '#079992',
          borderRadius: 5,
          marginTop: 30,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => {
          Linking.openURL(`tel:${route.params.data?.phoneNumbers[0]?.number}`);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../images/phoneCall2.png')}
            style={{
              width: 40,
              height: 40,
              marginLeft: 15,
              borderRadius: 20,
            }}
          />
          <View style={{padding: 10}}>
            <Text style={{color: '#7CFCC4', fontWeight: 'bold', fontSize: 18}}>
              Number
            </Text>
            <Text style={{color: '#fff', marginTop: 4, fontSize: 12}}>
              {route.params.data?.phoneNumbers[0]?.number}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 70,
          alignSelf: 'center',
          borderColor: '#079992',
          borderRadius: 5,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => {
          const phoneNumber = route.params.data?.phoneNumbers[0]?.number;
          if (phoneNumber) {
            const url = `sms:${phoneNumber}`;
            Linking.canOpenURL(url)
              .then(supported => {
                if (supported) {
                  return Linking.openURL(url);
                } else {
                  throw new Error('SMS is not supported on this device.');
                }
              })
              .catch(error => {
                console.log(error);
              });
          }
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../images/message2.png')}
            style={{
              width: 40,
              height: 40,
              marginLeft: 15,
              borderRadius: 20,
            }}
          />
          <View style={{padding: 10}}>
            <Text style={{color: '#7CFCC4', fontWeight: 'bold', fontSize: 18}}>
              Text
            </Text>
            <Text style={{color: '#fff', marginTop: 4, fontSize: 12}}>
              {route.params.data?.phoneNumbers[0]?.number}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '90%',
          height: 70,
          alignSelf: 'center',
          borderBottomWidth: 0.8,
          borderColor: '#079992',
          // borderRadius: 5,
          marginTop: 10,
          flexDirection: 'row',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
        onPress={() => {
          const email = route.params.data?.emailAddresses[0]?.email;
          if (email) {
            Linking.openURL(`mailto:${email}`);
          }
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Image
            source={require('../images/mail.png')}
            style={{
              width: 40,
              height: 40,
              marginLeft: 15,
            }}
          />
          <View style={{padding: 10}}>
            <Text style={{color: '#7CFCC4', fontWeight: 'bold', fontSize: 18}}>
              Email
            </Text>
            <Text style={{color: '#fff', marginTop: 4, fontSize: 12}}>
              {route.params.data?.emailAddresses[0]
                ? route.params.data?.emailAddresses[0]?.email
                : `Not provided`}
            </Text>
          </View>
        </View>
      </TouchableOpacity>
      <TouchableOpacity
        style={{
          width: '65%',
          height: 45,
          borderRadius: 10,
          marginTop: 80,
          backgroundColor: 'red',
          justifyContent: 'center',
          alignItems: 'center',
          alignSelf: 'center',
          shadowColor: 'rgba(0, 0, 0, 0.3)',
          shadowOffset: {width: 0, height: 2},
          shadowOpacity: 0.5,
          shadowRadius: 4,
          elevation: 5,
        }}
        onPress={() => {
          getPermission();
        }}>
        <Text style={{color: 'white', fontSize: 20}}>Delete</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ContactDetails;
