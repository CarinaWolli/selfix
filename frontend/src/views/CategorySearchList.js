import React from 'react';
import { connect, useSelector } from 'react-redux';
import {Box, Container, TablePagination, Typography, FormControl, MenuItem, Select } from '@material-ui/core';
import Loading from '../components/Loading';
import BikeSearchListItem from '../components/BikeSearchListItem';
import BikeService from '../services/BikeService';
import BookmarkService from '../services/BookmarkService';
import Breadcrumbs from '../components/BreadcrumbComponent';
import { setBookmarkedBikes } from '../redux/actions/bookmarkActions';


function CategorySearchList(props) {
  // TODO: Fetch bookmarks for fetched bikes
  const [bikes, setBikes] = React.useState([]);
  const [category, setCategory] = React.useState(null);
  const [links, setLinks] = React.useState([]);
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(10);
  const [ reverseOrder, setReverseOrder] = React.useState(false);

  const bikeTypeObjectId = props.match.params.bikeType;
  const brandObjectId = props.match.params.brand;

  const user = useSelector((state) => state.user.user);

  const bookmarksRedux = useSelector((state) => state.bookmarks.bookmarkedBikes);

  React.useEffect(async () => {
    try {
      const data = await BikeService.searchBikeByCategory(bikeTypeObjectId,
        brandObjectId);
      setBikes(data);
      if (data.length > 0) {
        if (brandObjectId !== '0') {
          setCategory(data[0].brand.name);
          setLinks([{
            name: data[0].bikeType.title,
            href: '/categorySearch/' + data[0].bikeType._id + '/0'
          },
          {
            name: data[0].brand.name,
            href: '/categorySearch/' + data[0].bikeType._id + '/' +
                data[0].brand._id
          }]);
        } else {
          setCategory(data[0].bikeType.title);
          setLinks([{
            name: data[0].bikeType.title,
            href: '/categorySearch/' + data[0].bikeType._id + '/0'
          }]);
        }
      }
    } catch(e) {
      console.log(e);
    }
  }, [props.match.params.bikeType, props.match.params.brand]);

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return !bikes ? (
    <Loading/>
  ) : !Array.isArray(bikes) ? (
    <Box>Error</Box>
  ) : (
    <Container>
      <Breadcrumbs links={links}/>
      <Box m={3} mx={0} style={{ display: 'flex', justifyContent: 'space-between'}}>
        <Typography variant="h5" style={{ display: 'block', marginTop: 'auto', marginBottom: 'auto'}}>
          {category} ({bikes.length} bikes)
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

      {bikes
        .sort((a, b) => reverseOrder ? (a.name > b.name ? -1 : 1) : (a.name > b.name ? 1 : -1))
        .slice(page * rowsPerPage, (page + 1) * rowsPerPage)
        .map(
          (bike, index) => {
            return (
              <Box key={index} mx={0} my={3}>
                <BikeSearchListItem bike={bike} bookmarked={bookmarksRedux.includes(bike._id)} bookmarkFunc={() => {
                  if(!user) {
                    return;
                  }
                  try {
                    if(!bookmarksRedux.includes(bike._id)) {
                      BookmarkService.bookmarkBike(bike._id);
                      const bookmarkCopy = [...bookmarksRedux];
                      bookmarkCopy.push(bike._id);
                      props.dispatch(setBookmarkedBikes(bookmarkCopy));
                    } else {
                      BookmarkService.removeBookmarkBike(bike._id);
                      props.dispatch(setBookmarkedBikes([...bookmarksRedux].filter(id => id !== bike._id)));
                    }
                  } catch(err) {
                    console.log(err);
                  }
                }}/>
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
        /></Box>
    </Container>
  );
}

const mapDispatchToProps = (dispatch) => {
  return {
    dispatch
  };
};

export default connect(null, mapDispatchToProps)(CategorySearchList);
