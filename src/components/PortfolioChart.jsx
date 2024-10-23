import React from 'react'
import { PieChart } from '@mui/x-charts/PieChart';
import {useCrypto} from '../context/Crypto-context';

 export function PortfolioChart() {

  const {assets} = useCrypto()


  return (
    <div style={{width: 400, height: 200, display: "flex", justifyContent: 'center'}}>
      <PieChart
  series={[
    {
      data: assets.map((i,index)=>{return {id: index, value:i.amount, label: i.id}})
    },
  ]}
  
/>
  </div>
    
  )
}
