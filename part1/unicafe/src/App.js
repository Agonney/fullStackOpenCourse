import React, { useState } from 'react'

const StatisticLine = (props) => {
  return(
    <p>{props.text} {props.value}</p>
  )
}

const Statistics = (props) => {
  if(props.good === 0 && props.neutral === 0 && props.bad === 0){
    return(
      <div>
        <h1>statistics</h1>
        <p>No feedback given</p>
      </div>
    )
  }

  const good = props.good
  const neutral = props.neutral
  const bad = props.bad

  const all = good + neutral + bad
  const average = (good-bad)/all
  const positive = good/all*100 + '%'

  return(
    <div>
      <table>
        <thead>
            <tr>
              <th>statistics</th>
            </tr>
        </thead>
        <tbody>
            <tr>
                <td><StatisticLine text="good" value={good} /></td>
            </tr>
            <tr>
                <td><StatisticLine text="neutral" value={neutral} /></td>
            </tr>
            <tr>
                <td><StatisticLine text="bad" value={bad} /></td>
            </tr>
            <tr>
                <td><StatisticLine text="all" value={all} /></td>
            </tr>
            <tr>
                <td><StatisticLine text="average" value={average} /></td>
            </tr>
            <tr>
                <td><StatisticLine text="positive" value={positive} /></td>
            </tr>
        </tbody>
      </table>
    </div>
  )
}



const Button = (props) => {

  return(
    <button onClick={props.handleClick}>{props.text}</button>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const setGoodValue = (newValue) => () => setGood(newValue)
  const setNeutralValue = (newValue) => () => setNeutral(newValue)
  const setBadValue = (newValue) => () => setBad(newValue)
 
  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={setGoodValue(good+1)} text="good" />
      <Button handleClick={setNeutralValue(neutral+1)} text="neutral" />
      <Button handleClick={setBadValue(bad+1)} text="bad" />
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  )
}

export default App