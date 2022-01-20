import React from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { withRouter } from 'react-router-dom';

import { Grid, Box, Card, Container, Typography, CardContent, Paper } from '@material-ui/core';
import { ListOutlined, AccessTime, Speed } from '@material-ui/icons';
import Image from 'material-ui-image';

import TutorialStep from '../components/TutorialStep';
import BookmarkButton from '../components/BookmarkButton';
import AffiliateProductCard from '../components/AffiliateProductCard';
import Loading from '../components/Loading';

import { setBookmarkedTutorials } from '../redux/actions/bookmarkActions';

import BookmarkService from '../services/BookmarkService';
import TutorialService from '../services/TutorialService';
import ShopComponentService from '../services/ShopComponentService';
import BikeComponentService from '../services/BikeComponentService';

const useStyles = makeStyles(() => ({
  title: {
    fontWeight: 600,
  },
}));

function Tutorial(props) {
  const classes = useStyles();

  const user = useSelector((state) => state.user);

  const bookmarksRedux = useSelector((state) => state.bookmarks.bookmarkedTutorials);

  const [tutorial, setTutorial] = React.useState();
  const [toolOptions, setToolOptions] = React.useState({});
  const [shopComponents, setShopComponents] = React.useState([]);
  const [bikeComponent, setBikeComponent] = React.useState({});
  const tutorialID = props.match.params.id;
  const bikeComponentID = props.match.params.componentId ? props.match.params.componentId : undefined;

  React.useEffect(async () => {
    try {
      const tutorial = await TutorialService.getTutorialWithToolOptions(tutorialID);
      setTutorial(tutorial);
      if (tutorial.toolOptions) {
        setToolOptions(tutorial.toolOptions);
      }
    } catch (e) {
      console.log(e);
    }
  }, [props.match.params.id]);

  React.useEffect(async () => {
    if (props.match.params.componentId) {
      try {
        const shopComponents = await ShopComponentService.listByBikeComponent(bikeComponentID);
        setShopComponents(shopComponents);
      } catch (e) {
        console.log(e);
      }
    }
  }, [props.match.params.id]);

  React.useEffect(async () => {
    if (props.match.params.componentId) {
      try {
        const bikeComponent = await BikeComponentService.getBikeComponent(bikeComponentID);
        setBikeComponent(bikeComponent);
      } catch (e) {
        console.log(e);
      }
    }
  }, [props.match.params.id]);

  const checkIfBookmarked = () => {
    for (const i in bookmarksRedux) {
      if (bookmarksRedux[i].tutorialId === tutorialID && bookmarksRedux[i].componentId === bikeComponentID) {
        console.log('Tutorial: ' + bookmarksRedux[i].tutorialId + ' === ' + tutorialID);
        console.log('Component: ' + bookmarksRedux[i].componentId + ' === ' + bikeComponentID);
        return true;
      }
    }
    return false;
  };

  return !tutorial ? (
    <Loading />
  ) : (
    <Container>
      <Grid container spacing={3} alignItems="flex-start" justify="center">
        <Grid item xs={12}>
          <Box mt={4} mb={1} display="flex" flexDirection="row" alignItems="center" justifyContent="center">
            <Typography variant="h4" className={classes.title}>
              {tutorial.name}
            </Typography>

            <BookmarkButton
              bookmarked={checkIfBookmarked()}
              size={38}
              bookmarkFunc={() => {
                // Not logged in
                if (!user) {
                  return;
                }

                // Do not bookmark if componentID is missing
                if (bikeComponentID === '') {
                  return;
                }

                const tutorialBookmark = {
                  tutorialId: tutorialID,
                  componentId: bikeComponentID,
                };

                //Filter out current tutorial
                const filtered = bookmarksRedux.filter(
                  (bookmark) => !(bookmark.tutorialId === tutorialID && bookmark.componentId === bikeComponentID)
                );

                if (!checkIfBookmarked()) {
                  // Send bookmark to backend and save in redux
                  BookmarkService.bookmarkTutorial(tutorialBookmark);
                  const bookmarkCopy = [...bookmarksRedux];
                  bookmarkCopy.push(tutorialBookmark);
                  props.dispatch(setBookmarkedTutorials(bookmarkCopy));
                } else {
                  // Send bookmark to delete to backend and remove from redux
                  BookmarkService.removeBookmarkTutorial(tutorialBookmark);
                  props.dispatch(setBookmarkedTutorials(filtered));
                }
              }}
            />
          </Box>
        </Grid>

        <Grid item xs={6} sm={5} md={4}>
          <Box mb={3}>
            <Paper variant="outlined">
              <Image src={tutorial.imageUrl}/>
            </Paper>
          </Box>
        </Grid>
        <Grid item xs={6} sm={7} md={8}>
          <Grid container spacing={2}>
            <Grid xs={12} item>
              <Card variant="outlined">
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item container xs={8} md={9}>
                      <Grid item container xs={3} sm={2} md={1}>
                        <Speed />
                      </Grid>
                      <Grid item container xs={9} sm={10} md={11}>
                        <Typography variant="body1">Difficulty</Typography>
                      </Grid>
                    </Grid>
                    <Grid item container xs>
                      <Typography variant="body1">{tutorial.difficulty}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={12} item>
              <Card variant="outlined">
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item container xs={8} md={9}>
                      <Grid item container xs={3} sm={2} md={1}>
                        <ListOutlined />
                      </Grid>
                      <Grid item container xs={9} sm={10} md={11}>
                        <Typography variant="body1">Steps</Typography>
                      </Grid>
                    </Grid>
                    <Grid item container xs>
                      <Typography variant="body1">{tutorial.steps.length}</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid xs={12} item>
              <Card variant="outlined">
                <CardContent>
                  <Grid container alignItems="center">
                    <Grid item container xs={8} md={9}>
                      <Grid item container xs={3} sm={2} md={1}>
                        <AccessTime />
                      </Grid>
                      <Grid item container xs={9} sm={10} md={11}>
                        <Typography variant="body1">Time Required</Typography>
                      </Grid>
                    </Grid>
                    <Grid item container xs>
                      <Typography variant="body1">{tutorial.timeRequired} minutes</Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        </Grid>

        <Grid item container spacing={1} xs={12}>
          <Grid item xs={12}>
            <Typography variant="h5" className={classes.title}>
              Introduction
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Box mb={3}>
              <Card variant="outlined">
                <CardContent>
                  <Typography variant="body1">{tutorial.description}</Typography>
                </CardContent>
              </Card>
            </Box>
          </Grid>
        </Grid>

        <Grid item container spacing={1} xs={6}>
          <Grid item xs={12} hidden={Object.entries(toolOptions).length === 0}>
            <Typography variant="h5" className={classes.title}>
              Tools
            </Typography>
            {!(toolOptions && Object.entries(toolOptions).length > 0) ? (
              <Typography variant="body2" color="textSecondary">
                No tools specified.
              </Typography>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Recommended tools are listed below. You require one tool option from each box.
              </Typography>
            )}
          </Grid>

          {!(toolOptions && Object.entries(toolOptions).length > 0) ? (
            <React.Fragment />
          ) : (
            Object.keys(toolOptions).map((toolCategory) => (
              <Grid item xs={12} key={toolCategory}>
                <AffiliateProductCard title={toolCategory} products={toolOptions[toolCategory]} />
              </Grid>
            ))
          )}
        </Grid>

        <Grid item container xs={6} spacing={1}>
          <Grid item xs={12} hidden={Object.entries(toolOptions).length === 0}>
            <Typography variant="h5" className={classes.title}>
              Parts
            </Typography>
            {!(shopComponents && shopComponents.length > 0) ? (
              <Typography variant="body2" color="textSecondary">
                No parts specified.
              </Typography>
            ) : (
              <Typography variant="body2" color="textSecondary">
                Suitable replacement parts are listed below. Select one of the options.
              </Typography>
            )}
          </Grid>

          {!(shopComponents && shopComponents.length > 0) ? (
            <React.Fragment />
          ) : (
            <Grid item xs={12}>
              <AffiliateProductCard title={`Replacement parts for ${bikeComponent.name}`} products={shopComponents} />
            </Grid>
          )}
        </Grid>

        {tutorial.steps.map((step, index) => {
          return (
            <TutorialStep
              key={index}
              stepNr={index}
              type={step.type}
              title={step.title}
              description={step.description}
              mediaUrl={step.mediaUrl}
              stepId={step._id}
              nrOfComments={step.comments.length}
            />
          );
        })}
      </Grid>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch,
  };
};

export default connect(
  null,
  mapDispatchToProps
)(withRouter(Tutorial));
