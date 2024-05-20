import { Card, Space, Typography, DatePicker, Statistic, Flex,Menu,Select,Table } from "antd";
import React, { useState } from "react";
import { DollarOutlined, FormOutlined, RiseOutlined,DownloadOutlined } from "@ant-design/icons";
// import './DashBoard1.scss'
const { RangePicker } = DatePicker;
export default function RevenueStatistic() {
  const columns = [
    {
      title: "Ngành hàng",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "% Doanh thu",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Người mua",
      dataIndex: "noc",
      key: "noc",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      dataIndex: "convert",
      key: "convert",
    },
    
  ];
  const columns2 = [
    {
      title: "Đơn giá",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "% Doanh thu",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Người mua",
      dataIndex: "noc",
      key: "noc",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      dataIndex: "convert",
      key: "convert",
    },
    
  ];
  const columns3 = [
    {
      title: "Nhóm người mua",
      dataIndex: "category",
      key: "category",
    },
    {
      title: "Doanh thu",
      dataIndex: "revenue",
      key: "revenue",
    },
    {
      title: "% Doanh thu",
      dataIndex: "percent",
      key: "percent",
    },
    {
      title: "Người mua",
      dataIndex: "noc",
      key: "noc",
    },
    {
      title: "Tỷ lệ chuyển đổi",
      dataIndex: "convert",
      key: "convert",
    },
    
  ];
  const data1 = [
    {
      category: "hàng",
      revenue: "10000000000",
      percent: 32,
      noc: "5",
      convert: "200000",
    },
  ];
  const data2 = [
    {
      category: "Dưới 100 k",
      revenue: "10000000000",
      percent: 32,
      noc: "5",
      convert: "200000",
    },
    {
      category: "100k-300k",
      revenue: "10000000000",
      percent: 32,
      noc: "5",
      convert: "200000",
    },
  ];
  const data3 = [
    {
      category: "hàng",
      revenue: "10000000000",
      percent: 32,
      noc: "5",
      convert: "200000",
    },
  ];
  return (
      <div className="px-5 py-3">
      <Flex horizontal justify="space-between">
      <Typography style={{fontSize:32,fontWeight:500}}>Báo cáo bán hàng</Typography>
      <button style={{
        border:'1px solid #46B91D', color:'#46B91D', background:'transparent', borderRadius:16
      }}><DownloadOutlined /> Xuất báo cáo</button> 
      </Flex>
      <Flex className="mt-3" align="center">
      <Typography className="mb-2 me-3 ">Thời gian:</Typography>
          <RangePicker
            placeholder={"Tháng"}
            style={{ borderColor: "#A4A4A4" }}
            className="mb-3"
            picker="month"
          />
      </Flex>
      <Card style={{background:'#AFE970',marginBottom:20}}>
      <Typography style={{fontSize:18,fontWeight:700,marginBottom:20}}>Theo ngành hàng</Typography>
      <Table columns={columns} dataSource={data1} pagination ={false} />
      </Card>
      <Card style={{background:'#AFE970',marginBottom:20}}>
      <Typography style={{fontSize:18,fontWeight:700,marginBottom:20}}>Theo đơn giá</Typography>
      <Table columns={columns2} dataSource={data2} pagination ={false} />
      </Card>
      <Card style={{background:'#AFE970',marginBottom:20}}>
      <Typography style={{fontSize:18,fontWeight:700,marginBottom:20}}>Theo nhóm khách hàng</Typography>
      <Table columns={columns3} dataSource={data3} pagination ={false} />
      </Card>
      </div>
  )
}


// function DashBoardCard(title,columns,data) {
//   return (
//     <Card>
//       <Typography>{title}</Typography>
//       <Table columns={columns} dataSource={data} />;
//     </Card>
//   )
// }

