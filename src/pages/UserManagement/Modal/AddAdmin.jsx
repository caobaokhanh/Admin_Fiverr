import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Radio, Space, Button, Select } from "antd";
import { StyledModal } from "./styled";
import { apiCreateUser } from "../../../services/request/api";
import { ShowError, ShowSuccess } from "../../../components/Message";
import { formValidate } from "../../../services/helper";
import { Option } from "antd/es/mentions";

const Add = ({ getListUser }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsModalOpen(true);
      form.setFieldValue("gender", true);
    },
  }));

  const onFinish = async (values) => {
    try {
      await apiCreateUser({ ...values });
      ShowSuccess("Add account successfully");
      handleCancel();
      getListUser();
    } catch (error) {
      ShowError(error?.response?.data?.content);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };

  return (
    <>
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        width="50%"
        footer={null}
        destroyOnClose
        title={<h3>Add account</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Name"
                rules={[formValidate.required]}
                name="name"
              >
                <Input placeholder="Name" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Email"
                rules={[formValidate.required, formValidate.email]}
                name="email"
              >
                <Input placeholder="Email" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Password"
                rules={[formValidate.required]}
                name="password"
              >
                <Input.Password placeholder="Password" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Phone"
                name="phone"
                rules={[formValidate.required, formValidate.phoneNumber]}
              >
                <Input placeholder="Phone" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Gender"
                name="gender"
                rules={[formValidate.required]}
              >
                <Radio.Group>
                  <Radio value={true}>Male</Radio>
                  <Radio value={false}>Female</Radio>
                </Radio.Group>
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Role"
                name="role"
                rules={[formValidate.required]}
              >
                <Select placeholder="Select a role">
                  <Option value="ADMIN">ADMIN</Option>
                  <Option value="USER">USER</Option>
                </Select>
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: "center", marginTop: 10 }}>
              <Space size={15}>
                <Button
                  type="primary"
                  size="large"
                  htmlType="submit"
                  style={{ width: 100 }}
                >
                  Add
                </Button>
                <Button
                  onClick={handleCancel}
                  size="large"
                  style={{ width: 100 }}
                >
                  Close
                </Button>
              </Space>
            </Col>
          </Row>
        </Form>
      </StyledModal>
    </>
  );
};

export default forwardRef(Add);
