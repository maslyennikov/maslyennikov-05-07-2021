import React, { FC, useEffect, useRef, useState } from "react";

import {
  apiConfigValues,
  Direction,
  MarketProduct,
  UIRefreshRate,
  WSURL,
} from "../../constants";
import { ITableState } from "../../interfaces";
import { WebSocketContext } from "../../contexts";
import WebsocketConnection from "../../WebsocketConnection";
import Header from "../Header";
import Table from "../Table";
import { dataToTableState, groupBy, updateTableState } from "../../utils";
import { FeedButtons } from "../FeedButtons/";

const App: FC = () => {
  const [ws, setWs] = useState<WebsocketConnection | null>(null);
  const [askTableState, setAskTableState] = useState<ITableState>();
  const [bidTableState, setBidTableState] = useState<ITableState>();
  const [groupByValue, setGroupByValue] = useState<number>(0.5);

  // updating state without triggering re-renders
  const bidStateRef = useRef<Array<Array<number>>>([]);
  const askStateRef = useRef<Array<Array<number>>>([]);
  const grouppedBidStateRef = useRef<Array<Array<number>>>([]);
  const grouppedAskStateRef = useRef<Array<Array<number>>>([]);

  useEffect(() => {
    // refresh mechanism for the UI
    setInterval(() => {
      setAskTableState(dataToTableState(grouppedAskStateRef.current));
      setBidTableState(dataToTableState(grouppedBidStateRef.current));
    }, UIRefreshRate);
  }, []);
  useEffect(() => {
    // initializing websocket connection
    const wsConnection = new WebsocketConnection(WSURL);
    const onMessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);

      if (data?.feed === apiConfigValues.snapshot) {
        bidStateRef.current = data?.asks;
        askStateRef.current = data?.bids;
      }
    };
    wsConnection.setOnMessage(onMessage);
    wsConnection.subscribe(MarketProduct.PI_XBTUSD);
    setWs(wsConnection);
  }, []);
  useEffect(() => {
    // updating onMessage hook every time askTableState/bidTableState/groupByValue updates
    const onMessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);

      if (data?.feed === apiConfigValues.snapshot) {
        bidStateRef.current = data?.asks;
        askStateRef.current = data?.bids;
      }

      if (data?.feed === apiConfigValues.book_ui) {
        askStateRef.current = updateTableState(askStateRef.current, data?.asks);
        bidStateRef.current = updateTableState(bidStateRef.current, data?.bids);
        grouppedBidStateRef.current = groupBy(
          bidStateRef.current,
          groupByValue
        );
        grouppedAskStateRef.current = groupBy(
          askStateRef.current,
          groupByValue
        );
      }
    };
    ws?.setOnMessage(onMessage);
  }, [askTableState, bidTableState, ws, groupByValue]);

  return (
    <WebSocketContext.Provider value={ws}>
      <Header setGroupByValue={setGroupByValue} />
      <FeedButtons
        resetState={() => {
          setAskTableState([]);
          setBidTableState([]);
        }}
        setGroupByValue={setGroupByValue}
      />
      <div style={{ display: "flex" }}>
        <Table
          depthVisualizerDirection={Direction.LEFT}
          data={bidTableState || []}
        />
        <Table
          depthVisualizerDirection={Direction.RIGHT}
          data={askTableState || []}
        />
      </div>
    </WebSocketContext.Provider>
  );
};

export default App;
