import {NativeStackScreenProps} from '@react-navigation/native-stack';
import {AppStackParamList} from 'navigators';
import React from 'react';
import {Layout} from 'components/Layout/Layout';
import {Image, StyleProp, Text, TextStyle, View} from 'react-native';
import {style} from 'components/theme';
import {images} from '@assets/index';

export const IntroScreen: React.FC<
  NativeStackScreenProps<AppStackParamList, 'IntroScreen'>
> = ({navigation}) => {
  return (
    <Layout safeAreaOnBottom>
      {/* <View style={$header}> */}
        {/* <Image source={images.introLogo} style={{width: 200, height: 200}}></Image> */}
        <Text>Header</Text>
      {/* </View> */}
    </Layout>
  );
};

const $header: StyleProp<TextStyle> = [style.tx_size_sm];
