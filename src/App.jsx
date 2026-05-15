import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Layout } from "antd";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import { Space } from "antd";

import {
  Navbar,
  Exchanges,
  Cryptocurrencies,
  HomePage,
  News,
  CryptoDetails,
} from "./components";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <div className="navbar">
          <Navbar />
        </div>

        <div className="main">
          <Layout>
            <div className="routes">
              <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/exchanges" component={Exchanges} />
                <Route
                  exact
                  path="/cryptocurrencies"
                  component={Cryptocurrencies}
                />
                <Route exact path="/crypto/:coinId" component={CryptoDetails} />
                <Route exact path="/news" component={News} />
              </Switch>
            </div>
          </Layout>

          <div className="footer">
            <Typography.Title
              level={5}
              style={{ color: "white", textAlign: "center" }}
            >
              Cryptoverse <br />
              All rights reserved
            </Typography.Title>
            <Space>
              <Link to="/">Home</Link>
              <Link to="/exchanges">Exchanges</Link>
              <Link to="/news">News</Link>
            </Space>
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
