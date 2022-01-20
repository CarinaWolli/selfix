import React from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Grid, Box, Card, CardContent } from '@material-ui/core';
import Carousel from 'react-material-ui-carousel';
import BikeService from '../services/BikeService';
import TutorialService from '../services/TutorialService';
import BikeComponentService from '../services/BikeComponentService';
import { openSidebar } from '../redux/actions/sidebarActions';
import Button from '@material-ui/core/Button';
import BookmarkedComponent from '../components/BookmarkedComponent';
import InfoCard from '../components/InfoCard';

const useStyles = makeStyles((theme) => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  upperBackground: {
    width: '100%',
    background: 'linear-gradient( rgba(0, 0, 0, 0), rgba(0, 0, 0, 0) ), url(/sunbike.jpg)',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    display: 'flex',
    height: '75vh',
  },
  titleText: {
    fontSize: '4em',
    paddingLeft: theme.spacing(25),
    lineHeight: '1em',
    fontWeight: 600,
  },
  subTitleText: {
    fontSize: '2em',
    paddingLeft: theme.spacing(25),
  },
  titleContainer: {
    marginTop: 'auto',
    marginBottom: 'auto',
    minWidth: '30vw',
    maxWidth: '50vw',
    display: 'flex',
    flexDirection: 'column',
  },
  categoryButtonDiv: {
    paddingLeft: theme.spacing(25),
    paddingTop: theme.spacing(2),
  },
  categoryButton: {
    fontWeight: 600,
    color: '#fff',
    background: '#1f1408',
  },
  bookmarkHeader: {
    padding: theme.spacing(2),
  },
  secondContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  thirdContainer: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  image: {
    height: 'auto',
    width: '100%',
    display: 'block',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: theme.spacing(2),
  },
  lowerText: {
    marginTop: 'auto',
    marginBottom: 'auto',
  },
  lowerTextLeft: {
    marginTop: 'auto',
    marginBottom: 'auto',
    textAlign: 'end',
  },
  bookmarksTitleText: {
    fontSize: '1.5em',
    fontWeight: 600,
    textAlign: 'center',
  },
}));

/**
 * Displays the landing page
 * @param {props} props
 */
