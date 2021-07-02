import { createContext } from "react";
import WebsocketConnection from "./WebsocketConnection";

export const WebSocketContext = createContext<WebsocketConnection | null>(null);
