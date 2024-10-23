import React from 'react'
import { Table } from 'antd';
import { useCrypto } from '../context/Crypto-context';

const columns = [
  {
    title: 'Name',
    dataIndex: 'name',
    filters: [
      {
        text: 'u',
        value: "u",
      },
      {
        text: 'b',
        value: "b",
      },
    ],

    onFilter: (value, record) => record.name.toLowerCase().includes(value),
    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ['descend'],
  },
  {
    title: 'Price $',
    dataIndex: 'price',
    defaultSortOrder: 'descend',
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
    sorter: (a,b) => a.amount - b.amount,
  },
];





export function AssetsTable() {

  const {assets} = useCrypto()
  const onChange = (pagination, filters, sorter, extra) => {
    console.log('params', pagination, filters, sorter, extra);
  };
  console.log(assets)
  const data = assets.map(i =>({...i, name: i.id.charAt(0).toUpperCase() + i.id.slice(1), key: i.id}))
  return (
    <div><Table
    pagination={false}
    columns={columns}
    dataSource={data}
    onChange={onChange}
    showSorterTooltip={{
      target: 'sorter-icon',
    }}
  /></div>
  )
}



