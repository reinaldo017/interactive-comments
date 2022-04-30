import React from 'react'
import PropTypes from 'prop-types'

const Score = ({ score, onClick }) => {
  return (
        <div className='score'>
          <button onClick={onClick} data-clicked='false' >+</button>
          <p>{score}</p>
          <button onClick={onClick} data-clicked='false'>-</button>
        </div>
  )
}

Score.propTypes = {
  score: PropTypes.number,
  onClick: PropTypes.func
}

export default Score
