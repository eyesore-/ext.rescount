import React from 'react'
import moment from 'moment'

const HourDisplay = ({hours}) =>
  <div>
    {Object.keys(hours)
      .map(hour =>
        <div>{moment(+hour).format('LT')} {hours[hour]}</div>)
      }
  </div>

export default HourDisplay
