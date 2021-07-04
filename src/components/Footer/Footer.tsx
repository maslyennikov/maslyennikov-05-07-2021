import React, {
  Dispatch,
  FC,
  MemoExoticComponent,
  SetStateAction,
  useContext,
  useState,
} from "react";

import { WebSocketContext } from "../../contexts";
import WebsocketConnection from "../../WebsocketConnection";
import Button from "../Button";
import { Colors, groupValues, MarketProduct } from "../../constants";

interface IProps {
  resetState: () => void;
  setGroupByValue: Dispatch<SetStateAction<number>>;
}

const Footer: MemoExoticComponent<FC<IProps>> = React.memo((props: IProps) => {
  const ws: WebsocketConnection | null = useContext(WebSocketContext);
  const [shouldResetFeed, setShouldResetFeed] = useState<boolean>(false);

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
      <Button
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
        backgroundColor={Colors.purple}
        icon={"./toggle-feed.svg"}
        text={"Toggle Feed"}
      />
      <Button
        onClick={() => {
          if (!shouldResetFeed) {
              ws?.throwError();
              setShouldResetFeed(true);
          } else {
              setShouldResetFeed(false);
              ws?.subscribe(
                  WebsocketConnection.subscribedProductId === MarketProduct.PI_XBTUSD
                      ? MarketProduct.PI_XBTUSD
                      : MarketProduct.PI_ETHUSD
              );
          }
        }}
        backgroundColor={Colors.red}
        text={"Kill Feed"}
        icon={"./kill-feed.svg"}
      />
    </div>
  );
});

export { Footer };
