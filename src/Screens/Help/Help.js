import React from 'react';
import './Help.css';

const Help = () => {
  return (
    <div className='help'>
        <h1 className='help__header'>How to play</h1>
        <p>User can choose a bidding question, each question has 2 choices, user can choose one of the choices.{'\n\n'}
            Each question has a bidding phase, once the phase ends, if the user is from the minorities he wins else he loses his bet.
        </p>
    </div>
  )
}

export default Help