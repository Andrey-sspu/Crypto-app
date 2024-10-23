import React, { useEffect, useState,  } from 'react'
import { Layout, Select, Space, Button, Modal, Drawer } from 'antd';
import { useCrypto } from '../../context/crypto-context';
import CoinInfoModal from '../CoinInfoModal';
import AddAssetForm from '../AddAssetForm';
const { Header } = Layout;
const headerStyle = {
  width: '100%',
  textAlign: 'center',
  height: 60,
  padding: "1rem",
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
};




function AppHeader() {
  const {crypto} = useCrypto();
  const [select, setSelect] = useState(false);
  const [drawer, setDrawer] = useState(false);
  const [coin, setCoin] = useState(null);
  const [modal, setModal] = useState(false);

  

  useEffect(() => { 
    function keyPress(e) {
      if (e.key === "/") {
        setSelect(prev => !prev);
      }
    }
    document.addEventListener("keypress", keyPress)
    return () => document.removeEventListener("keypress", keyPress)
    }, 
    []);

  const handleChange = (value) => {
    console.log(`selected ${value}`);
  };
  const handleSelect = (value) => {
    setCoin(crypto.find((i) => i.id === value))
    setModal(true)
  };


  
  
  return (
    
    <Header style={headerStyle}> 
    <Select
    style={{
      width: 250,
    }}
    open = {select}
    onClick={() => setSelect(prev => !prev)}
    value="press/open"
    onSelect={handleSelect}
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
  <Button type="primary" onClick={() =>{setDrawer(true)}}>Primary Button</Button>
  <Modal footer ={null} title="Basic Modal" open={modal}  onCancel={() => setModal(false)}>
    <CoinInfoModal coin={coin} />
  </Modal>
  <Drawer destroyOnClose width={600} title="Add Asset" onClose={() => setDrawer(false)} open={drawer}>
    <AddAssetForm onClose={() => setDrawer(false)} />
  </Drawer>
  </Header>
  )
}

export default AppHeader