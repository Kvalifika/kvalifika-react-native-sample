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

      if (error === KvalifikaSDKError.USER_CANCELLED) {
        setTimeout(() => {
          Alert.alert('User cancelled verification');
        }, 1000);
      }
    });

    return () => {
      KvalifikaSDK.removeCallbacks();
    };
  }, [counter]);

  useEffect(() => {
    KvalifikaSDK.initialize({
      appId: '',
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
