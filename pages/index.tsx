import {
  BookOpenIcon,
  ClipboardListIcon,
  ViewGridIcon,
  ViewListIcon,
} from "@heroicons/react/outline";
import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";

import styles from "../styles/Home.module.css";

const coinages = [
  "Gupta",
  "Assam",
  "British",
  "British Circulation Rarities",
  "Awadh",
  "Hyderabad",
  "Baroda",
  "Mughal",
  "Kutch",
  "Nawanagar",
  "Rajkot",
  "Tripura",
  "Bengal Presidency",
];

const Home: NextPage = () => {
  return (
    <div className="antialiased h-screen">
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/coin.png" />
      </Head>

      <main className=" px-12 py-4 flex space-x-2 h-full">
        <div className="grid  grid-cols-2 gap-2 w-full pr-2 h-full">
          {coinages.map((item, index) => (
            <Link key={index} href={`coinage/${item}`}>
              <div className=" hover:bg-gray-700 bg-black items-center text-white rounded-lg flex justify-center p-4">
                <h1 className="font-medium text-center">{item}</h1>
              </div>
            </Link>
          ))}
        </div>
      </main>

      {/* <footer className={styles.footer}>
        <a
          href="https://vercel.com?utm_source=create-next-app&utm_medium=default-template&utm_campaign=create-next-app"
          target="_blank"
          rel="noopener noreferrer"
        >
          Powered by{" "}
          <span className={styles.logo}>
            <Image src="/vercel.svg" alt="Vercel Logo" width={72} height={16} />
          </span>
        </a>
      </footer> */}
    </div>
  );
};

export default Home;
