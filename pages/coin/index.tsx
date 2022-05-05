import { createClient } from "next-sanity";

import Img from "next/image";
import { useNextSanityImage } from "next-sanity-image";

const client = createClient({
  projectId: "pzctq5rl",
  dataset: "production",
  apiVersion: "2022-03-25",
  useCdn: true,
});

interface ICoin {
  name: string;
  _id: string;
  photo: {};
}

interface ICoinProps {
  coins: ICoin[];
}

const Coin = ({ coins }: ICoinProps) => {
  const imageProps = useNextSanityImage(client, coins[0].photo);

  //   console.log(coins);
  console.log(imageProps);
  return (
    <div className="bg-gray-100 h-screen flex flex-col">
      THIS IS A COIN PAGE
      <div className="flex">
        <div className="mx-auto flex">
          <div className="h-32 w-32 bg-pink-200 shadow-md rounded-lg mx-2 p-4">
            THIS IS A COIN
          </div>
          <div className="h-32 w-32 bg-pink-200 shadow-md rounded-lg mx-2 p-4">
            THIS IS A STAT CARD
          </div>
        </div>
      </div>
      <div className="bg-pink-200 shadow-md rounded-lg  mx-auto p-4">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam tempore
        autem quos, sunt ipsum itaque a aspernatur nulla ea repellendus ratione,
        voluptatem nesciunt delectus fugit at. Voluptatum quam eveniet eos?
      </div>
      <div>
        {coins.length > 0 && (
          <ul>
            {coins.map((coin: ICoin) => (
              <li key={coin._id}>
                {coin?.name}{" "}
                <Img {...imageProps} layout="fixed" sizes="500px, 500px" />
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export async function getStaticProps() {
  const coins = await client.fetch(`*[_type == "coin"]`);

  return {
    props: {
      coins,
    },
  };
}

export default Coin;
