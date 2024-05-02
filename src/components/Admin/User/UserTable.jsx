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
import { callDeleteUser, callFetchListUser } from "../../../services/api";
import { DeleteOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import UserViewDetail from "./UserViewDetail";
import UserModalCreate from "./UserModalCreate";
import UserModalUpdate from "./UserModalUpdate";
import "./UserTable.scss";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";

const UserTable = () => {
  const [listUser, setListUser] = useState([]);
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

  const handleDeleteUser = async (id) => {
    const res = await callDeleteUser(id);
    if (res && res.data) {
      message.success("Xóa user thành công !");
      fetchUser();
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
      title: "Tên hiển thị",
      dataIndex: "fullName",
      sorter: true,
      width: '20%',
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: true,
      width: '20%',
    },
    {
      title: "SDT",
      dataIndex: "phone",
      sorter: true,
      width: '20%',
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      sorter: true,
      width: '10%',
    },
    {
      title: "Thao tác",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              title="Xác nhận xóa user"
              description="Bạn có chắc chắn muốn xóa user này?"
              onConfirm={() => handleDeleteUser(record._id)}
              onCancel={cancel}
              okText="Xóa"
              cancelText="Hủy"
            >
              <DeleteOutlined style={{ color: "#ff4d4f", fontSize: "20px", marginRight:'15px' }} />
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
      width: '10%',
    },
  ];

  useEffect(() => {
    fetchUser();
  }, [current, pageSize, filter, sortQuery, openViewDetail]);

  const fetchUser = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListUser(query);

    if (res && res.data) {
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
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
      <Row className="user-table" gutter={[20, 20]}>
        <Col span={24}>
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
            className="def"
            columns={columns}
            dataSource={listUser}
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

      <UserModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchUser={fetchUser}
      />

      <UserModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchUser={fetchUser}
      />

      <UserViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
    </>
  );
};

export default UserTable;
