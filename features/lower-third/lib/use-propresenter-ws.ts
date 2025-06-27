import { useEffect } from "react";
import { ProPresenterMessage, WSConfig } from "./type";

export const useProPresenterWS = (
  config: WSConfig,
  onMessage: (msg: ProPresenterMessage) => void
) => {
  useEffect(() => {
    let ws: WebSocket | null = null;
    let triedBackup = false;
    let reconnectTimeout: NodeJS.Timeout;

    const cleanup = () => {
      if (ws) {
        ws.close();
        ws = null;
      }
      if (reconnectTimeout) {
        clearTimeout(reconnectTimeout);
      }
    };

    const connect = (
      ip: string,
      port: number,
      password: string,
      isBackup = false
    ) => {
      const wsProtocol = location.protocol === "https:" ? "wss" : "ws";
      const url = `${wsProtocol}://${ip}:${port}/stagedisplay`;
      console.log(`[${isBackup ? "Backup" : "Primary"}] Connecting to`, url);

      ws = new WebSocket(url);

      ws.onopen = () => {
        console.log("✅ Connected:", url);
        ws?.send(
          JSON.stringify({
            pwd: password,
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
          console.error("❌ Failed to parse message:", e);
        }
      };

      ws.onerror = () => {
        console.error("❌ WebSocket error:", url);
        ws?.close();

        // Try backup only if not already tried
        if (!isBackup && !triedBackup && config.BackupIPAddress && config.BackupIPPort && config.BackupPassword) {
          triedBackup = true;
          console.log("⏭️ Trying backup connection...");
          reconnectTimeout = setTimeout(() => {
            connect(
              config.BackupIPAddress!,
              config.BackupIPPort!,
              config.BackupPassword!,
              true
            );
          }, 1000); // delay prevents flooding
        }
      };

      ws.onclose = () => {
        console.log("🔌 WebSocket closed:", url);
      };
    };

    // Initial connect
    connect(
      config.IPAddress || "127.0.0.1",
      config.IPPort || 8080,
      config.Password || "Pro12345"
    );

    return () => {
      cleanup();
    };
  }, [config, onMessage]);
};
