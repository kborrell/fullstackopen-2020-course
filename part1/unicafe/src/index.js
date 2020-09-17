import React, { useState } from 'react'
import ReactDOM from 'react-dom'

const FeedbackButton = ({name, handleClick}) => {
  return (
    <button onClick={handleClick}>{name}</button>
  )
}

const Feedback = ({options}) => {
  return (
    <div>
      <h1>give feedback</h1>
      <p>
        <FeedbackButton name={options[0].name} handleClick={options[0].handler} />
        <FeedbackButton name={options[1].name} handleClick={options[1].handler} />
        <FeedbackButton name={options[2].name} handleClick={options[2].handler} />
      </p>
    </div>
  )
}

const StatisticRow = ({name, value, isPercentage}) => {
  if (isPercentage){
    return (
      <tr>
        <td>{name}</td><td>{value * 100} %</td>
      </tr>
    )
  }
  else
  {
    return (
      <tr>
        <td>{name}</td><td>{value}</td>
      </tr>
    )
  }
}

const Statistics = ({options}) => {

  const getTotalCount = () => {
    let total = 0

    options.forEach(option => {
      total += option.count
    });

    return total
  }

  const getAverage = () => {
    let total = getTotalCount()
    let score = 0

    options.forEach(option => {
      score += (option.score * option.count)
    })

    return total > 0 ? score / total : 0
  }

  const getPositiveRatio = () => {
    let total = getTotalCount()

    for (const option of options) {
      if (option.name === "good") {
        return total > 0 ? option.count / total : 0
      }
    }

    return 0
  }

  if (getTotalCount() > 0) {
    return (
      <div>
        <h1>statistics</h1>
        <table>
          <tbody>
            <StatisticRow name={options[0].name} value={options[0].count} />
            <StatisticRow name={options[1].name} value={options[1].count} />
            <StatisticRow name={options[2].name} value={options[2].count} />
            <StatisticRow name="all" value={getTotalCount()} />
            <StatisticRow name="avg" value={getAverage()} />
            <StatisticRow name="positive" value={getPositiveRatio()} isPercentage={true} />
          </tbody>
        </table>
      </div>
    )
  } else {
    return (
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const increaseByOne = (value, handler) => handler(value + 1)

  let feedbackOptions = [
    {
      "name": "good",
      "handler": () => increaseByOne(good, setGood),
      "count": good,
      "score": 1
    },
    {
      "name": "neutral",
      "handler": () => increaseByOne(neutral, setNeutral),
      "count": neutral,
      "score": 0
    },
    {
      "name": "bad",
      "handler": () => increaseByOne(bad, setBad),
      "count": bad,
      "score": -1
    },
  ]

  return (
    <div>
      <Feedback options={feedbackOptions}/>
      <Statistics options={feedbackOptions}/>
    </div>
  )
}

ReactDOM.render(<App />, 
  document.getElementById('root')
)