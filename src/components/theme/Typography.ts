import { Platform } from "react-native";

const getTypography = () => ({
    bold: "",
    boldItalic: "",
    extraBold: "",
    extraBoldItalic: "",
    italic: "",
    medium: "",
    mediumItalic: "",
    regular: "",
    semiBold: "",
    semiBoldItalic: "",
});

export const typography = getTypography();
export type KTypography = keyof typeof typography;