import {NavigationContainer} from '@react-navigation/native';
import {ThemeProvider} from 'contexts/ThemeContext';
import {AppStack} from 'navigators/AppStack';
import React, {useEffect} from 'react';
import {PermissionsAndroid} from 'react-native';
import messaging from '@react-native-firebase/messaging';
import {
  getFCMToken,
  NotificationListener,
  onDisplayNotification,
} from './utils/pushnotification_helper';

export default function App(): React.JSX.Element {
  useEffect(() => {
    const requestUserPermission = async () => {
      PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
      );
      const authStatus = await messaging().requestPermission();
      const enabled =
        authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
        authStatus === messaging.AuthorizationStatus.PROVISIONAL;
      if (enabled) {
        console.log('Authorization status: ', authStatus);
        const token = await messaging().getToken();
        console.log('FCM token: ', token);
      }
    };
    requestUserPermission();
    NotificationListener();
  }, []);

  return (
    <ThemeProvider>
      <NavigationContainer>
        <AppStack />
      </NavigationContainer>
    </ThemeProvider>
  );
}
