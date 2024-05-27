import {
  Card,
  Space,
  Typography,
  DatePicker,
  Statistic,
  Flex,
  Menu,
  Select,
  Skeleton
} from "antd";
import React, { useState, useEffect } from "react";
import "./GeneralM.scss";
import { DollarOutlined, FormOutlined, RiseOutlined } from "@ant-design/icons";
import {
  CategoryScale,
  Chart as ChartJS,
  LinearScale,
  BarElement,
} from "chart.js";
import { Bar, Line } from "react-chartjs-2";
import axios from "axios";
// import {CategoryScale} from 'chart.js';
const { RangePicker } = DatePicker;

ChartJS.register(CategoryScale, LinearScale, BarElement);

export default function AdminPage() {
  const api = "";
  const [loadingStatistic,setLoadingStatistic]=useState(false)
  // Hiển thị doanh thu với số đơn hàng theo ngày
  const [data, setData] = useState([]);
  const formatDate = (originalDate) => {
    // Parse ngày ban đầu thành một đối tượng Date
    const date = new Date(originalDate);

    // Lấy ngày, tháng và năm từ đối tượng Date
    const year = date.getFullYear();
    const month = padZero(date.getMonth() + 1);
    const day = padZero(date.getDate());

    // Định dạng lại thành chuỗi theo định dạng mong muốn
    return `${year}-${month}-${day}T00:00`;
  };
  const padZero = (number) => {
    return number < 10 ? "0" + number : number;
  };
  const token =
    "eyJhbGciOiJIUzM4NCJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTY3ODkiLCJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNzE1ODIyOTMxLCJleHAiOjE3MTg0MTQ5MzF9.URI8rt4769uqmVEuRW7-Sazom_zg18fojXZOsBnmL6seMA5CIZn8Lk1vi0JeE8kr";

    
  const handleRangeChange = async (dates) => {
    setLoadingStatistic(true)
    if (dates && dates.length === 2) {
      const startDate = dates[0].startOf("day").toISOString();
      const endDate = dates[1].endOf("day").toISOString();
      console.log(formatDate(startDate));
      console.log(formatDate(endDate));
      const apiUrl = `https://backend-online-supermarket-sales-website.onrender.com/api/v1/statistics/statisticsOverview?startDate=${encodeURIComponent(
        formatDate(startDate)
      )}&endDate=${encodeURIComponent(formatDate(endDate))}`;
      try {
        axios
          .get(apiUrl, {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
          })
          .then((res) => {
            setData(res.data);
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
        console.error("Error fetching data:", error);
      }
      finally{
        setLoadingStatistic(false)
      }
    }
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [],
  });

  useEffect(() => {
    axios.get(api).then((res) => {
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
    });
  }, []);
  return (
    <div className="general-content">
      <Typography className="header-content">BÁO CÁO TỔNG QUAN</Typography>
      <Card className="data-statistic mb-3">
        <Typography className="mb-2">Thời gian:</Typography>
        <Space>
          <RangePicker
            onChange={(dates) => handleRangeChange(dates)}
            placeholder={"Ngày"}
            style={{ borderColor: "#A4A4A4" }}
            className="mb-3"
          />
        </Space>
        {loadingStatistic ? (
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
                    title={"Tổng quan doanh thu"}
                    value={data?.total_revenue}
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
                    value={data?.number_of_orders}
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
                    value={data?.profit}
                  />
                </Flex>
                )}
        
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
       
        <Card style={{ borderColor: "#000" }}>
          <Typography
            style={{ color: "#5EB600", fontSize: 16, fontWeight: 500 }}
          >
            BIỂU ĐỒ THỐNG KÊ DOANH THU
          </Typography>
          <div className="chart">
            <Bar data={chartData} />
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
          <Statistic title={title} value={value} suffix={title === "Lợi nhuận" ? "VNĐ" : ""}></Statistic>
        </Space>
      </Card>
    </>
  );
}
