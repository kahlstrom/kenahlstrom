import React from 'react'
import { Card, CardHeader, Grid, Link, Paper, Typography, withStyles } from '@material-ui/core'
import BookIcon from '@material-ui/icons/Book';
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';

import ExperienceItem from './ExperienceItem'

const StyledPaper = withStyles(() => ({
  root: {
    backgroundColor: '#fcfcfc',
    boxShadow: 'none'
  }
}))(Paper);

const StyledCard = withStyles(() => ({
  root: {
    margin: '8px 24px',
    backgroundColor: '#ffffff'
  }
}))(Card);

const StyledLink = withStyles(() => ({
  root: {
    display: 'block',
    margin: '16px',
  }
}))(Link);

const nfExperience = [
  'Architect and build web applications for clients',
  'Lead disparate and changing teams as clients, arrangements, and projects change',
  'Adapt to various technology stacks, corporate structures, and development policies from client to client',
  'Participate in open-source contributions on behalf of Nearform'
]

const nfKeyContrib = `Have acted as team lead on projects across multiple clients, using a variety of technology stacks`

const nfSamples = [
  {name: 'EFQM Corporate Site', link: 'https://efqm.org'},
  {name: 'EFQM AssessBase', link: 'https://assessbase.digitalefqm.com/'},
  {name: 'Orion Accelerator', link: 'https://www.nearform.com/services/accelerators/'},
  {name: 'CrossBorder Solutions', link: 'https://crossborder.solutions/'}
]

const ddmExperience = [
  "Designed, architected, and built web applications from concept to completion",
  "Lead, mentored, and directed teams through complex application projects",
  "Planned, presented, and maintained project features and roadmaps",
  "Built projects iteratively, incorporating user feedback and adjusting responsively",
  "Coordinated across multiple company departments and distributed team members, maintaining a performant, agile, and transparent project team"
]

const ddmSamples = [
  {name: 'KSL', link: 'https://ksl.com'},
  {name: 'KSL Cars', link: 'https://cars.ksl.com/'},
  {name: 'Utah.com', link: 'https://utah.com'}
]

const ddmKeyContrib = `Built internal application that organized and unified corporate sales, delivery, and financial recording processes between multiple 
software platforms (Salesforce, Google AdManager, Google BigQuery, etc). Company was brought into audit compliance, improved sales accuracy and efficiency, 
and gained a wealth of data/analytics knowledge into the sales and delivery process as a result.`

const nmgExperience = [
  'Managed entire portfolio of web application projects for company client base',
  'Acted as lead/primary developer for projects, building eCommerce and presentation websites for clients by utilizing and customizing a variety of existent PHP frameworks',
  'Interfaced directly with clients, keeping them informed of progress, timelines, and cost of projects'
]

const nmgKeyContrib = `Managed and completed many individual projects on an exceptionally tight timeline`

const cfExperience = [
  'Built web portal applications for video game and angel investment company',
  'Participated with owner in video game conceptual design',
  'Presented to angel investors on behalf of company'
]

const cfKeyContrib = `Built and maintained angel investment web portal, including presentation of investment opportunities 
and secure storage and downloading of documents related to said opportunities`

const siExperience = [
  'Acted as company corporate pilot, flying a Moonie Bravo',
  'Maintained company Cisco VOIP telephone system',
  'Built and maintained company IT infrastructure',
  'Built and maintained company website'
]

const siKeyContrib = `Acted as sole technologist of the company, corporate pilot, and assistant to the owner`

const Experience = () => (
  <StyledPaper>
    <Grid container>
      <Grid item xs={12}><Typography variant="h1" style={{ fontSize: '32px', padding: '16px' }}>Experience</Typography></Grid>
      <Grid item xs={12} md={8}>
        <ExperienceItem
          title="Delivery Architect"
          subheader="Nearform (Contractor)"
          dates="August 2019 - Current"
          content={nfExperience}
          keyContrib={nfKeyContrib}
          samples={nfSamples}
        />
        <ExperienceItem
          title="Director of Engineering and Product Management"
          subheader="Deseret Digital Media"
          dates="October 2010 - April 2019"
          content={ddmExperience}
          keyContrib={ddmKeyContrib}
          samples={ddmSamples}
        />
        <ExperienceItem
          title="Product Manager / Web Developer"
          subheader="Niki Media Group"
          dates="October 2007 - February 2008"
          content={nmgExperience}
          keyContrib={nmgKeyContrib}
        />
        <ExperienceItem
          title="Associate Producer / Web Developer"
          subheader="Codefire Studios"
          dates="June 2006 - March 2007"
          content={cfExperience}
          keyContrib={cfKeyContrib}
        />
        <ExperienceItem
          title="Network Admin / Web Developer / Corporate Pilot"
          subheader="Schaeffer Industries"
          dates="January 2006 - June 2006"
          content={siExperience}
          keyContrib={siKeyContrib}
        />
      </Grid>
      <Grid xs={12} md={4}>
        <StyledCard>
          <CardHeader
            title="Links"
          />
          <StyledLink href="#"><BookIcon /> &nbsp;The Coder's Guide to JavaScript</StyledLink>
          <StyledLink href="#"><GitHubIcon /> &nbsp;GitHub</StyledLink>
          <StyledLink href="#"><InstagramIcon /> &nbsp;@thesecondwatch</StyledLink>
        </StyledCard>
      </Grid>
    </Grid>
  </StyledPaper>
)

export default Experience
