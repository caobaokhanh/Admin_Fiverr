import { Typography, Tooltip, Button, Image, Space } from "antd";
import { EditOutlined, DeleteOutlined } from "@ant-design/icons";

export const column = (onDelete, onEdit) => [
  {
    key: "image",
    title: "Image",
    dataIndex: "hinhAnh",
    render: (imageUrl) => <Image width={80} height={45} src={imageUrl} />,
    width: 150,
    fixed: "left",
  },

  {
    key: "name",
    title: "Name",
    dataIndex: "tenNhom",
    render: (value) => (
      <Typography.Paragraph
        ellipsis={{
          tooltip: {
            overlayInnerStyle: { whiteSpace: "pre-line" },
          },
          rows: 2,
        }}
        style={{ margin: 0 }}
      >
        {value}
      </Typography.Paragraph>
    ),
  },
  {
    key: "Id",
    title: "Id Job Type",
    dataIndex: "maLoaiCongviec",
  },
  {
    key: "nameDetails",
    title: "Name Details",
    dataIndex: "dsChiTietLoai",
    align: "center",
    width: 120,
    render: (dsChiTietLoai) => (
      <Typography.Paragraph
        ellipsis={{
          tooltip: {
            overlayInnerStyle: { whiteSpace: "pre-line" },
          },
          rows: 2,
        }}
        style={{ margin: 0 }}
      >
        {dsChiTietLoai.map((item) => item.tenChiTiet).join(", ")}
      </Typography.Paragraph>
    ),
  },
  {
    title: "",
    width: 100,
    align: "center",
    render: (item) => {
      return (
        <Space>
          <Tooltip title="Edit">
            <Button
              size="small"
              type="primary"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => onEdit(item)}
            >
              <EditOutlined style={{ fontSize: "14px" }} />
            </Button>
          </Tooltip>
          <Tooltip title="Delete">
            <Button
              size="small"
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
              onClick={() => onDelete(item?.id)}
            >
              <DeleteOutlined style={{ fontSize: "14px", color: "red" }} />
            </Button>
          </Tooltip>
        </Space>
      );
    },
  },
];
