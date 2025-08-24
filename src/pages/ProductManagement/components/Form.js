import { Col, Form, Input, Modal, Row } from "antd";

const FormProductManagement = (props) => {
  const {
    edit,
    isOpen,
    setIsOpen,
    setEdit,
    setCurrentId,
    form,
    setProductList,
    currentId,
    nextId,
  } = props;
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
            setProductList((ul) =>
              ul.map((u) => (u.id === currentId ? { ...u, ...values } : u))
            );
            setEdit(false);
            setCurrentId(null);
          } else {
            setProductList((ul) => [...ul, { id: nextId, ...values }]);
          }
          setIsOpen(false);
          form.resetFields();
        }}
      >
        <Row gutter={[24, 24]}>
          <Col xs={24} md={12}>
            <Form.Item label="Title" name="title" rules={[{ required: true }]}>
              <Input placeholder="Nhập nội dung" />
            </Form.Item>
          </Col>

          <Col xs={24} md={12}>
            <Form.Item label="Price" name="price" rules={[{ required: true }]}>
              <Input placeholder="Nhập nội dung" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item
              label="Category"
              name="category"
              rules={[{ required: true }]}
            >
              <Input placeholder="Nhập nội dung" />
            </Form.Item>
          </Col>
          <Col xs={24} md={12}>
            <Form.Item label="Image" name="image" rules={[{ required: true }]}>
              <Input placeholder="Nhập nội dung" />
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </Modal>
  );
};

export default FormProductManagement;
