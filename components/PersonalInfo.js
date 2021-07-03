import React from 'react'
import { Avatar, Box, Card, CardHeader, CardContent, Link, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import LinkedImg from './LinkedImg'
import { default as currentSkills } from '../data/skills'
import { default as oldSkills } from '../data/oldSkills'

const useStyles = makeStyles(() => ({
  container: {
    margin: '8px'
  },
  profileAvatar: {
    height: '128px',
    width: '128px',
  },
  profileCard: {
    margin: '-48px 8px 8px 8px'
  },
  profileTitle: {
    textAlign: 'right',
    borderBottom: '1px solid #000000'
  }
}));

const PersonalInfo = () => {
  const classes = useStyles();
  return (
    <Box className={classes.container}>
      <Avatar alt="Kenneth Ahlstrom" src="/ProfileImage.png" className={classes.profileAvatar} />
      <Card className={classes.profileCard}>
        <CardHeader
          className={classes.profileTitle}
          title="Kenneth Ahlstrom"
          subheader={<span>Software Engineer | Product Manager<br />Highland, UT, USA</span>}
        />
      <CardContent>
        <List>
          <ListItem>
            <ListItemText>Application Architecture</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>UX Design</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Project Management</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Team Leadership</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Agile / Scrum</ListItemText>
          </ListItem>
          <ListItem>
            <ListItemText>Current Proficient Technologies:</ListItemText>
          </ListItem>
        </List>
        {currentSkills.map((skill) => (
          <LinkedImg { ...skill } />
        ))}
        <List>
          <ListItem>
            <ListItemText>Additional Proficient Technologies (not recently used):</ListItemText>
          </ListItem>
        </List>
        {oldSkills.map((skill) => (
          <LinkedImg { ...skill } />
        ))}
      </CardContent>
      </Card>
    </Box>
  )
}

export default PersonalInfo
