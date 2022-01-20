import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import TutorialTable from '../components/cms/TutorialTable';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
 
const useStyles = makeStyles(() => ({
  main: {
    marginLeft: '280px',
    marginRight: '50px',
    height: '100%'
  }, 
  button: {
    display: 'flex',
    marginLeft: 'auto',
    marginTop: '5px',
    marginBottom: '8px',
  }
}));

function TutorialsAdminView(props) {
  const classes = useStyles();

  const onClickCreateTutorial = () => {
    props.history.push('/admin/tutorialCreation');
  };

  return (
    <div className={classes.main}>
      <Button
        variant="contained"
        color="primary"
        size="small"
        className={classes.button}
        onClick={onClickCreateTutorial}
        startIcon={<AddIcon />}
      >
        Add Tutorial
      </Button>
      <TutorialTable/>
    </div>
  );
}

export default TutorialsAdminView;
