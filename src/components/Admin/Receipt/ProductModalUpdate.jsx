
import {
    Button,
    Table,
    Form,
    Modal ,Checkbox,Image
  } from "antd";
  import React, { useState,useEffect } from "react";
function ProductModalUpdate({ visible, onClose, product, onOk,selectedProductsData  }) {

  const [selectedProducts, setSelectedProducts] = useState([]);
  
  useEffect(() => {
    setSelectedProducts(selectedProductsData);
  }, [selectedProductsData]);


  const handleOk = () => {
    onOk(selectedProducts);
    onClose()
  };
  
  const handleCheckboxChange = (productId) => {
    const index = selectedProducts.findIndex(id => id === productId);
    if (index === -1) {
      setSelectedProducts([...selectedProducts, productId]);
    } else {
      setSelectedProducts(selectedProducts.filter(id => id !== productId));
    }
  };
  const columnsProduct = [
    {
      title: 'Name',
      dataIndex: 'product_name',
      key: 'product_name',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
    },
    {
      title: 'Category',
      dataIndex: 'category',
      key: 'category',
    },
    {
      title: 'Quantity',
      dataIndex: 'quantity',
      key: 'quantity',
    },
    {
      title: 'Image',
      dataIndex: ['images'],
      key: 'images',
      render: (image) => <Image src={image[0].image_url} width={50} />,
    },

    {
      title: 'Select',
      key: 'select',
      render: (text, record) => (
        <Checkbox
        onChange={() => handleCheckboxChange(record.product_id)}
        checked={selectedProducts.includes(record.product_id)}
        />
      ),
    },
  ];

  return (
    <Modal
    width={600}
    title="Danh sách sản phẩm"
    visible={visible}
    onCancel={onClose}
    footer={[
      <Button key="cancel" onClick={onClose}>
        Cancel
      </Button>,
      <Button key="ok" type="primary" onClick={handleOk}>
        OK
      </Button>,
    ]}
  >
    <Table pagination={{ pageSize: 5 }} dataSource={product} columns={columnsProduct} />
  </Modal>
  )
}

export default ProductModalUpdate