import React from 'react'
import { Link, Tooltip, withStyles } from '@material-ui/core'

const StyledLink = withStyles(() => ({
  root: {
    display: 'inline-block',
    padding: '16px'
  }
}))(Link)

const LinkedImg = ({ name, imgLink, link }) => (
  <StyledLink href={link ?? "#"}>
    <Tooltip title={name}>
      <img src={imgLink} alt={name} width={64} />
    </Tooltip>
  </StyledLink>
)

export default LinkedImg
