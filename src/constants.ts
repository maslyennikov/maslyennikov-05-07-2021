export const WSURL: string = "wss://www.cryptofacilities.com/ws/v1";
export const UIRefreshRate = 500 // value is in ms

export const Colors: Record<string, string> = {
  white: "rgba(255, 255, 255)",
  red: "rgba(255, 0, 0)",
  green: "rgba(13, 136, 100)",
  grey: "rgba(89, 96, 110)",
  opacityRed: "rgba(255, 0, 0, 0.2)",
  opacityGreen: "rgba(13, 136, 100, 0.2)",
  transparent: "rgba(255, 0, 0, 0)",
  lightgrey: "rgba(53, 63, 79)",
  blue: "#111827"
};

export enum Direction {
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

export const apiConfigValues: Record<string, string> = {
  snapshot: "book_ui_1_snapshot",
  book_ui: "book_ui_1",
};

export enum MarketProduct {
  PI_XBTUSD = "PI_XBTUSD",
  PI_ETHUSD = "PI_ETHUSD",
}

export const groupValues: Record<MarketProduct, Array<number>> = {
  [MarketProduct.PI_XBTUSD]: [0.5, 1, 2.5],
  [MarketProduct.PI_ETHUSD]: [0.05, 0.1, 0.25],
};
