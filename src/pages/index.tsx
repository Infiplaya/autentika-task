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
import styled from "styled-components";

const GET_CHARACTERS = gql`
  query Characters($page: Int) {
    characters(page: $page) {
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
      info: data.characters.info,
    },
  };
}

export default function Home({
  firstCharacters,
}: {
  firstCharacters: Character[];
}) {
  const [characters, setCharacters] = useState(firstCharacters);
  const [page, setPage] = useState(1);

  const { data, loading, error } = useQuery(GET_CHARACTERS, {
    client,
    variables: {
      page,
    },
  });

  useEffect(() => {
    if (data) {
      setCharacters(data.characters.results);
    }
  }, [data]);

  if (error) {
    console.error(error);
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
            <Button onClick={() => setPage((prev) => prev + 1)}>
              Next Page
            </Button>
          </Pagination>
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
