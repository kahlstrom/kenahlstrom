import React from 'react'
import { Avatar, Box, Card, CardHeader, CardContent, Grid, List, ListItem, ListItemIcon, ListItemText, makeStyles } from '@material-ui/core'
import SkillsImg from './SkillsImg'
import { default as currentSkills } from '../data/skills'
import { default as oldSkills } from '../data/oldSkills'
import { default as abilityHighlights } from '../data/abilityHighlights'

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

const skillGrid = (skills) => (
  <Grid container spacing={1} style={{ alignItems: 'center' }}>
    {skills.map((skill) => (
      <Grid item xs={3}><SkillsImg { ...skill } /></Grid>
    ))}
  </Grid>
)

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
          {abilityHighlights.map((ability) => (
            <ListItem>
              <ListItemText>{ability}</ListItemText>
            </ListItem>
          ))}
          <ListItem>
            <ListItemText>Current Proficient Technologies:</ListItemText>
          </ListItem>
        </List>
        {skillGrid(currentSkills)}
        <List>
          <ListItem>
            <ListItemText>Additional Proficient Technologies (not recently used):</ListItemText>
          </ListItem>
        </List>
        {skillGrid(oldSkills)}
      </CardContent>
      </Card>
    </Box>
  )
}

export default PersonalInfo
