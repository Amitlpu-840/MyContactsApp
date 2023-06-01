import React, {useEffect, useState} from 'react';

import {PermissionsAndroid, Text, View} from 'react-native';
import Contacts from 'react-native-contacts';

function App(): JSX.Element {
  //   const isDarkMode = useColorScheme() === 'dark';

  //   const backgroundStyle = {
  //     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  //   };

  const [contacts, setContacts] = useState({});
  useEffect(() => {
    getPermission();
  });

  const getPermission = () => {
    PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.READ_CONTACTS, {
      title: 'Contacts',
      message: 'This app would like to view your contacts.',
      buttonPositive: 'Please accept bare mortal',
    }).then(res => {
      if (res == 'granted') {
        Contacts.getAll()
          .then(contact => {
            // work with contacts
            // console.log(contacts);
            setContacts(contact);
          })
          .catch(e => {
            console.log(e);
          });
      }
    });
  };

  return (
    <>
      <View>
        <Text>Hello world</Text>
      </View>
    </>
  );
}
export default App;
