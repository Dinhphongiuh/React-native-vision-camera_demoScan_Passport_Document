import {images} from '@assets/index';
import {
  palette,
  scale,
  scaleFontSize,
  style,
  typography,
} from 'components/theme';
import React from 'react';
import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  NativeSyntheticEvent,
  Pressable,
  PressableProps,
  StyleProp,
  TextInput,
  TextInputFocusEventData,
  TextInputProps,
  View,
  ViewStyle,
} from 'react-native';
import {isIOS, Text} from '@rneui/base';
import {useThemeContext} from 'contexts/ThemeContext';
import {STextStyle, SViewStyle} from 'components/models/Style';
import Animated, {FadeIn, FadeOut} from 'react-native-reanimated';

export const appInputHeight = scale.y(38, 64);
const {colorScheme} = useThemeContext();

type AppInputProps = {
  rightIconImageSource?: ImageSourcePropType;
  errorMessage?: string;
  rightIconPressableProps?: PressableProps;
  label?: string;
} & TextInputProps;

export class AppInput extends React.Component<
  AppInputProps,
  {isFocusing: boolean; secureTextEntry: boolean}
> {
  private inputRef: React.RefObject<TextInput>;

  constructor(props: AppInputProps) {
    super(props);
    this.state = {
      isFocusing: false,
      secureTextEntry: this.props.secureTextEntry || false,
    };
    this.inputRef = React.createRef<TextInput>();
  }

  get isMaskHidden(): boolean {
    return this.state.isFocusing || Boolean(this.props.value);
  }

  focus() {
    this.inputRef.current?.focus();
  }

  blur() {
    this.inputRef.current?.blur();
  }

  private get _rightIconImageSource() {
    return this.props.secureTextEntry
      ? this.state.secureTextEntry
        ? images.eye_closed
        : images.eye
      : this.props.rightIconImageSource;
  }

  private _handleRightIconPressed() {
    if (this.props.secureTextEntry) {
      this.setState(prev => ({
        ...prev,
        secureTextEntry: !prev.secureTextEntry,
      }));
    } else {
      this.props.rightIconPressableProps?.onPress?.(undefined as any);
    }
  }

  private _handleFocus(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    this.setState({isFocusing: true});
    this.props.onFocus?.(e);
  }

  private _handleBlur(e: NativeSyntheticEvent<TextInputFocusEventData>) {
    this.setState({isFocusing: false});
    this.props.onBlur?.(e);
  }

  render(): React.ReactNode {
    const height = appInputHeight * (this.props.multiline ? 1.3 : 1);
    const $multilineStyle: ViewStyle | undefined = this.props.multiline
      ? {
          paddingTop: isIOS ? height * 0.2 : 0,
          marginTop: isIOS ? 0 : height * 0.1,
        }
      : undefined;

    return (
      <>
        <Text style={$label}>{this.props.label}</Text>
        <Pressable
          style={[
            $root,
            {
              height,
              borderColor: this.props.errorMessage
                ? palette.primary6
                : palette.gray12,
            },
          ]}
          onPress={() => this.focus()}>
          <TextInput
            {...this.props}
            ref={this.inputRef}
            value={this.props.value}
            onChangeText={this.props.onChangeText}
            style={[
              $inputStyle,
              $multilineStyle,
              {
                color:
                  this.props.editable === false
                    ? colorScheme.default
                    : colorScheme.text,
              },
            ]}
            onFocus={e => this._handleFocus(e)}
            onBlur={e => this._handleBlur(e)}
            secureTextEntry={this.state.secureTextEntry}
            placeholderTextColor={colorScheme.default}
          />
          {this._rightIconImageSource !== undefined ? (
            <Pressable
              {...this.props.rightIconPressableProps}
              style={$iconContainer}
              onPress={() => this._handleRightIconPressed()}>
              <Image
                source={this._rightIconImageSource}
                style={$inputIcon}
                tintColor={palette.gray12}></Image>
            </Pressable>
          ) : (
            <View style={style.mr_md} />
          )}
        </Pressable>
        {this.props.errorMessage ? (
          <Animated.View entering={FadeIn} exiting={FadeOut}>
            <Text style={$errorText}>{this.props.errorMessage}</Text>
          </Animated.View>
        ) : undefined}
      </>
    );
  }
}

const $root: SViewStyle = [
  {
    borderWidth: 1,
    borderColor: palette.gray12,
    borderRadius: scale.x(8, 12),
  },
  style.row,
  style.overflow_hidden,
];

const $inputStyle: STextStyle = [
  {
    fontSize: scaleFontSize(13),
    fontFamily: typography.regular,
  },
  style.flex_1,
  style.pl_xs,
];

const $label: STextStyle = [
  {
    fontSize: scaleFontSize(10),
    color: colorScheme.text,
  },
  style.mb_xxxs,
];

const $iconContainer: PressableProps['style'] = state => [
  style.px_sm,
  style.center,
  {transform: [{scale: state.pressed ? 0.9 : 1}]},
];

const $inputIcon: StyleProp<ImageStyle> = [
  {width: scale.x(24, 32), height: scale.x(24, 32)},
];
const $errorText: STextStyle = [
  style.tx_color_primary6,
  style.ml_xs,
  style.mt_xs,
];
