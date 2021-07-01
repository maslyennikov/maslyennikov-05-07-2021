import { createContext } from "react";
import WebsocketConnection from "./WebsocketConnection";
import {IData} from "./interfaces";

export const WebSocketContext = createContext<WebsocketConnection | null>(null);
export const DataContext = createContext<IData | null>(null);
