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
  PlusCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import StaffViewDetail from "./StaffViewDetail";
import StaffModalCreate from "./StaffModalCreate";
import StaffModalUpdate from "./StaffModalUpdate";
import "./StaffTable.scss";
import { width } from "@fortawesome/free-brands-svg-icons/fa42Group";
import {
  callDeleteStaff,
  callFetchListStaff,
} from "../../../../services/apiAdmin";

const StaffTable = () => {
  const [listStaff, setListStaff] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);

  const [dataViewDetail, setDataViewDetail] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState("");

  const handleDeleteStaff = async (id) => {
    const res = await callDeleteStaff(id);
    if (res && res.data) {
      message.success("Xóa thành công !");
      fetchStaff(current, pageSize);
    } else {
      notification.error({
        message: "Có lỗi xảy ra !",
        description: res.message,
      });
    }
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
      width: "10%",
    },

    {
      title: "Tên hiển thị",
      dataIndex: "full_name",
      width: "20%",
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "25%",
    },
    {
      title: "SDT",
      dataIndex: "phone_number",
      width: "20%",
    },
    {
      title: "Vai trò",
      dataIndex: "role",
      width: "15%",
    },
    {
      title: "Thao tác",
      render: (text, record, index) => {
        // console.log(record)
        return (
          <>
            <Popconfirm
              title="Xác nhận xóa tài khoản"
              description="Bạn chắc chắn muốn xóa tài khoản này?"
              onConfirm={() => handleDeleteStaff(record.id)}
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
    fetchStaff(current, pageSize);
  }, [current, pageSize, openViewDetail]);

  const fetchStaff = async (current, pageSize) => {
    let query = `${current}/${pageSize}`;
    const res = await callFetchListStaff(query);
    console.log("check fetch list Staff res", res);
    if (res && res.data.content) {
      setListStaff(res.data.content);
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

  return (
    <>
      <div className="Staff-container">
        <Row
          gutter={[20, 20]}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems:'center',
            width: "100%",
          }}
        >
          <Col className="Staff-title" span={12}>
            Danh sách nhân viên
          </Col>
          <Col span={12} style={{ display: "flex", justifyContent: "right" }}>
            <Button
              style={{
                width: "40px",
                height: "40px",
                lineHeight: "1",

                marginLeft: "15px",
              }}
              onClick={() => setOpenModalCreate(true)}
              type="primary"
              icon={<PlusCircleOutlined style={{ fontSize: "40px" }} />}
              shape="circle"
            ></Button>
          </Col>
          <Col span={24}>
            <Table
              showSorterTooltip="false"
              className="Staff-table"
              columns={columns}
              dataSource={listStaff}
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

      <StaffModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchStaff={fetchStaff}
        page={current}
        pageSize={pageSize}
      />

      <StaffModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchStaff={fetchStaff}
        page={current}
        pageSize={pageSize}
      />

      <StaffViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
        page={current}
        pageSize={pageSize}
      />
    </>
  );
};

export default StaffTable;
