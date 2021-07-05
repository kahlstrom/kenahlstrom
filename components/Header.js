import React from 'react'
import { AppBar, Button, Grid, Link, Tooltip, Typography, withStyles } from '@material-ui/core'
import BookIcon from '@material-ui/icons/Book'
import GitHubIcon from '@material-ui/icons/GitHub'
import LinkedInIcon from '@material-ui/icons/LinkedIn'

const HeaderLink = withStyles(() => ({
  root: {
    color: '#ffffff',
    padding: '0px 8px',
    '&:hover': {
      textDecoration: 'none'
    }
  }
}))(Link);

const HeaderButton = withStyles(() => ({
  root: {
    color: '#ffffff',
    backgroundColor: '#000000',
    textTransform: 'none',
    '&:hover': {
      backgroundColor: '#000000'
    }
  }
}))(Button);

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
    <Grid container style={{ marginTop: '-4px', padding: '0px' }}>
      <Grid item xs={12} style={{ textAlign: 'right', alignItems: 'center' }}>
        <HeaderButton
          variant="contained"
          color="#ffffff"
          href="https://github.com/kahlstrom/kenahlstrom"
          target="_blank"
          startIcon={<GitHubIcon />}
        >
          GitHub
        </HeaderButton>
        <HeaderButton
          variant="contained"
          color="#ffffff"
          href="https://www.linkedin.com/in/kenneth-ahlstrom-8284511a/"
          target="_blank"
          startIcon={<LinkedInIcon />}
        >
          LinkedIn
        </HeaderButton>
        <HeaderButton
          variant="contained"
          color="#ffffff"
          href="/KenAhlstromCV-2021.pdf"
          target="_blank"
          startIcon={<BookIcon />}
        >
          Resume
        </HeaderButton>
      </Grid>
    </Grid>
  </StyledAppBar>
)

export default Header
