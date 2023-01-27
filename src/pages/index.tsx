import Head from "next/head";
import { Inter } from "@next/font/google";
import { gql } from "@apollo/client";
import client from "../apollo-client";
import Image from "next/image";
import { Character, Info } from "@/types/characters";

export async function getStaticProps() {
  const { data } = await client.query({
    query: gql`
      query Characters {
        characters {
          info {
            next
            pages
          }
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
      firstCharacters: data.characters.results,
      info: data.characters.info,
    },
  };
}

const inter = Inter({ subsets: ["latin"] });

export default function Home({
  firstCharacters,
  info,
}: {
  firstCharacters: Character[];
  info: Info;
}) {
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
          {firstCharacters.map((character) => (
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
