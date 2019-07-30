import React from 'react';
import { withStyles } from '@material-ui/core';

const styles = {
  footer: {
    textAlign: 'left',
    padding: '20px',
    marginTop: '20px',
  },
};

function Footer(props) {
  const classes = props.classes;

  return (
    <div className={classes.footer}>© 2019 Movies</div>
  );
}

export default withStyles(styles)(Footer);
