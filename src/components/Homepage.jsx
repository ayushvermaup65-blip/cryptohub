import React from "react";
import millify from "millify";
import { Typography, Row, Col, Statistic } from "antd";
import { Link } from "react-router-dom";
import { useGetCoinsQuery, useGetExchangesQuery } from "../services/cryptoApi";
import { Cryptocurrencies, News } from "./index";
import Loader from "./Loader";

const { Title } = Typography;

const Homepage = () => {
  // ✅ Coins Data yaha hai
  const { data: cryptos, isFetching } = useGetCoinsQuery(100);

  // ✅ Exchanges Data yaha hai
  const { data: exchanges } = useGetExchangesQuery();

  // ✅ Loading component yaha hai
  if (isFetching || !cryptos) return <Loader />;

  const totalCoins = cryptos?.length || 0;

  const totalExchanges = exchanges?.length || 0;

  const totalMarketCap = (cryptos || []).reduce(
    (acc, coin) => acc + (coin.market_cap || 0),
    0,
  );

  const totalVolume = (cryptos || []).reduce(
    (acc, coin) => acc + (coin.total_volume || 0),
    0,
  );

  const totalMarkets = (cryptos || []).reduce(
    (acc, coin) => acc + (coin.market_cap_rank || 0),
    0,
  );

  return (
    <>
      {/* Heading */}
      <Title level={2} className="heading">
        Global Crypto Stats
      </Title>

      {/* Statistics */}
      <Row gutter={[32, 32]}>
        <Col span={12}>
          <Statistic
            title="Total Cryptocurrencies"
            value={millify(totalCoins)}
          />
        </Col>

        <Col span={12}>
          <Statistic title="Total Exchanges" value={millify(totalExchanges)} />
        </Col>

        <Col span={12}>
          <Statistic
            title="Total Market Cap"
            value={`$ ${millify(totalMarketCap)}`}
          />
        </Col>

        <Col span={12}>
          <Statistic
            title="Total 24h Volume"
            value={`$ ${millify(totalVolume)}`}
          />
        </Col>

        <Col span={12}>
          <Statistic title="Total Markets" value={millify(totalMarkets)} />
        </Col>
      </Row>

      {/* Top Cryptos */}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Top 10 Cryptocurrencies In The World
        </Title>

        <Title level={3} className="show-more">
          <Link to="/cryptocurrencies">Show More</Link>
        </Title>
      </div>

      <Cryptocurrencies simplified />

      {/* News */}
      <div className="home-heading-container">
        <Title level={2} className="home-title">
          Latest Crypto News
        </Title>

        <Title level={3} className="show-more">
          <Link to="/news">Show More</Link>
        </Title>
      </div>

      <News simplified />
    </>
  );
};

export default Homepage;
