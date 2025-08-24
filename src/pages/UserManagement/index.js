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
  UserOutlined,
} from "@ant-design/icons";
import FormUserManagement from "./components/Form";

const UserManagement = () => {
  const [userList, setUserList] = useState([]);
  const [form] = Form.useForm();
  const [isOpen, setIsOpen] = useState(false);
  const [edit, setEdit] = useState(false);
  const [record, setRecord] = useState({});
  const isAdmin = localStorage.getItem("isAdmin") === "true";
  const [currentId, setCurrentId] = useState(null);

  const nextId = useMemo(() => {
    const ids = userList.map((u) => u.id);
    return ids.length ? Math.max(...ids) + 1 : 1;
  }, [userList]);

  const getData = async () => {
    try {
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUserList(response.data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    localStorage.setItem("users", JSON.stringify(userList));
  }, [userList]);

  useEffect(() => {
    if (edit) {
      form.setFieldsValue(record);
    } else {
      form.resetFields();
    }
  }, [edit, record, isOpen]);

  const handleDetele = (id) => {
    setUserList((u) => u.filter((user) => user.id !== id));
    localStorage.setItem("users", JSON.stringify(userList));
  };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 40,
    },
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: 250,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      width: 250,
    },
    {
      title: "Phone",
      dataIndex: "phone",
      key: "phone",
      width: 250,
    },
    {
      title: "Website",
      dataIndex: "website",
      key: "website",
      width: 200,
    },
    {
      title: "Action",
      key: "action",
      width: 210,
      render: (_, record) => (
        <Space size="middle">
          <Link to={`/users/${record.id}`}>
            <Button type="primary" icon={<InfoCircleTwoTone />}></Button>
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
        <Link to="/users">
          <UserOutlined /> Users
        </Link>
      ),
    },
  ];

  return (
    <div className="container">
      <Divider orientation="center" style={{ fontSize: 50, margin: 20 }}>
        List User Management
      </Divider>
      <Breadcrumb style={{ margin: 12 }} items={items} />
      {isAdmin && (
        <Button
          onClick={() => {
            setEdit(false);
            setIsOpen(true);
          }}
        >
          Add New User
        </Button>
      )}
      <Table
        columns={columns}
        dataSource={userList}
        rowKey="id"
        pagination={false}
      />
      <FormUserManagement
        edit={edit}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setEdit={setEdit}
        setCurrentId={setCurrentId}
        form={form}
        setUserList = {setUserList}
        currentId = {currentId}
        nextId = {nextId}
      />
    </div>
  );
};

export default UserManagement;
