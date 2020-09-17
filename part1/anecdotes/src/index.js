import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const Button = ({handleClick, name}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Anecdote = ({anecdote, votes}) => {
  return (
    <div>
      <p>{anecdote}</p>
      <p>has {votes} votes</p>
    </div>
  )
}

const AnecdoteOfTheDay = ({anecdotes, selected, points, onRandomAnecdote, onVote}) => {
  return (
    <div>
      <h1>Anecdote of the day</h1>
      <Anecdote anecdote={anecdotes[selected]} votes={points[selected]} />
      <Button handleClick={() => onVote(selected)} name="vote"/>
      <Button handleClick={() => onRandomAnecdote(selected)} name="next anecdote"/>
    </div>
  )
}

const TopAnecdote = ({anecdotes, points}) => {
  const getMostVotedAnecdote = () => {
    let mostVotes = 0
    let mostVotedIndex = 0

    for (let index = 0; index < points.length; index++) {
      const anecdotePoints = points[index];
      if (anecdotePoints > mostVotes) {
        mostVotes = anecdotePoints
        mostVotedIndex = index
      }
    }

    return mostVotedIndex
  }

  return (
    <div>
      <h1>Anecdote with most votes</h1>
      <Anecdote anecdote={anecdotes[getMostVotedAnecdote()]} votes={points[getMostVotedAnecdote()]} />
    </div>
  )
}

const App = (props) => {
  var votesArray = Array(6).fill(0)
  const [selected, setSelected] = useState(0)
  const [points, setPoints] = useState(votesArray)

  const getRandomValue = (min, max) => {
    min = Math.ceil(min)
    max = Math.floor(max)
    return Math.floor(Math.random() * (max - min) + min)
  }

  const selectRandomAnecdote = () => setSelected(getRandomValue(0, props.anecdotes.length))

  const voteAnecdote = (anecdoteIndex) => {
    let pointsCopy = [...points]
    pointsCopy[anecdoteIndex] += 1
    setPoints(pointsCopy)
  }
  
  return (
    <div>
      <AnecdoteOfTheDay anecdotes={props.anecdotes} selected={selected} points={points} onRandomAnecdote={selectRandomAnecdote} onVote={voteAnecdote}/>
      <TopAnecdote anecdotes={props.anecdotes} points={points}/>
    </div>
  )
}

const anecdotes = [
  'If it hurts, do it more often',
  'Adding manpower to a late software project makes it later!',
  'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  'Premature optimization is the root of all evil.',
  'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

ReactDOM.render(
  <App anecdotes={anecdotes} />,
  document.getElementById('root')
)