import React from 'react'
import PropTypes from 'prop-types'
import { Box, Tooltip, withStyles } from '@material-ui/core'

const SkillsBox = withStyles(() => ({
  root: {
    display: 'inline-block',
    margin: '8px'
  }
}))(Box);

const SkillsImg = ({ name, imgLink }) => (
  <SkillsBox>
    <Tooltip title={name}>
      <img src={imgLink} alt={name} width={64} />
    </Tooltip>
  </SkillsBox>
)

export default SkillsImg

SkillsImg.propTypes = {
  name: PropTypes.string.isRequired,
  imgLink: PropTypes.string.isRequired,
};
