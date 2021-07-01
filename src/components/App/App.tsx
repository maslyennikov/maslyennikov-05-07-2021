import React, { useEffect, useState } from "react";

import { apiConfigValues, Direction, WSURL } from "../../constants";
import { ITableState } from "../../interfaces";
import { WebSocketContext } from "../../contexts";
import WebsocketConnection from "../../WebsocketConnection";
import Header from "../Header";
import Table from "../Table";
import { dataToTableState, updateTableState } from "../../utils";
import {FeedButtons} from "../FeedButtons/FeedButtons";

function App() {
  const [ws, setWs] = useState<WebsocketConnection | null>(null);
  const [askTableState, setAskTableState] = useState<ITableState>();
  const [bidTableState, setBidTableState] = useState<ITableState>();

  useEffect(() => {
    const wsConnection = new WebsocketConnection(WSURL);
    const onMessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);

      if (data?.feed === apiConfigValues.snapshot) {
        setAskTableState(dataToTableState(data?.asks));
        setBidTableState(dataToTableState(data?.bids));
      }
    };
    wsConnection.setOnMessage(onMessage);
    wsConnection.subscribe("PI_XBTUSD");
    setWs(wsConnection);
  }, []);
  useEffect(() => {
    const onMessage = (e: MessageEvent) => {
      const data = JSON.parse(e.data);

      if (data?.feed === apiConfigValues.snapshot) {
        setAskTableState(dataToTableState(data?.asks));
        setBidTableState(dataToTableState(data?.bids));
      }

      if (data?.feed === apiConfigValues.book_ui) {
        if (askTableState) {
          setAskTableState(updateTableState(askTableState, data?.asks));
        }

        if (bidTableState) {
          setBidTableState(updateTableState(bidTableState, data?.bids));
        }
      }
    };
    ws?.setOnMessage(onMessage);
  }, [askTableState, bidTableState, ws]);

  return (
    <WebSocketContext.Provider value={ws}>
      <Header />
      <FeedButtons resetState={() => {
        setAskTableState([]);
        setBidTableState(([]));
      }}/>
      <div style={{ display: "flex"}}>
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
}

export default App;
