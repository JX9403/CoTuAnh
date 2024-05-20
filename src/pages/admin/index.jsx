import {
    Card,
    Space,
    Typography,
    DatePicker,
    Statistic,
    Flex,
    Menu,
    Select,
  } from "antd";
  import React, { useState,useEffect } from "react";
  import "./GeneralM.scss";
  import { DollarOutlined, FormOutlined, RiseOutlined } from "@ant-design/icons";
  import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    BarElement,
  } from "chart.js";
  import { Bar, Line } from "react-chartjs-2";
  import axios from 'axios';
  // import {CategoryScale} from 'chart.js';
  const { RangePicker } = DatePicker;
  
  ChartJS.register(CategoryScale, LinearScale, BarElement);
  
  export default function AdminPage() {
    const api =""
    const [selectedOption, setselectOption] = useState("month");
    const handleChange = (value) => {
      setselectOption(value);
    };
    // Hiển thị doanh thu với số đơn hàng theo ngày 
    const [totalRevenue, setTotalRevenue] = useState(0);
    const [totalBills, setTotalBills] = useState(0);
  
    const handleRangeChange = async (dates) => {
      if (dates && dates.length === 2) {
        const startDate = dates[0].startOf('day').toISOString();
        const endDate = dates[1].endOf('day').toISOString();
        
        try {
          const response = await axios.get(api);
          const data = response.data;
  
          const filteredData = data.filter(item => {
            const time = new Date(item.time).getTime();
            return time >= new Date(startDate).getTime() && time <= new Date(endDate).getTime();
          });
  
          const revenueSum = filteredData.reduce((acc, curr) => acc + curr.revenue, 0);
          const billsSum = filteredData.reduce((acc, curr) => acc + curr.bills, 0);
  
          setTotalRevenue(revenueSum);
          setTotalBills(billsSum);
        } catch (error) {
          console.error('Error fetching data:', error);
        }
      } else {
        setTotalBills(0);
        setTotalRevenue(0);
      }}
    
      const [chartData, setChartData] = useState({
        labels: [],
        datasets: [],
      });
  
      useEffect(()=>{
        axios.get(api)
        .then(res => {
          const labels = res.data.map((item) => {
            return item.time;
          });
          const data = res.data.map((item) => {
            return item.revenue;
          });
          const dataSource = {
            labels,
            datasets: [
              {
                label: "Revenue",
                data: data,
                backgroundColor: "#5EB600",
              },
            ],
          };
    
          setChartData(dataSource);
        }) 
      },[])
    return (
      <div className="general-content">
        <Typography className="header-content">BÁO CÁO TỔNG QUAN</Typography>
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
              title={"Tổng quan doanh thu"}
              value={totalRevenue}
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
              title={"Số đơn hàng"}
              value={totalBills}
            />
            <DashboardCard
              icon={
                <RiseOutlined
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
              title={"Lợi nhuận"}
              value={150000000}
            />
          </Flex>
        </Card>
        <Card className="chart-statistic">
          <Menu mode="horizontal" style={{ width: "100%", overflowX: "auto" }}>
            <Menu.Item
              style={{ width: "50%", textAlign: "center", padding: 0, border: 0 }}
              key="1"
            >
              Thông kê doanh thu
            </Menu.Item>
            <Menu.Item
              style={{ width: "50%", textAlign: "center", padding: 0, border: 0 }}
              key="2"
            >
              Thống kê tăng trưởng
            </Menu.Item>
          </Menu>
          <Flex className="mb-3" justify="space-between" style={{ width: "50%" }}>
            <Typography>Thống kê theo</Typography>
            <Select
              defaultValue="month"
              style={{
                width: 120,
              }}
              onChange={handleChange}
              options={[
                {
                  value: "month",
                  label: "Tháng",
                },
                {
                  value: "day",
                  label: "Ngày",
                },
                {
                  value: "year",
                  label: "Năm",
                },
              ]}
            />
            {`Chọn theo ${selectedOption}`}
            <DatePicker picker={selectedOption} />
          </Flex>
          <Card style={{ borderColor: "#000" }}>
            <Typography
              style={{ color: "#5EB600", fontSize: 16, fontWeight: 500 }}
            >
              BIỂU ĐỒ THỐNG KÊ DOANH THU
            </Typography>
            <div className="chart">
              <Bar
                data={chartData}
              />
            </div>
          </Card>
        </Card>
      </div>
    );
  }
  
  function BigDashboardCard({ title, value, icon }) {
    return (
      <>
        <Card style={{ borderColor: "#000000", width: "38%" }}>
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
        <Card style={{ borderColor: "#000000", width: "27%" }}>
          <Space>
            {icon}
            <Statistic title={title} value={value} suffix=""></Statistic>
          </Space>
        </Card>
      </>
    );
  }
  