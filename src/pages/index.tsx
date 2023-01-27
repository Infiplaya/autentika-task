import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import client from "@/apollo-client";
import Image from "next/image";
import { Character, Info } from "@/types/characters";
import Link from "next/link";
import {
  Button,
  CharacterCard,
  CharactersGrid,
  Container,
  Main,
  Pagination,
  Title,
} from "@/styles/styles";
import { useEffect, useState } from "react";

const GET_CHARACTERS = gql`
  query Characters($page: Int, $name: String) {
    characters(page: $page, filter: { name: $name }) {
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
`;

export async function getServerSideProps() {
  const { data } = await client.query({
    query: GET_CHARACTERS,
    variables: { page: 1 },
  });

  return {
    props: {
      firstCharacters: data.characters.results,
      initialInfo: data.characters.info,
    },
  };
}

export default function Home({
  firstCharacters,
  initialInfo,
}: {
  firstCharacters: Character[];
  initialInfo: Info;
}) {
  const [characters, setCharacters] = useState(firstCharacters);
  const [info, setInfo] = useState(initialInfo);
  const [text, setText] = useState("");
  const [page, setPage] = useState(1);

  const isNextPage = info.next !== null;

  console.log(isNextPage);

  const { data, error } = useQuery(GET_CHARACTERS, {
    client,
    variables: {
      page,
      name: text,
    },
  });

  useEffect(() => {
    if (data) {
      setCharacters(data.characters.results);
      setInfo(data.characters.info);
    }
  }, [data]);

  if (error) {
    return <div>No more characters</div>;
  }

  return (
    <>
      <Head>
        <title>Autentika Task</title>
        <meta name="description" content="Autentika task app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container>
          <Pagination>
            <Button
              onClick={() => setPage((prev) => prev - 1)}
              disabled={page < 2 ? true : false}
            >
              Previous Page
            </Button>
            <p>{page}</p>
            <Button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!isNextPage}
            >
              Next Page
            </Button>
          </Pagination>

          <div>
            <input
              type="text"
              value={text}
              onChange={(e) => setText(e.target.value)}
            />
          </div>
          <CharactersGrid>
            {characters.map((character) => (
              <Link
                href={`character/${character.id}`}
                key={character.id}
                style={{ textDecoration: "none" }}
              >
                <CharacterCard>
                  <Image
                    src={character.image}
                    alt="Character"
                    width={250}
                    height={250}
                    style={{ width: "250px", height: "250px" }}
                  />
                  <Title>{character.name}</Title>
                </CharacterCard>
              </Link>
            ))}
          </CharactersGrid>
        </Container>
      </Main>
    </>
  );
}
