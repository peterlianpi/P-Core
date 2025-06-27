// useProPresenterWS.ts
import { useEffect } from "react";
import { ProPresenterMessage, WSConfig } from "./type";

export const useProPresenterWS = (
  config: WSConfig,
  onMessage: (msg: ProPresenterMessage) => void
) => {
  useEffect(() => {
    const ws = new WebSocket(
      `ws://${config.IPAddress}:${config.IPPort}/stagedisplay`
    );

    ws.onopen = () => {
      ws.send(
        JSON.stringify({
          pwd: config.Password,
          ptl: 610,
          acn: "ath",
        })
      );
    };

    ws.onmessage = (event) => {
      try {
        const msg: ProPresenterMessage = JSON.parse(event.data);
        onMessage(msg);
      } catch (e) {
        console.error("Failed to parse message:", e);
      }
    };

    ws.onerror = (err) => {
      console.error("WebSocket error:", err);
      ws.close();
    };

    ws.onclose = () => {
      console.log("WebSocket closed");
    };

    return () => {
      ws.close();
    };
  }, [config, onMessage]);
};
