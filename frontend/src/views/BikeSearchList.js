import React from 'react';
import { connect, useSelector } from 'react-redux';
import { Box, Container, TablePagination, Typography, FormControl, MenuItem, Select } from '@material-ui/core';
import Loading from '../components/Loading';

import BikeSearchListItem from '../components/BikeSearchListItem';
import BikeService from '../services/BikeService';
import BookmarkService from '../services/BookmarkService';
import { setBookmarkedBikes } from '../redux/actions/bookmarkActions';

function BikeSearchList(props) {
  const [bikes, setBikes] = React.useState();
  const searchString = props.match.params.searchString;
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [reverseOrder, setReverseOrder] = React.useState(false);

  const user = useSelector((state) => state.user.user);

  const bookmarksRedux = useSelector((state) => state.bookmarks.bookmarkedBikes);

  React.useEffect(async () => {
    try {
      const data = await BikeService.searchBike(searchString);
      setBikes(data);
    } catch (e) {
      console.log(e);
    }
  }, [props.match.params.searchString]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return !bikes ? (
    <Loading />
  ) : !Array.isArray(bikes) ? (
    <Box>Error</Box>
  ) : (
    <Container>
      {bikes.length > 0 ? (
        <Box m={3} mx={0} style={{ display: 'flex', justifyContent: 'space-between' }}>
          <Typography variant="h5" style={{ display: 'block', marginTop: 'auto', marginBottom: 'auto' }}>
            Found {bikes.length} search results for &#39;{searchString}&#39;
          </Typography>
          <FormControl variant="outlined">
            <Select
              labelId="demo-simple-select-outlined"
              id="demo-simple-select-outlined"
              value={reverseOrder}
              onChange={(event) => setReverseOrder(event.target.value)}
            >
              <MenuItem value={true}>Z-A</MenuItem>
              <MenuItem value={false}>A-Z</MenuItem>
            </Select>
          </FormControl>
        </Box>
      ) : (
        <Box m={3} mx={0} style={{ display: 'flex', justifyContent: 'center' }}>
          <Typography variant="h5">
            We could not find bikes for &#39;{searchString}&#39;. Please try again with a different search
            <Typography Typography variant="subtitle1" gutterBottom>
              Our tips for searching:
            </Typography>
            <Typography variant="body1" gutterBottom>
              <ul>
                <li>Check your input for misspelling.</li>
                <li>Test with similiar words.</li>
                <li>Search bikes by brands and find it like that.</li>
              </ul>
            </Typography>
          </Typography>
        </Box>
      )}

      {bikes
        .sort((a, b) => (reverseOrder ? (a.name > b.name ? -1 : 1) : a.name > b.name ? 1 : -1))
        .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        .map((bike, index) => {
          return (
            <Box key={index} mx={0} my={3}>
              <BikeSearchListItem
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
          );
        })}
      <Box mx={0}>
        <TablePagination
          component="div"
          count={bikes.length}
          page={page}
          onChangePage={handleChangePage}
          rowsPerPage={rowsPerPage}
          onChangeRowsPerPage={handleChangeRowsPerPage}
          hidden={bikes.length === 0}
        />
      </Box>
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
)(BikeSearchList);
