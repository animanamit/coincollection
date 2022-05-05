import { createClient } from "next-sanity";

import Image from "next/image";
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
  obs: string;
  rev: string;
  weight: string;
  page: string;
  var: string;
  class: string;
}

interface ICoinProps {
  coins: ICoin[];
}

const Coin = ({ coins }: ICoinProps) => {
  const imageProps = useNextSanityImage(client, coins[0].photo);

  //   console.log(coins[0]);
  //   console.log(imageProps);
  return (
    <div className="bg-slate-50 h-screen flex flex-col content-center items-center">
      <h3 className="tracking-tight font-bold text-4xl p-4">{coins[0].name}</h3>

      <div className="mx-auto">
        <Image
          alt={coins[0].name}
          {...imageProps}
          layout="fixed"
          height="300px"
          width="300px"
          placeholder="blur"
          className="rounded-xl shadow-lg"
        />
      </div>
      <div className="bg-pink-200 shadow-md rounded-lg  mx-auto p-4 flex flex-col">
        <span>{coins[0].obs}</span>
        <span>{coins[0].rev}</span>
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
