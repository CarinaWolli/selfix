import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Card, CardContent, Grid, Typography, Collapse, IconButton, Button } from '@material-ui/core';
import { ShoppingCartOutlined, ExpandMore } from '@material-ui/icons';
import PropTypes from 'prop-types';
import Zoom from 'react-medium-image-zoom';
import 'react-medium-image-zoom/dist/styles.css';

const useStyles = makeStyles((theme) => ({
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: 'rotate(180deg)',
  },
  affiliateImage: {
    width: '100% !important',
    maxHeight: '100%',
    objectFit: 'contain !important',
  },
}));

function AffiliateProductCard(props) {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  return (
    <Card variant="outlined">
      <CardContent>
        <Grid container alignItems="center" spacing={1}>
          <Grid item xs={11}>
            <Box ml={1}>
              <Typography gutterBottom variant="body1" style={{ fontWeight: 'bold' }}>
                {props.title}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs>
            <IconButton
              size="small"
              className={expanded ? classes.expandOpen : classes.expand}
              onClick={handleExpandClick}
              aria-expanded={expanded}
              aria-label="show more"
            >
              <ExpandMore />
            </IconButton>
          </Grid>
        </Grid>
      </CardContent>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          <Grid container justify="space-between" alignItems="center" spacing={4}>
            {props.products.map((product) => (
              <React.Fragment key={product._id}>
                <Grid item xs={2}>
                  <Zoom>
                    <img src={product.imageUrl} className={classes.affiliateImage} />
                  </Zoom>
                </Grid>
                <Grid item xs={7}>
                  <Typography variant="body1">{product.name}</Typography>
                  <Typography variant="body1">{parseFloat(product.price).toFixed(2)}€</Typography>
                </Grid>
                <Grid item xs={3}>
                  <Button href={product.affiliateLink} variant="outlined" color="primary">
                    <Box display="flex" alignItems="center" flexWrap="wrap">
                      <ShoppingCartOutlined />
                      <Typography variant="body1">Buy</Typography>
                    </Box>
                  </Button>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </CardContent>
      </Collapse>
    </Card>
  );
}

AffiliateProductCard.propTypes = {
  title: PropTypes.string.isRequired,
  products: PropTypes.array.isRequired,
};

export default AffiliateProductCard;
