import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppInput} from 'components/AppInput/AppInput';
import {useThemeContext} from 'contexts/ThemeContext';
import {AppStackParamList} from 'navigators';
import React, {useCallback, useEffect, useState} from 'react';
import {
  Linking,
  PermissionsAndroid,
  Pressable,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  CameraPermissionStatus,
  useCameraDevice,
  useCameraPermission,
} from 'react-native-vision-camera';

const Test: React.FC<
  NativeStackScreenProps<AppStackParamList, 'TestScreen'>
> = props => {
  const {colorScheme} = useThemeContext();
  const [cameraPermissionStatus, setCameraPermissionStatus] =
    useState<CameraPermissionStatus>('not-determined');
  const [isActiveCamera, setIsActiveCamera] = useState(true);
  const device = useCameraDevice('back');

  useEffect(() => {
    const requestPermissionCamera = async () => {
      console.log('Requesting camera permission...');
      const permission = await Camera.requestCameraPermission();
      console.log(`Camera permission status: ${permission}`);

      if (permission === 'denied') await Linking.openSettings();
      setCameraPermissionStatus(permission);
    };

    requestPermissionCamera();
  }, []);

  return (
    <View style={{flex: 1, backgroundColor: colorScheme.background}}>
      <Text>hi</Text>
      <TouchableOpacity
        onPress={() =>
          props.navigation.navigate('CameraScreen', {
            isActive: isActiveCamera,
            setIsActive: setIsActiveCamera,
          })
        }>
        <Text>Open Camera</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => props.navigation.navigate('SplashScreen')}>
        <Text>Click</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Test;
