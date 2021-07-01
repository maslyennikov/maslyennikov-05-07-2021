class WebsocketConnection {
  private ws: WebSocket;
  static subscribedProductId?: string;

  constructor(url: string) {
    this.ws = new WebSocket(url);
  }

  setOnMessage(onMessage: (e: MessageEvent) => void) {
    this.ws.onmessage = onMessage;
  }

  subscribe(productId: string) {
    const message = {
      event: "subscribe",
      feed: "book_ui_1",
      product_ids: [productId],
    };

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    } else {
      this.ws.onopen = () => {
        this.ws.send(JSON.stringify(message));
      };
    }
    WebsocketConnection.subscribedProductId = productId;
  }

  unsubscribe() {
    const message = {
      event: "unsubscribe",
      feed: "book_ui_1",
      product_ids: [WebsocketConnection.subscribedProductId],
    };

    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(message));
    }
  }

  kill() {
    this.ws.close();
  }
}

export default WebsocketConnection;
