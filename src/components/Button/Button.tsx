import React, { FC } from "react";

import { Colors } from "../../constants";

interface IProps {
  onClick: () => void;
  backgroundColor: string;
  text: string;
  icon?: string;
}

const Button: FC<IProps> = (props: IProps) => (
  <>
    <button
      onClick={props.onClick}
      style={{
        display: "flex",
        alignItems: "center",
        color: Colors.white,
        background: props.backgroundColor,
        border: "0",
        padding: "10px",
        borderRadius: "5px",
        fontWeight: 600,
        margin: "0 5px",
        cursor: "pointer",
      }}
    >
      {props.icon && (
        <img
          style={{ padding: "2px" }}
          src={props.icon}
          alt={"alt description"}
        />
      )}
      {props.text}
    </button>
  </>
);

export { Button };
