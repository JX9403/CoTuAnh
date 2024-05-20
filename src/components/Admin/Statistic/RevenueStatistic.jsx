import { Card, Space, Typography, DatePicker, Statistic, Flex,Menu,Select,Table } from "antd";
import React, { useState } from "react";
import axios from 'axios';
import { DollarOutlined, FormOutlined, RiseOutlined,DownloadOutlined } from "@ant-design/icons";
// import './DashBoard1.scss'
const { RangePicker } = DatePicker;

export default function RevenueStatistic() {
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTY3ODkiLCJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNzE1ODIyOTMxLCJleHAiOjE3MTg0MTQ5MzF9.URI8rt4769uqmVEuRW7-Sazom_zg18fojXZOsBnmL6seMA5CIZn8Lk1vi0JeE8kr";
    const apiCategory =
      "https://backend-online-supermarket-sales-website.onrender.com/api/v1/categories";
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
      dataIndex: "buyer",
      key: "buyer",
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
  
  const formatDate = (originalDate) => {
    const date = new Date(originalDate);
  
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());
  
    return `${year}-${month}-${day}T00:00`;
  };
  const padZero = (number) => {
    return number < 10 ? "0" + number : number;
  };
  const [data,setData]=useState([])
  const handleRangeChange = async (dates) => {
    if (dates && dates.length === 2) {
        const startDate = dates[0].startOf("day").toISOString();
        const endDate = dates[1].endOf("day").toISOString();
        console.log(formatDate(startDate))
        console.log(formatDate(endDate))
        const apiUrl = `https://backend-online-supermarket-sales-website.onrender.com/api/v1/statistics/statisticsByCategory?startDate=${encodeURIComponent(formatDate(startDate))}&endDate=${encodeURIComponent(formatDate(endDate))}`;
        try {
          axios
            .get(apiUrl, {
              headers: {
                Authorization: `Bearer ${token}`,
                accept: "*/*",
              },
            })
            .then((res) => {
                const datax = res.data.map(item => ({
                    category:item.category.categoryName,
                    revenue:item.revenue,
                    percent:item.percent_of_revenue,
                    buyer:item.buyer_num,
                  }));
              setData(datax);
            })
            .catch((error) => {
              setLoading(false);
              if (error.response) {
                console.error(
                  `Error: ${error.response.status} - ${error.response.data}`
                );
              } else if (error.request) {
                console.error("No response received:", error.request);
              } else {
                console.error("Error setting up request:", error.message);
              }
            });
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      }}
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
             onChange={(dates) => handleRangeChange(dates)}
            placeholder={"Ngày"}
            style={{ borderColor: "#A4A4A4" }}
            className="mb-3"
          />
      </Flex>
      <Card style={{background:'#AFE970',marginBottom:20}}>
      <Typography style={{fontSize:18,fontWeight:700,marginBottom:20}}>Theo ngành hàng</Typography>
      <Table columns={columns} dataSource={data} pagination ={false} />
      </Card>
      <Card style={{background:'#AFE970',marginBottom:20}}>
      <Typography style={{fontSize:18,fontWeight:700,marginBottom:20}}>Theo đơn giá</Typography>
      {/* <Table columns={columns2} dataSource={} pagination ={false} /> */}
      </Card>
      <Card style={{background:'#AFE970',marginBottom:20}}>
      <Typography style={{fontSize:18,fontWeight:700,marginBottom:20}}>Theo nhóm khách hàng</Typography>
      {/* <Table columns={columns3} dataSource={} pagination ={false} /> */}
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

