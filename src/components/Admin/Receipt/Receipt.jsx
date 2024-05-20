import {
    Card,
    Space,
    Typography,
    DatePicker,
    Statistic,
    Flex,
    Menu,
    Select,
    Input,
    Button,
    Table,
    Form,
    InputNumber,
    Drawer,
    message,
    Modal,
    Skeleton,
    Spin,
  } from "antd";
  import React, { useState, useEffect } from "react";
  import {
    PlusCircleOutlined,
    LeftOutlined,
    CloseCircleOutlined,
    LoadingOutlined,
  } from "@ant-design/icons";
  import { ImBin } from "react-icons/im";
  import { FiEdit } from "react-icons/fi";
  import { Link, json, useNavigate, useParams } from "react-router-dom";
//   import "./WareHouse.scss";
  import axios from "axios";
  import moment from "moment";
  import ProductModal from "./ProductModal";
  import ProductModalUpdate from "./ProductModalUpdate";
  // import {CategoryScale} from 'chart.js';
  const { RangePicker } = DatePicker;
  const { Option } = Select;
  export default function Receipt() {
    const category = ["Tất cả", "Chờ xác nhận", "Đã xác nhận"];
    const [formAdd, setFormAdd] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [viewWarehouse, setViewWarehouse] = useState(false);
    const [dataView, setDataView] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingView, setLoadingView] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [tableProduct, setTableProduct] = useState([]);
    const [deletingRecord, setDeletingRecord] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);
    const [viewRecord, setViewRecord] = useState(null);
  
    // Các chức năng
    const addAction = () => {
      setFormAdd(!formAdd);
    };
    const editAction = (record) => {
      setFormEdit(!formEdit);
      setEditingRecord(record);
    };
    const deleteAction = (record) => {
      setConfirmDelete(!confirmDelete);
      setDeletingRecord(record);
    };
  
    const viewAction = (record) => {
      setViewWarehouse(!viewWarehouse);
      setLoadingView(true);
      setViewRecord(record);
    };
  
    const columns = [
      {
        title: "STT",
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: "Mã phiếu ",
        dataIndex: "id",
        key: "id",
        render: (text, record) => (
          <Link
            style={{ textDecoration: "none", color: "#46B91D", fontWeight: 500 }}
            onClick={() => viewAction(record)}
          >
            {text}
          </Link>
        ),
      },
      {
        title: "Đơn giá ",
        dataIndex: "total_money",
        key: "total_money",
      },
      {
        title: "Thời gian nhập hàng",
        dataIndex: "delivery_date",
        key: "delivery_date",
      },
      {
        title: "Nhân viên bàn giao",
        dataIndex: ["user", "full_name"],
        key: "full_name",
      },
      {
        title: "Trạng thái",
        dataIndex: "status",
        key: "status",
      },
      {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Link style={{ color: "#000" }}>
              <FiEdit onClick={() => editAction(record)} />
            </Link>
            <Button
              style={{ border: "none", backgroundColor: "transparent" }}
              icon={<ImBin />}
              onClick={() => deleteAction(record)}
              disabled={record.status !== "Hủy bỏ"}
            />
          </Space>
        ),
      },
    ];
    const columnsProduct = [
      {
        title: "STT",
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: "Mã sản  phẩm ",
        dataIndex: "id",
        key: "id",
      },
      {
        title: "Tên sản phẩm",
        dataIndex: "product_name",
        key: "product_name",
      },
      {
        title: "Giá nhập ",
        dataIndex: "price",
        key: "price",
      },
      {
        title: "Số lượng ",
        dataIndex: "quantity",
        key: "quantity",
      },
    ];
    //thông báo
    const [messageApi, contextHolder] = message.useMessage();
    const success = () => {
      messageApi.open({
        type: "success",
        content: "This is a success message",
      });
    };
    const error = () => {
      messageApi.open({
        type: "error",
        content: "This is an error message",
      });
    };
  
    const [data, setData] = useState([]);
    const [warehouse, setWarehouse] = useState([]);
    const [tableData, setTableData] = useState(data);
    const [product, setProduct] = useState([]);
    const [partner, setPartner] = useState([]);
    const [user, setUser] = useState(null);
  
    // const status = ["Đã xác nhận", "Chờ xác nhận"];
    const api =
      "https://backend-online-supermarket-sales-website.onrender.com/api/v1/receipts";
    const apiProduct =
      "https://backend-online-supermarket-sales-website.onrender.com/api/v1/products";
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTY3ODkiLCJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNzE1ODIyOTMxLCJleHAiOjE3MTg0MTQ5MzF9.URI8rt4769uqmVEuRW7-Sazom_zg18fojXZOsBnmL6seMA5CIZn8Lk1vi0JeE8kr";
    const apiUser =
      "https://backend-online-supermarket-sales-website.onrender.com/api/v1/users/login";
    const apiPartner =
      "https://backend-online-supermarket-sales-website.onrender.com/api/v1/partners";
  
    useEffect(() => {
      axios
        .get(api, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        })
        .then((res) => {
          setData(res.data);
          setLoading(false);
        })
        .catch((error) => {
          setLoading(false);
          if (error.response) {
            console.error(
              `Error: ${error.response.status} - ${error.response.data}`
            );
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up request:", error.message);
          }
        });
  
      axios
        .get(apiProduct, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        })
        .then((res) => {
          setProduct(res.data.data.products);
        })
        .catch((error) => {
          if (error.response) {
            console.error(
              `Error: ${error.response.status} - ${error.response.data}`
            );
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up request:", error.message);
          }
        });
      axios
        .get(apiPartner, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        })
        .then((res) => {
          setPartner(res.data);
        })
        .catch((error) => {
          if (error.response) {
            console.error(
              `Error: ${error.response.status} - ${error.response.data}`
            );
          } else if (error.request) {
            console.error("No response received:", error.request);
          } else {
            console.error("Error setting up request:", error.message);
          }
        });
  
      axios
        .post(
          apiUser,
          {
            password: "123456",
            phone_number: "0123456789",
          },
          {
            headers: {
              accept: "*/*",
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        )
        .then((res) => {
          setUser(res.data.data.user);
        });
    }, []);
  
    useEffect(() => {
      if (warehouse) {
        axios
          .get(api, {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
          })
          .then((res) => {
            setTableData(res.data);
            setLoading(false);
          })
          .catch((error) => {
            setLoading(false);
            if (error.response) {
              console.error(
                `Error: ${error.response.status} - ${error.response.data}`
              );
            } else if (error.request) {
              console.error("No response received:", error.request);
            } else {
              console.error("Error setting up request:", error.message);
            }
          });
      }
    }, [warehouse]);
  
    //xóa phiếu
  
    const deleteConfirm = async () => {
      setLoadingDelete(true);
      try {
        const response = await fetch(
          `https://backend-online-supermarket-sales-website.onrender.com/api/v1/receipts/delete/${deletingRecord.id}`,
          {
            method: "DELETE",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
          }
        );
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const newData = data.filter((item) => item.id !== deletingRecord.id);
        setTableData(newData);
        setConfirmDelete(!confirmDelete);
      } catch (error) {
        console.error("Error deleting product:", error);
      } finally {
        setLoadingDelete(false);
        message.success("Xóa thành công!");
      }
    };
  
    // Xem chi tiết phiếu
    useEffect(() => {
      if (viewRecord?.id !== undefined) {
        fetch(
          `https://backend-online-supermarket-sales-website.onrender.com/api/v1/receipts/${viewRecord.id}`,
          {
            method: "GET",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*",
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((jsonData) => {
            setLoadingView(false);
            setDataView(jsonData);
          })
          .catch((error) => {
            setLoadingView(false);
            console.error("Error fetching data:", error);
          });
      }
    }, [viewRecord, token]);
  
    const dataSource = Array.isArray(dataView.ReceiptDetail)
      ? dataView.ReceiptDetail.map((detail) => ({
          ...detail,
          product_name: detail.product?.productName || "N/A",
          price: detail.product?.price || "N/A",
          unit: detail.product?.unit || "N/A",
          category: detail.product?.category?.categoryName || "N/A",
          description: detail.product?.description || "N/A",
        }))
      : [];
  
    // Lọc sản phẩm
    const filter = (e) => {
      setTableData(
        data.filter((x) => x.id.toLowerCase().includes(e.target.value))
      );
    };
  
    const filterCategory = (e) => {
      if (e == "Tất cả") {
        setTableData(data);
      } else {
        setTableData(data.filter((x) => x.status === e));
      }
    };
  
    //Hiển trị danh sách theo thơi gian
    const handleRangeChange = (dates) => {
      if (dates && dates.length === 2) {
        const startDate = dates[0].startOf("day").toISOString();
        const endDate = dates[1].endOf("day").toISOString();
  
        setTableData(
          data.filter((item) => {
            const time = new Date(item.time).getTime();
            return (
              time >= new Date(startDate).getTime() &&
              time <= new Date(endDate).getTime()
            );
          })
        );
      } else {
        setTableData(data);
      }
    };
  
    return (
      <>
        <div className="general-content">
          {!formAdd && !formEdit && (
            <div>
              <Typography className="header-content mb-3">
                QUẢN LÝ NHẬP KHO
              </Typography>
              <Card className="data-statistic mb-3">
                <Typography className="mb-2">Thời gian:</Typography>
                <Space>
                  <RangePicker
                    onChange={handleRangeChange}
                    placeholder={"Ngày"}
                    style={{ borderColor: "#A4A4A4" }}
                    className="mb-3"
                  />
                </Space>
                <Space className="mb-3">
                  <Input
                    onChange={filter}
                    className="me-4"
                    placeholder="Nhập mã phiếu..."
                    style={{ width: 600 }}
                  />
                  <Button
                    className="me-4"
                    style={{ background: "#5EB600", color: "#fff" }}
                  >
                    Tìm kiếm
                  </Button>
                  <Select
                    onChange={filterCategory}
                    defaultValue={category[0]}
                    style={{ width: 200 }}
                  >
                    {category.map((option) => (
                      <Option key={option} value={option}>
                        {option}
                      </Option>
                    ))}
                  </Select>
                </Space>
              </Card>
              <Card className="chart-statistic">
                <Flex justify="space-between">
                  <Typography style={{ fontWeight: 500, fontSize: 16 }}>
                    Danh sách phiếu nhập kho
                  </Typography>
                  <button
                    style={{ border: "none", background: "transparent" }}
                    onClick={addAction}
                  >
                    <PlusCircleOutlined
                      type="button"
                      style={{ fontSize: 28, color: "#46B91D" }}
                    />
                  </button>
                </Flex>
  
                {loading ? (
                  <Skeleton active />
                ) : (
                  <Table columns={columns} dataSource={tableData} />
                )}
              </Card>
            </div>
          )}
  
          {formAdd && !formEdit && (
            <FormAdd
              message={messageApi}
              product={product}
              onClose={addAction}
              warehouse={warehouse}
              setWarehouse={setWarehouse}
              partner={partner}
              user={user}
              token={token}
            />
          )}
  
          {formEdit && !formAdd && (
            <FormEdit
              onClose={editAction}
              editingRecord={editingRecord}
              user={user}
              product={product}
              partner={partner}
              token={token}
            />
          )}
  
          {/* Form xóa  */}
          <Modal
            width={400}
            title={<div style={{ textAlign: "center" }}>Xác nhận xóa</div>}
            open={confirmDelete}
            onOk={deleteConfirm}
            onCancel={deleteAction}
            footer={[
              <div style={{ textAlign: "center", width: "100%" }}>
                <Button
                  key="cancel"
                  onClick={deleteAction}
                  style={{ marginRight: 8 }}
                >
                  Cancel
                </Button>
                <Button key="ok" type="primary" onClick={deleteConfirm}>
                  {loadingDelete ? (
                    <Spin
                      indicator={
                        <LoadingOutlined
                          style={{ fontSize: 24, color: "#fff" }}
                          spin
                        />
                      }
                    />
                  ) : (
                    "Ok"
                  )}
                </Button>
              </div>,
            ]}
          ></Modal>
  
          {/* Xem chi tiết phiếu  */}
  
          <Drawer
            title="Chi tiết phiếu nhập kho"
            onClose={viewAction}
            open={viewWarehouse}
            width={500}
          >
            {loadingView ? (
              <Skeleton active />
            ) : (
              <>
                <Flex vertical>
                  <strong className="mb-3">Mã phiếu: {dataView.id}</strong>
                  <strong className="mb-3">
                    Giá trị: {dataView.total_money}
                  </strong>
                  <strong className="mb-3">
                    Nhà cung cấp: {dataView?.partner?.name}
                  </strong>
                  <strong className="mb-3">
                    Ngày tạo phiếu: {dataView.delivery_date}
                  </strong>
                  <strong className="mb-3">
                    Nhân viên tiếp nhận : {dataView?.user?.full_name}
                  </strong>
                  <strong className="mb-3">Trạng thái: {dataView.status}</strong>
                  <strong className="mb-3">Còn nợ: {dataView.owe}</strong>
                  <strong className="mb-3">Danh sách sản phẩm : </strong>
                </Flex>
                <Table
                  columns={columnsProduct}
                  dataSource={dataSource}
                  pagination={{
                    pageSize: 3,
                  }}
                ></Table>
              </>
            )}
          </Drawer>
        </div>
      </>
    );
  }
  
  function FormAdd({
    onClose,
    warehouse,
    product,
    setWarehouse,
    message,
    partner,
    user,
    token,
  }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
  
    const handleOk = (selected) => {
      setSelectedProducts(selected);
    };
  
    const showModal = () => {
      setModalVisible(true);
    };
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    const [data, setData] = useState();
  
    useEffect(() => {
      setData(selectedProducts);
    }, [selectedProducts]);
  
    const handleDeleteRow = (record) => {
      const newData = data.filter(
        (item) => item.product_id !== record.product_id
      );
      setData(newData);
    };
  
    // Tính toán tiền
    const [totalMoney, setTotalMoney] = useState(0);
    const calculateTotalMoney = (dataSource) => {
      let total = 0;
      dataSource.forEach((item) => {
        const price = parseFloat(item.price);
        const quantity = parseFloat(item.quantity_input);
        if (!isNaN(price) && !isNaN(quantity)) {
          // Kiểm tra xem giá trị có phải là số không
          total += price * quantity; // Tính tổng giá trị tiền
        }
      });
      return total;
    };
    const handleQuantityChange = (index, value) => {
      // Cập nhật số lượng nhập vào cho hàng tương ứng trong dataSource
      const updatedDataSource = data.map((item, idx) => {
        if (idx === index) {
          return { ...item, quantity_input: parseInt(value) };
        }
        return item;
      });
      console.log(updatedDataSource);
  
      const newTotalMoney = calculateTotalMoney(updatedDataSource);
      setTotalMoney(newTotalMoney);
    };
  
    const columnsEdit = [
      {
        title: "STT",
        render: (text, record, index) => <span>{index + 1}</span>,
        align: "center",
      },
      {
        title: "Mã sản phẩm ",
        dataIndex: "product_id",
        key: "product_id",
        align: "center",
      },
      {
        title: "Tên sản phẩm ",
        dataIndex: "product_name",
        key: "product_name",
        align: "center",
      },
      {
        title: "Giá nhập",
        dataIndex: "price",
        key: "price",
        align: "center",
        render: (text) => (
          <span>
            {new Intl.NumberFormat("vi-VN", {
              style: "currency",
              currency: "VND",
            }).format(text)}
          </span>
        ),
      },
      {
        title: "Số lượng",
        dataIndex: "quantity_input",
        align: "center",
        key: "quantity_input",
        render: (_, record, index) => (
          <>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 0,
              }}
              name={[index, "quantity_input"]}
            >
              <Input
                defaultValue={0}
                onChange={(e) => handleQuantityChange(index, e.target.value)}
                style={{ width: 60, textAlign: "center" }}
                // onChange={(e) => handleActualQuantityChange(record, e.target.value)}
                placeholder="Nhập số lượng"
              />
            </Form.Item>
          </>
        ),
      },
  
      {
        title: "Thao tác",
        key: "action",
        align: "center",
        render: (_, record) => (
          <Space size="middle">
            <button
              type="link"
              onClick={() => handleDeleteRow(record)}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <ImBin />
            </button>
          </Space>
        ),
      },
    ];
  
    // Tạo mới phiếu
  
    const [form] = Form.useForm();
    const handleCreate = async (values) => {
      try {
        const updatedValues = {
          name: "xxx",
          partner_id: selectedPartner.id,
          user_id: user.id,
          status: values.status,
          delivery_date: values.time,
          total_money: values.total_money,
          amount_paid: values.amount_paid,
          note: values.note,
          ReceiptDetailDTO: data.map((item, index) => ({
            product_id: item.product_id,
            cost_of_product: item.price,
            quantity: parseInt(values[index].quantity_input, 10),
          })),
        };
        const response = await fetch(
          "https://backend-online-supermarket-sales-website.onrender.com/api/v1/receipts/insert",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
            body: JSON.stringify(updatedValues),
          }
        );
        const newWarehouse = await response.json();
        setWarehouse([...warehouse, newWarehouse]);
        form.resetFields();
        setTotalMoney(0);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("them");
      form
        .validateFields()
        .then((values) => {
          handleCreate(values);
          message.success("Thêm thành công!");
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };
  
    const [debt, setDebt] = useState(0);
    const handleChange = () => {
      const paymentNeeded = form.getFieldValue("paymentNeeded") || 0; // Cần thanh toán
      const amount_paid = form.getFieldValue("amount_paid") || 0; // Thanh toán cho nhà cung cấp
      const remainingDebt = paymentNeeded - amount_paid;
      setDebt(remainingDebt);
    };
  
    const [selectedPartner, setSelectedPartner] = useState(null);
    const handleSelectChange = (partnerId) => {
      const selected = partner.find((partner) => partner.id === partnerId);
      setSelectedPartner(selected);
    };
  
    return (
      <div>
        {/* modal danh sách sản phẩm  */}
        <ProductModal
          visible={modalVisible}
          onClose={closeModal}
          product={product}
          onOk={handleOk}
        />
        <button
          onClick={onClose}
          style={{ background: "transparent", border: "none" }}
        >
          <LeftOutlined /> Quản lý nhập kho
        </button>
        <Space
          style={{ width: "100%", justifyContent: "center", marginBottom: 20 }}
        >
          <Typography
            style={{ fontSize: 24, fontWeight: 600 }}
            className="text-center"
          >
            Tạo phiếu nhập kho
          </Typography>
        </Space>
        <Form
          form={form}
          name="addWarehouseForm"
          onValuesChange={handleChange}
          fields={[
            {
              name: ["debt"],
              value: debt,
            },
            {
              name: ["total_money"],
              value: totalMoney,
            },
            {
              name: ["paymentNeeded"],
              value: totalMoney,
            },
            {
              name: ["staff"],
              value: user.full_name,
            },
          ]}
        >
          <Flex justify="space-between" className="mb-3">
            <Card style={{ width: "70%", borderColor: "#A4A4A4" }}>
              <Typography className="mb-2">Nhà cung cấp</Typography>
              <Select
                placeholder="Nhà cung cấp"
                style={{
                  width: "100%",
                  marginBottom: 12,
                }}
                onChange={handleSelectChange}
              >
                {partner.map((e) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>
  
              <Form.Item label="Tên nhà cung cấp">
                <Input
                  value={selectedPartner ? selectedPartner.name : ""}
                  placeholder="Tên nhà cung cấp"
                />
              </Form.Item>
              <Form.Item label="Số điện thoại">
                <Input
                  value={selectedPartner ? selectedPartner.phone_number : ""}
                  placeholder="Số điện thoại"
                />
              </Form.Item>
              <Form.Item label="Địa chỉ">
                <Input
                  value={selectedPartner ? selectedPartner.address : ""}
                  placeholder="Địa chỉ"
                />
              </Form.Item>
            </Card>
            <Card style={{ width: "calc(30% - 20px)", borderColor: "#A4A4A4" }}>
              <Form.Item name="staff" label="Nhân viên ">
                <Input disabled />
              </Form.Item>
              <Form.Item label="Ngày giao" name="time" initialValue={moment()}>
                <DatePicker disabled style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Trạng thái " name="status">
                <Select defaultValue={"Đã tạo"}>
                <Select.Option value="Đã tạo">Đã tạo</Select.Option>
                <Select.Option value="Đang nhập hàng">Đang nhập hàng</Select.Option>
                <Select.Option value="Đã nhập kho">Đã nhập kho</Select.Option>
                <Select.Option value="Đã hoàn tất">Đã hoàn tất</Select.Option>
                <Select.Option value="Hủy bỏ">Hủy bỏ</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Flex>
          <Flex justify="space-between">
            <Card style={{ width: "70%", borderColor: "#A4A4A4" }}>
              <Flex justify="space-between">
                <Typography style={{ fontWeight: 500, fontSize: 16 }}>
                  Danh sách sản phẩm
                </Typography>
                <button style={{ background: "transparent", border: "none" }}>
                  <PlusCircleOutlined
                    type="button"
                    style={{ fontSize: 28, color: "#46B91D" }}
                    onClick={showModal}
                  />
                </button>
              </Flex>
              <Table columns={columnsEdit} dataSource={data} />
            </Card>
            <Card style={{ width: "calc(30% - 20px)", borderColor: "#A4A4A4" }}>
              <Form.Item
                name="total_money"
                label="Tổng tiền"
                style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}
              >
                <InputNumber
                  disabled
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    ` ${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="paymentNeeded"
                label="Cần thanh toán"
                style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    ` ${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="amount_paid"
                label="Thanh toán cho nhà cung cấp"
                labelAlign="top"
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    ` ${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  className="d-block"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                label="Còn nợ"
                name="debt"
                style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    ` ${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  placeholder=""
                  readOnly
                />
              </Form.Item>
              <div>
                <Form.Item
                  label="Ghi chú"
                  name="note"
                  style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}
                >
                  <Input.TextArea placeholder="Ghi chú" />
                </Form.Item>
              </div>
              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  style={{ background: "#AFE970", marginTop: 20 }}
                  htmlType="submit"
                >
                  Tạo phiếu
                </Button>
              </div>
            </Card>
          </Flex>
        </Form>
      </div>
    );
  }
  function FormEdit({
    onClose,
    warehouse,
    product,
    setWarehouse,
    message,
    partner,
    user,
    token,
    editingRecord
  }) {
    const [modalVisible, setModalVisible] = useState(false);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [editData, setEditData] = useState([]);
  const [selectedProductsData, setSelectedProductsData] = useState([]);
  const [totalMoney, setTotalMoney] = useState(0);
    const [amountPaid, setAmountPaid] = useState(0);
   
  
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    const [data, setData] = useState();
  
    
    useEffect(() => {
      if (editingRecord) {
        fetch(
          `https://backend-online-supermarket-sales-website.onrender.com/api/v1/receipts/${editingRecord.id}`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
          }
        )
          .then((response) => {
            if (!response.ok) {
              throw new Error("Network response was not ok");
            }
            return response.json();
          })
          .then((jsonData) => {
            // setLoadingProduct(false);
            setEditData(jsonData);
            if (Array.isArray(jsonData.ReceiptDetail)) {
                const inventoryWithStatus = jsonData.ReceiptDetail.map(item => ({
                    status:"none",
                    id:item.id,
                    product_id: item.product.id,
                    product_name: item.product.productName,
                    cost_of_product: item.cost_of_product,
                    quantity_input: item.quantity,
                }));
                console.log(inventoryWithStatus);
                setData(inventoryWithStatus);
                setSelectedProducts(inventoryWithStatus);
                setSelectedProductsData(inventoryWithStatus.map(item => item.product_id));
              }
            setAmountPaid(jsonData.amount_paid)
            setTotalMoney(jsonData.total_money)
          })
          .catch((error) => {
            // setLoadingProduct(false);
            console.error("Error fetching data:", error);
          });
      }
    }, [editingRecord]);
  
    
  
     const handleModalOk = (selected) => {
      // Cập nhật data với các sản phẩm đã chọn từ modal
      const newProducts = selected
        .filter(
          (productId) => !data.some((item) => item.product_id === productId)
        )
        .map((productId) => {
          const productDetails = product.find((p) => p.product_id === productId);
          return {
            ...productDetails,
            quantity_input:"",
          };
        });
      const updatedData = data.filter((item) =>
        selected.includes(item.product_id)
      );
  
      setData([...updatedData, ...newProducts]);
      setSelectedProducts([...updatedData, ...newProducts]);
      console.log(data)
    };
  
    

    const showModal = () => {
      setModalVisible(true);
      setSelectedProductsData(data.map((item) => item.product_id));
      console.log(selectedProductsData)
    };
  
    
  
  
  
    const handleDeleteRow = (record) => {
        const updatedSelectedProduct = data.map(item => 
            item.product_id === record.product_id 
              ? { ...item, status: 'delete' }
              : item
          );

      const newData = data.filter(
        (item) => item.product_id !== record.product_id
      );
      setData(newData);
      setSelectedProducts(updatedSelectedProduct);
      console.log(updatedSelectedProduct)
    };
  
    // Tính toán tiền
    
    
    const calculateTotalMoney = (dataSource) => {
      let total = 0;
      dataSource.forEach((item) => {
        const cost_of_product = parseFloat(item.cost_of_product);
        const quantity = parseFloat(item.quantity_input);
        if (!isNaN(cost_of_product) && !isNaN(quantity)) {
          // Kiểm tra xem giá trị có phải là số không
          total += cost_of_product * quantity; // Tính tổng giá trị tiền
        }
      });
      return total;
    };
    const handleQuantityChange = (index, value) => {
      // Cập nhật số lượng nhập vào cho hàng tương ứng trong dataSource
      const updatedDataSource = data.map((item, idx) => {
        if (idx === index) {
          return { ...item,status:"update", quantity_input: parseInt(value) };
        }
        return item;
      });
      const newTotalMoney = calculateTotalMoney(updatedDataSource);
      setTotalMoney(newTotalMoney);
      setData(updatedDataSource)
      setSelectedProducts(updatedDataSource)
    };
    const handlePriceChange = (index, value) => {
      // Cập nhật số lượng nhập vào cho hàng tương ứng trong dataSource
      const updatedDataSource = data.map((item, idx) => {
        if (idx === index) {
          return { ...item,status:"update", cost_of_product: parseInt(value) };
        }
        return item;
      });
      const newTotalMoney = calculateTotalMoney(updatedDataSource);
      setTotalMoney(newTotalMoney);
      setData(updatedDataSource)
      setSelectedProducts(updatedDataSource)
    };
  
    const columnsEdit = [
      {
        title: "STT",
        render: (text, record, index) => <span>{index + 1}</span>,
        align: "center",
      },
      {
        title: "Mã sản phẩm ",
        dataIndex: "product_id",
        key: "product_id",
        align: "center",
      },
      {
        title: "Tên sản phẩm ",
        dataIndex: "product_name",
        key: "product_name",
        align: "center",
      },
      {
        title: "Giá nhập",
        dataIndex: "cost_of_product",
        key: "cost_of_product",
        align: "center",
        render: (_, record, index) => (
          <>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 0,
              }}
              name={[index, "cost_of_product"]}
            >
              <InputNumber
               formatter={(value) =>
                `${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',')
              }
              parser={(value) =>
                value.replace(/\$\s?|(,*)/g, '')
              }
                defaultValue={0}
                onChange={(e) => handlePriceChange(index, e)}
                style={{ width: 120, textAlign: "center" }}
                // onChange={(e) => handleActualQuantityChange(record, e.target.value)}
                placeholder="Giá nhập của sản phẩm"
              />
            </Form.Item>
          </>
        ),
        // render: (text) => (
        //   <span>
        //     {new Intl.NumberFormat("vi-VN", {
        //       style: "currency",
        //       currency: "VND",
        //     }).format(text)}
        //   </span>
        // ),
      },
      {
        title: "Số lượng",
        dataIndex: "quantity_input",
        align: "center",
        key: "quantity_input",
        render: (_, record, index) => (
          <>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 0,
              }}
              name={[index, "quantity_input"]}
            >
              <InputNumber
                 min={0}
                onChange={(e) => handleQuantityChange(index, e)}
                style={{ width: 60, textAlign: "center" }}
                // onChange={(e) => handleActualQuantityChange(record, e.target.value)}
                placeholder="Nhập số lượng"
              />
            </Form.Item>
          </>
        ),
      },
  
      {
        title: "Thao tác",
        key: "action",
        align: "center",
        render: (_, record) => (
          <Space size="middle">
            <button
              type="link"
              onClick={() => handleDeleteRow(record)}
              style={{ border: "none", backgroundColor: "transparent" }}
            >
              <ImBin />
            </button>
          </Space>
        ),
      },
    ];
  
    // Sửa mới phiếu
  
    const [form] = Form.useForm();
    const handleUpdate = async (values) => {
      try {
        const updatedValues = {
          id: editingRecord?.id,
          name: "Tên phiếu",
          partner_id: editData.partner.id,
          user_id: editData.user.id,
          status: values.status,
          delivery_date: values.delivery_date,
          total_money: values.total_money,
          amount_paid: values?.amount_paid,
          note: values.note,
          UpdateReceiptDetailDTOS: selectedProducts.map((item, index) => ({
            receipt_id:editingRecord?.id,
            id:item.id,
            status:item.status,
            product_id: item.product_id,
            cost_of_product: values[index].cost_of_product,
            quantity: values[index].quantity_input,
          })),
        };
        const response = await fetch(
          "https://backend-online-supermarket-sales-website.onrender.com/api/v1/receipts/update",
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
            body: JSON.stringify(updatedValues),
          }
        );
        const newWarehouse = await response.json();
        setWarehouse([...warehouse, newWarehouse]);
        form.resetFields();
        message.success("Sửa thành công!");
        setTotalMoney(0);
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
      console.log("them");
      form
        .validateFields()
        .then((values) => {
          handleUpdate(values);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };
  
    const [debt, setDebt] = useState(0);
    const handleChange = () => {
      const paymentNeeded = form.getFieldValue("paymentNeeded") || 0; // Cần thanh toán
      const amount_paid = form.getFieldValue("amount_paid") || 0; // Thanh toán cho nhà cung cấp
      const remainingDebt = paymentNeeded - amount_paid;
      setDebt(remainingDebt);
    };
  
    const [selectedPartner, setSelectedPartner] = useState(null);
  
  
    const handleSelectChange = (partnerId) => {
      const selected = partner.find((partner) => partner.id === partnerId);
      setSelectedPartner(selected);
    };
  
    return (
      <div>
        {/* modal danh sách sản phẩm  */}
        <ProductModalUpdate
          visible={modalVisible}
          selectedProductsData={selectedProductsData}
          onClose={closeModal}
          product={product}
          onOk={handleModalOk}
        />
        <button
          onClick={onClose}
          style={{ background: "transparent", border: "none" }}
        >
          <LeftOutlined /> Quản lý nhập kho
        </button>
        <Space
          style={{ width: "100%", justifyContent: "center", marginBottom: 20 }}
        >
          <Typography
            style={{ fontSize: 24, fontWeight: 600 }}
            className="text-center"
          >
            Sửa phiếu nhập kho
          </Typography>
        </Space>
        <Form
          form={form}
          name="addWarehouseForm"
          onValuesChange={handleChange}
          fields={[
            {
              name: ["name"],
              value: editData?.partner?.name,
            },
            {
              name: ["phone_number"],
              value: editData?.partner?.phone_number,
            },
            {
              name:  ["address"],
              value: editData?.partner?.address,
            },
            {
              name: ["owe"],
              value: debt,
            },
            {
              name: ["total_money"],
              value: totalMoney,
            },
            {
              name: ["status"],
              value: editData?.status,
            },
            // {
            //   name:["delivery_date"],
            //   value:editData.delivery_date
            // },
            // {
            //   name: ["amount_paid"],
            //   value: editData?.amount_paid,
            // },
            {
              name: ["paymentNeeded"],
              value: totalMoney,
            },
           
            {
              name: ["staff"],
              value: editData?.user?.full_name,
            },
            ...(data
              ? data.map((item, index) => ({
                  name: [index, "quantity_input"],
                  value: item.quantity_input,
                }))
              : []),
            ...(data
              ? data.map((item, index) => ({
                  name: [index, "cost_of_product"],
                  value: item.cost_of_product,
                }))
              : []),
          ]}
        >
          <Flex justify="space-between" className="mb-3">
            <Card style={{ width: "70%", borderColor: "#A4A4A4" }}>
              <Typography className="mb-2">Nhà cung cấp</Typography>
              <Select
                placeholder="Nhà cung cấp"
                style={{
                  width: "100%",
                  marginBottom: 12,
                }}
                onChange={handleSelectChange}
              >
                {partner.map((e) => (
                  <Select.Option key={e.id} value={e.id}>
                    {e.name}
                  </Select.Option>
                ))}
              </Select>
  
              <Form.Item name="name"  label="Tên nhà cung cấp">
                <Input
                  value={selectedPartner ? selectedPartner.name : ""}
                  placeholder="Tên nhà cung cấp"
                />
              </Form.Item>
              <Form.Item name="phone_number" label="Số điện thoại">
                <Input
                  value={selectedPartner ? selectedPartner.phone_number : ""}
                  placeholder="Số điện thoại"
                />
              </Form.Item>
              <Form.Item name="address" label="Địa chỉ">
                <Input
                  value={selectedPartner ? selectedPartner.address : ""}
                  placeholder="Địa chỉ"
                />
              </Form.Item>
            </Card>
            <Card style={{ width: "calc(30% - 20px)", borderColor: "#A4A4A4" }}>
              <Form.Item name="staff" label="Nhân viên ">
                <Input disabled />
              </Form.Item>
              <Form.Item  label="Ngày giao" name="delivery_date"  initialValue={moment(editData.delivery_date)}>
                <DatePicker  disabled style={{ width: "100%" }} />
              </Form.Item>
              <Form.Item label="Trạng thái " name="status">
                <Select defaultValue={editData?.status}>
                  <Select.Option value="Đã tạo">Đã tạo</Select.Option>
                  <Select.Option value="Đang nhập hàng">Đang nhập hàng</Select.Option>
                  <Select.Option value="Đã nhập kho">Đã nhập kho</Select.Option>
                  <Select.Option value="Đã hoàn tất">Đã hoàn tất</Select.Option>
                  <Select.Option value="Hủy bỏ">Hủy bỏ</Select.Option>
                </Select>
              </Form.Item>
            </Card>
          </Flex>
          <Flex justify="space-between">
            <Card style={{ width: "70%", borderColor: "#A4A4A4" }}>
              <Flex justify="space-between">
                <Typography style={{ fontWeight: 500, fontSize: 16 }}>
                  Danh sách sản phẩm
                </Typography>
                <button style={{ background: "transparent", border: "none" }}>
                  <PlusCircleOutlined
                    type="button"
                    style={{ fontSize: 28, color: "#46B91D" }}
                    onClick={showModal}
                  />
                </button>
              </Flex>
              <Table columns={columnsEdit} dataSource={data} />
            </Card>
            <Card style={{ width: "calc(30% - 20px)", borderColor: "#A4A4A4" }}>
              <Form.Item
                name="total_money"
                label="Tổng tiền"
                style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}
              >
                <InputNumber
                  disabled
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    ` ${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="paymentNeeded"
                label="Cần thanh toán"
                style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    ` ${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                name="amount_paid"
                defaultValue={editData.amount_paid}
                label="Thanh toán cho nhà cung cấp"
                labelAlign="top"
                style={{ fontSize: 18, fontWeight: 500 }}
              >
                <InputNumber
                // onChange={(e)=>{handleChange(e)}}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    ` ${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  className="d-block"
                  placeholder=""
                />
              </Form.Item>
              <Form.Item
                label="Còn nợ"
                name="owe"
                style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}
              >
                <InputNumber
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    ` ${value} đ`.replace(/\B(?=(\d{3})+(?!\d))/g, ",")
                  }
                  placeholder=""
                  readOnly
                />
              </Form.Item>
              <div>
                <Form.Item
                  label="Ghi chú"
                  name="note"
                  style={{ fontSize: 18, fontWeight: 500, marginBottom: 20 }}
                >
                  <Input.TextArea placeholder="Ghi chú" />
                </Form.Item>
              </div>
              <div className="text-center">
                <Button
                  onClick={handleSubmit}
                  style={{ background: "#AFE970", marginTop: 20 }}
                  htmlType="submit"
                >
                  Lưu phiếu
                </Button>
              </div>
            </Card>
          </Flex>
        </Form>
      </div>
    );
  }
  