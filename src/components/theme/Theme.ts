import {Theme} from '@react-navigation/native';
import {palette} from './Palette';
import {createTheme, CreateThemeOptions} from '@rneui/themed';
import {scaleFontSize, spacing} from './Spacing';
import {typography} from './Typography';
import {appInputHeight} from 'components/AppInput/AppInput';
import {useThemeContext} from 'contexts/ThemeContext';
import {style} from './Style';
import {hexToRgbA} from 'utils/Color';

const {colorScheme} = useThemeContext();

export const appNavTheme: Theme = {
  dark: false,
  colors: {
    primary: palette.black,
    background: palette.white,
    card: palette.white,
    text: palette.black,
    border: palette.white,
    notification: palette.primary5,
  },
};

export const appTheme: CreateThemeOptions = createTheme({
  mode: 'light',
  spacing: {
    xs: spacing.xs,
    sm: spacing.sm,
    md: spacing.md,
    lg: spacing.lg,
    xl: spacing.xl,
  },
  darkColors: {
    primary: palette.primary5,
    background: palette.gray24,
    white: palette.white,
  },
  lightColors: {
    primary: palette.primary5,
    background: palette.white,
    white: palette.white,
    black: palette.gray23,
  },
  components: {
    Text: (props, theme) => ({
      ...props,
      allowFontScaling: false,
      style: {
        fontWeight: undefined,
        fontFamily: typography.regular,
        fontSize: scaleFontSize(13),
      },
      h1Style: {
        fontWeight: undefined,
        fontFamily: typography.medium,
      },
      h2Style: {
        fontWeight: undefined,
        fontFamily: typography.medium,
      },
      h3Style: {
        fontWeight: undefined,
        fontFamily: typography.regular,
      },
      h4Style: {
        fontWeight: undefined,
        fontFamily: typography.regular,
      },
    }),
    Input: (props, theme) => {
      return {
        ...props,
        allowFontScaling: false,
        placeholderTextColor: palette.gray12,
        containerStyle: {
          paddingHorizontal: 0,
          borderWidth: 1,
          borderRadius: spacing.xs,
        },
        inputContainerStyle: {
          borderBottomWidth: 0,
          paddingTop: 0,
          minHeight: undefined,
          height: undefined,
        },
        inputStyle: {
          fontWeight: undefined,
          fontFamily: typography.regular,
          color: theme.colors.black,
          fontSize: scaleFontSize(16),
          paddingLeft: spacing.md,
        },
        labelStyle: {
          fontWeight: undefined,
          fontFamily: typography.regular,
          color: palette.gray12,
          fontSize: 14,
          marginTop: spacing.xs,
          marginLeft: spacing.md,
        },
        errorStyle: {
          fontFamily: typography.regular,
        },
        labelProps: {
          allowFontScaling: false,
        },
        leftIconContainerStyle: {
          aspectRatio: 1,
          paddingRight: 0,
          backgroundColor: 'red',
        },
      };
    },
    Button: (props, theme) => ({
      ...props,
      titleStyle: [
        {
          fontFamily: typography.regular,
          fontWeight: undefined,
          color:
            props.type === 'solid' || !props.type
              ? theme.colors.white
              : theme.colors.primary,
          fontSize: scaleFontSize(13),
        },
      ],
      buttonStyle: [
        {
          height: appInputHeight,
          paddingVertical: 0,
        },
        props.buttonStyle,
      ],
      disabledTitleStyle: {
        color: colorScheme.background,
      },
      radius: 999,
    }),
    CheckBox: (props, theme) => ({
      ...props,
      iconType: 'material-community',
      checkedIcon: 'checkbox-marked',
      uncheckedIcon: 'checkbox-blank-outline',
      checkedColor: colorScheme.text,
      textStyle: style.tx_font_regular,
      containerStyle: {marginLeft: 0, padding: 0},
    }),
    ListItem: (props, theme) => ({
      containerStyle: {backgroundColor: 'transparent', padding: 0},
    }),
    ListItemContent: (props, theme) => ({
      style: {backgroundColor: 'transparent'},
    }),
    ListItemTitle: (props, theme) => ({
      style: [style.tx_font_regular, props.style],
    }),
    ListItemSubtitle: (props, theme) => ({
      style: [
        {
          color: hexToRgbA(theme.colors.black, 0.6),
          fontSize: scaleFontSize(12),
          marginTop: spacing.xs,
        },
        style.tx_font_regular,
        props.style,
      ],
    }),
    Divider: (props, theme) => ({
      color: theme.mode === 'dark' ? palette.gray19 : palette.gray5,
      width: 1,
    }),
    Switch: (props, theme) => ({
      ...props,
      trackColor: {false: theme.colors.grey4, true: theme.colors.primary},
    }),
  },
});
