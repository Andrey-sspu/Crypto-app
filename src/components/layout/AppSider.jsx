import React, { useContext } from "react";
import { Layout, Card, Statistic, List, Typography, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";
import { capitalize,  } from "../../utils";
import CryptoContext from "../../context/crypto-context";
const { Sider } = Layout;
const siderStyle = {
  pading: "1rem",
};



function AppSider() {
  const {assets} = useContext(CryptoContext);

  return (
    <Sider width="25%" style={siderStyle}>
      {assets.map((i) => (
        <Card key={i.id} style={{ marginBottom: "1rem", marginTop: "1rem" }}>
        <Statistic
          title={capitalize(i.id)}
          value={i.totalAmmount}
          precision={2}
          valueStyle={{
            color: i.grow ? "#3f8600": "#cf1322",
          }}
          prefix={i.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
          suffix="$"
        />
        <List
          size="small"
          bordered
          dataSource={[
            {title: "Total Profit", value: i.totalProfit, withTag: true},
            {title: "Asset Ammount", value: i.amount, isPlaine: true},
          ]}
          renderItem={(item) => (
            <List.Item>
              <span>{item.title}</span>
              <span>
                {item.withTag && <Tag color={i.grow ? "green" : "red"}> {i.growPercent}%</Tag>}
                {!item.isPlaine && <Typography.Text type={i.grow ? "success" : "danger"}> {item.value.toFixed(2)}$</Typography.Text>}
                {/* {console.log(assets.grow)} */}
                {item.isPlaine && item.value.toFixed(2) }
                </span>
            </List.Item>
          )}
        />
      </Card>
      ))}
    </Sider>
  );
  
}



export default AppSider;
