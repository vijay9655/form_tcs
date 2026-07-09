import React, { useState, useEffect } from 'react';
import { Card, Table, Tag, Spin, Alert, Typography, Row, Col, Space, Badge } from 'antd';
import { BarChartOutlined, TrophyOutlined, TeamOutlined, UserOutlined, ReloadOutlined, InfoCircleOutlined } from '@ant-design/icons';

const { Title, Text } = Typography;
const MOCK_API_URL = 'https://61f63c392e1d7e0017fd6d1c.mockapi.io/vijay/form';

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
  const [processedData, setProcessedData] = useState([]);
  const [totalSubmissions, setTotalSubmissions] = useState(0);

  const fetchAndProcessData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await fetch(MOCK_API_URL);
      if (!response.ok) throw new Error('Failed to retrieve survey entries.');
      const rawData = await response.json();
      setTotalSubmissions(rawData.length);

      // Process votes for each category
      const summary = categoriesData.map(cat => {
        const voteCounts = {};
        let totalCategoryVotes = 0;

        // Filter responses belonging to this specific category loop
        const categoryResponses = rawData.filter(row => row.question === cat.category);

        categoryResponses.forEach(res => {
          if (cat.type === "Duo") {
            // Duo rule: register both voted entities together as pairs or independent units
            const pairKey = `${res.name1} & ${res.name2}`;
            // Simple backup if raw structural formats alternate
            if (res.name1 && res.name2) {
              voteCounts[pairKey] = (voteCounts[pairKey] || 0) + 1;
              totalCategoryVotes++;
            }
          } else {
            // Standard dynamic tracking
            if (res.name) {
              voteCounts[res.name] = (voteCounts[res.name] || 0) + 1;
              totalCategoryVotes++;
            }
          }
        });

        // Determine who has the maximum number of votes
        let maxVotes = 0;
        let leaders = [];

        Object.entries(voteCounts).forEach(([name, count]) => {
          if (count > maxVotes) {
            maxVotes = count;
            leaders = [name]; // Reset with new sole leader
          } else if (count === maxVotes && maxVotes > 0) {
            leaders.push(name); // Handle exact vote count matches (Ties)
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
          leaders: leaders, // Array of strings (handles ties perfectly)
          allVotesBreakdown: voteCounts
        };
      });

      setProcessedData(summary);
    } catch (err) {
      setError(err.message || 'Error occurred while loading analytics structural configurations.');
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
          return <Text type="secondary" italic>No votes logged yet</Text>;
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

  if (loading) {
    return (
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh', flexDirection: 'column', gap: '16px' }}>
        <Spin size="large" />
        <Text type="secondary">Compiling real-time survey results metrics...</Text>
      </div>
    );
  }

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
                <Text type="secondary">Real-time dynamic parsing of corporate peer recognition votes</Text>
              </div>
            </Space>
          </Col>
          <Col>
            <Space>
              <Tag color="blue" style={{ padding: '6px 12px', fontSize: '14px', fontWeight: 600 }}>
                Total Submissions: {totalSubmissions}
              </Tag>
              <Badge onClick={fetchAndProcessData} style={{ cursor: 'pointer' }}>
                <Tag icon={<ReloadOutlined />} color="purple" style={{ padding: '6px 12px', fontSize: '14px', cursor: 'pointer' }}>
                  Refresh Live Data
                </Tag>
              </Badge>
            </Space>
          </Col>
        </Row>

        {error && (
          <Alert message="Data Stream Error" description={error} type="error" showIcon style={{ marginBottom: '20px' }} />
        )}

        {/* Master Leaderboard Table */}
        <Card 
          bordered={false} 
          style={{ borderRadius: '16px', boxShadow: '0 4px 20px rgba(0,0,0,0.05)' }}
          title={
            <span style={{ fontWeight: 700, fontSize: '16px', color: '#002140' }}>
              <TrophyOutlined style={{ color: '#faad14', marginRight: '8px' }} /> 
              Category Category Winners Overview
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