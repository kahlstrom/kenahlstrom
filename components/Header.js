import React from 'react'
import { AppBar, Grid, Link, Typography, withStyles } from '@material-ui/core'
import BookIcon from '@material-ui/icons/Book'
import GitHubIcon from '@material-ui/icons/GitHub'
import InstagramIcon from '@material-ui/icons/Instagram'

const HeaderLink = withStyles(() => ({
  root: {
    color: '#ffffff',
    padding: '0px 8px'
  }
}))(Link);

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
      <Grid item xs={8}>
      </Grid>
      <Grid item xs={1} />
      <Grid item xs={2} style={{ textAlign: 'right' }}>
        <Typography>
          <HeaderLink href="https://github.com/kahlstrom" target="_blank"><GitHubIcon /></HeaderLink>
          <HeaderLink href="/KenAhlstromCV-2021.pdf" target="_blank"><BookIcon /></HeaderLink>
        </Typography>
      </Grid>
    </Grid>
  </StyledAppBar>
)

export default Header
