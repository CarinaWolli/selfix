import React from 'react';
import { connect, useSelector } from 'react-redux';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Container } from '@material-ui/core';
import BikeService from '../services/BikeService';
import BikeResultTutorialPopover from '../components/BikeResultTutorialPopover';
import Breadcrumbs from '../components/BreadcrumbComponent';
import Loading from '../components/Loading';
import BookmarkService from '../services/BookmarkService';
import { setBookmarkedBikes } from '../redux/actions/bookmarkActions';
import BikeIconImages from '../services/BikeIconImages';
import BikeSearchListItem from '../components/BikeSearchListItem';

const useStyles = makeStyles(() => ({
  container: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    width: '100%',
  },
  bikeContainer: {
    width: '100%',
    position: 'relative',
  },
  bikeImage: {
    width: '100%',
    height: 'auto',
  },
  buttonSaddle: {
    position: 'absolute',
    left: '25%',
    top: '12%',
  },
  buttonBackWheel: {
    position: 'absolute',
    left: '5%',
    top: '60%',
  },
  buttonFrontWheel: {
    position: 'absolute',
    left: '80%',
    top: '50%',
  },
  buttonDrivetrain: {
    position: 'absolute',
    left: '25%',
    top: '60%',
  },
  buttonPedals: {
    position: 'absolute',
    left: '45%',
    top: '65%',
  },
  buttonFrame: {
    position: 'absolute',
    left: '40%',
    top: '40%',
  },
  buttonCockpit: {
    position: 'absolute',
    left: '65%',
    top: '15%',
  },
  titleContainer: {
    width: '100%',
  },
}));

/**
 * Displays bike result page
 * @param {props} props
 */
function BikeResult(props) {
  const classes = useStyles();
  const { id } = props.match.params;

  const [bike, setBike] = React.useState(null);

  const user = useSelector((state) => state.user.user);
  const bookmarksRedux = useSelector((state) => state.bookmarks.bookmarkedBikes);

  React.useEffect(async () => {
    try {
      const bikeObj = await BikeService.getBike(id);
      setBike(bikeObj);
    } catch (e) {
      console.log(e);
    }
  }, [props.match.params.id]);

  return !bike ? (
    <Loading />
  ) : (
    <Container>
      <Breadcrumbs
        links={[
          {
            name: bike.bikeType.title,
            href: '/categorySearch/' + bike.bikeType._id + '/0',
          },
          {
            name: bike.brand.name,
            href: '/categorySearch/' + bike.bikeType._id + '/' + bike.brand._id,
          },
          { name: bike ? bike.name : '', href: '/bike/' + id },
        ]}
      />
      <div className={classes.titleContainer}>
        <Box mb={2}>
          <BikeSearchListItem
            isBikeResultView={true}
            bike={bike}
            bookmarked={bookmarksRedux.includes(bike._id)}
            bookmarkFunc={() => {
              if (!user) {
                return;
              }
              try {
                if (!bookmarksRedux.includes(bike._id)) {
                  BookmarkService.bookmarkBike(bike._id);
                  const bookmarkCopy = [...bookmarksRedux];
                  bookmarkCopy.push(bike._id);
                  props.dispatch(setBookmarkedBikes(bookmarkCopy));
                } else {
                  BookmarkService.removeBookmarkBike(bike._id);
                  props.dispatch(setBookmarkedBikes([...bookmarksRedux].filter((id) => id !== bike._id)));
                }
              } catch (err) {
                console.log(err);
              }
            }}
          />
        </Box>
      </div>

      <div className={classes.container}>
        <div className={classes.bikeContainer}>
          {BikeIconImages.filter((i) => i.type === bike.bikeType.title).map(({ imageId, src, type }) => (
            <img key={imageId} src={src} title={type} className={classes.bikeImage} />
          ))}
          <BikeResultTutorialPopover
            className={classes.buttonSaddle}
            name="Saddle"
            bikeComponents={bike.components.filter((comp) => comp.componentPart === 'Saddle')}
          />
          <BikeResultTutorialPopover
            className={classes.buttonBackWheel}
            name="Back Wheel"
            bikeComponents={bike.components.filter((comp) => comp.componentPart === 'BackWheel')}
          />
          <BikeResultTutorialPopover
            className={classes.buttonFrontWheel}
            name="Front Wheel"
            bikeComponents={bike.components.filter((comp) => comp.componentPart === 'FrontWheel')}
          />
          <BikeResultTutorialPopover
            className={classes.buttonDrivetrain}
            name="Drivetrain"
            bikeComponents={bike.components.filter((comp) => comp.componentPart === 'Drivetrain')}
          />
          <BikeResultTutorialPopover
            className={classes.buttonPedals}
            name="Pedals"
            bikeComponents={bike.components.filter((comp) => comp.componentPart === 'Pedals')}
          />
          <BikeResultTutorialPopover
            className={classes.buttonFrame}
            name="Frame"
            bikeComponents={bike.components.filter((comp) => comp.componentPart === 'Frame')}
          />
          <BikeResultTutorialPopover
            className={classes.buttonCockpit}
            name="Cockpit"
            bikeComponents={bike.components.filter((comp) => comp.componentPart === 'Cockpit')}
          />
        </div>
      </div>
    </Container>
  );
}

// connect() establishes the connection to the redux functionalities
export default connect()(BikeResult);
