import {makeStyles} from '@material-ui/core/styles';
import {debounce, InputAdornment, TextField} from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import Autocomplete from '@material-ui/lab/Autocomplete';
import React from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import BikeService from '../services/BikeService';
import PropTypes from 'prop-types';

const useStyles = makeStyles((theme) => ({
  searchField: {
    paddingLeft: theme.spacing(1),
  },
  searchTextField: {
    backgroundColor: theme.palette.common.white,
    borderRadius: 4,
  },
}));

function AutocompleteSearchComponent(props) {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [input, setInput] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  React.useEffect(() => {
    const debounceSearch = debounce(() => {
      setLoading(true);
      let active = true;

      if (input.length < 3) {
        setLoading(false);
        setOptions([]);
        return undefined;
      }

      (async () => {
        try{
          const bikes = await BikeService.searchBike(input);

          if (active) {
            setOptions(bikes);
          }
        } catch(e) {
          console.log(e);
        }
      })();

      return () => {
        active = false;
        setLoading(false);
      };
    }, 1000);
    debounceSearch();
  }, [input]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (<Autocomplete
    className={classes.searchField}
    style={{flex: 1}}
    open={open}
    onOpen={() => {
      setOpen(true);
    }}
    onClose={() => {
      setOpen(false);
    }}
    inputValue={input}
    onInputChange={(event, newInputValue) => {
      setInput(newInputValue);
    }}
    onChange={(event, value, reason) => {
      if (event.keyCode === 13 && value) {
        if(typeof value === 'object'){
          props.history.push('/bike/' + value._id);
        }else {
          props.history.push('/search/' + value);
        }
      } else if (reason === 'select-option' && value) {
        props.history.push('/bike/' + value._id);
      }
    }}
    freeSolo
    loading={loading}
    getOptionSelected={(option, value) => option.name === value.name}
    getOptionLabel={(option) => (typeof option === 'object' && option !== null)
      ? option.name : option}
    options={options}
    renderInput={(params) => (
      <TextField
        {...params}
        margin="dense"
        variant={props.variant}
        className={classes.searchTextField}
        InputProps={{
          ...params.InputProps,
          placeholder: 'Search for your bike...',
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon/>
            </InputAdornment>
          ),
        }}
      />
    )}
  />);

}

// attributes of props and their type
AutocompleteSearchComponent.propTypes =
  {
    variant: PropTypes.string
  };

export default withRouter(connect()(AutocompleteSearchComponent));
