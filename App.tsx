/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

import React, {useState, useEffect} from 'react';
import {Alert, Button, StyleSheet, Text, View} from 'react-native';

import {
  KvalifikaSDK,
  KvalifikaSDKLocale,
  KvalifikaSDKError,
} from '@kvalifika/react-native-sdk';

const App = () => {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    KvalifikaSDK.onInitialize(() => {
      Alert.alert('Kvalifika', 'Kvalifika SDK Initialized');
    });

    KvalifikaSDK.onStart(sessionId => {
      console.log(sessionId, counter);
    });

    KvalifikaSDK.onFinish(sessionId => {
      Alert.alert('Kvalifika', `Session finished with id: ${sessionId}`);
    });

    KvalifikaSDK.onError((error, message) => {
      console.log(error, message);

      if (error === KvalifikaSDKError.INVALID_APP_ID) {
        Alert.alert('Invalid App ID', 'Please provide a valid ID');
      }

      if (error === KvalifikaSDKError.USER_CANCELLED) {
      }

      if (error === KvalifikaSDKError.TIMEOUT) {
      }

      if (error === KvalifikaSDKError.USER_CANCELLED) {
      }

      if (error === KvalifikaSDKError.SESSION_UNSUCCESSFUL) {
      }

      if (error === KvalifikaSDKError.ID_UNSUCCESSFUL) {
      }

      if (error === KvalifikaSDKError.CAMERA_PERMISSION_DENIED) {
      }

      if (error === KvalifikaSDKError.LANDSCAPE_MODE_NOT_ALLOWED) {
      }

      if (error === KvalifikaSDKError.REVERSE_PORTRAIT_NOT_ALLOWED) {
      }

      if (error === KvalifikaSDKError.FACE_IMAGES_UPLOAD_FAILED) {
      }

      if (error === KvalifikaSDKError.DOCUMENT_IMAGES_UPLOAD_FAILED) {
      }

      if (error === KvalifikaSDKError.COMPARE_IMAGES_FAILED) {
      }

      if (error === KvalifikaSDKError.UNKNOWN_INTERNAL_ERROR) {
      }
    });

    return () => {
      KvalifikaSDK.removeCallbacks();
    };
  }, [counter]);

  useEffect(() => {
    KvalifikaSDK.initialize({
      appId: 'YOUR APP ID',
      locale: KvalifikaSDKLocale.EN,
    });
  }, []);

  return (
    <View style={styles.container}>
      <Text>Result: {counter}</Text>
      <Button onPress={() => setCounter(counter + 1)} title="Plus One" />
      <Button
        onPress={() => KvalifikaSDK.startSession()}
        title="Start Session"
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
  },
  highlight: {
    fontWeight: '700',
  },
});

export default App;
