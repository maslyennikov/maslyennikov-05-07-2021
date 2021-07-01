import { useContext } from "react";
import { WebSocketContext } from "../../contexts";
import WebsocketConnection from "../../WebsocketConnection";

interface IProps {
  resetState: () => void;
}

export function FeedButtons(props: IProps) {
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
            WebsocketConnection.subscribedProductId === "PI_ETHUSD"
              ? "PI_XBTUSD"
              : "PI_ETHUSD"
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
