import React from 'react'
import { Button, Card, CardHeader, List, ListItem, ListItemIcon, ListItemText, Typography, makeStyles, withStyles } from '@material-ui/core'
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';
import CheckCircleIcon from '@material-ui/icons/CheckCircle';

const StyledCard = withStyles(() => ({
  root: {
    margin: '8px 24px',
    backgroundColor: '#ffffff'
  }
}))(Card);

const StyledButton = withStyles(() => ({
  root: {
    margin: '16px'
  }
}))(Button)

const useStyles = makeStyles({
  dates: {
    fontSize: '12px',
    padding: '8px 16px',
    color: '#777777'
  },
  content: {
    fontSize: '16px',
    padding: '0px 16px'
  }
})

const ExperienceItem = ({title, subheader, dates, content, keyContrib, samples}) => {
  const classes = useStyles()

  return (
    <StyledCard>
      <CardHeader
        title={title}
        subheader={subheader}
        action={<Typography className={classes.dates}>{dates}</Typography>}
      />
      <List className={classes.content}>
        {content.map((item) => (
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon />
            </ListItemIcon>
            <ListItemText>{item}</ListItemText>
          </ListItem>
          )
        )}
        <ListItem>
          <ListItemIcon>
            <CheckCircleIcon />
          </ListItemIcon>
          <ListItemText><span style={{ fontWeight: 'bold' }}>Key Contribution: </span>{keyContrib}</ListItemText>
        </ListItem>
      </List>
      { samples ? samples.map((item) => (<StyledButton variant="outlined" href={item.link} target="_blank">{item.name}</StyledButton>)) : '' }
    </StyledCard>
  )
}

export default ExperienceItem
