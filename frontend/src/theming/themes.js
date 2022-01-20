import { AppTheme } from './themetypes';

const themeindependent = {
  typography: {
    fontFamily: ['Source Code Sans', 'sans-serif'],
  },
  mixins: {
    textfieldminheight: '38px',
  },
};

const appThemeOptions = {
  [AppTheme.LIGHT]: {
    palette: {
      type: 'light',
      primary: {
        light: '#ffa76e',
        main: '#f47d2f',
        dark: '#fc6400',
      },
      secondary: {
        light: '#cccccc',
        main: '#969696',
        dark: '#616161',
      },
      background: {
        paper: '#fff',
        default: '#fafafa',
      },
    },
    ...themeindependent,
  },
  [AppTheme.DARK]: {
    palette: {
      type: 'dark',
      primary: {
        light: '#616161',
        main: '#424242',
        dark: '#212121',
      },
      secondary: {
        light: '#5A42EA',
        main: '#3E22E6',
        dark: '#22108E',
      },
      background: {
        paper: '#303030',
        default: '#000',
      },
    },
    ...themeindependent,
  },
};

export default appThemeOptions;
