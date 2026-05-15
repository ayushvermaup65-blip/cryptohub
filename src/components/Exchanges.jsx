import React from "react";

import millify from "millify";

import { Collapse, Row, Col, Typography, Avatar } from "antd";

import { useGetExchangesQuery } from "../services/cryptoApi";

import Loader from "./Loader";

const { Text } = Typography;
const { Panel } = Collapse;

const Exchanges = () => {
  const { data: exchangesList, isFetching } = useGetExchangesQuery();

  // ✅ Loading check
  if (isFetching || !exchangesList) return <Loader />;

  return (
    <>
      {/* Header */}
      <Row className="exchange-heading">
        <Col span={6}>Exchanges</Col>

        <Col span={6}>24h Trade Volume</Col>

        <Col span={6}>Trust Score</Col>

        <Col span={6}>Country</Col>
      </Row>

      {/* Exchanges */}
      <Row>
        {exchangesList.map((exchange) => (
          <Col span={24} key={exchange.id}>
            <Collapse
              items={[
                {
                  key: exchange.id,

                  label: (
                    <Row>
                      <Col span={6}>
                        <Text>
                          <strong>{exchange.trust_score_rank}.</strong>
                        </Text>

                        <Avatar
                          className="exchange-image"
                          src={exchange.image}
                        />

                        <Text>
                          <strong>{exchange.name}</strong>
                        </Text>
                      </Col>

                      <Col span={6}>
                        ${millify(Number(exchange.trade_volume_24h_btc || 0))}
                      </Col>

                      <Col span={6}>{exchange.trust_score}</Col>

                      <Col span={6}>{exchange.country || "N/A"}</Col>
                    </Row>
                  ),

                  children: (
                    <div>
                      <p>
                        Year Established: {exchange.year_established || "N/A"}
                      </p>

                      <p>
                        Website:{" "}
                        <a href={exchange.url} target="_blank" rel="noreferrer">
                          {exchange.url}
                        </a>
                      </p>
                    </div>
                  ),
                },
              ]}
            />
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Exchanges;
