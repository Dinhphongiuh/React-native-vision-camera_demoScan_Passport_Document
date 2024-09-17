import {createNativeStackNavigator} from '@react-navigation/native-stack';
import TestScreen from '../screens/Test';
import {SplashScreen} from 'screens/SplashScreen';
import {IntroScreen} from 'screens/IntroScreen/IntroScreen';
import {CameraScreen} from 'screens/CameraScreen';

export type AppStackParamList = {
  TestScreen: undefined;
  SplashScreen: undefined;
  IntroScreen: undefined;
  CameraScreen: {
    isActive: boolean;
    setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  };
};

const Stack = createNativeStackNavigator<AppStackParamList>();

export const AppStack = () => {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShadowVisible: false,
      }}>
      <Stack.Group>
        <Stack.Screen name="TestScreen" component={TestScreen}></Stack.Screen>
        <Stack.Screen
          name="SplashScreen"
          component={SplashScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="IntroScreen"
          component={IntroScreen}
          options={{headerShown: false}}></Stack.Screen>
        <Stack.Screen
          name="CameraScreen"
          component={CameraScreen}
          options={{headerShown: false}}></Stack.Screen>
      </Stack.Group>
    </Stack.Navigator>
  );
};
