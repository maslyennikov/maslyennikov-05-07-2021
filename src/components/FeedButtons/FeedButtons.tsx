import React, {
  useContext,
  FC,
  MemoExoticComponent,
  Dispatch,
  SetStateAction,
} from "react";

import { WebSocketContext } from "../../contexts";
import WebsocketConnection from "../../WebsocketConnection";
import { groupValues, MarketProduct } from "../../constants";

interface IProps {
  resetState: () => void;
  setGroupByValue: Dispatch<SetStateAction<number>>;
}

const FeedButtons: MemoExoticComponent<FC<IProps>> = React.memo(
  (props: IProps) => {
    const ws: WebsocketConnection | null = useContext(WebSocketContext);

    return (
      <div style={{ display: "flex", justifyContent: "center" }}>
        <div
          onClick={() => {
            ws?.kill();
          }}
          style={{
            color: "red",
          }}
        >
          UNSUBSCRIBE
        </div>
        <div
          onClick={() => {
            ws?.unsubscribe();
            props.resetState();
            ws?.subscribe(
              WebsocketConnection.subscribedProductId ===
                MarketProduct.PI_ETHUSD
                ? MarketProduct.PI_XBTUSD
                : MarketProduct.PI_ETHUSD
            );

            props.setGroupByValue(
              WebsocketConnection.subscribedProductId ===
                MarketProduct.PI_ETHUSD
                ? groupValues[MarketProduct.PI_ETHUSD][0]
                : groupValues[MarketProduct.PI_XBTUSD][0]
            );
          }}
          style={{
            color: "red",
          }}
        >
          TOGGLE
        </div>
      </div>
    );
  }
);

export { FeedButtons };
