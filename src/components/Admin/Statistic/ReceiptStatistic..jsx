import { Skeleton,Card, Space, Typography, DatePicker, Statistic, Flex,Menu,Select,Table } from "antd";
import React, { useState ,useEffect} from "react";
import { DollarOutlined, FormOutlined, RiseOutlined,MinusOutlined } from "@ant-design/icons";
import { CategoryScale, Chart as ChartJS,LinearScale,BarElement} from "chart.js";
import axios from 'axios';
import { Bar } from "react-chartjs-2";
// import {CategoryScale} from 'chart.js'; 
const { RangePicker } = DatePicker;


ChartJS.register(CategoryScale,LinearScale,BarElement);
export default function ReceiptStatistic() {

const columns = [
  {
    title: "STT",
    align :"center",
    render: (text, record, index) => <span>{index + 1}</span>,
  },
  {
    title: "Mã phiếu nhập kho",
    dataIndex: "id",
    key: "id",
    align :"center"
  },
  {
    title: "Chi phí",
    dataIndex: "total_money",
    key: "total_money",
    align :"center"
  },
  {
    title: "Ngày nhập",
    dataIndex: "delivery_date",
    key: "delivery_date",
    align :"center"
  },
  {
    title: "Còn nợ",
    dataIndex: "owe",
    key: "owe",
    align :"center"
  },
  {
    title: "Trạng thái",
    key: "status",
    align :"center",
    dataIndex:"status"
    
  },
];
const [tableData,setTableData]=useState([])
const api="https://backend-online-supermarket-sales-website.onrender.com/api/v1/receipts"
const [totalValues, setTotalValues] = useState(0);
const [totalDebt, setTotalDebt] = useState(0);
const [totalBills,setTotalBills]=useState(0)
const [receiptLoading,setReceiptLoading]=useState(false)
const token =
    "eyJhbGciOiJIUzM4NCJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTY3ODkiLCJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNzE1ODIyOTMxLCJleHAiOjE3MTg0MTQ5MzF9.URI8rt4769uqmVEuRW7-Sazom_zg18fojXZOsBnmL6seMA5CIZn8Lk1vi0JeE8kr";
useEffect(() => {
  setReceiptLoading(true)
  fetch(api,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        accept: "*/*",
    }}
  )
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json();
    })
    .then((jsonData) => {
      setTableData(jsonData);
      setTotalValues(jsonData.reduce((acc, curr) => acc + curr.total_money, 0));
      setTotalDebt(jsonData.reduce((acc, curr) => acc + curr.owe, 0));
      setTotalBills(jsonData.length)
      setReceiptLoading(false)
    })
    .catch((error) => {
      console.error("Error fetching data:", error);
    });
    
}, []);

// Tính statistic theo thời gian 


  const handleRangeChange = async (dates) => {
    setReceiptLoading(true)
    if (dates && dates.length === 2) {
      const startDate = dates[0].startOf('day').toISOString();
      const endDate = dates[1].endOf('day').toISOString();
      
      try {
        const response = await axios.get(api, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        });
        const data = response.data;
        const filteredData = data.filter(item => {
          const time = new Date(item.delivery_date).getTime();
          return (
            time >= new Date(startDate).getTime() &&
            time <= new Date(endDate).getTime()
          );
        });
        
        console.log(filteredData)
        setTableData(filteredData)
        setTotalValues(filteredData.reduce((acc, curr) => acc + curr.total_money, 0));
        setTotalDebt(filteredData.reduce((acc, curr) => acc + curr.owe, 0));
        setTotalBills(filteredData.length)
      } catch (error) {
        console.error('Error fetching data:', error);
      }
      finally {
        setReceiptLoading(false)
      }
    } else {
      setTotalValues(0);
      setTotalDebt(0);
      setTotalBills(0);
    }}
  return (
    <div className="general-content">
      <Typography className="header-content">BÁO CÁO NHẬP HÀNG</Typography>
      <Card className="data-statistic mb-3">
        <Typography className="mb-2">Thời gian:</Typography>
        <Space>
          <RangePicker
            onChange={handleRangeChange}
            placeholder={"Ngày"}
            style={{ borderColor: "#A4A4A4" }}
            className="mb-3"
          />
        </Space>
        {receiptLoading ? (
                  <Skeleton active />
                ) : (
                  <Flex justify="space-between">
          <BigDashboardCard
            icon={
              <DollarOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 100,
                  fontSize: 24,
                  padding: 16,
                  marginRight: 8,
                }}
              />
            }
            title={"Tiền nhập kho"}
            value={totalValues}
          />
          <DashboardCard
            icon={
              <FormOutlined
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 10000,
                  fontSize: 24,
                  padding: 16,
                  marginRight: 8,
                }}
              />
            }
            title={"Số phiếu nhập kho"}
            value={totalBills}
          />
          <DashboardCard
            icon={
              <MinusOutlined 
                style={{
                  color: "green",
                  backgroundColor: "rgba(0,255,0,0.25)",
                  borderRadius: 1000,
                  fontSize: 28,
                  padding: 16,
                  marginRight: 8,
                }}
              />
            }
            title={"Tiền còn nợ"}
            value={totalDebt}
          />
        </Flex>
                )}
        
      </Card>
      <Card className="chart-statistic" >
      <Table columns={columns} dataSource={tableData} />;
      </Card>
    </div>
  );
}

function BigDashboardCard({ title, value, icon }) {
  return (
    <>
      <Card style={{ borderColor: "#000000", width: '38%' }}>
        <Space>
          {icon}
          <Statistic title={title} value={value} suffix="VNĐ"></Statistic>
        </Space>
      </Card>
    </>
  );
}

function DashboardCard({ title, value, icon }) {
  return (
    <>
      <Card style={{ borderColor: "#000000", width: '27%' }}>
        <Space>
          {icon}
          <Statistic title={title} value={value} suffix=""></Statistic>
        </Space>
      </Card>
    </>
  );
}
