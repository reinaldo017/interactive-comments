import React from 'react'
import PropTypes from 'prop-types'

const Score = ({ score, onClick }) => {
  return (
        <div>
            <button onClick={onClick}> + </button>
            <div>{score}</div>
            <button onClick={onClick}>-</button>
        </div>
  )
}

Score.propTypes = {
  score: PropTypes.number,
  onClick: PropTypes.func,
  handleDownvote: PropTypes.func
}

export default Score
