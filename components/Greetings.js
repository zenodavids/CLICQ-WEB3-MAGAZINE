import React, { useState, useEffect } from 'react'
import {
  BsFillCloudSunFill,
  BsFillSunFill,
  BsFillCloudMoonFill,
} from 'react-icons/bs'

function Greeting(props) {
  const [timeOfDay, setTimeOfDay] = useState('')

  const customStyling = {
    color: props.color,
    fontSize: `${props.size}px`,
    textAlign: props.position,
  }

  useEffect(() => {
    const time = new Date().getHours()
    if (time >= 5 && time < 12) {
      setTimeOfDay(
        <span>
          Good Morning <BsFillCloudSunFill />
        </span>
      )
    } else if (time >= 12 && time < 18) {
      setTimeOfDay(
        <span>
          Good Afternoon <BsFillSunFill />
        </span>
      )
    } else {
      setTimeOfDay(
        <span>
          Good Evening <BsFillCloudMoonFill />
        </span>
      )
    }
  }, [])

  return <h1 style={customStyling}>{timeOfDay}</h1>
}

export default Greeting
