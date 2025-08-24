import { HomeTwoTone } from "@ant-design/icons";
import { Breadcrumb, Col, Divider, Row } from "antd";
import { Button, Card, Flex, Typography } from "antd";
import { Link } from "react-router-dom";
const Dashboard = () => {
  const cardStyle = {
    width: 585,
  };
  const imgStyle = {
    display: "block",
    width: 273,
  };

  const items = [
    {
      title: (
        <Link to="/dashboard">
          <HomeTwoTone />
        </Link>
      ),
    },
  ];

  return (
    <div className="container">
      <Divider orientation="center" style={{ fontSize: 50, margin: 20 }}>
        Welcome To My App
      </Divider>
      <Breadcrumb style={{ margin: 12 }} items={items} />
      <Row gutter={30}>
        <Col span={12}>
          <Card
            hoverable
            style={cardStyle}
            styles={{
              body: { padding: 0, overflow: "hidden" },
            }}
          >
            <Flex justify="space-between">
              <Flex
                vertical
                align="flex-start"
                justify="space-between"
                style={{ padding: 32 }}
              >
                <Typography.Title level={1}>
                  User List Management
                </Typography.Title>
                <Link to="/users">
                  <Button type="primary">User List</Button>
                </Link>
              </Flex>
              <img
                alt="avatar"
                src="https://cdn-icons-png.flaticon.com/512/5704/5704530.png"
                style={imgStyle}
              />
            </Flex>
          </Card>
        </Col>
        <Col span={12}>
          <Card
            hoverable
            style={cardStyle}
            styles={{
              body: { padding: 0, overflow: "hidden" },
            }}
          >
            <Flex justify="space-between">
              <img
                alt="avatar"
                src="https://static.vecteezy.com/system/resources/previews/005/082/184/non_2x/product-list-concepts-vector.jpg"
                style={imgStyle}
              />
              <Flex
                vertical
                align="flex-end"
                justify="space-between"
                style={{ padding: 32 }}
              >
                <Typography.Title level={1}>
                  Product List Management
                </Typography.Title>
                <Link to="/products">
                  <Button type="primary">Product List</Button>
                </Link>
              </Flex>
            </Flex>
          </Card>
        </Col>
      </Row>
    </div>
  );
};
export default Dashboard;
