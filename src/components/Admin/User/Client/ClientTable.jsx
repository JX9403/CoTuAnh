import React, { useEffect, useState } from "react";
import {
  Table,
  Row,
  Col,
  Button,
  Popconfirm,
  message,
  notification,
} from "antd";
import InputSearch from "./InputSearch";
import { render } from "react-dom";

import {
  DeleteOutlined,
  EditOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ClientViewDetail from "./ClientViewDetail";
import ClientModalCreate from "./ClientModalCreate";
import ClientModalUpdate from "./ClientModalUpdate";
import "./ClientTable.scss";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import {
  callDeleteClient,
  callFetchListClient,
} from "../../../../services/apiAdmin";

const ClientTable = () => {
  const [listClient, setListClient] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");

  const [dataViewDetail, setDataViewDetail] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState("");

  const handleDeleteClient = async (id) => {
    const res = await callDeleteClient(id);
    if (res && res.data) {
      message.success("Xóa Client thành công !");
      fetchClient();
    } else {
      notification.error({
        message: "Có lỗi xảy ra !",
        description: res.message,
      });
    }
  };
  const cancel = (e) => {
    console.log(e);
    message.error("Click on No");
  };

  const columns = [
    {
      title: "ID",
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
      width: "20%",
    },

    {
      title: "Tên hiển thị",
      dataIndex: "full_name",
      sorter: true,
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      width: "20%",
    },
    {
      title: "SDT",
      dataIndex: "phone_number",
      sorter: true,
      width: "20%",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      sorter: true,
      width: "10%",
    },
    {
      title: "Thao tác",
      render: (text, record, index) => {
        // console.log(record)
        return (
          <>
            <Popconfirm
              title="Xác nhận xóa Client"
              description="Bạn có chắc chắn muốn xóa Client này?"
              onConfirm={() => handleDeleteClient(record.id)}
              onCancel={cancel}
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
    fetchClient();
  }, [current, pageSize, filter, sortQuery, openViewDetail]);

  const fetchClient = async () => {
    //  let query = ``;
    // if (filter) {
    //   query += `&${filter}`;
    // }

    // if (sortQuery) {
    //   query += `&${sortQuery}`;
    // }
    const res = await callFetchListClient();
    // console.log("check res api user", res)
    if (res && res.data) {
      setListClient(res.data);
      setTotal(res.data.length);
    }
  };

  const onChange = (pagination, filters, sorter, extra) => {
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

    console.log("params", pagination, filters, sorter, extra);
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  return (
    <>
      <div className="client-container">
        <Row  gutter={[20, 20]}>
          <Col className="client-search" span={24}>
            <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
          </Col>
          <Col span={24} style={{ display: "flex", justifyContent: "right" }}>
            <Button
              style={{
                width: "140px",
                height: "40px",
                lineHeight: "1",
                fontSize: "16px",
                marginLeft: "15px",
              }}
              onClick={() => setOpenModalCreate(true)}
              type="primary"
            >
              Thêm mới{" "}
            </Button>
            <Button
              style={{
                width: "90px",
                height: "40px",
                lineHeight: "1",
                fontSize: "16px",
                marginLeft: "15px",
              }}
              type="ghost"
              onClick={() => {
                setFilter("");
                setSortQuery("");
              }}
            >
              <ReloadOutlined />{" "}
            </Button>
          </Col>

          <Col span={24}>
            <Table
              className="client-table"
              columns={columns}
              dataSource={listClient}
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

      <ClientModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchClient={fetchClient}
      />

      <ClientModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchClient={fetchClient}
      />

      <ClientViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
    </>
  );
};

export default ClientTable;
