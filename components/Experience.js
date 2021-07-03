import React from 'react'
import { Grid } from '@material-ui/core'

import ExperienceItem from './ExperienceItem'

import { default as experience } from '../data/experience'

const Experience = () => (
  <Grid item>
    {experience.map((item) => (
      <ExperienceItem {...item} />
    ))}
  </Grid>
)

export default Experience
