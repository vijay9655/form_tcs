import React, { useState, useEffect } from 'react';
import { Card, Button, Table, Space, message, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const MOCK_API_URL = 'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form';

const DownloadPage = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch data to preview it before downloading
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(MOCK_API_URL);
        if (!response.ok) throw new Error('Failed to fetch data');
        const result = await response.json();
        setData(result);
      } catch (error) {
        console.error(error);
        message.error('Could not load data for export.');
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const handleDownloadExcel = () => {
    if (data.length === 0) {
      message.warning('No data available to download.');
      return;
    }

    // 1. Format the data into clean, readable headers for Excel
    const formattedData = data.map((item) => ({
      'System ID': item.id,
      'Employee ID': item.employee_id,
      'Primary Name': item.name,
      'Selected Question': item.question,
      'Additional Name 1': item.name1 || 'N/A',
      'Additional Name 2': item.name2 || 'N/A',
    }));

    // 2. Create a new Excel Worksheet from our formatted array
    const worksheet = XLSX.utils.json_to_sheet(formattedData);

    // 3. Create a blank Excel Workbook and append the sheet
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Employee Records');

    // 4. Trigger the browser download
    XLSX.writeFile(workbook, 'Employee_Details_Report.xlsx');
    message.success('Excel sheet downloaded successfully!');
  };

  // Columns for the Ant Design preview table
  const columns = [
    { title: 'Employee ID', dataIndex: 'employee_id', key: 'employee_id' },
    { title: 'Name', dataIndex: 'name', key: 'name' },
    { title: 'Question', dataIndex: 'question', key: 'question' },
    { title: 'Name 1', dataIndex: 'name1', key: 'name1', render: text => text || '-' },
    { title: 'Name 2', dataIndex: 'name2', key: 'name2', render: text => text || '-' },
  ];

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" /></div>;
  }

  return (
    <div style={{width:"100%", margin: '50px auto', padding: '0 20px' }}>
      <Card 
      style={{width:"100%"}}
        title="Export Records to Excel" 
        extra={
          <Button 
            type="primary" 
            icon={<DownloadOutlined />} 
            onClick={handleDownloadExcel}
            disabled={data.length === 0}
          >
            Download Excel Sheet
          </Button>
        }
      >
        <p style={{ color: '#666' }}>
          Below is a preview of the active database records. Click the button above to export the entire list to a clean Excel file.
        </p>
        <Table 
          dataSource={data} 
          columns={columns} 
          rowKey="id" 
          pagination={{ pageSize: 5 }} 
        />
      </Card>
    </div>
  );
};

export default DownloadPage;