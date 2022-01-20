import React, { useEffect } from 'react';
import { Switch } from 'react-router-dom';
import { connect, useSelector } from 'react-redux';
import { MuiThemeProvider, createMuiTheme, makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import ScrollContainer from './components/ScrollContainer';
import { BrowserRouter as Router } from 'react-router-dom';
import RouteWithSubRoutes from './RouteWithSubRoutes';

import routes from './routes';
import Header from './components/Header';
import Footer from './components/Footer';
import AppTheme from './theming/themetypes';
import AppThemeOptions from './theming/themes';
import { setBookmarkedBikes, setBookmarkedTutorials } from './redux/actions/bookmarkActions';

import BookmarkService from './services/BookmarkService';

const useStyles = makeStyles(() => ({
  appRoot: {
    height: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },
}));

function App(props) {
  const classes = useStyles();

  // set document title
  useEffect(() => {
    document.title = 'Selfix';
  }, []);

  const user = useSelector((state) => state.user);

  useEffect(async () => {
    if (!user.user) {
      return;
    }

    try {
      const resultTutorials = await BookmarkService.getTutorialBookmarks();
      props.dispatch(setBookmarkedTutorials(resultTutorials));
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  useEffect(async () => {
    if (!user.user) {
      return;
    }

    try {
      const resultBikes = await BookmarkService.getBikeBookmarks();
      props.dispatch(setBookmarkedBikes(resultBikes));
    } catch (e) {
      console.log(e);
    }
  }, [user]);

  // theme for app
  const [theme, setTheme] = React.useState(AppTheme.LIGHT);

  // toggle theme
  const toggleTheme = () => {
    setTheme(theme === AppTheme.LIGHT ? AppTheme.DARK : AppTheme.LIGHT);
  };

  return (
    <Router>
      <div className={classes.appRoot}>
        <MuiThemeProvider theme={createMuiTheme(AppThemeOptions[theme])}>
          <CssBaseline />
          <React.Fragment>
            <Header darkmode={theme === AppTheme.DARK} toggletheme={toggleTheme} />
            <ScrollContainer>
              <Switch>
                {routes.map((route, i) => (
                  <RouteWithSubRoutes key={i} {...route} />
                ))}
              </Switch>
              <Footer />
            </ScrollContainer>
          </React.Fragment>
        </MuiThemeProvider>
      </div>
    </Router>
  );
}

export default connect(
  null,
  (dispatch) => {
    return { dispatch };
  }
)(App);
