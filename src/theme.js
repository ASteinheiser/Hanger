// import { Platform } from 'react-native';

export const blue = '#4976f9';
export const black = '#000000';
export const white = '#ffffff';
export const darkGrey = '#565656';
export const fadedWhite = '#c9c9c9';

let height = 70;

// if (Platform.OS === 'ios') {
//   height = 80;
// }

export default theme = {
  // spacing: spacing,
  // typography: typography,
  // fontFamily: 'Roboto',
  palette: {
    primaryColor: blue,
    accentColor: white,
    primaryTextColor: darkGrey,
    secondaryTextColor: blue,
    canvasColor: white,
    borderColor: fadedWhite,
    disabledColor: fadedWhite,
    // pickerHeaderColor: fade(white, 0.12),
    // clockCircleColor: fade(white, 0.12),
  },
  toolbar: {
    container: {
      height: height
    }
  }
}
