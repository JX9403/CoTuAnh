import { FilterTwoTone, ReloadOutlined } from "@ant-design/icons";
import {
  Row,
  Col,
  Form,
  Checkbox,
  Divider,
  InputNumber,
  Button,
  Rate,
  Tabs,
  Pagination,
  Spin,
  Radio,
  Space,
} from "antd";
import "./home.scss";
import { useEffect, useState } from "react";
import { callFetchCategory, callFetchListBook } from "../../services/api";
import { useNavigate, useOutletContext } from "react-router-dom";
const Home = () => {
  const [searchTerm, setSearchTerm] = useOutletContext();
  const [listCategory, setListCategory] = useState([]);

  const [listBook, setListBook] = useState([]);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(5);
  const [total, setTotal] = useState(0);

  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState("");

  // khi mới vào trang sẽ là phổ biến => sắp xếp theo bán được nhiều nhất
  const [sortQuery, setSortQuery] = useState("sort=-sold");

  const [form] = Form.useForm();
  // Call api cho danh mục sản phẩm
  useEffect(() => {
    const initCategory = async () => {
      const res = await callFetchCategory();
      if (res && res.data) {
        const d = res.data.map((item) => {
          return {
            label: item,
            value: item,
          };
        });
        setListCategory(d);
      }
    };
    initCategory();
  }, []);

  //Call api cho sản phẩm
  useEffect(() => {
    fetchBook();
  }, [current, pageSize, filter, sortQuery, searchTerm]);

  const fetchBook = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }

    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    if (searchTerm) {
      query += `&mainText=/${searchTerm}/i`;
    }

    const res = await callFetchListBook(query);

    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
    setIsLoading(false);
  };

  const handleChangeFilter = (changedValues, values) => {
    console.log(">>> check handleChangeFilter", changedValues, values);

    if (changedValues.category) {
      const cate = values.category;
      if (cate) {
        setFilter(`category=${cate}`);
      } else {
        setFilter("");
      }
    }
  };

  const handleOnChangePage = (pagination) => {
    if (pagination && pagination.current !== current) {
      setCurrent(pagination.current);
    }
    if (pagination && pagination.pageSize !== pageSize) {
      setPageSize(pagination.pageSize);
      setCurrent(1);
    }
  };

  const navigate = useNavigate();

  const handleClick = (item) => {
    navigate(`/product/${item._id}`);
  };
  // const onFinish = (values) => {};

  // const onChange = (key) => {
  //   console.log(key);
  // };

  const items = [
    {
      key: "sort=-sold",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "sort=-updateAt",
      label: `Hàng Mới`,
      children: <></>,
    },
    {
      key: "sort=price",
      label: `Giá Thấp Đến Cao`,
      children: <></>,
    },
    {
      key: "sort=-price",
      label: `Giá Cao Đến Thấp`,
      children: <></>,
    },
  ];

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
    padding: "20px 50px",
  };
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
              padding: "30px 20px",
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
                <Space direction="vertical">
                  <Row>
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
                </Space>
              </Radio.Group>
            </Form.Item>
          </Form>
        </Col>

        {/* RIGHT */}
        <Col md={19} xs={24} className="homepage-right" style={styleRight}>
          <Row>
            <Tabs
              defaultActiveKey="sort=-sold"
              items={items}
              onChange={(value) => {
                setSortQuery(value);
              }}
            />
          </Row>

          <Row className="customize-row">
            {listBook.map((item, index) => {
              return (
                <>
                  <div
                    className="column"
                    key={index}
                    onClick={() => handleClick(item)}
                  >
                    <div className="wrapper">
                      <div className="thumbnail">
                        <img
                          src={
                            "http://localhost:8080/images/book/" +
                            item.thumbnail
                          }
                        />
                      </div>
                      <div className="bottom">
                        <div className="text">{item.mainText}</div>
                        <div className="price">
                          {new Intl.NumberFormat("vi-VN", {
                            style: "currency",
                            currency: "VND",
                          }).format(item.price)}
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
          </Row>
          <Divider />

          <Row style={{ display: "flex", justifyContent: "center" }}>
            <Pagination
              current={current}
              pageSize={pageSize}
              showSizeChanger="true"
              onChange={(p, s) =>
                handleOnChangePage({ current: p, pageSize: s })
              }
              total={total}
              responsive
            />
          </Row>
        </Col>
      </Row>
    </div>
  );
};

export default Home;
