import React, { FC } from "react";
import { useDispatch } from "react-redux";

const websocketUrl = "wss://www.cryptofacilities.com/ws/v1";

interface IProps {
  children: React.ReactNode;
}

const WebsocketConnection: FC<IProps> = (children) => {
  const ws: WebSocket = new WebSocket(websocketUrl);
  const dispatch = useDispatch();

  const message = {
    event: "subscribe",
    feed: "book_ui_1",
    product_ids: ["PI_XBTUSD"],
  };

  ws.onopen = () => {
    // Subscribe
    ws.send(JSON.stringify(message));
  };

  ws.onmessage = (e: MessageEvent) => {
    // De trimis actiune pentru update de state aici
    console.log(e.data);
  };

  return <>{children}</>;
};

export default WebsocketConnection;
