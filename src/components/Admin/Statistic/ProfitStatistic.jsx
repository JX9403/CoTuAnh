import { Card, Space, Typography, DatePicker, Statistic, Flex,Menu,Select } from "antd";
import React, { useState,useEffect } from "react";
import { DollarOutlined, FormOutlined, RiseOutlined } from "@ant-design/icons";
import { CategoryScale, Chart as ChartJS,LinearScale,BarElement} from "chart.js";
import { Bar } from "react-chartjs-2";
import axios from 'axios';
// import {CategoryScale} from 'chart.js'; 
const { RangePicker } = DatePicker;
ChartJS.register(CategoryScale,LinearScale,BarElement);
export default function ProfitStatistic() {
  const [selectedOption,setselectOption]= useState('month')
const handleChange = (value) => {
  setselectOption(value)
};
const api=""
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
          label: "Lợi nhuận",
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
      <Typography className="header-content">BÁO CÁO LỢI NHUẬN</Typography>
      <Card className="chart-statistic" >
        <Flex className="mb-3" justify="space-between"  align="center" style={{width: '60%'}}>
          <Typography>Thống kê theo</Typography>
          <Select
      defaultValue="month"
      style={{
        width: 120,
      }}
      onChange={handleChange}
      options={[
        {
          value: 'month',
          label: 'Tháng',
        },
        {
          value: 'day',
          label: 'Ngày',
        },
        {
          value: 'year',
          label: 'Năm',
        },
        
      ]}
    />
          {`Chọn theo ${selectedOption}`}
          <RangePicker  picker={selectedOption}
            placeholder={`${selectedOption}`}
            style={{ borderColor: "#A4A4A4" , margin:'none' ,}}
          />
        </Flex>
        <Card style={{borderColor:'#000'}}>
        <Typography style={{color:'#5EB600',fontSize:16,fontWeight:500}}>BIỂU ĐỒ THỐNG KÊ LỢI NHUẬN</Typography>
        <div className="chart">
        <Bar 
        data={{
          labels :["A","B","C"],
          datasets: [
            {
              label:"revenue",
              data: [200,300,400],
            }
          ]
        }}/>
        
        </div>
        </Card>
      </Card>
    </div>
  );
}
