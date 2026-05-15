import React, { useState, useEffect } from "react";
import { useGetCoinsQuery } from "../services/cryptoApi";
import millify from "millify";
import { Card, Row, Col, Input } from "antd";
import { Link } from "react-router-dom";
import Loader from "./Loader";

const Cryptocurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const { data: cryptos, isFetching } = useGetCoinsQuery(count);

  const [cryptosList, setCryptosList] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    if (cryptos) {
      const filteredData = cryptos.filter((coin) =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase()),
      );

      setCryptosList(filteredData);
    }
  }, [cryptos, searchTerm]);

  if (isFetching || !cryptos) return <Loader />;

  return (
    <>
      {!simplified && (
        <div className="search-crypto">
          <Input
            placeholder="Search Cryptocurrency"
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      )}

      <Row gutter={[32, 32]} className="crypto-card-container">
        {cryptosList.map((currency, index) => (
          <Col xs={24} sm={12} lg={6} className="crypto-card" key={currency.id}>
            <Link to={`/crypto/${currency.id}`}>
              <Card
                title={`${index + 1}. ${currency.name}`}
                extra={
                  <img
                    className="crypto-image"
                    src={currency.image}
                    alt={currency.name}
                    width="30"
                  />
                }
                hoverable
              >
                <p>Price: ${millify(Number(currency.current_price || 0))}</p>

                <p>
                  Market Cap:
                  {millify(Number(currency.market_cap || 0))}
                </p>

                <p>
                  Volume:
                  {millify(Number(currency.total_volume || 0))}
                </p>
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </>
  );
};

export default Cryptocurrencies;
