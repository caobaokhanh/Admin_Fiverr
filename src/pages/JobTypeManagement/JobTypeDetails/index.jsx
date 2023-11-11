import React, { useEffect, useRef, useState } from "react";
import { Card, Form, Input, Table, Row, Col, Button } from "antd";
import { SearchOutlined } from "@ant-design/icons";
import { column } from "./column";
import { useDebouncedCallback } from "use-debounce";
import Swal from "sweetalert2";
import { Wrapper } from "./styled";
import Add from "./Modal/Add";
import Edit from "./Modal/Edit";
import {
  apiGetJobsTypeListDetails,
  apiDeleteJobsTypeDetails,
} from "../../../services/request/api/index";
import { ShowError, ShowSuccess } from "../../../components/Message";
import useWindowDimensions from "../../../services/hooks/useWindowDimensions";

const JobManagement = () => {
  const { height, width } = useWindowDimensions();
  const [data, setData] = useState([]);
  const [loading, isLoading] = useState(false);
  const addJobTypeDetailsRef = useRef();
  const editRef = useRef();
  const onEdit = (item) => editRef.current.open(item);
  const getListJobTypeDetails = async (value) => {
    isLoading(true);
    const data = await apiGetJobsTypeListDetails(value);
    setData(data?.content);
    isLoading(false);
  };

  const onSearch = async (value) => {
    const newData = data.filter(
      (job) => job.tenNhom.toUpperCase().indexOf(value.toUpperCase()) !== -1
    );
    setData(newData);
  };

  const onChangeKeyWord = useDebouncedCallback((e) => {
    const value = e.target.value;
    if (value) {
      onSearch(value);
    } else {
      getListJobTypeDetails();
    }
  }, 1000);

  const onDelete = (id) => {
    Swal.fire({
      icon: "warning",
      text: "Do you want to delete this data?",
      confirmButtonText: "Yes",
      cancelButtonText: "No",
      showCancelButton: true,
      confirmButtonColor: "#1677ff",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await apiDeleteJobsTypeDetails(id);
          getListJobTypeDetails();
          ShowSuccess("Delete successfully");
        } catch (error) {
          ShowError(error?.response?.data?.content);
        }
      }
    });
  };

  useEffect(() => {
    getListJobTypeDetails();
  }, []);

  return (
    <>
      <Add
        ref={addJobTypeDetailsRef}
        getListJobTypeDetails={getListJobTypeDetails}
      />
      <Edit ref={editRef} getListJobTypeDetails={getListJobTypeDetails} />
      <Card bodyStyle={{ padding: "10px 25px" }}>
        <h2>Job Type Details</h2>
      </Card>
      <div style={{ padding: 10 }}>
        <Card bodyStyle={{ padding: 15 }}>
          <Wrapper>
            <div style={{ width: "100%" }}>
              <Form layout="inline">
                <Row style={{ width: "100%" }}>
                  <Col xs={24} md={16} lg={10} xxl={6}>
                    <Form.Item className="no-margin">
                      <Input
                        placeholder="Enter job name to search"
                        suffix={<SearchOutlined />}
                        allowClear
                        onChange={onChangeKeyWord}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form>
            </div>
            <Button
              type="primary"
              onClick={() => addJobTypeDetailsRef.current.open()}
            >
              Add job type details
            </Button>
          </Wrapper>

          <div>
            <Table
              size="small"
              columns={column(onDelete, onEdit)}
              dataSource={data}
              pagination={{
                pageSize: 25,
                position: ["bottomCenter"],
              }}
              loading={loading}
              scroll={
                width > 1600
                  ? { y: height - 310, x: 1280 }
                  : {
                      x: 1400,
                    }
              }
            />
          </div>
        </Card>
      </div>
    </>
  );
};

export default JobManagement;
