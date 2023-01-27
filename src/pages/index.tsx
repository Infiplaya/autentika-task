import Head from "next/head";
import { Inter } from "@next/font/google";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Image from "next/image";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Characters {
        characters {
          results {
            id
            name
            image
          }
        }
      }
    `,
  });

  return {
    props: {
      characters: data.characters.results,
    },
  };
}

const inter = Inter({ subsets: ["latin"] });

interface Character {
  id: number;
  name: string;
  image: string;
}

export default function Home({ characters }: { characters: Character[] }) {
  console.log(characters);
  return (
    <>
      <Head>
        <title>Autentika Task</title>
        <meta name="description" content="Autentika task app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <div>
          {characters.map((character) => (
            <div key={character.id}>
              <Image
                src={character.image}
                alt="Character"
                width={250}
                height={250}
              />
              <p>{character.name}</p>
            </div>
          ))}
        </div>
      </main>
    </>
  );
}
