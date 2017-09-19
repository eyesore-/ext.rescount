import React from 'react'
import format from 'date-fns'

const HourDisplay = ({hours}) =>
  <div>
    {Object.keys(hours)
      .map(hour =>
        <div>{format(+hour, 'hh:mm A')} {hours[hour]}</div>)
      }
  </div>

export default HourDisplay
