import React from 'react'
import { Card, CardHeader, Grid, List, ListItem, ListItemText, Paper, Tooltip, Typography, withStyles } from '@material-ui/core'

import LinkedImg from './LinkedImg'

const StyledPaper = withStyles(() => ({
  root: {
    backgroundColor: '#efefef',
    boxShadow: 'none'
  }
}))(Paper);

const StyledCard = withStyles(() => ({
  root: {
    margin: '8px',
    backgroundColor: '#ffffff'
  },
  '& .MuiTypography-root': {
    margin: '8px'
  }
}))(Card);

const Expertise = () => {
  return (
  <StyledPaper>
    <Typography variant="h1" style={{ fontSize: '32px', padding: '16px' }}>Skills</Typography>
    <Grid container>
      <Grid item xs={4}>
        <StyledCard>
          <CardHeader
            title="Current"
            subheader="Technologies I am proficient in and currently using in projects or have used within the last 6 months"
          />
            <LinkedImg 
              name="JavaScript" 
              imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/9/99/Unofficial_JavaScript_logo_2.svg/1200px-Unofficial_JavaScript_logo_2.svg.png" 
            />
            <LinkedImg 
              name="TypeScript"  
              imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Typescript_logo_2020.svg/1200px-Typescript_logo_2020.svg.png" 
            />
            <LinkedImg 
              name="GraphQL" 
              imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/1/17/GraphQL_Logo.svg/1200px-GraphQL_Logo.svg.png" 
            />
            <LinkedImg 
              name="ReactJS" 
              imgLink="https://logos-download.com/wp-content/uploads/2016/09/React_logo_logotype_emblem.png" 
            />
            <LinkedImg 
              name="Hasura" 
              imgLink="https://nhost.github.io/hasura-backend-plus/logo.png" 
            />
            <LinkedImg 
              name="PostgreSQL" 
              imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/2/29/Postgresql_elephant.svg/1200px-Postgresql_elephant.svg.png" 
            />
            <LinkedImg 
              name="NodeJS" 
              imgLink="https://upload.wikimedia.org/wikipedia/commons/thumb/7/7e/Node.js_logo_2015.svg/1280px-Node.js_logo_2015.svg.png" 
            />
            <LinkedImg 
              name="NextJS" 
              imgLink="https://upload.wikimedia.org/wikipedia/commons/8/8e/Nextjs-logo.svg" 
            />
            <LinkedImg 
              name="GatsbyJS" 
              imgLink="https://pbs.twimg.com/profile_images/1135999619781939201/HZ-pCQcP_400x400.png" 
            />
            <LinkedImg 
              name="Material-UI" 
              imgLink="https://material-ui.com/static/logo_raw.svg" 
            />
            <LinkedImg 
              name="Styled-Components" 
              imgLink="https://styled-components.com/atom.png" 
            />
            <LinkedImg 
              name="Jest" 
              imgLink="https://seeklogo.com/images/J/jest-logo-F9901EBBF7-seeklogo.com.png" 
            />
            <LinkedImg 
              name="ESLint" 
              imgLink="https://d33wubrfki0l68.cloudfront.net/204482ca413433c80cd14fe369e2181dd97a2a40/092e2/assets/img/logo.svg" 
            />
            <LinkedImg 
              name="Prettier" 
              imgLink="https://prettier.io/icon.png" 
            />
            <LinkedImg 
              name="Amazon Web Services"  
              imgLink="https://d1.awsstatic.com/logos/aws-logo/full-color/AWS-Logo_Full-Color_1000x600.23165eb2b9af9cc8e068e74fbabc28222d091298.png" 
            />
            <LinkedImg 
              name="Google Cloud Platform" 
              imgLink="https://avatars1.githubusercontent.com/u/2810941?s=280&v=4" 
            />
        </StyledCard>
      </Grid>
      <Grid item xs={4}>
        <StyledCard>
          <CardHeader
            title="Previous"
            subheader="Technologies in which I am proficient but have not used for at least 6 months"
          />
          <LinkedImg 
            name="Python" 
            imgLink="https://logos-download.com/wp-content/uploads/2016/10/Python_logo_icon.png" 
          />
          <LinkedImg 
            name="ElasticSearch" 
            imgLink="https://d24wuq6o951i2g.cloudfront.net/img/events/id/284/2842740/assets/c58.f1b.Logo.png" 
          />
          <LinkedImg 
            name="MongoDB" 
            imgLink="https://linagora.com/wp-content/uploads/2018/06/MongoDB-logo.x88716.png" 
          />
          <LinkedImg 
            name="MySQL" 
            imgLink="https://upload.wikimedia.org/wikipedia/de/thumb/d/dd/MySQL_logo.svg/1280px-MySQL_logo.svg.png" 
          />
          <LinkedImg 
            name="JQuery" 
            imgLink="https://upload.wikimedia.org/wikipedia/en/thumb/9/9e/JQuery_logo.svg/1024px-JQuery_logo.svg.png" 
          />
          <LinkedImg 
            name="PHP" 
            imgLink="https://i2.wp.com/www.ryadel.com/wp-content/uploads/2017/08/php-logo.png?fit=800%2C420&ssl=1" 
          />
        </StyledCard>
      </Grid>
      <Grid item xs={4}>
        <StyledCard>
          <CardHeader
            title="Additional"
            subheader="Skills that are not well-represented by a listing of technologies"
          />
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
          </List>
        </StyledCard>
      </Grid>
    </Grid>
  </StyledPaper>
)
}

export default Expertise
