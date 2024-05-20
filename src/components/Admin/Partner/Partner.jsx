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
    Drawer,message,Modal
  } from "antd";
  import React, { useState, useEffect } from "react";
  import { PlusCircleOutlined, CloseOutlined } from "@ant-design/icons";
  import { ImBin } from "react-icons/im";
  import { FiEdit } from "react-icons/fi";
  import { Link, json, useParams } from "react-router-dom";
  import { useForm } from "antd/es/form/Form";
  import axios from "axios";
  // import {CategoryScale} from 'chart.js';
  const { RangePicker } = DatePicker;
  
  export default function Partner() {
    const [formAdd, setFormAdd] = useState(false);
    const [formEdit, setFormEdit] = useState(false);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const [viewProvider, setViewProvider] = useState(false);
    const [deletingRecord, setDeletingRecord] = useState(null);
    const [editingRecord, setEditingRecord] = useState(null);
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
  
    const viewAction = () => {
      setViewProvider(!viewProvider)
    };
    const columns = [
      {
        title: "STT",
        render: (text, record, index) => <span>{index + 1}</span>,
      },
      {
        title: "Tên nhà cung cấp ",
        dataIndex: "name",
        key: "name",
        render: (text, record) => (
          <Link
            style={{ textDecoration: "none", color: "#46B91D", fontWeight: 500 }}
            to={`/provider/${record.id}`}
            onClick={() => viewAction(record)}
          >
            {text}
          </Link>
        ),
      },
      {
        title: "Số điện thoại ",
        dataIndex: "phone_number",
        key: "phone_number",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Địa chỉ",
        dataIndex: "address",
        key: "address",
      },
      {
        title: "Nợ",
        dataIndex: "debt",
        key: "debt",
      },
      {
        title: "Thao tác",
        key: "action",
        render: (_, record) => (
          <Space size="middle">
            <Link style={{ color: "#000" }}>
              <FiEdit onClick={() => editAction(record)} />
            </Link>
            <Link style={{ color: "#000" }}>
            <ImBin onClick={() => deleteAction(record)} />
            </Link>
          </Space>
        ),
      },
    ];
    const [data, setData] = useState([]);
    const [dataView, setDataView] = useState([]);
  
    const [dataTable, setDataTable] = useState([]);
    const apiProdvider = "https://backend-online-supermarket-sales-website.onrender.com/api/v1/partners";
    const token =
      "eyJhbGciOiJIUzM4NCJ9.eyJwaG9uZU51bWJlciI6IjAxMjM0NTY3ODkiLCJzdWIiOiIwMTIzNDU2Nzg5IiwiaWF0IjoxNzE1ODIyOTMxLCJleHAiOjE3MTg0MTQ5MzF9.URI8rt4769uqmVEuRW7-Sazom_zg18fojXZOsBnmL6seMA5CIZn8Lk1vi0JeE8kr";
    useEffect(() => {
      axios
        .get(apiProdvider, {
          headers: {
            Authorization: `Bearer ${token}`,
            accept: "*/*",
          },
        })
        .then((res) => {
          setData(res.data);
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
    }, []);
  
    //xem thông tin provider 
    useEffect(() => {
      if (id !== undefined) {
        fetch(
          `https://backend-online-supermarket-sales-website.onrender.com/api/v1/partners/${id}`,
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
            setDataView(jsonData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
      }
    }, [id, token]);
  
    // Tạo mới một provider
    const [provider, setProvider] = useState([]);
    const [form] = Form.useForm();
    const handleCreate = async (values) => {
      try {
        const response = await fetch("https://backend-online-supermarket-sales-website.onrender.com/api/v1/partners/insert", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
              accept: "*/*",
          },
          body: JSON.stringify(values),
        });
        const newProvider = await response.json();
        setProvider([...provider, newProvider]);
        form.resetFields();
      } catch (error) {
        console.error("Error creating user:", error);
      }
    };
    
    useEffect(() => {
      if (provider) {
        axios
          .get(apiProdvider, {
            headers: {
              Authorization: `Bearer ${token}`,
              accept: "*/*",
            },
          })
          .then((res) => {
            setDataTable(res.data);
            // message.success("Thêm thành công!");
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
      }
    }, [provider]);
  
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
  
    //Xóa provider
    const deleteConfirm = async () => {
      try {
        const response = await fetch(
          `https://backend-online-supermarket-sales-website.onrender.com/api/v1/partners/delete/${deletingRecord.id}`,
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
          message.error("Xóa không thành công!");
        }
        const newData = data.filter((item) => item.id !== deletingRecord.id);
        setDataTable(newData);
        setConfirmDelete(!confirmDelete);
        message.success("Xóa thành công!");
        
      } catch (error) {
        console.error("Error deleting product:", error);
        message.error("Xóa không thành công!");
      }
    };
  
    //sửa provider
    const [editData, setEditData] = useState([]);
    const [editForm]=Form.useForm()
    useEffect(() => {
      if(editingRecord){
        fetch(`https://backend-online-supermarket-sales-website.onrender.com/api/v1/partners/${editingRecord.id}`,
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
            setEditData(jsonData);
          })
          .catch((error) => {
            console.error("Error fetching data:", error);
          });
  
      }
    }, [editingRecord]);
  
    const handleEdit = async (values) => {
      try {
        const response = await fetch(`https://backend-online-supermarket-sales-website.onrender.com/api/v1/partners/update/${editingRecord.id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
              accept: "*/*",
          },
          body: JSON.stringify(values),
        });
  
        console.log('fetch')
  
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
      } catch (error) {
        console.error("Error updating product:", error);
      }
    };
  
    const handleSave = (e) => {
      e.preventDefault();
      editForm
        .validateFields()
        .then((values) => {
          handleEdit(values);
          console.log(values)
        })
        .catch((info) => {
          console.log("Validate Failed:", info);
        });
    };
  
  
    return (
      <>
        <div className="general-content">
          {!formAdd && (
            <>
              <Typography className="header-content mb-3">
                QUẢN LÝ NHÀ CUNG CẤP{" "}
              </Typography>
              <Card className="data-statistic mb-3 pb-5">
                <Typography style={{ fontSize: 16, fontWeight: 500 }}>
                  Tìm kiếm:{" "}
                </Typography>
                <Space className="my-3 ">
                  <Input
                    className="me-4"
                    placeholder="Nhập nhà cung cấp..."
                    style={{ width: 800 }}
                  />
                  <Button
                    className="me-4"
                    style={{ background: "#5EB600", color: "#fff" }}
                  >
                    Tìm kiếm
                  </Button>
                </Space>
              </Card>
              <Card className="chart-statistic">
                <Flex justify="space-between">
                  <Typography style={{ fontWeight: 500, fontSize: 16 }}>
                    Danh sách nhà cung cấp
                  </Typography>
                  <button
                    onClick={addAction}
                    style={{ background: "transparent", border: "none" }}
                  >
                    <PlusCircleOutlined
                      type="button"
                      style={{ fontSize: 28, color: "#46B91D" }}
                    />
                  </button>
                </Flex>
                <Table columns={columns} dataSource={dataTable} />
              </Card>
              <Drawer
            title="Chi tiết nhà cung cấp"
            onClose={viewAction}
            open={viewProvider}
            width={500}
            >
              <Flex vertical>
              <strong className="mb-3">Tên Nhà cung cấp: {dataView.name}</strong>
              <strong className="mb-3">Số điện thoại: {dataView.phone_number}</strong>
              <strong className="mb-3">Email: {dataView.email}</strong>
              <strong className="mb-3">Địa chỉ {dataView.address}</strong>
              <strong className="mb-3">Nợ:  {dataView.debt}</strong>
              </Flex>
            </Drawer>
            </>
          )}
          
          {formAdd && (
            <div className="container-confirm d-flex align-items-center justify-content-center">
              <Card
                className=""
                style={{ background: "#fff", minHeight: 400, width: 400 }}
              >
                <Flex align="center" justify="space-between">
                  <Typography
                    className="mb-4"
                    style={{ fontWeight: 500, fontSize: 20 }}
                  >
                    Thêm nhà cung cấp{" "}
                  </Typography>
                  <CloseOutlined style={{ fontSize: 24 }} onClick={addAction} />
                </Flex>
                <Form form={form}  layout="vertical">
                  <Form.Item
                    name="name"
                    label="Tên nhà cung cấp"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{}]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone_number" label="Số điện thoại">
                    <Input />
                  </Form.Item>
                  <Form.Item name="address" label="Địa chỉ">
                    <Input />
                  </Form.Item>
                  <Form.Item name="note" label="Ghi chú">
                    <Input.TextArea />
                  </Form.Item>
                  <Flex justify="end" horizontal>
                    <Form.Item>
                      <Button
                        style={{ background: "transparent", marginRight: 8 }}
                        onClick={addAction}
                      >
                        Hủy
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        onClick={handleSubmit}
                        style={{ background: "#AFE970" }}
                        htmlType="submit"
                      >
                        Submit
                      </Button>
                    </Form.Item>
                  </Flex>
                </Form>
              </Card>
            </div>
          )}
          {formEdit && (
            <div className="container-confirm d-flex align-items-center justify-content-center">
              <Card
                className=""
                style={{ background: "#fff", minHeight: 400, width: 400 }}
              >
                <Flex className="mb-4" align="center" justify="space-between">
                  <Typography
                    className=""
                    style={{ fontWeight: 500, fontSize: 20 }}
                  >
                    Sửa thông tin nhà cung cấp{" "}
                  </Typography>
                  <CloseOutlined style={{ fontSize: 24 }} onClick={editAction} />
                </Flex>
                <Form
                  fields={[
                    {
                      name: ["name"],
                      value: editData.name,
                    },
                    {
                      name: ["phone_number"],
                      value: editData.phone_number,
                    },
                    {
                      name: ["email"],
                      value: editData.email,
                    },
                    {
                      name: ["address"],
                      value: editData.address,
                    },
                    {
                      name: ["note"],
                      value: editData.note,
                    },
                  ]}
                  form={editForm}
                  layout="vertical"
                >
                  <Form.Item
                    name="name"
                    label="Tên nhà cung cấp"
                    rules={[
                      {
                        required: true,
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item name="email" label="Email" rules={[{}]}>
                    <Input />
                  </Form.Item>
                  <Form.Item name="phone_number" label="Số điện thoại">
                    <Input />
                  </Form.Item>
                  <Form.Item name="address" label="Địa chỉ">
                    <Input />
                  </Form.Item>
                  <Form.Item name="note" label="Ghi chú">
                    <Input.TextArea />
                  </Form.Item>
                  <Flex justify="end" horizontal>
                    <Form.Item>
                      <Button
                        style={{ background: "transparent", marginRight: 8 }}
                        onClick={editAction}
                      >
                        Hủy
                      </Button>
                    </Form.Item>
                    <Form.Item>
                      <Button
                        onClick={handleSave}
                        style={{ background: "#AFE970" }}
                        htmlType="submit"
                      >
                        Lưu
                      </Button>
                    </Form.Item>
                  </Flex>
                </Form>
              </Card>
            </div>
          )}
          <Modal
                width={400}
                title={<div style={{ textAlign: 'center' }}>Xác nhận xóa</div>}
                open={confirmDelete}
                onOk={deleteConfirm}
                onCancel={deleteAction}
                footer={[
                  <div style={{ textAlign: 'center', width: '100%' }}>
                    <Button key="cancel" onClick={deleteAction} style={{ marginRight: 8 }}>
                      Cancel
                    </Button>
                    <Button key="ok" type="primary" onClick={deleteConfirm}>
                      Ok
                    </Button>
                  </div>
                ]}
              >
              </Modal>
        </div>
      </>
    );
  }
  