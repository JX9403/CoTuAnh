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
    Modal,
    Checkbox,
    Image,
    Drawer,
    InputNumber,
    message,
    Skeleton,
    Spin,
  } from "antd";
  import React, { useState, useEffect, useRef } from "react";
  import {
    PlusCircleOutlined,
    LeftOutlined,
    LoadingOutlined,
  } from "@ant-design/icons";
  import { ImBin } from "react-icons/im";
  import { FiEdit } from "react-icons/fi";
  import { Link, json, useNavigate, useParams } from "react-router-dom";
  import axios from "axios";
  import ProductModal from "./ProductModal";
  import ProductModalUpdate from "./ProductModalUpdate";
  import moment from "moment";
  import { render } from "@testing-library/react";
  import FormItem from "antd/es/form/FormItem";
  // import {CategoryScale} from 'chart.js';
  const { RangePicker } = DatePicker;
  
  export default function Inventory() {
    const [formAdd, setFormAdd] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [reportWarehouse, setReportWarehouse] = useState(false);
    const [deletingRecord, setDeletingRecord] = useState(null);
    const [loading, setLoading] = useState(true);
    const [loadingView, setLoadingView] = useState(true);
    const [loadingDelete, setLoadingDelete] = useState(false);
    const [editingRecord, setEditingRecord] = useState(null);
    const [viewRecord, setViewRecord] = useState(null);
    const { id } = useParams();
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
      setReportWarehouse(!reportWarehouse);
      setLoadingView(true);
      setViewRecord(record);
    };
    const columns = [
      {
        title: "STT",
        align: "center",
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
        title: "Nhân viên tạo ",
        dataIndex: ["user", "full_name"],
        align: "center",
        key: "full_name",
      },
      {
        title: "Nhân viên kiểm ",
        dataIndex: "checker",
        align: "center",
        key: "checker",
      },
      {
        title: "Thời gian nhập",
        dataIndex: "create_date",
        align: "center",
        key: "create_date ",
      },
      {
        title: "Thời gian cân bằng",
        dataIndex: "verification_date",
        align: "center",
        key: "verification_date",
      },
  
      {
        title: "Trạng thái",
        dataIndex: "status",
        align: "center",
        key: "status",
      },
      {
        title: "Thao tác",
        align: "center",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Button
              style={{ border: "none", backgroundColor: "transparent" }}
              icon={<FiEdit />}
              onClick={() => editAction(record)}
              disabled={record.status === "Đã cân bằng"}
            />
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
  
    const [data, setData] = useState([]);
    const [report, setReport] = useState([]);
    const [user, setUser] = useState(null);
    const [dataView, setDataView] = useState([]);
    const [product, setProduct] = useState([]);
    const [tableData, setTableData] = useState(data);
    // const status = ["Đã xác nhận", "Chờ xác nhận"];
    const api =
      "https://backend-online-supermarket-sales-website.onrender.com/api/v1/inventoryCheck";
    const apiProduct =
      "https://backend-online-supermarket-sales-website.onrender.com/api/v1/products";
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTY3ODkiLCJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNzE1ODIyOTMxLCJleHAiOjE3MTg0MTQ5MzF9.URI8rt4769uqmVEuRW7-Sazom_zg18fojXZOsBnmL6seMA5CIZn8Lk1vi0JeE8kr";
    const apiUser =
      "https://backend-online-supermarket-sales-website.onrender.com/api/v1/users/login";
  
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
      if (report) {
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
    }, [report]);
  
    //xóa phiếu
    const deleteConfirm = async () => {
      setLoadingDelete(true);
      try {
        const response = await fetch(
          `https://backend-online-supermarket-sales-website.onrender.com/api/v1/inventoryCheck/delete/${deletingRecord.id}`,
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
        setLoadingView(true);
        fetch(
          `https://backend-online-supermarket-sales-website.onrender.com/api/v1/inventoryCheck/${viewRecord.id}`,
          {
            method: "POST",
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
    const getProductById = (productId) => {
        const productk = product.find((i) => i.product_id === productId);
        return productk ? productk.product_name : "N/A";
      };
  
    const columnsProduct = [
      {
        title: "STT",
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: "Mã sản phẩm ",
        dataIndex: "product_id",
        key: "product_id",
      },
      {
        title: "Tên sản phẩm  ",
        dataIndex: "product_id",
        key: "product_name",
        render: (product_id) => getProductById(product_id),
      },
      {
        title: "Tồn kho thực tế ",
        dataIndex: "actual_inventory",
        key: "actual_inventory",
      },
      {
        title: "Lý do chênh lệch",
        dataIndex: "reason_missing",
        key: "reason_missing ",
      },
  
      {
        title: "Ghi chú",
        dataIndex: "note",
        key: "note",
      },
    ];
  
    return (
      <>
        <div className="general-content">
          {!formAdd && !formEdit && (
            <div>
              <Typography className="header-content mb-3">
                QUẢN LÝ KIỂM KHO{" "}
              </Typography>
              <Card className="data-statistic mb-3">
                <Typography className="mb-2">Thời gian:</Typography>
                <Space>
                  <RangePicker
                    placeholder={"Ngày"}
                    style={{ borderColor: "#A4A4A4" }}
                    className="mb-3"
                  />
                </Space>
                <Space className="mb-3">
                  <Input
                    className="me-4"
                    placeholder="Nhập mã phiếu.."
                    style={{ width: 600 }}
                  />
                  <Button
                    className="me-4"
                    style={{ background: "#5EB600", color: "#fff" }}
                  >
                    Tìm kiếm
                  </Button>
                  <Select
                    className="me-4"
                    placeholder="Trạng thái"
                    style={{
                      width: 200,
                    }}
                    options={[
                      {
                        value: "Đã tạo",
                        label: "Đã tạo",
                      },
                      {
                        value: "Đang nhập dữ liêu",
                        label: "Đang nhập dữ liệu ",
                      },
                      {
                        value: "Đã hoàn thành nhập dữ liệu",
                        label: "Đã hoàn thành nhập dữ liệu",
                      },
                      {
                        value: "Đã cân bằng",
                        label: "Đã cân bằng",
                      },
                      {
                        value: "Hủy bỏ",
                        label: "Hủy bỏ",
                      },
                    ]}
                  />
                </Space>
              </Card>
              <Card className="chart-statistic">
                <Flex justify="space-between">
                  <Typography style={{ fontWeight: 500, fontSize: 16 }}>
                    Danh sách phiếu kiểm kho
                  </Typography>
                  <button
                    onClick={addAction}
                    style={{ border: "none", background: "transparent" }}
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
              onClose={addAction}
              user={user}
              product={product}
              token={token}
              report={report}
              setReport={setReport}
            />
          )}
          {formEdit && !formAdd && (
            <FormEdit
              onClose={editAction}
              editingRecord={editingRecord}
              user={user}
              product={product}
              token={token}
              report={report}
              setReport={setReport}
              getProductById={getProductById}
            />
          )}
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
        </div>
        <Drawer
          title="Chi tiết phiếu kiểm kho"
          onClose={viewAction}
          open={reportWarehouse}
          width={500}
        >
          {loadingView ? (
            <Skeleton active />
          ) : (
            <>
              <Flex vertical>
                <strong className="mb-3">Mã sản phẩm: {dataView.id}</strong>
                <strong className="mb-3">Tên phiếu: {dataView.name}</strong>
                <strong className="mb-3">
                  Ngày tạo phiếu: {dataView.verification_date}
                </strong>
                <strong className="mb-3">
                  Nhân viên tạo : {dataView?.user?.full_name}
                </strong>
                <strong className="mb-3">Trạng thái: {dataView.status}</strong>
                <strong className="mb-3">Ghi chú: {dataView.note}</strong>
                <strong className="mb-3">Danh sách sản phẩm : </strong>
              </Flex>
              <Table
                columns={columnsProduct}
                dataSource={dataView.inventory_check_details}
                pagination={{
                  pageSize: 3,
                }}
              ></Table>
            </>
          )}
        </Drawer>
      </>
    );
  }
  function FormAdd({ onClose, user, product, token, report, setReport }) {
    // xử lý danh sach sản phẩm chọn
  
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
  
    const handleActualQuantityChange = (record, value) => {
      console.log(data);
      const newData = data.map((item) => {
        if (item.product_id === record.product_id) {
          const deviation = isNaN(value) ? "" : item.quantity - parseInt(value);
          return { ...item, actualQuantity: value, deviation: deviation };
        }
        return item;
      });
      setData(newData);
      console.log(newData);
    };
  
    const handleDeleteRow = (record) => {
      const newData = data.filter(
        (item) => item.product_id !== record.product_id
      );
      setData(newData);
    };
  
    const columns = [
      {
        title: "STT",
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: "Mã sản phẩm ",
        dataIndex: "product_id",
        key: "product_id",
      },
      {
        title: "tên sản phẩm ",
        dataIndex: "product_name",
        key: "product_name",
      },
      {
        title: "Tồn kho",
        dataIndex: "quantity",
        key: "incorrect_quantity",
      },
      {
        title: "Tồn thực tế",
        dataIndex: "actualQuantity",
        key: "receiver",
        render: (_, record, index) => (
          <>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 0,
              }}
              name={[index, "actual_inventory"]}
            >
              <Input
                style={{ width: 60 }}
                onChange={(e) =>
                  handleActualQuantityChange(record, e.target.value)
                }
                placeholder="Nhập tồn kho thực tế"
              />
            </Form.Item>
          </>
        ),
      },
      {
        title: "Lý do lệch",
        dataIndex: "reason_missing",
        key: "reason_missing",
        render: (_, record, index) => (
          <>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 0,
              }}
              name={[index, "reason_missing"]}
            >
              <Input
                style={{ width: 160 }}
                placeholder="Lý do "
                // Đặt giá trị mặc định cho ô input, nếu cần
                // value={record.customInput}
                // onChange={(e) => handleCustomInputChange(record, e.target.value)}
              />
            </Form.Item>
          </>
        ),
      },
      {
        title: "Lệch",
        dataIndex: "deviation",
        key: "deviation",
      },
      {
        title: "Thao tác",
        key: "action",
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
  
    //thêm mới phiếu
    const [form] = Form.useForm();
    const handleCreate = async (values) => {
      try {
        const updatedValues = {
          user_id: user.id,
          name: "phiếu tạo",
          status: values.status,
          note: values.note,
          inventory_check_details: data.map((item, index) => ({
            product_id: item.product_id,
            actual_inventory: values[index].actual_inventory,
            reason_missing: values[index].reason_missing,
          })),
        };
        const response = await fetch(
          "https://backend-online-supermarket-sales-website.onrender.com/api/v1/inventoryCheck/insert",
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
        const newReport = await response.json();
        setReport([...report, newReport]);
        form.resetFields();
        message.success("Thêm thành công!");
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
         
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };
  
    return (
      <div>
        <ProductModal
          visible={modalVisible}
          onClose={closeModal}
          product={product}
          onOk={handleOk}
          width={1000}
        />
        <button
          onClick={onClose}
          style={{ background: "transparent", border: "none" }}
        >
          <LeftOutlined /> Danh sách phiếu kiểm kho
        </button>
        <Space
          style={{ width: "100%", justifyContent: "center", marginBottom: 20 }}
        >
          <Typography
            style={{ fontSize: 24, fontWeight: 600 }}
            className="text-center"
          >
            Thông tin phiếu kiểm kho
          </Typography>
        </Space>
        <Form
          form={form}
          initialValues={{ status: "Đang nhập dữ liệu" }}
          fields={[
            {
              name: ["creator"],
              value: user.full_name,
            },
          ]}
          layout="vertical"
        >
          <Flex justify="space-between" className="mb-3">
            <Card style={{ width: "100%", borderColor: "#A4A4A4" }}>
              <div className="d-flex justify-content-between">
                <Form.Item
                  style={{ width: "25%" }}
                  name="creator"
                  label="Nhân viên tạo"
                >
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item
                  label="Ngày tạo"
                  name="verification_date"
                  initialValue={moment()}
                >
                  <DatePicker disabled />
                </Form.Item>
                <Form.Item style={{ width: "30%" }} name="note" label="Ghi chú">
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{ width: "15%" }}
                  name="status"
                  label="Trạng thái"
                >
                  <Select  defaultValue={"Đã tạo"}>
                  <Select.Option value="Đã tạo">Đã tạo</Select.Option>
                  <Select.Option value="Đang nhập dữ liêu">Đang nhập dữ liêu</Select.Option>
                  <Select.Option value="Đã hoàn thành nhập dữ liệu">Đã hoàn thành nhập dữ liệu</Select.Option>
                  <Select.Option value="Đã cân bằng">Đã cân bằng</Select.Option>
                  <Select.Option value="Hủy bỏ">Hủy bỏ</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </Card>
          </Flex>
          <Flex justify="space-between">
            <Card style={{ width: "100%", borderColor: "#A4A4A4" }}>
              <Flex justify="space-between">
                <Typography style={{ fontWeight: 500, fontSize: 16 }}>
                  Danh sách sản phẩm
                </Typography>
                <button
                  onClick={showModal}
                  style={{ background: "transparent", border: "none" }}
                >
                  <PlusCircleOutlined
                    type="button"
                    style={{ fontSize: 28, color: "#46B91D" }}
                  />
                </button>
              </Flex>
              <Table columns={columns} dataSource={data} />
              <Flex justify="flex-end">
                <Button
                  disabled="true"
                  style={{
                    background: "#AFE970",
                    marginTop: 20,
                    marginRight: 20,
                  }}
                >
                  Cân bằng kho
                </Button>
                <Button
                  onClick={handleSubmit}
                  style={{ background: "#AFE970", marginTop: 20 }}
                  htmlType="submit"
                >
                  Tạo phiếu
                </Button>
              </Flex>
            </Card>
          </Flex>
        </Form>
      </div>
    );
  }
  function FormEdit({
    onClose,
    user,
    product,
    token,
    report,
    setReport,
    editingRecord,
    getProductById,
  }) {
    // xử lý danh sach sản phẩm chọn
  
    const [modalVisible, setModalVisible] = useState(false);
    const [data, setData] = useState();
    const [editData, setEditData] = useState([]);
    const [form] = Form.useForm();
    const [selectedProductsData, setSelectedProductsData] = useState([]);
    const [selectedProducts, setSelectedProducts] = useState([]);
    const [loadingProduct, setLoadingProduct] = useState(true);
  
   
  
    const closeModal = () => {
      setModalVisible(false);
    };
  
    useEffect(() => {
      if (editingRecord) {
        fetch(
          `https://backend-online-supermarket-sales-website.onrender.com/api/v1/inventoryCheck/${editingRecord.id}`,
          {
            method: "POST",
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
            setLoadingProduct(false);
            setEditData(jsonData);
            const inventoryWithStatus = jsonData.inventory_check_details.map(item => ({
                ...item,
                status: "none"
              }));
            setData(inventoryWithStatus);
            setSelectedProducts(inventoryWithStatus)
            console.log (inventoryWithStatus)
          })
          .catch((error) => {
            setLoadingProduct(false);
            console.error("Error fetching data:", error);
          });
      }
    }, [editingRecord]);
  
    useEffect(() => {
      if (data && product) {
        const combinedData = editData.inventory_check_details.map((detail) => {
          const productx = product.find(
            (p) => p.product_id === detail.product_id
          );
          const deviation = productx
            ? productx.quantity - detail.actual_inventory
            : "";
          return {
            ...detail,
            product_name: productx ? productx.product_name : "Unknown",
            quantity: productx ? productx.quantity : "Unknown",
            deviation: deviation,
          };
        });
        setData(combinedData);
        setSelectedProducts(combinedData)
        console.log(combinedData)
      }
    }, [editData]);
   
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
            status: "create",
            actual_inventory: "",
            reason_missing: "",
          };
        });
      const updatedData = data.filter((item) =>
        selected.includes(item.product_id)
      );
    //   selectedProducts=
      setData([...updatedData, ...newProducts]);
      setSelectedProducts([...updatedData, ...newProducts])
    };
  
    const showModal = () => {
      setModalVisible(true);
      setSelectedProductsData(data.map((item) => item.product_id));
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
  
    const handleActualQuantityChange = (record, value) => {
      const newData = data.map((item) => {
        if (item.product_id === record.product_id) {
          const newActualInventory = value !== "" ? parseInt(value) : "";
          const deviation = isNaN(newActualInventory)
            ? item.quantity
            : item.quantity - newActualInventory;
          return {
            ...item,
            status:"update",
            actual_inventory: newActualInventory,
            deviation: deviation,
          };
        }
        return item;
      });
      setData(newData);
      setSelectedProducts(newData)
    };
  
    // useEffect(() => {
    //     setSelectedProducts([...data]);
    //   }, [data]); 


    const columns = [
      {
        title: "STT",
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: "Mã sản phẩm ",
        dataIndex: "product_id",
        key: "product_id",
      },
      {
        title: "tên sản phẩm ",
        dataIndex: "product_name",
        key: "product_name",
      },
      {
        title: "Tồn kho",
        dataIndex: "quantity",
        key: "quantity",
      },
      {
        title: "Tồn thực tế",
        dataIndex: "actual_inventory",
        key: "actual_inventory",
        render: (_, record, index) => (
          <>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 0,
              }}
              name={["actual_inventory", index]}
            >
              <Input
                style={{ width: 60 }}
                onChange={(e) =>
                  handleActualQuantityChange(record, e.target.value)
                }
                placeholder="Nhập tồn kho thực tế"
              />
            </Form.Item>
          </>
        ),
      },
      {
        title: "Lý do lệch",
        dataIndex: "reason_missing",
        key: "reason_missing",
        render: (_, record, index) => (
          <>
            <Form.Item
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: 0,
              }}
              name={["reason_missing", index]}
            >
              <Input
                style={{ width: 160 }}
                placeholder="Lý do "
                // Đặt giá trị mặc định cho ô input, nếu cần
                // value={record.customInput}
                // onChange={(e) => handleCustomInputChange(record, e.target.value)}
              />
            </Form.Item>
          </>
        ),
      },
      {
        title: "Lệch",
        dataIndex: "deviation",
        key: "deviation",
      },
      {
        title: "Thao tác",
        key: "action",
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
  
    //Sửa thông tin phiếu
  
    const handleUpdate = async (values) => {
      try {
        const updatedValues = {
          id: editingRecord.id,
          user_id: user.id,
          name: "phiếu tạo",
          status: values.status,
          note: values.note,
          inventory_check_details: selectedProducts.map((item, index) => ({
            id:item.id,
            status: item.status,
            product_id: item.product_id,
            actual_inventory: values.actual_inventory[index],
            reason_missing: values.reason_missing[index],
            inventory_check_id: editingRecord.id,
          })),
        };
        const response = await fetch(
          "https://backend-online-supermarket-sales-website.onrender.com/api/v1/inventoryCheck/update",
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
        const newReport = await response.json();
        setReport([...report, newReport]);
        form.resetFields();
        message.success("Sửa thành công!");
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


    const handleVerification = async (values) => {
      try {
        const updatedValues = {
          id: editingRecord.id,
          user_id: user.id,
          name: "phiếu tạo",
          status: values.status,
          note: values.note,
          inventory_check_details: selectedProducts.map((item, index) => ({
            id:item.id,
            status: item.status,
            product_id: item.product_id,
            actual_inventory: values.actual_inventory[index],
            reason_missing: values.reason_missing[index],
            inventory_check_id: editingRecord.id,
          })),
        };
        const response = await fetch(
          "https://backend-online-supermarket-sales-website.onrender.com/api/v1/inventoryCheck/productVerifications",
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
        const newReport = await response.json();
        setReport([...report, newReport]);
        form.resetFields();
        message.success("Cân bằng thành công!");
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };
  
    const Verify = (e) => {
      e.preventDefault();
      console.log("them");
      form
        .validateFields()
        .then((values) => {
            handleVerification(values);
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };
  
    return (
      <div>
        <ProductModalUpdate
          visible={modalVisible}
          selectedProductsData={selectedProductsData}
          onClose={closeModal}
          product={product}
          onOk={handleModalOk}
          width={1200}
        />
        <button
          onClick={onClose}
          style={{ background: "transparent", border: "none" }}
        >
          <LeftOutlined /> Danh sách phiếu kiểm kho
        </button>
        <Space
          style={{ width: "100%", justifyContent: "center", marginBottom: 20 }}
        >
          <Typography
            style={{ fontSize: 24, fontWeight: 600 }}
            className="text-center"
          >
            Sửa phiếu kiểm kho
          </Typography>
        </Space>
        <Form
          form={form}
          fields={[
            {
              name: ["creator"],
              value: editData?.user?.full_name,
            },
            {
              name: ["verification_date"],
              value: editData?.verification_date,
            },
            {
              name: ["note"],
              value: editData?.note,
            },
            {
              name: ["status"],
              value: editData?.status,
            },
            ...(data
              ? data.map((item, index) => ({
                  name: ["actual_inventory", index],
                  value: item.actual_inventory,
                }))
              : []),
            ...(data
              ? data.map((item, index) => ({
                  name: ["reason_missing", index],
                  value: item.reason_missing,
                }))
              : []),
          ]}
          layout="vertical"
        >
          <Flex justify="space-between" className="mb-3">
            <Card style={{ width: "100%", borderColor: "#A4A4A4" }}>
              <div className="d-flex justify-content-between">
                <Form.Item
                  style={{ width: "25%" }}
                  name="creator"
                  label="Nhân viên tạo"
                >
                  <Input disabled={true} />
                </Form.Item>
                <Form.Item label="Ngày tạo" name="verification_date">
                  <DatePicker disabled />
                </Form.Item>
                <Form.Item style={{ width: "30%" }} name="note" label="Ghi chú">
                  <Input />
                </Form.Item>
                <Form.Item
                  style={{ width: "15%" }}
                  name="status"
                  label="Trạng thái"
                >
                  <Select  defaultValue={editData?.status}>
                  <Select.Option value="Đã tạo">Đã tạo</Select.Option>
                  <Select.Option value="Đang nhập dữ liêu">Đang nhập dữ liêu</Select.Option>
                  <Select.Option value="Đã hoàn thành nhập dữ liệu">Đã hoàn thành nhập dữ liệu</Select.Option>
                  <Select.Option value="Đã cân bằng">Đã cân bằng</Select.Option>
                  <Select.Option value="Hủy bỏ">Hủy bỏ</Select.Option>
                  </Select>
                </Form.Item>
              </div>
            </Card>
          </Flex>
          <Flex justify="space-between">
            <Card style={{ width: "100%", borderColor: "#A4A4A4" }}>
              <Flex justify="space-between">
                <Typography style={{ fontWeight: 500, fontSize: 16 }}>
                  Danh sách sản phẩm
                </Typography>
                <button
                  onClick={showModal}
                  style={{ background: "transparent", border: "none" }}
                >
                  <PlusCircleOutlined
                    type="button"
                    style={{ fontSize: 28, color: "#46B91D" }}
                  />
                </button>
              </Flex>
  
              {loadingProduct ? (
                <Skeleton active />
              ) : (
                <Table columns={columns} dataSource={data} />
              )}
  
              <Flex justify="flex-end">
                <Button
                onClick={Verify}
                  style={{
                    background: "#AFE970",
                    marginTop: 20,
                    marginRight: 20,
                  }}
                >
                  Cân bằng kho
                </Button>
                <Button
                  onClick={handleSubmit}
                  style={{ background: "#AFE970", marginTop: 20 }}
                  htmlType="submit"
                >
                  Lưu phiếu
                </Button>
              </Flex>
            </Card>
          </Flex>
        </Form>
      </div>
    );
  }
  