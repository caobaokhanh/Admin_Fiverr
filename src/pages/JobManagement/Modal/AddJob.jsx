import React, { useState, forwardRef, useImperativeHandle } from "react";
import { Form, Input, Row, Col, Space, Button } from "antd";
import { StyledModal } from "./styled";
import { apiAddJob, apiUploadImage } from "../../../services/request/api";
import { ShowError, ShowSuccess } from "../../../components/Message";
import { formValidate } from "../../../services/helper";

const AddJob = ({ getListWork }, ref) => {
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
      const jobResponse = await apiAddJob(values);

      const newJobID = jobResponse.content.id;

      if (newJobID && file) {
        const formData = new FormData();
        formData.append("formFile", file);
        await apiUploadImage(newJobID, formData);
        ShowSuccess("Add job successfully");
        handleCancel();
        getListWork();
      } else {
        ShowError("Add job fail");
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
        title={<h3>Add job</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={12}>
              <Form.Item
                label="Name tag"
                rules={[formValidate.required]}
                name="tenCongViec"
              >
                <Input placeholder="Name tag" />
              </Form.Item>
              <Form.Item
                label="Price"
                rules={[formValidate.required]}
                name="giaTien"
              >
                <Input type="number" placeholder="Price" />
              </Form.Item>
              <Form.Item
                label="Id job type details"
                rules={[formValidate.required]}
                name="maChiTietLoaiCongViec"
              >
                <Input type="number" placeholder="Id job type details" />
              </Form.Item>
              <Form.Item
                label="Description"
                rules={[formValidate.required]}
                name="moTa"
              >
                <Input.TextArea rows={4} placeholder="Description" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Evaluate"
                rules={[formValidate.required]}
                name="danhGia"
              >
                <Input type="number" placeholder="Evaluate" />
              </Form.Item>
              <Form.Item
                label="Image"
                rules={[formValidate.required]}
                name="hinhAnh"
              >
                <Input
                  type="file"
                  placeholder="Image"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Form.Item>
              <Form.Item
                label="Rate"
                rules={[formValidate.required]}
                name="saoCongViec"
              >
                <Input type="number" placeholder="Rate" />
              </Form.Item>
              <Form.Item
                label="Description sort"
                rules={[formValidate.required]}
                name="moTaNgan"
              >
                <Input.TextArea rows={4} placeholder="Description sort" />
              </Form.Item>
            </Col>
          </Row>

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
        </Form>
      </StyledModal>
    </>
  );
};

export default forwardRef(AddJob);
