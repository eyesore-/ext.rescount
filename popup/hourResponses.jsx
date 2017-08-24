import React from 'react'

const HourDisplay = ({hours}) =>
  <div>
    {Object.keys(hours)
      .map(hour =>
        <div>{hour} {hours[hour]}</div>)
      }
  </div>

export default HourDisplay
