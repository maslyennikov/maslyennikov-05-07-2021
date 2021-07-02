import React, {
  useContext,
  FC,
  MemoExoticComponent,
  Dispatch,
  SetStateAction,
} from "react";

import { WebSocketContext } from "../../contexts";
import WebsocketConnection from "../../WebsocketConnection";
import {Colors, groupValues, MarketProduct} from "../../constants";

interface IProps {
  resetState: () => void;
  setGroupByValue: Dispatch<SetStateAction<number>>;
}

const Footer: MemoExoticComponent<FC<IProps>> = React.memo((props: IProps) => {
  const ws: WebsocketConnection | null = useContext(WebSocketContext);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        position: "fixed",
        bottom: "0",
        background: Colors.lightgrey,
        padding: "10px",
        width: "100%",
      }}
    >
      <button
        onClick={() => {
          ws?.kill();
        }}
        style={{
          color: "white",
          background: "purple",
        }}
      >
        UNSUBSCRIBE
      </button>
      <button
        onClick={() => {
          ws?.unsubscribe();
          props.resetState();
          ws?.subscribe(
            WebsocketConnection.subscribedProductId === MarketProduct.PI_ETHUSD
              ? MarketProduct.PI_XBTUSD
              : MarketProduct.PI_ETHUSD
          );

          props.setGroupByValue(
            WebsocketConnection.subscribedProductId === MarketProduct.PI_ETHUSD
              ? groupValues[MarketProduct.PI_ETHUSD][0]
              : groupValues[MarketProduct.PI_XBTUSD][0]
          );
        }}
        style={{
          color: "white",
          background: "red",
        }}
      >
        TOGGLE
      </button>
    </div>
  );
});

export { Footer };
