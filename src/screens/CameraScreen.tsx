import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from 'navigators';
import React, {useCallback, useMemo, useRef, useState} from 'react';
import {
  Dimensions,
  Image,
  ImageSourcePropType,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  Camera,
  useCameraDevice,
  TakePhotoOptions,
  PhotoFile,
  useFrameProcessor,
  CameraRuntimeError,
} from 'react-native-vision-camera';
import {useSharedValue} from 'react-native-worklets-core';
import {getColorPalette} from 'utils/getColorPalette';
import {detect} from 'vision-camera-dynamsoft-document-normalizer';

const DEFAULT_COLOR = '#000000';
const {width} = Dimensions.get('window');
export const CameraScreen: React.FC<
  NativeStackScreenProps<AppStackParamList, 'CameraScreen'>
> = props => {
  const [imagePick, setImagePick] = useState<string>();
  const [frameProcessorFps, setFrameProcessorFps] = useState(3);
  console.log(imagePick);
  const colorAnimationDuration = useMemo(
    () => (1 / frameProcessorFps) * 1000,
    [frameProcessorFps],
  );

  const camera = useRef<Camera>(null);
  const device = useCameraDevice('back');
  const takePhoto = async () => {
    const pick = await camera.current?.takePhoto({});
    console.log(await pick?.path);
    // if (pick?.path) setImagePick(pick?.path);
  };

  const frameProcessor = useFrameProcessor(frame => {
    'worklet';
    const detectionResults = detect(frame);
    console.log(detectionResults);
    
  }, []);
  return (
    <>
      {imagePick === undefined ? (
        <>
          <Camera
            frameProcessor={frameProcessor}
            ref={camera}
            device={device}
            isActive={props.route.params.isActive}
            style={StyleSheet.absoluteFill}
            photo={true}></Camera>
          <TouchableOpacity
            onPress={takePhoto}
            style={{
              position: 'absolute',
              width: 80,
              height: 80,
              borderWidth: 5,
              borderRadius: 100,
              borderColor: '#fff',
              bottom: 40,
              left: width / 2 - 80 / 2,
            }}></TouchableOpacity>
        </>
      ) : (
        <Image
          source={imagePick as ImageSourcePropType}
          style={{width: 500, height: 500}}></Image>
      )}
    </>
  );
};
