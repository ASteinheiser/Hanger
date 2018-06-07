// import { Platform } from 'react-native';

export const pink = '#f85dff';
export const black = '#000000';
export const white = '#ffffff';
export const darkGrey = '#303030';
export const fadedWhite = '#c9c9c9';

let height = 90;
let padding = 25;

// if (Platform.OS === 'ios') {
//   height = 80;
//   padding = 15;
// }

export default theme = {
  // spacing: spacing,
  // typography: typography,
  // fontFamily: 'Roboto',
  palette: {
    primaryColor: pink,
    accentColor: black,
    primaryTextColor: darkGrey,
    secondaryTextColor: black,
    canvasColor: white,
    borderColor: fadedWhite,
    disabledColor: fadedWhite,
    // pickerHeaderColor: fade(white, 0.12),
    // clockCircleColor: fade(white, 0.12),
  },
  toolbar: {
    container: {
      height: height
    },
    centerElementContainer: {
      paddingTop: padding
    },
    leftElementContainer: {
      paddingTop: padding
    },
    rightElementContainer: {
      paddingTop: padding
    }
  }
}
