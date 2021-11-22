import { useCallback, useEffect, useState } from "react";
import { BlocksLatest } from "../../../../src/shared/types";

const ws = new WebSocket("ws://localhost:3000");

type Message = BlocksLatest;

type BlockProps = {
  message: Message;
};
const Block = ({ message }: BlockProps) => (
  <div className="w-60 h-10 m-1 border-black border shadow-md rounded-md flex flex-row items-center justify-evenly align-center text-lg">
    <p className="text-black">{message.hash.substring(1, 6)}</p>
    <p className="text-blue-500">{message.slot}</p>
    <p className="text-green-500">{message.epoch}</p>
  </div>
);

const Home = () => {
  const [messages, setMessages] = useState<Message[]>([]);

  useEffect(() => {
    ws.addEventListener("message", (event) => {
      const newMessage: Message = JSON.parse(event.data);
      console.log("received: %s", newMessage.hash);
      setMessages((oldMessages) => [newMessage, ...oldMessages]);
    });
  }, [ws]);

  return (
    <div className="mx-auto rounded-xl flex items-center flex-col">
      <div className="text-5xl p-4 font-medium text-black">
        Web3 Hipster Stack!
      </div>
      <div className="flex flex-col text-gray-500">
        {messages.map((message, i) => (
          <Block key={i} message={message} />
        ))}
      </div>
    </div>
  );
};

export { Home };
