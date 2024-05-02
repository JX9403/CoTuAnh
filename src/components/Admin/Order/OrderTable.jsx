import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Popconfirm, message, notification } from "antd";

import { callFetchListOrder } from "../../../services/api";
import { DeleteOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import OrderViewDetail from "./OrderViewDetail";



const OrderTable = () => {
  const [listOrder, setListOrder] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [sortQuery, setSortQuery] = useState("sort=-updateAt");

  const [dataViewDetail, setDataViewDetail] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);


  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const columns = [
    {
      //note sửa
      title: "ID",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record._id}
          </a>
        );
      },
      width: '20%',
    },
    {
      // Note sửa 
      title: "Tên sản phẩm",
      dataIndex: "mainText",
      sorter: true,
      width: '28%',
    },
  
    {
      // Note sửa 
      title: "Giá",
      dataIndex: "price",
      sorter: true,
      width: '12%',
    },
    {
      // Note sửa 
      title: "Danh mục",
      dataIndex: "category",
      sorter: true,
      width: '10%',
    },
    {
      // Note sửa 
      title: "Số lượng",
      dataIndex: "quantity",
      sorter: true,
      width: '10%',
    },
    {
      // Note sửa 
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      sorter: true,
      width: '20%',
    },
    
  ];

  useEffect(() => {
    fetchOrder();
  }, [current, pageSize, sortQuery, openViewDetail]);

  const fetchOrder = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;

    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListOrder(query);

    if (res && res.data) {
      setListOrder(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const onChange = (pagination, sorter, extra) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }

    if (sorter && sorter.field) {
      const q =
        sorter.order === "ascend"
          ? `sort=${sorter.field}`
          : `sort=-${sorter.field}`;
      setSortQuery(q);
    }

    console.log("params", pagination,  sorter, extra);
  };


  return (
    <>
      <Row gutter={[20, 20]}>
        
        <Col span={24}>
          <Table
            className="def"
            columns={columns}
            dataSource={listOrder}
            onChange={onChange}
            rowKey="_id"
            pagination={{
              current: current,
              pageSize: pageSize,
              showSizeChanger: true,
              total: total,
            }}
          />
        </Col>
      </Row>


      <OrderViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
    </>
  );
};

export default OrderTable;
