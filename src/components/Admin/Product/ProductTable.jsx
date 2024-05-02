import React, { useEffect, useState } from "react";
import { Table, Row, Col, Button, Popconfirm, message, notification } from "antd";
import InputSearch from "./InputSearch";

import { callDeleteProduct, callFetchListProduct } from "../../../services/api";
import { DeleteOutlined, EditOutlined, ReloadOutlined } from "@ant-design/icons";
import ProductViewDetail from "./ProductViewDetail";
import ProductModalCreate from "./ProductModalCreate";
import ProductModalUpdate from "./ProductModalUpdate";


const ProductTable = () => {
  const [listProduct, setListProduct] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updateAt");

  const [dataViewDetail, setDataViewDetail] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState("");

  const handleDeleteProduct = async (id) => {
    const res = await callDeleteProduct(id);
    if(res && res.data ) {
      message.success("Xóa sản phẩm thành công !");
      fetchProduct();
    } else {
      notification.error({
        message : "Có lỗi xảy ra !",
        description: res.message
      })
    }

  };

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
      width: '10%',
    },
    {

      title: "Thao tác",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              title="Xác nhận xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm này?"
              onConfirm={() => handleDeleteProduct(record._id)}
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
    fetchProduct();
  }, [current, pageSize, filter, sortQuery, openViewDetail]);

  const fetchProduct = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListProduct(query);

    if (res && res.data) {
      setListProduct(res.data.result);
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
      <Row gutter={[20, 20]}>
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
            dataSource={listProduct}
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

      <ProductModalCreate
        openModalCreate={openModalCreate}
        setOpenModalCreate={setOpenModalCreate}
        fetchProduct={fetchProduct}
      />

      <ProductModalUpdate
        openModalUpdate={openModalUpdate}
        setOpenModalUpdate={setOpenModalUpdate}
        dataUpdate={dataUpdate}
        fetchProduct={fetchProduct}
      />

      <ProductViewDetail
        openViewDetail={openViewDetail}
        setOpenViewDetail={setOpenViewDetail}
        dataViewDetail={dataViewDetail}
        setDataViewDetail={setDataViewDetail}
      />
    </>
  );
};

export default ProductTable;
