import axios from "axios";
import { useEffect, useMemo, useState } from "react";
import {
  Breadcrumb,
  Button,
  Divider,
  Form,
  Space,
  Table,
} from "antd";
import { Link } from "react-router-dom";
import {
  DeleteOutlined,
  EditOutlined,
  HomeTwoTone,
  InfoCircleTwoTone,
  ProductOutlined,
} from "@ant-design/icons";
import FormProductManagement from "./components/Form";

const ProductManagement = () => {
  const [productList, setProductList] = useState([]);
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [record, setRecord] = useState({});
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [currentId, setCurrentId] = useState(null);

  const nextId = useMemo(() => {
    const ids = productList.map((p) => p.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }, [productList]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://fakestoreapi.com/products"
      );
      setProductList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("products", JSON.stringify(productList));
  }, [productList]);

  useEffect(() => {
    if (edit) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [edit, record, isOpen]);

  const handleDetele = (id) => {
    setProductList((p) => p.filter((product) => product.id !== id));
    localStorage.setItem("products", JSON.stringify(productList));
  };

   const columns = [
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      width: 390,
      render: (text, record) => (
        <Link to={`/products/${record.id}`}>{text}</Link>
      ),
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      width: 150,
    },
    {
      title: "Category",
      dataIndex: "category",
      key: "category",
      width: 250,
      render: (text) => <>{text.toUpperCase()}</>,
    },
    {
      title: "Image",
      dataIndex: "image",
      key: "image",
      width: 200,
      render: (text) => (
        <>
          <img src={text} alt="Product IMG" style={{ height: 100 }} />
        </>
      ),
    },
    {
      title: "Action",
      key: "action",
      width: 210,
      render: (record) => (
        <Space size="middle">
          <Link to={`/products/${record.id}`}>
            <Button type="primary">
              <InfoCircleTwoTone />
            </Button>
          </Link>
          {isAdmin && (
            <>
              <Button
                icon={<EditOutlined />}
                onClick={() => {
                  setEdit(true);
                  setIsOpen(true);
                  setCurrentId(record.id);
                  setRecord(record);
                }}
              />
              <Button
                danger
                icon={<DeleteOutlined />}
                onClick={() => handleDetele(record.id)}
              ></Button>
            </>
          )}
        </Space>
      ),
    },
  ];

  const items = [
    {
      title: (
        <Link to="/dashboard">
          <HomeTwoTone />
        </Link>
      ),
    },
    {
      title: (
        <Link to="/products">
          <ProductOutlined /> Product
        </Link>
      ),
    },
  ];

  return (
    <div className="container">
    <Divider orientation="center" style={{ fontSize: 50, margin: 20 }}>
        List Product Management
      </Divider>
      <Breadcrumb style={{ margin: 12 }} items={items} />
      {isAdmin && (
        <Button
          onClick={() => {
            setEdit(false);
            setIsOpen(true);
          }}
        >
          Add New Product
        </Button>
      )}
      <Table
        columns={columns}
        dataSource={productList}
        rowKey="id"
        pagination={false}
      />
      <FormProductManagement
        edit={edit}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setEdit={setEdit}
        setCurrentId={setCurrentId}
        form={form}
        setProductList = {setProductList}
        currentId = {currentId}
        nextId = {nextId}
      />
    </div>
  );
};

export default ProductManagement;
