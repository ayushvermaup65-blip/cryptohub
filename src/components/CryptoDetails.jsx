import React, { useState } from "react";
import HTMLReactParser from "html-react-parser";
import { useParams } from "react-router-dom";
import millify from "millify";
import Loader from "./Loader";

import { Col, Row, Typography, Select } from "antd";

import {
  MoneyCollectOutlined,
  DollarCircleOutlined,
  FundOutlined,
  ExclamationCircleOutlined,
  StopOutlined,
  TrophyOutlined,
  CheckOutlined,
  NumberOutlined,
  ThunderboltOutlined,
} from "@ant-design/icons";

import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";

import LineChart from "./LineChart";

const { Title, Text } = Typography;
const { Option } = Select;

const CryptoDetails = () => {
  const { coinId } = useParams();

  const [timeperiod, setTimeperiod] = useState("1");

  //  Coin details yaha hai
  const { data: cryptoDetails, isFetching } = useGetCryptoDetailsQuery(coinId);

  //  Coin history yaha hai
  const { data: coinHistory, isFetching: historyLoading } =
    useGetCryptoHistoryQuery(
      {
        coinId,
        days: timeperiod,
      },
      {
        refetchOnMountOrArgChange: true,
      }
    );

  if (isFetching || historyLoading || !cryptoDetails || !coinHistory) {
    return <Loader />;
  }

  //  Time periods yaha hai
  const time = ["1", "7", "30", "90", "180", "365"];


  const stats = [
    {
      title: "Price to USD",

      value: `$ ${millify(
        Number(cryptoDetails?.market_data?.current_price?.usd || 0),
      )}`,

      icon: <DollarCircleOutlined />,
    },

    {
      title: "Rank",

      value: cryptoDetails?.market_cap_rank,

      icon: <NumberOutlined />,
    },

    {
      title: "24h Volume",

      value: `$ ${millify(
        Number(cryptoDetails?.market_data?.total_volume?.usd || 0),
      )}`,

      icon: <ThunderboltOutlined />,
    },

    {
      title: "Market Cap",

      value: `$ ${millify(
        Number(cryptoDetails?.market_data?.market_cap?.usd || 0),
      )}`,

      icon: <DollarCircleOutlined />,
    },

    {
      title: "All Time High",

      value: `$ ${millify(Number(cryptoDetails?.market_data?.ath?.usd || 0))}`,

      icon: <TrophyOutlined />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",

      value: cryptoDetails?.tickers?.length,

      icon: <FundOutlined />,
    },

    {
      title: "Number Of Exchanges",

      value: cryptoDetails?.tickers?.length,

      icon: <MoneyCollectOutlined />,
    },

    {
      title: "Approved Supply",

      value: cryptoDetails?.market_data?.circulating_supply ? (
        <CheckOutlined />
      ) : (
        <StopOutlined />
      ),

      icon: <ExclamationCircleOutlined />,
    },

    {
      title: "Total Supply",

      value: millify(Number(cryptoDetails?.market_data?.total_supply || 0)),

      icon: <ExclamationCircleOutlined />,
    },

    {
      title: "Circulating Supply",

      value: millify(
        Number(cryptoDetails?.market_data?.circulating_supply || 0),
      ),

      icon: <ExclamationCircleOutlined />,
    },
  ];

  return (
    <Col className="coin-detail-container">
      <Col className="coin-heading-container">
        <Title level={2} className="coin-name">
          {cryptoDetails?.name}({cryptoDetails?.symbol?.toUpperCase()}) Price
        </Title>

        <p>
          {cryptoDetails?.name}
          live price in USD.
        </p>
      </Col>

      <Select
        value={timeperiod}
        className="select-timeperiod"
        placeholder="Select Timeperiod"
        onChange={(value) => setTimeperiod(value)}
      >
        {time.map((date) => (
          <Option key={date} value={date}>
            {date} Days
          </Option>
        ))}
      </Select>

      <LineChart
        key={timeperiod}
        coinHistory={coinHistory}
        currentPrice={cryptoDetails?.market_data?.current_price?.usd}
        coinName={cryptoDetails?.name}
      />

      <Col className="stats-container">
        <Col className="coin-value-statistics">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              {cryptoDetails?.name}
              Value Statistics
            </Title>

            <p>Overview showing stats of {cryptoDetails?.name}</p>
          </Col>

          {stats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>

                <Text>{title}</Text>
              </Col>

              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>

        <Col className="other-stats-info">
          <Col className="coin-value-statistics-heading">
            <Title level={3} className="coin-details-heading">
              Other Stats Info
            </Title>
          </Col>

          {genericStats.map(({ icon, title, value }) => (
            <Col className="coin-stats" key={title}>
              <Col className="coin-stats-name">
                <Text>{icon}</Text>

                <Text>{title}</Text>
              </Col>

              <Text className="stats">{value}</Text>
            </Col>
          ))}
        </Col>
      </Col>

      <Col className="coin-desc-link">
        <Row className="coin-desc">
          <Title level={3} className="coin-details-heading">
            What is {cryptoDetails?.name}?
          </Title>

          {HTMLReactParser(cryptoDetails?.description?.en || "")}
        </Row>

        <Col className="coin-links">
          <Title level={3} className="coin-details-heading">
            {cryptoDetails?.name}
            Links
          </Title>

          {cryptoDetails?.links?.homepage
            ?.filter(Boolean)
            ?.map((link, index) => (
              <Row className="coin-link" key={index}>
                <Title level={5} className="link-name">
                  Website
                </Title>

                <a href={link} target="_blank" rel="noreferrer">
                  {link}
                </a>
              </Row>
            ))}
        </Col>
      </Col>
    </Col>
  );
};

export default CryptoDetails;
