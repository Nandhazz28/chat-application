import { useEffect } from "react";
import socket from "../../socket";

const useSocket = (
  event,
  callback
) => {
  useEffect(() => {
    socket.on(event, callback);

    return () => {
      socket.off(event, callback);
    };
  }, [event, callback]);
};

export default useSocket;