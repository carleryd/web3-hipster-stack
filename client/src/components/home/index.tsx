import * as React from "react";

type Block = {
  id: number;
  value: number;
};
const blocks: Block[] = [1, 2, 3, 4, 5].map((id) => ({
  id,
  value: id * Math.random() * 100,
}));

type BlockProps = {
  block: Block;
};
const Block = ({ block: { id, value } }: BlockProps) => (
  <div>
    {id} {value}
  </div>
);

const Home = () => {
  return (
    <div className="p-6 max-w-sm mx-auto bg-white rounded-xl shadow-md flex items-center space-x-4 flex-col">
      <div className="text-xl font-medium text-black">Web3 Hipster Stack!</div>
      <p className="text-gray-500">
        {blocks.map((block) => (
          <Block block={block} />
        ))}
      </p>
    </div>
  );
};

export { Home };
