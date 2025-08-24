import { Button, Checkbox, Divider, Form, Input, message } from "antd";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  useEffect(() => {
    localStorage.clear();
  }, []);

  const onFinish = (values) => {
    if (values.username === "admin" && values.password === "admin1234") {
      if (values.remember === true) {
        localStorage.setItem("username", "admin");
        localStorage.setItem("password", "admin1234");
      }
      localStorage.setItem("isAdmin", "true");
      navigate("/dashboard");
    } else if (values.username === "user" && values.password === "user1234") {
      if (values.remember === true) {
        localStorage.setItem("username", "user");
        localStorage.setItem("password", "user1234");
      }
      localStorage.setItem("isAdmin", "false");
      navigate("/dashboard");
    } else {
      message.error("Username or Password incorrect!!!");
    }
  };

  return (
    <div className="container">
      <div className="login">
        <Divider style={{ fontSize: 50, margin: 20 }}>LOGIN</Divider>
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 16 }}
          style={{ maxWidth: 600 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="formLogin"
        >
          <Form.Item
            label="Username"
            name="username"
            rules={[{ required: true, message: "Please input your username!" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item name="remember" valuePropName="checked" label={null}>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>

          <Form.Item label={null}>
            <Button type="primary" htmlType="submit">
              Submit
            </Button>
          </Form.Item>
        </Form>
      </div>
    </div>
  );
};

export default Login;
