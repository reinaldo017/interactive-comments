import React from 'react'
import PropTypes from 'prop-types'

const Score = ({ score, handleUpvote, handleDownvote }) => {
  return (
        <div>
            <button onClick={handleUpvote}> + </button>
            <div>{score}</div>
            <button onClick={handleDownvote}>-</button>
        </div>
  )
}

Score.propTypes = {
  score: PropTypes.number,
  handleUpvote: PropTypes.func,
  handleDownvote: PropTypes.func
}

export default Score
