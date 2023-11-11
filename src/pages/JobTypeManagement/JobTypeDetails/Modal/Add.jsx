import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Space, Button } from "antd";
import { StyledModal } from "./styled";
import {
  apiCreateJobsTypeDetails,
  apiUploadImageJobType,
} from "../../../../services/request/api";
import { ShowError, ShowSuccess } from "../../../../components/Message";
import { formValidate } from "../../../../services/helper";
const Add = ({ getListJobTypeDetails }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [file, setFile] = useState(null);

  useImperativeHandle(ref, () => ({
    open: () => {
      setIsModalOpen(true);
    },
  }));

  const onFinish = async (values) => {
    try {
      const jobTypResponse = await apiCreateJobsTypeDetails(values);
      const newJobTypeId = jobTypResponse.content.id;
      console.log(newJobTypeId);
      if (newJobTypeId && file) {
        const formData = new FormData();
        formData.append("formFile", file);
        await apiUploadImageJobType(newJobTypeId, formData);
        ShowSuccess("Add job type details successfully");
        handleCancel();
        getListJobTypeDetails();
      } else {
        ShowError("Add job type details fail");
      }
    } catch (error) {
      ShowError(error?.response?.data?.content);
    }
  };

  const handleCancel = () => {
    setIsModalOpen(false);
    form.resetFields();
  };
  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };
  return (
    <>
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        width="50%"
        footer={null}
        destroyOnClose
        title={<h3>Add job type details</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={24}>
              <Form.Item
                label="Job Type"
                name="tenChiTiet"
                rules={[formValidate.required]}
              >
                <Input placeholder="Name Details" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Id job details"
                name="maLoaiCongViec"
                rules={[formValidate.required]}
              >
                <Input type="number" placeholder="Id job details" />
              </Form.Item>
            </Col>
            {/* <Col span={24}>
              <Form.Item
                label="List details"
                name="danhSachChiTiet"
                rules={[formValidate.required]}
              >
                <Input placeholder="List details" />
              </Form.Item>
            </Col> */}
            <Col span={24}>
              <Form.Item
                label="Hình ảnh"
                rules={[formValidate.required]}
                name="hinhAnh"
              >
                <Input
                  type="file"
                  placeholder="Hình ảnh"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Form.Item>
            </Col>
            <Col span={24} style={{ textAlign: "center" }}>
              <Space>
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
                  {" "}
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
