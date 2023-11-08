import React, {
  useState,
  forwardRef,
  useImperativeHandle,
  useEffect,
} from "react";
import { Form, Input, Row, Col, Space, Button } from "antd";
import { StyledModal } from "./styled";
import { apiUpdateJob, apiUploadImage } from "../../../services/request/api";
import { ShowError, ShowSuccess } from "../../../components/Message";
import { formValidate } from "../../../services/helper";

const Edit = ({ getListWork }, ref) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [form] = Form.useForm();
  const [item, setItem] = useState();
  const [file, setFile] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  useImperativeHandle(ref, () => ({
    open: (item) => {
      setItem(item);
      setPreviewImage(item.hinhAnh);
      setIsModalOpen(true);
      form.setFieldsValue({
        ...item,
      });
    },
  }));

  const onFinish = async (values) => {
    try {
      const response = await apiUpdateJob({
        ...values,
        id: item?.id,
      });
      const jobId = response.content.id;
      if (jobId && file) {
        const formData = new FormData();
        formData.append("formFile", file);
        await apiUploadImage(jobId, formData);
        ShowSuccess("Successfully edited information");
        handleCancel();
        getListWork();
      } else {
        ShowError("Lỗi khi tải lên hình ảnh");
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
    const file = e.target.files[0];
    setFile(file);
  };
  useEffect(() => {
    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        setPreviewImage(e.target.result);
      };

      reader.readAsDataURL(file);
    }
  }, [file]);
  return (
    <>
      <StyledModal
        open={isModalOpen}
        onCancel={handleCancel}
        width="40%"
        footer={null}
        destroyOnClose
        title={<h3>Edit information</h3>}
      >
        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={20}>
            <Col span={12}>
              <img src={previewImage} width="150px" height="150px" alt="" />
            </Col>
            <Col span={12}>
              <Form.Item label="Hình ảnh">
                <Input
                  type="file"
                  placeholder="Hình ảnh"
                  accept="image/*"
                  onChange={handleFileChange}
                />
              </Form.Item>
            </Col>

            <Col span={24}>
              <Form.Item
                label="Tên công việc"
                rules={[formValidate.required]}
                name="tenCongViec"
              >
                <Input placeholder="Tên công việc" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Đánh giá"
                rules={[formValidate.required]}
                name="danhGia"
              >
                <Input placeholder="Đánh giá" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mã loại công việc"
                rules={[formValidate.required]}
                name="maChiTietLoaiCongViec"
              >
                <Input placeholder="ID Job Type" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Giá tiền"
                rules={[formValidate.required]}
                name="giaTien"
              >
                <Input placeholder="Giá" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Sao công việc"
                rules={[formValidate.required]}
                name="saoCongViec"
              >
                <Input placeholder="Rate" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mô tả"
                rules={[formValidate.required]}
                name="moTa"
              >
                <Input.TextArea rows={4} placeholder="Description" />
              </Form.Item>
            </Col>
            <Col span={24}>
              <Form.Item
                label="Mô tả ngắn"
                rules={[formValidate.required]}
                name="moTaNgan"
              >
                <Input.TextArea rows={4} placeholder="Description Sort" />
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
                  Save
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

export default forwardRef(Edit);
