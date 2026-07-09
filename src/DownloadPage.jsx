import React, { useState, useEffect } from 'react';
import { Card, Button, Table, message, Spin } from 'antd';
import { DownloadOutlined } from '@ant-design/icons';
import * as XLSX from 'xlsx';

const MOCK_API_URLS = [
  'https://6a4fd29ff45d5352b611e5b4.mockapi.io/form',
  'https://6a4fd29ff45d5352b611e5b4.mockapi.io/form1',
  'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form2',
  'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form3',
  'https://6a4fd524f45d5352b611e894.mockapi.io/form4',
  'https://6a4fd524f45d5352b611e894.mockapi.io/form5',
  'https://6a4fd5fcf45d5352b611e9bd.mockapi.io/form6',
  'https://6a4fd5fcf45d5352b611e9bd.mockapi.io/form7',
  'https://6a4fd83bf45d5352b611eca2.mockapi.io/form8',
  'https://6a4fd83bf45d5352b611eca2.mockapi.io/form9'
];

const DownloadPage = () => {
  const [data, setData] = useState([]);
  const [columns, setColumns] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        
        const fetchPromises = MOCK_API_URLS.map(async (url) => {
          const response = await fetch(url);
          if (!response.ok) throw new Error(`Failed to fetch from ${url}`);
          return response.json();
        });

        const resultsArray = await Promise.all(fetchPromises);
        const combinedData = resultsArray.flat();
        
        setData(combinedData);

        // --- DYNAMIC COLUMN GENERATION ---
        // Collect every unique key across all objects in the data pool
        const allKeys = new Set();
        combinedData.forEach(item => {
          Object.keys(item).forEach(key => allKeys.add(key));
        });

        // Setup base columns first
        const generatedColumns = [
          { 
            title: 'System ID', 
            dataIndex: 'id', 
            key: 'id',
            width: 100,
            fixed: 'left'
          },
          { 
            title: 'Employee ID', 
            dataIndex: 'employee_id', 
            key: 'employee_id',
            width: 120,
            fixed: 'left'
          },
        ];

        // Turn all other dynamic fields into table columns
        allKeys.forEach(key => {
          if (key !== 'id' && key !== 'employee_id') {
            generatedColumns.push({
              title: key, // Use the actual property name (e.g., "Cool Dude") as the header
              dataIndex: key,
              key: key,
              render: text => text || '-', // Fallback if a record doesn't have this column
              width: 180
            });
          }
        });

        setColumns(generatedColumns);
      } catch (error) {
        console.error(error);
        message.error('Could not load data from one or more sources.');
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

    // Map data matching the generated columns order for a clean layout
    const formattedData = data.map((item) => {
      const row = {
        'System ID': item.id || '',
        'Employee ID': item.employee_id || ''
      };

      // Add each dynamic question field into the Excel row object
      columns.forEach(col => {
        if (col.key !== 'id' && col.key !== 'employee_id') {
          row[col.title] = item[col.key] || 'N/A';
        }
      });

      return row;
    });

    const worksheet = XLSX.utils.json_to_sheet(formattedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, 'Survey Responses');

    XLSX.writeFile(workbook, 'Employee_Survey_Report.xlsx');
    message.success('Excel sheet downloaded successfully!');
  };

  if (loading) {
    return <div style={{ textAlign: 'center', marginTop: 100 }}><Spin size="large" /></div>;
  }

  return (
    <div style={{ width: "100%", margin: '50px auto', padding: '0 20px' }}>
      <Card 
        style={{ width: "100%" }}
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
          Below is a preview of the active dynamic records. Click the button above to export the entire list to a clean Excel file.
        </p>
        <Table 
          dataSource={data} 
          columns={columns} 
          rowKey={(record, index) => record.id ? `${record.id}-${index}` : index} 
          pagination={{ pageSize: 5 }} 
          scroll={{ x: 'max-content' }} // Adds a horizontal scrollbar if there are too many columns
        />
      </Card>
    </div>
  );
};

export default DownloadPage;