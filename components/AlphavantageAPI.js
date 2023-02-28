import React, { useState, useEffect } from 'react'
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa'

const AlphavantageAPI = () => {
  const [prices, setPrices] = useState(null)
  const [error, setError] = useState(null)
  const [selectedToken, setSelectedToken] = useState('BTC')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const apiKey = 'E4RTQJB2CAR2A6OD'
        const response = await fetch(
          `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=${selectedToken}&market=USD&apikey=${apiKey}`
        )

        const data = await response.json()
        if (data['Time Series (Digital Currency Daily)']) {
          // extract the price data for the most recent day
          const pricesForLastDay =
            data['Time Series (Digital Currency Daily)']['2023-01-08']
          setPrices(pricesForLastDay)
        } else {
          setError('Error: could not retrieve price data')
        }
      } catch (err) {
        setError('Error: could not fetch price data')
        console.log(err)
      }
    }
    fetchData()
  }, [selectedToken])

  const handleTokenChange = (event) => {
    setSelectedToken(event.target.value)
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  if (!prices) {
    return <div>Loading...</div>
  }

  return (
    <div id='FXticker'>
      <div className='title'>
        Cryptocurrency:{' '}
        <select
          name='tokens'
          id='tokens'
          value={selectedToken}
          onChange={handleTokenChange}
          style={{ background: 'none', color: '#777', border: 'none' }}
        >
          <option value='BTC'>Bitcoin</option>
          <option value='ETH'>Ethereum</option>
          <option value='LTC'>Litecoin</option>
        </select>
      </div>

      <ul>
        <li className='tickerItem'>OPEN: {prices['1a. open (USD)']}</li>
        <li className='tickerItem'>
          HIGH: {prices['2a. high (USD)']}
          <span className='upArrow'>{<FaLongArrowAltUp />}</span>
        </li>
        <li className='tickerItem'>
          LOW: {prices['3a. low (USD)']}
          <span className='downArrow'>{<FaLongArrowAltDown />}</span>
        </li>
        <li className='tickerItem'>CLOSE: {prices['4a. close (USD)']}</li>
        <li className='tickerItem'>VOLUME: {prices['5. volume']}</li>
      </ul>
    </div>
  )
}

export default AlphavantageAPI

// import React, { useState, useEffect } from 'react'

// const AlphavantageAPI = () => {
//   const [prices, setPrices] = useState(null)
//   const [error, setError] = useState(null)

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         const apiKey = 'E4RTQJB2CAR2A6OD'
//         const response = await fetch(
//           `https://www.alphavantage.co/query?function=DIGITAL_CURRENCY_DAILY&symbol=BTC&market=USD&apikey=${apiKey}`
//         )

//         const data = await response.json()
//         if (data['Time Series (Digital Currency Daily)']) {
//           // extract the price data for the most recent day
//           const pricesForLastDay =
//             data['Time Series (Digital Currency Daily)']['2023-01-08']
//           setPrices(pricesForLastDay)
//         } else {
//           setError('Error: could not retrieve price data')
//         }
//       } catch (err) {
//         setError('Error: could not fetch price data')
//         console.log(err)
//       }
//     }
//     fetchData()
//   }, [])

//   if (error) {
//     return <div>Error: {error}</div>
//   }

//   if (!prices) {
//     return <div>Loading...</div>
//   }

//   return (
//     <div id='FXticker'>
//       <div className='title'>BTC/USD</div>
//       <ul>
//         <li className='tickerItem'>OPEN: {prices['1a. open (USD)']}</li>
//         <li className='tickerItem'>HIGH: {prices['2a. high (USD)']}</li>
//         <li className='tickerItem'>LOW: {prices['3a. low (USD)']}</li>
//         <li className='tickerItem'>CLOSE: {prices['4a. close (USD)']}</li>
//         <li className='tickerItem'>VOLUME: {prices['5. volume']}</li>
//       </ul>
//     </div>
//   )
// }

// export default AlphavantageAPI
