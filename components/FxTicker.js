import { useState, React } from 'react'
import { FaLongArrowAltDown, FaLongArrowAltUp } from 'react-icons/fa'

export const FxTicker = () => {
  const [results, setResults] = useState([''])
  const callAPI = async () => {
    try {
      const res = await fetch(
        // `https://api.exchangerate.host/latest?base=BTC&source=crypto`
        `https://api.exchangerate.host/latest?base=USD&symbols=USDT,ETH,BNB,XRP,DOGE,ADA,MATIC,DOT,DAI,SHIB,SOL,WBTC,ATOM,BCH,CRO,ALGO,QNT,FIL,APE,NEAR,VET,OKB,ICP,FLOW,HBAR,TRX,BTC,UNI,AVAX,LINK,LTC,USDC,BUSD,LUNC,&source=crypto`
      )
      const data = await res.json()

      setResults(data.rates)
    } catch (err) {
      console.log(err)
    }
  }

  const callRates = callAPI()
  const currentDate = new Date().toLocaleDateString('en-US')
  if (!results) {
    return (
      <div id='FXticker'>
        <div className='title'>{currentDate}</div>
        <ul>
          <li className='tickerItem'>
            Loading Exchange rate prices... please wait.
          </li>
        </ul>
      </div>
    )
  }
  return (
    <div>
      {' '}
      {/*  FXTicker */}
      <div id='FXticker'>
        <div className='title'>{currentDate}</div>
        <ul>
          {/* convert object to an array and iterate over it */}
          {Object.keys(results).map((currency) => {
            return (
              // eslint-disable-next-line react/jsx-key
              <li className='tickerItem'>
                {`${currency} : ${results[currency]}`}{' '}
                <span className='upArrow'>{<FaLongArrowAltUp />}</span>
                <span className='downArrow'>{<FaLongArrowAltDown />}</span>
              </li>
            )
          })}
        </ul>
      </div>
      {/* End of FXTicker */}
    </div>
  )
}

export default FxTicker

// const baseURL =
//   'https://api.exchangerate.host/latest?base=BTC&symbols=EUR,CZK,USD,NGN&source=crypto'
