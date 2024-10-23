import React, { useState, useRef } from 'react'
import { Select, Space, Divider, Form,InputNumber, Button, DatePicker, Result } from 'antd';
import { useCrypto } from '../context/crypto-context';
import CoinInfo from './layout/CoinInfo';


function AddAssetForm({onClose}) {
  const [form] = Form.useForm();
  const [coin, setCoin] = useState(null)
  const {crypto, addAsset} = useCrypto()
  const [submitted, setSubmitted] = useState(false)
  const assetRef = useRef()

  const buyAgain = () => {setCoin(null); setSubmitted(false); form.resetFields()}

  if (!coin){ return (
    <Select
    style={{width: "100%"}}
    placeholder= "Select a coin"
    onSelect={(v)=>{setCoin(crypto.find((i) => i.id === v))}}
    options={crypto.map((i) => ({
      lable: i.name,
      value: i.id,
      icon: i.icon,
    }) )}
    optionRender={(option) => (
      <Space>
        <img style={{width: 20}} src={option.data.icon} alt={option.data.lable} /> {option.data.lable}
      </Space>
    )}
  />
  )}

  if(submitted) {
    return (
      <Result
      status="success"
      title="New Asset Added"
      subTitle={`Added ${assetRef.current.amount} of ${24} by price ${assetRef.current.price}`}
      extra={[
        <Button type="primary" key="console" onClick={onClose}>
          Close
        </Button>,
        <Button onClick={buyAgain} key="buy">Buy Again</Button>,
      ]}
    />
    )
  }

  const onFinish = (values) => {console.log(values);
    const newAsset ={
      id: coin.id,
      amount: values.amount,
      price: values.price,
      date: values.date?.$d ?? new Date(),
    }
    setSubmitted(true)
    assetRef.current = newAsset
    addAsset(newAsset)
  };
  const validateMessages = {
    required: '${label} is required!',
    types:{
      number: '${label} is not a valid number!',
    },
    number: {
      range: '${label} must be between ${min} and ${max}',
    },
  }

  const handleAmountChange = (value) => {
    const price = form.getFieldValue('price')
    form.setFieldsValue({
      total: +(value * price).toFixed(2) + "$",
    })
  }
  const handlePriceChange = (value) => {
    const amount = form.getFieldValue('amount')
    form.setFieldsValue({
      total: +(value * amount).toFixed(2) + "$",
    })
  }

  return(
<Form form={form} validateMessages={validateMessages}
    name="basic"
    labelCol={{
      span: 4
    }}
    wrapperCol={{
      span: 10,
    }}
    style={{
      maxWidth: 600,
    }}
    initialValues={{
      price: +coin.price.toFixed(2),
    }}
    onFinish={onFinish}>
  <CoinInfo coin={coin} />
  <Divider />
  <Form.Item
      label="Amount"
      name="amount"
      rules={[
        {
          required: true,
          type: 'number',
          min: 0,
        },
      ]}
    >
      <InputNumber placeholder='Enter coin' onChange={handleAmountChange} style={{width: "100%"}} />
  </Form.Item>
  <Form.Item
      label="Price"
      name="price"
    >
      <InputNumber onChange={handlePriceChange} style={{width: "100%"}} />
    </Form.Item>
    <Form.Item
      label="Data & Time"
      name="data"
    >
      <DatePicker showTime />
    </Form.Item>
    <Form.Item
      label="Total"
      name="total"
    >
      <InputNumber disabled style={{width: "100%"}} />
    </Form.Item>
  <Form.Item>
      <Button type="primary" htmlType="submit">
        Add Asset
      </Button>
  </Form.Item>
</Form>)
}

export default AddAssetForm