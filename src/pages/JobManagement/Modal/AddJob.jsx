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
                label="Tên công việc"
                rules={[formValidate.required]}
                name="tenCongViec"
              >
                <Input placeholder="Tên công việc" />
              </Form.Item>
              <Form.Item
                label="Giá"
                rules={[formValidate.required]}
                name="giaTien"
              >
                <Input type="number" placeholder="Giá" />
              </Form.Item>
              <Form.Item
                label="Mã chi tiết loại công việc"
                rules={[formValidate.required]}
                name="maChiTietLoaiCongViec"
              >
                <Input type="number" placeholder="Mã chi tiết loại công việc" />
              </Form.Item>
              <Form.Item
                label="Mô tả"
                rules={[formValidate.required]}
                name="moTa"
              >
                <Input.TextArea rows={4} placeholder="Mô tả" />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                label="Đánh giá"
                rules={[formValidate.required]}
                name="danhGia"
              >
                <Input type="number" placeholder="Đánh giá" />
              </Form.Item>
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
              <Form.Item
                label="Sao công việc"
                rules={[formValidate.required]}
                name="saoCongViec"
              >
                <Input type="number" placeholder="Sao công việc" />
              </Form.Item>
              <Form.Item
                label="Mô tả ngắn"
                rules={[formValidate.required]}
                name="moTaNgan"
              >
                <Input.TextArea rows={4} placeholder="Mô tả ngắn" />
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
                Thêm
              </Button>
              <Button
                onClick={handleCancel}
                size="large"
                style={{ width: 100 }}
              >
                Đóng
              </Button>
            </Space>
          </Col>
        </Form>
      </StyledModal>
    </>
  );
};

export default forwardRef(AddJob);
