import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Spin, Alert, Typography, Row, Col, Space, Badge } from 'antd';
import { BarChartOutlined, TrophyOutlined, TeamOutlined, UserOutlined, ReloadOutlined, InfoCircleOutlined, WarningOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;

// Array of all survey source endpoints
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

const categoriesData = [
  { "id": 1, "category": "Punctual Paramasivam", "description": "Always on time." },
  { "id": 2, "category": "Kadala Muthu Strictu", "description": "Sticks to policies & morals." },
  { "id": 3, "category": "Cool Dude", "description": "Very calm and stylish." },
  { "id": 4, "category": "Karuthu Kandhasamy", "description": "Gives a lot of advice." },
  { "id": 5, "category": "Velainu Vandhutta Vellaikiran", "description": "Very hardworking." },
  { "id": 6, "category": "Loud Lolita", "description": "Talks very strong & bold." },
  { "id": 7, "category": "Mother Teresa", "description": "Helping everyone." },
  { "id": 8, "category": "Mr. Vibe / Mrs. Vibe", "description": "Full of energy and fun." },
  { "id": 9, "category": "Java Sunderasan", "description": "Computer / Tech expert." },
  { "id": 10, "category": "Vaanga Pazhagalam", "description": "Friendly to everyone." },
  { "id": 11, "category": "Goundamani – Senthil", "description": "Best friends at work.", "type": "Duo" },
  { "id": 12, "category": "Anniyan / Ambi / Remo", "description": "Does many things at once (Multitasker)." }
];

const SurveyResults = () => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [partialError, setPartialError] = useState(null);
  const [processedData, setProcessedData] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const fetchAndProcessData = async () => {
    setLoading(true);
    setError(null);
    setPartialError(null);
    
    try {
      // Map URLs into active fetch promises
      const fetchPromises = MOCK_API_URLS.map(async (url) => {
        const res = await fetch(url);
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json();
      });

      // Settle all endpoints concurrently
      const results = await Promise.allSettled(fetchPromises);
      
      let mergedRawData = [];
      let failedCount = 0;

      results.forEach((result, index) => {
        if (result.status === 'fulfilled' && Array.isArray(result.value)) {
          mergedRawData = [...mergedRawData, ...result.value];
        } else {
          failedCount++;
          console.error(`Failed to fetch from endpoint index ${index}:`, result.reason);
        }
      });

      // Critical Error: If every single endpoint failed to download
      if (failedCount === MOCK_API_URLS.length) {
        throw new Error('All data streams failed to retrieve survey entries.');
      }

      // Partial Warning: Inform the user if some forms failed but others loaded fine
      if (failedCount > 0) {
        setPartialError(`${failedCount} of ${MOCK_API_URLS.length} survey sources failed to respond. Showing partial leaderboard analysis.`);
      }

      setTotalSubmissions(mergedRawData.length);

      // Process aggregated responses across all combined endpoints
      const summary = categoriesData.map(cat => {
        const voteCounts = {};
        let totalCategoryVotes = 0;

        mergedRawData.forEach(row => {
          let voteValue = row[cat.category];
          
          if (voteValue) {
            let normalizedName = voteValue.toString().trim();
            // Regex to strip out user trailing ID attributes safely
            normalizedName = normalizedName.replace(/\s*-\s*\d+$/g, '').trim();

            voteCounts[normalizedName] = (voteCounts[normalizedName] || 0) + 1;
            totalCategoryVotes++;
          }
        });

        // Track max leader items
        let maxVotes = 0;
        let leaders = [];

        Object.entries(voteCounts).forEach(([name, count]) => {
          if (count > maxVotes) {
            maxVotes = count;
            leaders = [name];
          } else if (count === maxVotes && maxVotes > 0) {
            leaders.push(name);
          }
        });

        return {
          key: cat.id,
          id: cat.id,
          category: cat.category,
          description: cat.description,
          type: cat.type || "Single",
          totalVotes: totalCategoryVotes,
          maxVotes: maxVotes,
          leaders: leaders, 
          allVotesBreakdown: voteCounts
        };
      });

      setProcessedData(summary);
    } catch (err) {
      setError(err.message || 'An error occurred while consolidating response metrics.');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAndProcessData();
  }, []);

  const columns = [
    {
      title: 'ID',
      dataIndex: 'id',
      key: 'id',
      width: 60,
    },
    {
      title: 'Category Details',
      key: 'categoryDetails',
      render: (_, record) => (
        <div>
          <Text strong style={{ fontSize: '15px' }}>{record.category}</Text>
          <br />
          <Text type="secondary" style={{ fontSize: '13px' }}>{record.description}</Text>
          {record.type === 'Duo' && (
            <Tag color="cyan" style={{ marginLeft: 8, verticalAlign: 'middle' }}>
              <TeamOutlined /> Duo Award
            </Tag>
          )}
        </div>
      ),
    },
    {
      title: 'Total Votes Cast',
      dataIndex: 'totalVotes',
      key: 'totalVotes',
      width: 140,
      align: 'center',
      render: (votes) => <Badge count={votes} showZero color={votes > 0 ? '#108ee9' : '#d9d9d9'} />,
    },
    {
      title: 'Leaderboard (Top Voted / Ties)',
      key: 'leaders',
      render: (_, record) => {
        if (record.leaders.length === 0) {
          return <Text type="secondary" italic>No users found</Text>;
        }

        const isTie = record.leaders.length > 1;

        return (
          <Space direction="vertical" size="small" style={{ width: '100%' }}>
            {isTie && (
              <Tag color="warning" icon={<InfoCircleOutlined />}>
                Tie Detected! Manual Verification Required
              </Tag>
            )}
            <div>
              {record.leaders.map((leader, index) => (
                <div key={index} style={{ margin: '4px 0' }}>
                  <Tag 
                    color={isTie ? "orange" : "gold"} 
                    icon={record.type === 'Duo' ? <TeamOutlined /> : <UserOutlined />}
                    style={{ padding: '4px 8px', fontSize: '13px', fontWeight: 500 }}
                  >
                    {leader} <strong style={{ marginLeft: '6px' }}>({record.maxVotes} Votes)</strong>
                  </Tag>
                </div>
              ))}
            </div>
          </Space>
        );
      },
    },
  ];

  return (
    <div style={{ background: '#f5f7fa', minHeight: '100vh', padding: 'clamp(16px, 4vw, 40px)' }}>
      <div style={{ maxWidth: 1200, margin: '0 auto' }}>
        
        {/* Header Section */}
        <Row justify="space-between" align="middle" style={{ marginBottom: '24px' }}>
          <Col>
            <Space align="center" size="middle">
              <BarChartOutlined style={{ fontSize: '32px', color: '#1677ff' }} />
              <div>
                <Title level={2} style={{ margin: 0 }}>Survey Metrics & Analytics Dashboard</Title>
                <Text type="secondary">Consolidating peer recognition streams across multiple entry forms</Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Space>
              <Tag color="blue" style={{ padding: '6px 12px', fontSize: '14px', fontWeight: 600 }}>
                Total Submissions: {totalSubmissions}
              </Tag>
              <Tag icon={<ReloadOutlined />} color="purple" style={{ padding: '6px 12px', fontSize: '14px', cursor: 'pointer' }} onClick={fetchAndProcessData}>
                Refresh Live Data
              </Tag>
            </Space>
          </Col>
        </Row>

        {error && (
          <Alert message="Data Stream Error" description={error} type="error" showIcon style={{ marginBottom: '20px' }} />
        )}

        {partialError && !error && (
          <Alert message="Partial Connection Notice" description={partialError} type="warning" showIcon icon={<WarningOutlined />} style={{ marginBottom: '20px' }} />
        )}

        {/* Master Leaderboard Table */}
        <Card 
          bordered={false} 
          style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
          title={
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#002140' }}>
              <TrophyOutlined style={{ color: '#faad14', marginRight: '8px' }} /> 
              Category Winners Overview
            </span>
          }
        >
          <Table 
            dataSource={processedData} 
            columns={columns} 
            pagination={false}
            bordered
            rowClassName={(record) => record.leaders.length > 1 ? 'tie-row-highlight' : ''}
          />
        </Card>
      </div>

      <style>{`
        .tie-row-highlight {
          background-color: #fffbe6;
        }
        .ant-table-thead > tr > th {
          background: #f0f5ff !important;
          color: #002140 !important;
          font-weight: 600 !important;
        }
      `}</style>
    </div>
  );
};

export default SurveyResults;