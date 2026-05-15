import React from "react";

import { Row, Col, Card, Typography } from "antd";

import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";

import Loader from "./Loader";

const { Title, Text } = Typography;

const News = () => {
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery();

  if (isFetching) return <Loader />;

  return (
    <Row gutter={[24, 24]}>
      {cryptoNews?.Data?.map((news, i) => (
        <Col xs={24} sm={12} lg={8} key={i}>
          <Card hoverable className="news-card">
            <a href={news.url} target="_blank" rel="noreferrer">
              <div className="news-image-container">
                <Title level={4} className="news-title">
                  {news.title}
                </Title>

                <img src={news.imageurl} alt="news" width="100%" />
              </div>

              <p>
                {news.body.substring(0, 120)}
                ...
              </p>

              <Text strong>Source: {news.source}</Text>
            </a>
          </Card>
        </Col>
      ))}
    </Row>
  );
};

export default News;
