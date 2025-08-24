import { HomeTwoTone, UserOutlined } from "@ant-design/icons";
import { Breadcrumb, Collapse, Divider, Image, Space } from "antd";
import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";

const DetailUser = () => {
  const { id } = useParams();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const users = JSON.parse(localStorage.getItem("users"));
    setUser(users.find((u) => String(u.id) === id));
  }, [id]);

  if (!user) return <h1>Product not Found</h1>;

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
    {
      title: <Link to={`/users/${user.id}`}>{user.name}</Link>,
    },
  ];

  return (
    <div className="container detail">
      <Divider orientation="center" style={{ fontSize: 50, margin: 20 }}>
        User Detail
      </Divider>
      <Breadcrumb style={{ margin: 12, marginRight: "auto" }} items={items} />
      <Image
        width={300}
        src="https://w7.pngwing.com/pngs/490/157/png-transparent-male-avatar-boy-face-man-user-flat-classy-users-icon.png"
      />
      <Space direction="horizontal" className="info">
        <Collapse
          style={{ width: "300px" }}
          collapsible="header"
          defaultActiveKey={["1"]}
          items={[
            {
              key: "1",
              label: "Infomation",
              children: (
                <div>
                  <p>ID: {user.id}</p>
                  <p>Name: {user.name}</p>
                  <p>Username: {user.username}</p>
                </div>
              ),
            },
          ]}
        />
        <Collapse
          style={{ width: "300px" }}
          collapsible="header"
          defaultActiveKey={["1"]}
          items={[
            {
              key: "1",
              label: "Contact",
              children: (
                <div>
                  <p>Email: {user.email}</p>
                  <p>Phone: {user.phone}</p>
                  <p>Website: {user.website}</p>
                </div>
              ),
            },
          ]}
        />
        <Collapse
          style={{ width: "300px" }}
          collapsible="header"
          defaultActiveKey={["1"]}
          items={[
            {
              key: "1",
              label: "Address",
              children: (
                <div>
                  <p>
                    Adress: {user.address.street} Street, {user.address.suite},
                    {user.address.city} City
                  </p>
                  <p>Zipcode: {user.address.zipcode}</p>
                </div>
              ),
            },
          ]}
        />
        <Collapse
          style={{ width: "300px" }}
          collapsible="header"
          defaultActiveKey={["1"]}
          items={[
            {
              key: "1",
              label: "Company",
              children: (
                <div>
                  <p>Name: {user.company.name}</p>
                  <p>Catch Phrase: {user.company.catchPhrase}</p>
                </div>
              ),
            },
          ]}
        />
      </Space>
    </div>
  );
};

export default DetailUser;
