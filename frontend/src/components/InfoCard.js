import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import { Grid, Card, CardMedia, CardContent, Typography, Box, Button } from '@material-ui/core';
import { connect } from 'react-redux';

const useStyles = makeStyles((theme) => ({
  cardRoot: {
    display: 'flex',
    width: '80vw',
    minHeight: '33vh',
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
  },
  cardDetails: {
    display: 'flex',
    flexDirection: 'column',
    width: '40%',
  },
  cardContent: {
    flex: '1 0 auto',
  },
  cardCover: {
    width: '60%',
  },
}));

function InfoCard(props) {
  const classes = useStyles();

  return (
    <Card className={classes.cardRoot} elevation={5}>
      {props.imageLeft ? (
        <CardMedia className={classes.cardCover} image={props.image} title={props.imageTitle} />
      ) : null}

      <Box className={classes.cardDetails}>
        <CardContent className={classes.cardContent}>
          <Grid container spacing={1}>
            <Grid item xs={12}>
              <Typography variant="h5" color="primary" style={{ fontWeight: 600 }}>
                {props.title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Typography variant="subtitle1" color="textPrimary">
                {props.information}
              </Typography>
            </Grid>
          </Grid>
        </CardContent>

        <footer>
          <Box px={3} py={3} display="flex" flexDirection="row-reverse">
            <Button variant="outlined" color="primary">
              Learn More
            </Button>
          </Box>
        </footer>
      </Box>

      {!props.imageLeft ? (
        <CardMedia className={classes.cardCover} image={props.image} title={props.imageTitle} />
      ) : null}
    </Card>
  );
}

InfoCard.propTypes = {
  imageLeft: PropTypes.bool.isRequired,
  image: PropTypes.string.isRequired,
  imageTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  information: PropTypes.string.isRequired,
};

export default withRouter(connect()(InfoCard));
