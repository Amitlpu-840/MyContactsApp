import {
  View,
  Text,
  PermissionsAndroid,
  FlatList,
  Image,
  TouchableOpacity,
  Linking,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Contact from 'react-native-contacts';
import {useIsFocused} from '@react-navigation/native';
import Communications from 'react-native-communications';
const Contacts = ({navigation}) => {
  const [contactList, setContactList] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    getPermission();
  }, [isFocused]);
  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        Contact.getAll()
          .then(con => {
            // work with contacts
            console.log('got contacts');
            setContactList(con);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };
  return (
    <View style={{flex: 1, backgroundColor: '#0a3d62'}}>
      <FlatList
        data={contactList}
        renderItem={({item, index}) => {
          return (
            <TouchableOpacity
              style={{
                width: '90%',
                height: 70,
                alignSelf: 'center',
                borderBottomWidth: 0.8,
                borderColor: '#079992',
                borderRadius: 10,
                marginTop: 10,
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
              onPress={() => {
                navigation.navigate('ContactDetails', {
                  data: item,
                });
              }}>
              <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <Image
                  source={require('../images/profile.png')}
                  style={{width: 40, height: 40, marginLeft: 15}}
                />
                <View style={{padding: 10}}>
                  <Text style={{color: '#7CFCC4', fontWeight: 'bold'}}>{item.displayName}</Text>
                  <Text style={{color: '#fff', marginTop: 4}}>
                    {item?.phoneNumbers[0]?.number}
                  </Text>
                </View>
              </View>
              <View style={{flexDirection: 'row', paddingRight: 15}}>
                <TouchableOpacity
                  onPress={() => {
                    const url = Communications.text(
                      item?.phoneNumbers[0]?.number,
                    );
                  }}>
                  <Image
                    source={require('../images/message.png')}
                    style={{
                      width: 24,
                      height: 24,
                      tintColor: '#fff',
                      marginRight: 20,
                    }}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(`tel:${item?.phoneNumbers[0]?.number}`);
                  }}>
                  <Image
                    source={require('../images/call.png')}
                    style={{width: 20, height: 20, tintColor: '#fff'}}
                  />
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          );
        }}
      />
      <TouchableOpacity
        style={{
          width: 50,
          height: 50,
          borderRadius: 25,
          backgroundColor: '#ACFC97',
          position: 'absolute',
          right: 30,
          bottom: 50,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => {
          navigation.navigate('AddContact');
        }}>
        <Image
          source={require('../images/plus.png')}
          style={{width: 24, height: 24}}
        />
      </TouchableOpacity>
    </View>
  );
};

export default Contacts;
