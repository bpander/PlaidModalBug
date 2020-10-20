import React, { Fragment, useEffect, useState } from 'react';
import { Modal, Text, TouchableOpacity, View } from 'react-native';
import PlaidLink from 'react-native-plaid-link-sdk';

const fullScreenAndCenter = {
  flex: 1,
  justifyContent: 'center',
  alignItems: 'center',
};

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [token, setToken] = useState('');

  useEffect(() => {
    const loadToken = async () => {
      const res = await fetch('https://sandbox.plaid.com/link/token/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          client_id: 'OMITTED',
          secret: 'OMITTED',
          client_name: 'My App',
          language: 'en',
          country_codes: ['US'],
          user: { client_user_id: 'abcd-1234' },
          products: ['auth'],
        }),
      });
      const json = await res.json();
      setToken(json.link_token);;
    };
    loadToken();;
  }, []);

  useEffect(() => console.log({ isModalVisible }), [isModalVisible]);
 
  if (!token) {
    return null;
  }

  return (
    <Fragment>
      <View style={fullScreenAndCenter}>
        <TouchableOpacity onPress={() => setIsModalVisible(true)}>
          <Text>Open modal</Text>
        </TouchableOpacity>
      </View>
      <Modal visible={isModalVisible}>
        <View style={fullScreenAndCenter}>
          <TouchableOpacity onPress={() => setIsModalVisible(false)}>
            <Text>Close modal</Text>
          </TouchableOpacity>
          <PlaidLink
            token={token}
            onSuccess={data => console.log('success: ', data)}
          >
            <Text>Add Account</Text>
          </PlaidLink>
        </View>
      </Modal>
    </Fragment>
  );
};

export default App;
