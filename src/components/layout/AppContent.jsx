import React from 'react'
import { Layout, Typography } from 'antd';
import {useCrypto} from '../../context/Crypto-context';
import {PortfolioChart} from '../PortfolioChart';
import {AssetsTable} from '../AssetsTable';


const { Content } = Layout;
const contentStyle = {
    textAlign: 'center',
    minHeight: "calc(100vh - 60px)",
    color: '#fff',
    backgroundColor: '#001529',
    padding: '1rem',
  };

export default function AppContent() {
  const {assets, crypto} = useCrypto()

  const cryptoPrice = crypto.reduce((acc, c) => { acc[c.id] = c.price; return acc}, {})
  return (
    <Content style={contentStyle}>
      <Typography.Title level={3} style={{textAlign: 'left', color:"white"}}>
        Portolio: {assets.map((item) => item.amount * cryptoPrice[item.id])
          .reduce((a, b) => a + b, 0).toFixed(2)} USD
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Content>
  )
}
