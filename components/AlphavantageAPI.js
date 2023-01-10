import React, { useState, useEffect } from 'react'

const currentDate = new Date().toISOString().slice(0, 10)
console.log(currentDate) // Outputs the current date in the format 'YYYY-MM-DD'

const AlphavantageAPI = () => {
  const [prices, setPrices] = useState([])

  const fetchData = async () => {
    try {
      const apiKey = 'E4RTQJB2CAR2A6OD'
      const response = await fetch(
        `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${apiKey}`
      )

      const data = await response.json()
      if (data) {
        setPrices(data)
      }

      setPrices(data)
      console.log('====== data before prices ========')
      console.log(data['Time Series (Digital Currency Daily)']['2023-01-08'])
    } catch (err) {
      console.log(err)
    }

    console.log('================ prices =================')
    console.log(prices)
  }
  const callRates = fetchData()
  return (
    <div id='FXticker'>
      <div className='title'>{currentDate}</div>
      <ul>
        <li className='tickerItem'>{prices}</li>
      </ul>
    </div>
  )
}

export default AlphavantageAPI