function LandingPage(props) {
  const classes = useStyles();

  const user = useSelector((state) => state.user.user);

  const bookmarksBikesRedux = useSelector((state) => state.bookmarks.bookmarkedBikes);

  const [bookmarkedBikes, setBookmarkedBikesState] = React.useState([]);

  React.useEffect(async () => {
    try {
      let bikes = [];
      for (let index in bookmarksBikesRedux) {
        try {
          bikes.push(await BikeService.getBike(bookmarksBikesRedux[index]));
        } catch (e) {
          console.log(e);
        }
      }
      setBookmarkedBikesState(bikes);
    } catch (e) {
      console.log(e);
    }
  }, [bookmarksBikesRedux]);

  const bookmarkedTutorialRedux = useSelector((state) => state.bookmarks.bookmarkedTutorials);

  const [bookmarkedTutorial, setBookmarkedTutorials] = React.useState([]);

  React.useEffect(async () => {
    let tutorialComponent = [];
    for (let index in bookmarkedTutorialRedux) {
      try {
        tutorialComponent.push({
          tutorial: await TutorialService.getTutorial(bookmarkedTutorialRedux[index].tutorialId),
          component: await BikeComponentService.getBikeComponent(bookmarkedTutorialRedux[index].componentId)
        });
      } catch (e) {
        console.log(e);
      }
    }
    setBookmarkedTutorials(tutorialComponent);
  }, [bookmarkedTutorialRedux]);

  return (
    <div className={classes.container}>
      <div className={classes.upperBackground}>
        <Box className={classes.titleContainer}>
          <Typography className={classes.titleText}>FIX YOUR BIKE ON YOUR OWN</Typography>
          <Typography className={classes.subTitleText}>with easy-to-follow instructions!</Typography>
          <Box className={classes.categoryButtonDiv}>
            <Button
              className={classes.categoryButton}
              variant="contained"
              size="large"
              onClick={() => props.toggleSidebarOpen()}
            >
              Search your bike by brand
            </Button>
          </Box>
        </Box>
      </div>

      {user ? (
        <Box py={5} className={classes.secondContainer} display="flex" style={{ width: '80vw' }}>
          <Grid container justify="space-around" spacing={1}>
            <Grid item xs={12} md={5}>
              <Card elevation={5}>
                <CardContent>
                  <Grid container spacing={3}>
                    <Grid item xs={12}>
                      <Typography className={classes.bookmarksTitleText}>Tutorial Bookmarks</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      {bookmarkedTutorial && bookmarkedTutorial.length > 0 ? (
                        <Carousel interval={10000} timeout={500}>
                          {bookmarkedTutorial.map((tutorial, index) => (
                            <BookmarkedComponent key={index} item={tutorial} uri="tutorial" />
                          ))}
                        </Carousel>
                      ) : (
                        <React.Fragment>
                          <Typography className={classes.bookmarksTitleText} variant="subtitle1" color="textSecondary">
                            No bookmarks yet.
                          </Typography>
                          {!bookmarkedBikes || bookmarkedBikes.length == 0 ? null : <BookmarkedComponent />}
                        </React.Fragment>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
            <Grid item xs={12} md={5}>
              <Card elevation={5}>
                <CardContent>
                  <Grid container spacing={3} justify="center">
                    <Grid item xs={12}>
                      <Typography className={classes.bookmarksTitleText}>Bike Bookmarks</Typography>
                    </Grid>

                    <Grid item xs={12}>
                      {bookmarkedBikes && bookmarkedBikes.length > 0 ? (
                        <Carousel interval={10000} timeout={500}>
                          {bookmarkedBikes.map((bike, index) => (
                            <BookmarkedComponent key={index} item={bike} uri="bike" />
                          ))}
                        </Carousel>
                      ) : (
                        <React.Fragment>
                          <Typography className={classes.bookmarksTitleText} variant="subtitle1" color="textSecondary">
                            No bookmarks yet.
                          </Typography>
                          {!bookmarkedTutorial || bookmarkedTutorial.length == 0 ? null : <BookmarkedComponent />}
                        </React.Fragment>
                      )}
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Box>
      ) : null}
      <Box py={2} className={classes.thirdContainer}>
        <Box py={2}>
          <InfoCard
            imageLeft={true}
            image="orangetie.jpg"
            imageTitle="bikeslanding"
            title="Bicycle repair simplified!"
            information="Your bike is broken and you have no clue how to fix it? No problem! Find your exact bike in our extensive list of bicycles and then select the bike component that needs to be repaired. For each bike component we offer detailed tutorials that guide you through the repair process step by step."
          />
        </Box>

        <InfoCard
          imageLeft={false}
          image="multibikes.jpg"
          imageTitle="bikeslanding"
          title="Tutorials for every kind of bike!"
          information="We offer tutorials for all kinds of bikes, gravel bikes, mountain bikes, racing bikes, trekking Bikes - you name it. Use the search field to find your exact bicycle. If you do not have the exact model in mind, search it via our sidebar."
        />

        <InfoCard
          imageLeft={true}
          image="tools.jpg"
          imageTitle="toolslanding"
          title="Suggested tools and replacement parts!"
          information="To facilitate the repair process, each tutorial has a list of necessary tools and suitable replacement parts. For each tool category, simply browse through the recommended options and choose the one that fits your budget."
        />
      </Box>
    </div>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    toggleSidebarOpen: () => dispatch(openSidebar()),
    dispatch,
  };
};

// connect() establishes the connection to the redux functionalities
export default connect(
  null,
  mapDispatchToProps
)(LandingPage);
