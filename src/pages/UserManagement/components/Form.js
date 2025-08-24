import { Col, Form, Input, Modal, Row } from "antd";

const FormUserManagement = (props) => {
  const { edit, isOpen, setIsOpen, setEdit, setCurrentId, form, setUserList, currentId, nextId } = props;
  return (
    <Modal
      title={`${edit ? "Edit User" : "Add New User"}`}
      open={isOpen}
      onCancel={() => {
        setIsOpen(false);
        setEdit(false);
        setCurrentId(null);
        form.resetFields();
      }}
      onOk={() => form.submit()}
    >
      <Form
        layout="vertical"
        form={form}
        onFinish={(values) => {
          if (edit && currentId != null) {
            setUserList((ul) =>
              ul.map((u) => (u.id === currentId ? { ...u, ...values } : u))
            );
            setEdit(false);
            setCurrentId(null);
          } else {
            setUserList((ul) => [...ul, { id: nextId, ...values }]);
          }
          setIsOpen(false);
          form.resetFields();
        }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Form.Item label="Name" name="name" rules={[{ required: true }]}>
              <Input placeholder="Nhập nội dung" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Email" name="email" rules={[{ required: true }]}>
              <Input placeholder="Nhập nội dung" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Phone" name="phone" rules={[{ required: true }]}>
              <Input placeholder="Nhập nội dung" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Website"
              name="website"
              rules={[{ required: true }]}
            >
              <Input placeholder="Nhập nội dung" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormUserManagement;
