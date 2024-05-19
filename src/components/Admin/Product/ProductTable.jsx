import React, { useEffect, useState } from "react";
import "./ProductTable.scss";
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

import {
  callDeleteProduct,
  callFetchCategory,
  callFetchListProduct,
} from "../../../services/api";
import {
  DeleteOutlined,
  EditOutlined,
  PlusCircleOutlined,
  ReloadOutlined,
} from "@ant-design/icons";
import ProductViewDetail from "./ProductViewDetail";
import ProductModalCreate from "./ProductModalCreate";
import ProductModalUpdate from "./ProductModalUpdate";

const ProductTable = () => {
  const [listProduct, setListProduct] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [total, setTotal] = useState(0);
  const [cate, setCate] = useState([]);

  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=sold&order=desc");

  const [dataViewDetail, setDataViewDetail] = useState("");
  const [openViewDetail, setOpenViewDetail] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);

  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [dataUpdate, setDataUpdate] = useState("");

  function findCateById(array, id) {
    for (const cate of array) {
      if (cate.id === id) {
        return cate;
      }
    }
    return null;
  }
  

  useEffect(() => {
    const fetchCate = async () => {
      const res = await callFetchCategory();
      // console.log("check call cate", res.data.data);
      setCate(res.data.data);
    };
    fetchCate();
  }, []);

  const handleDeleteProduct = async (id) => {
    const res = await callDeleteProduct(id);
    if (res && res.data) {
      message.success("Xóa sản phẩm thành công !");
      fetchProduct();
    } else {
      notification.error({
        message: "Có lỗi xảy ra !",
        description: res.message,
      });
    }
  };

  const columns = [
    {
      //note sửa
      title: "ID",
      dataIndex: "product_id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setDataViewDetail(record);
              setOpenViewDetail(true);
            }}
          >
            {record.product_id}
          </a>
        );
      },
      width: "10%",
    },
    {
      // Note sửa
      title: "Tên sản phẩm",
      dataIndex: "product_name",
      width: "20%",
    },

    {
      // Note sửa
      title: "Giá",
      dataIndex: "price",
      sorter: true,
      width: "15%",
    },
    {
      // Note sửa
      title: "Danh mục",
      dataIndex: "category_id",
      width: "20%",
      render: (text, record, index) => {
        return (
          <>
          {cate.map(item => {
            if(item.id ===record.category_id ){
              return <div>{item.categoryName}</div>
            }
          })}
          </>
        )
        // <div>{cate[record.category_id ].categoryName}</div>;
      },
    },
    {
      // Note sửa
      title: "Số lượng",
      dataIndex: "quantity",
      sorter: true,
      width: "15%",
    },
    {
      // Note sửa
      title: "Đã bán",
      dataIndex: "sold",
      sorter: true,
      width: "10%",
    },
    {
      title: "Thao tác",
      render: (text, record, index) => {
        return (
          <>
            <Popconfirm
              title="Xác nhận xóa sản phẩm"
              description="Bạn có chắc chắn muốn xóa sản phẩm này?"
              onConfirm={() => handleDeleteProduct(record.product_id)}
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
    fetchProduct();
  }, [current, pageSize, filter, sortQuery, openViewDetail]);

  const fetchProduct = async () => {
    let query = `/page=${current}&limit=${pageSize}`;

    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await callFetchListProduct(query);
    // console.log("check query ", query);
    // console.log("check call list product", res);
    if (res && res.data) {
      setListProduct(res.data.data.products);
      setTotal(res.data.data.products.length * res.data.data.total_pages);
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
          ? `sort=${sorter.field}&order=asc`
          : `sort=${sorter.field}&order=desc`;
      setSortQuery(q);
    }

    // console.log("params", pagination, filters, sorter, extra);
  };

  const handleSearch = (query) => {
    setFilter(query);
  };

  return (
    <>
      <div className="product-container">
        <Row gutter={[20, 20]}>
          <Col span={24}>
            <InputSearch handleSearch={handleSearch} setFilter={setFilter} />
          </Col>

          <Col className="product-title" span={12}>
            Danh sách sản phẩm
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
      </div>
    </>
  );
};

export default ProductTable;
