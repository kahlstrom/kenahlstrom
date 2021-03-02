import React from 'react'
import { AppBar, Grid, Typography, withStyles } from '@material-ui/core'

const StyledAppBar = withStyles(() => ({
  root: {
    backgroundColor: '#000000',
    height: '48px',
    padding: '12px',
    '& img': {
      height: '32px',
      width: '32px',
      marginTop: '-4px'
    }
  }
}))(AppBar);

const Header = () => (
  <StyledAppBar position="static">
    <Grid container>
      <Grid item xs={1}>
        <img src="favicon-32x32.png" />
      </Grid>
      <Grid item xs={3}>
        <Typography>Ken Ahlstrom's Professional Profile</Typography>
      </Grid>
      <Grid item xs={6} />
      <Grid item xs={2}>
        <Typography>v 0.01.00</Typography>
      </Grid>
    </Grid>
  </StyledAppBar>
)

export default Header
