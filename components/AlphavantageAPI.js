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
    <>
      <table id='marketCap'>
        <tr>
          <th style={{ background: 'red', color: 'white' }}>Market Cap</th>
          <th>OPEN</th>
          <th>HIGH</th>
          <th>LOW</th>
          <th>CLOSE</th>
          <th>VOLUME</th>
        </tr>
        <tr>
          <td>
            USD/{selectedToken}:{' '}
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
          </td>
          <td>{Number(prices['1a. open (USD)']).toFixed(2)}</td>
          <td>{Number(prices['2a. high (USD)']).toFixed(2)}</td>
          <td>{Number(prices['3a. low (USD)']).toFixed(2)}</td>
          <td>{Number(prices['4a. close (USD)']).toFixed(2)}</td>
          <td>{Number(prices['5. volume']).toFixed(2)}</td>
        </tr>
        <tr></tr>
      </table>
    </>
  )
}

export default AlphavantageAPI
{
  /* <div id='FXticker'>
  <div className='title'>
    USD/{selectedToken}:{' '}
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
    <li className='tickerItem'>
      OPEN: {Number(prices['1a. open (USD)']).toFixed(2)}
    </li>
    <li className='tickerItem'>
      HIGH: {Number(prices['2a. high (USD)']).toFixed(2)}
      <span className='upArrow'>{<FaLongArrowAltUp />}</span>
    </li>
    <li className='tickerItem'>
      LOW: {Number(prices['3a. low (USD)']).toFixed(2)}
      <span className='downArrow'>{<FaLongArrowAltDown />}</span>
    </li>
    <li className='tickerItem'>
      CLOSE: {Number(prices['4a. close (USD)']).toFixed(2)}
    </li>

    <li className='tickerItem'>
      VOLUME: {Number(prices['5. volume']).toFixed(2)}
    </li>
  </ul>
</div> */
}
