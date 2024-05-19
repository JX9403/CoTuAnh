import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  notification,
  Tag,
} from "antd";
import InputSearch from "./InputSearch";
import { render } from "react-dom";

import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import OrderViewDetail from "./OrderViewDetail";

import OrderModalUpdate from "./OrderModalUpdate";
import "./OrderTable.scss";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import {
  callDeleteOrder,
  callFetchListOrder,
} from "../../../services/apiAdmin";

const OrderTable = () => {
  const [listOrder, setListOrder] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [dataViewDetail, setDataViewDetail] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState("");

  const [filter, setFilter] = useState("");

  const handleDeleteOrder = async (id) => {
    const res = await callDeleteOrder(id);
    // console.log(" check api delete ", res.data.message);
    if (res.data) {
      message.success(res.data.message);
      fetchOrder(current, pageSize);
    } else {
      notification.error({
        message: "Có lỗi xảy ra !",
      });
    }
  };
  function formatDate(inputDate) {
    const date = new Date(inputDate);
    const day = date.getUTCDate();
    const month = date.getUTCMonth() + 1; // Tháng tính từ 0
    const year = date.getUTCFullYear();

    // Đảm bảo định dạng dd/mm/yyyy
    const formattedDay = day < 10 ? `0${day}` : day;
    const formattedMonth = month < 10 ? `0${month}` : month;

    return `${formattedDay}/${formattedMonth}/${year}`;
  }
  const columns = [
    {
      title: "Mã",
      dataIndex: "id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record.id}
          </a>
        );
      },
      width: "10%",
    },
    {
      title: "ID khách hàng",
      dataIndex: "user_id",
      width: "15%",
    },

    {
      title: "Giá trị đơn hàng",
      dataIndex: "total_money",
      width: "15%",
    },
    {
      title: "Trạng thái thanh toán",
      dataIndex: "payment_status",
      width: "20%",
      render: (text, record, index) => (
        <>
          {record.payment_status === "Đã thanh toán" ? (
            <Tag color="green" key={record.payment_status}>
              {record.payment_status.toUpperCase()}
            </Tag>
          ) : (
            <>
              <Tag color="red" key={record.payment_status}>
                {record.payment_status.toUpperCase()}
              </Tag>
            </>
          )}
        </>
      ),
    },
    {
      title: "Trạng thái đơn hàng",
      dataIndex: "status",
      width: "20%",
      render: (text, record, index) => (
        <>
          {record.status == "Đang giao hàng" ? (
            <>
              <Tag color="blue" key={record.status}>
                {record.status.toUpperCase()}
              </Tag>
            </>
          ) : record.status === "Đã hoàn thành" ? (
            <>
              <Tag color="green" key={record.status}>
                {record.status.toUpperCase()}
              </Tag>
            </>
          ) : (
            <>
              <Tag color="red" key={record.status}>
                {record.status.toUpperCase()}
              </Tag>{" "}
            </>
          )}
        </>
      ),
    },
    {
      title: "Ngày đặt",
      dataIndex: "shipping_date",
      width: "10%",
      render: (text, record, index) => {
        return formatDate(record.shipping_date);
      },
    },
    {
      title: "Thao tác",
      render: (text, record, index) => {
        // console.log(record)
        return (
          <>
            <Popconfirm
              title="Xác nhận xóa đơn hàng"
              description="Bạn chắc chắn muốn xóa đơn hàng này?"
              onConfirm={() => handleDeleteOrder(record.id)}
              okText="Xóa"
              cancelText="Hủy"
            >
              <DeleteOutlined
                style={{
                  color: "#ff4d4f",
                  fontSize: "20px",
                  marginRight: "15px",
                }}
              />
            </Popconfirm>

            <EditOutlined
              style={{ color: "#46b91d", fontSize: "20px" }}
              onClick={() => {
                setDataUpdate(record);
                setOpenModalUpdate(true);
              }}
            >
              Sửa
            </EditOutlined>
          </>
        );
      },
      width: "10%",
    },
  ];

  useEffect(() => {
    fetchOrder(current, pageSize);
  }, [current, pageSize, filter, openViewDetail]);

  const fetchOrder = async (current, pageSize) => {
    let query = `?page=${current}&pageSize=${pageSize}`;

    if (filter) {
      query += `&userId=${filter}`;
    }
    const res = await callFetchListOrder(query);
    // console.log("check fetch list Order res", res);
    if (res && res.data.content) {
      setListOrder(res.data.content);
      setTotal(res.data.size * res.data.totalPages);
    }
  };

  const onChange = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }

    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  return (
    <>
      <div className="Order-container">
        <Row
          gutter={[20, 20]}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <Col span={24}>
            <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
          </Col>
          <Col className="Order-title" span={20}>
            Danh sách đơn hàng
          </Col>
          <Col span={2}>
            <Button
              style={{
                height: "40px",
                lineHeight: "1",
                fontSize: "24px",
                marginLeft: "15px",
              }}
              type="ghost"
              onClick={() => {
                setFilter("");
              }}
            >
              <ReloadOutlined />{" "}
            </Button>
          </Col>

          <Col span={24}>
            <Table
              showSorterTooltip="false"
              className="Order-table"
              columns={columns}
              dataSource={listOrder}
              onChange={onChange}
              rowKey="id"
              pagination={{
                current: current,
                pageSize: pageSize,
                showSizeChanger: true,
                total: total,
              }}
            />
          </Col>
        </Row>
      </div>

      {/* <OrderModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchOrder={fetchOrder}
        page={current}
        pageSize={pageSize}
      /> */}

      <OrderModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchOrder={fetchOrder}
        page={current}
        pageSize={pageSize}
      />

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
