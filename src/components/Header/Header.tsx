import React, { ChangeEvent, Dispatch, FC, SetStateAction } from "react";

import { Colors, groupValues, MarketProduct } from "../../constants";
import WebsocketConnection from "../../WebsocketConnection";

interface IProps {
  setGroupByValue: Dispatch<SetStateAction<number>>;
}

const Header: FC<IProps> = (props: IProps) => {
  return (
    <>
      <div
        style={{
          width: "100%",
          display: "flex",
          justifyContent: "space-between",
          borderBottom: `2px solid ${Colors.lightgrey}`,
        }}
      >
        <div
          style={{
            color: Colors.white,
            padding: "10px",
          }}
        >
          Order Book
        </div>
        <select
          onChange={(e: ChangeEvent<HTMLSelectElement>) => {
            if (props.setGroupByValue) {
              props.setGroupByValue(Number(e.target.value));
            }
          }}
          style={{
            height: "25px",
            margin: "5px",
            background: Colors.lightgrey,
            border: 0,
            color: Colors.white,
          }}
        >
          {groupValues[
            WebsocketConnection.subscribedProductId === MarketProduct.PI_XBTUSD
              ? MarketProduct.PI_XBTUSD
              : MarketProduct.PI_ETHUSD
          ].map((value: number) => (
            <option key={value} value={value}>{`Group ${value}`}</option>
          ))}
        </select>
      </div>
    </>
  );
};

export { Header };
