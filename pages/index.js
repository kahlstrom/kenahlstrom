import Header from '../components/Header'
import PersonalInfo from '../components/PersonalInfo'
import ExperienceItem from '../components/ExperienceItem'
import { Grid, Typography, makeStyles } from '@material-ui/core'

import { default as experience } from '../data/experience'

const useStyles = makeStyles(() => ({
  sectionHeader: {
    paddingLeft: '8px',
    height: '80px',
    lineHeight: '80px',
    verticalAlign: 'middle'
  }
}));

export default function Home() {
  const classes = useStyles();
  return (
    <>
      <Header />
      <Grid container spacing={2}>
        <Grid item xs={12} md={6} lg={4}>
          <PersonalInfo />
        </Grid>
        <Grid item xs={12} md={6} lg={8}>
          <Typography variant="h1" className={classes.sectionHeader}>Experience</Typography>
          <Grid item>
            {experience.map((item) => (
              <ExperienceItem {...item} />
            ))}
          </Grid>
        </Grid>
      </Grid>
    </>
  )
}
