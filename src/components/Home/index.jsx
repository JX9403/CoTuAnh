import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import APIKit from "../../utils/axios";
import {
  Row,
  Col,
  Form,
  Divider,
  Rate,
  Tabs,
  Pagination,
  Spin,
  Radio,
  Space,
} from "antd";
import "./home.scss";

import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

import { useEffect, useState } from "react";
import { callFetchCategory, callFetchListProduct } from "../../services/api";
import { useNavigate, useOutletContext } from "react-router-dom";

const loadingItem = [1, 2, 3, 4, 5, 6, 7, 8, 9, 0, 11, 12];
// Style

const styleLeft = {
  // backgroundColor:' #ddd',
  paddingLeft: "20px",
  paddingTop: "30px",
  color: "#7dc22a",
  // zIndex:'-1',
  borderRight: "1px solid #ddd",
};

const styleRight = {
  // backgroundColor:' #ddd',
  paddingLeft: "20px",
  paddingTop: "30px",
};

const styleRadio = {
  display: "flex",
  alignItems: "center",
  width: "100%",
  height: "100%",
  paddingLeft: "50px",
  padding: "20px 30px",
};

const Home = () => {
  const [searchTerm, setSearchTerm] = useOutletContext();
  const [listCategory, setListCategory] = useState([]);

  const [listProduct, setListProduct] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(20);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingProduct, setIsLoadingProduct] = useState(false);

  const [filter, setFilter] = useState("");
  const pageSizeOptions = [8, 20, 32, 44];

  // khi mới vào trang sẽ là phổ biến => sắp xếp theo bán được nhiều nhất
  const [sortQuery, setSortQuery] = useState("sort=sold&order=desc");

  const [form] = Form.useForm();

  // Call api cho danh mục sản phẩm
  useEffect(() => {
    setIsLoading(true);
    const initCategory = async () => {
      const res = await callFetchCategory();
      // console.log("cate: ",res.data.data)
      if (res && res.data.data) {
        const d = res.data.data.map((item) => {
          return {
            label: item.categoryName,
            value: item.id,
          };
        });
        setListCategory(d);
      }
      setIsLoading(false);
    };
    initCategory();
  }, []);

  //Call api cho sản phẩm
  useEffect(() => {
    fetchProduct();
  }, [current, pageSize, filter, sortQuery, searchTerm, total]);

  const fetchProduct = async () => {
    setIsLoadingProduct(true);
    let query = `page=${current}&limit=${pageSize}`;

    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    if (searchTerm) {
      query += `&keyword=${searchTerm}`;
    }
    // console.log(searchTerm)
    const res = await callFetchListProduct(query);
    // console.log(res.data.data);
    if (res && res.data) {
      // console.log("check total",res.data.data.total_pages);
      setListProduct(res.data.data.products);
      setTotal((res.data.data.products.length) *(res.data.data.total_pages) );
    }
    setIsLoadingProduct(false);
  };
  // console.log("check total",total);
  const handleChangeFilter = (changedValues, values) => {
    // console.log(">>> check handleChangeFilter", changedValues, values);

    if (changedValues.category) {
      const cate = values.category;
      if (cate) {
        setFilter(`category_id=${cate}`);
      } else {
        setFilter("");
      }
    }
  };

  const handleOnChangePage = (pagination) => {
    console.log("check ham handle change page", pagination);
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const navigate = useNavigate();

  const handleClick = async (item) => {
    navigate(`/product/${item.product_id}`);
  };
  // const onFinish = (values) => {};

  // const onChange = (key) => {
  //   console.log(key);
  // };

  const items = [
    {
      key: "sort=sold&order=desc",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "sort=price&order=asc",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "sort=price&order=desc",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];

  return (
    <div className="homepage-container">
      <Row gutter={[20, 20]}>
        {/* LEFT  */}
        <Col md={5} sm={0} xs={0} className="homepage-left" style={styleLeft}>
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              padding: "20px 20px",
            }}
          >
            <span
              className="filter-title"
              style={{ fontWeight: 700, fontSize: "20px" }}
            >
              Danh mục sản phẩm
            </span>
            {/* Reload lại toàn bộ */}
            <ReloadOutlined
              title="Reset"
              onClick={() => {
                form.resetFields();
                setFilter("");
                setSearchTerm("");
              }}
              style={{ fontWeight: 700, fontSize: "22px" }}
            />
          </div>

          <Form
            // onFinish={onFinish}
            form={form}
            onValuesChange={(changedValues, values) =>
              handleChangeFilter(changedValues, values)
            }
          >
            <Form.Item name="category">
              <Radio.Group>
                  <Row className="category-scroll" style={{}}>
                    {listCategory?.map((item, index) => (
                      <Col span={24} key={index}>
                        <Radio
                          className="filter-radio"
                          value={item.value}
                          style={styleRadio}
                        >
                          {item.label}
                        </Radio>
                      </Col>
                    ))}
                  </Row>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Col>
        {/* RIGHT */}
        <Col md={19} xs={24} className="homepage-right" style={styleRight}>
          <Row>
            <Tabs
              defaultActiveKey="sort=sold&order=desc"
              items={items}
              onChange={(value) => {
                setSortQuery(value);
              }}
            />
          </Row>

          <Row className="customize-row">
            {isLoadingProduct ? (
              <>
                {loadingItem.map((_item, index) => (
                  <div className="column" key={index}>
                    <div className="wrapper">
                      <Skeleton
                        isLoading={isLoadingProduct}
                        className="thumbnail"
                      ></Skeleton>
                      <div className="bottom">
                        <Skeleton
                          className="text"
                          style={{ marginBottom: "10px", height: "20px" }}
                        ></Skeleton>
                        <Skeleton
                          className="text"
                          style={{
                            marginBottom: "10px",
                            height: "20px",
                            width: "60%",
                          }}
                        ></Skeleton>
                        <Skeleton
                          className="rating"
                          style={{
                            marginBottom: "10px",
                            height: "20px",
                            width: "80%",
                          }}
                        ></Skeleton>
                      </div>
                    </div>
                  </div>
                ))}
              </>
            ) : (
              <>
                {listProduct.map((item, index) => {
                  return (
                    <>
                      <div
                        className="column"
                        key={index}
                        onClick={() => handleClick(item)}
                      >
                        <div className="wrapper">
                          <div className="thumbnail">
                            <img src={item.images[0].image_url} />
                            {/* https://backend-online-supermarket-sales-website.onrender.com/api/v1/productImages/${item.images[0].image_url} */}
                          </div>
                          <div className="bottom">
                            <div className="title">{item.product_name}</div>
                            <div className="price">
                              {new Intl.NumberFormat("vi-VN", {
                                style: "currency",
                                currency: "VND",
                              }).format(item.price) + `/${item.unit}`}
                            </div>
                            <div className="rating">
                              <Rate
                                value={5}
                                disabled
                                style={{ color: "#ffce3d", fontSize: 10 }}
                              />
                              <span>Đã bán {item.sold}</span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </>
                  );
                })}
              </>
            )}
          </Row>
          <Divider />

          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              current={current}
              pageSize={pageSize}
              showSizeChanger="true"
              showQuickJumper
              onChange={(p, s) =>
                handleOnChangePage({ current: p, pageSize: s })
              }
              pageSizeOptions={pageSizeOptions}
              total={total}
              // responsive
              defaultCurrent={1}
              showTotal={() => (Math.ceil(total/pageSize) > 1 ? `${Math.ceil(total/pageSize)} pages` :`${Math.ceil(total/pageSize)} page` )}
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
