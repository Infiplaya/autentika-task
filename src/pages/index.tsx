import Head from "next/head";
import { gql, useQuery } from "@apollo/client";
import client from "@/apollo-client";
import Image from "next/image";
import { Character, Info } from "@/types/characters";
import Link from "next/link";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Filter } from "@/components/Filter";
import { Pagination } from "@/components/Pagination";

export const Main = styled.main`
  padding: 80px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  color: black;
`;

export const Container = styled.section`
  min-height: 100vh;
  padding: 0 8px;
  padding-top: 20px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  justify-items: center;
  align-items: center;
`;

export const CharacterCard = styled.div`
  margin: 1rem;
  flex-basis: 45%;
  padding: 1.5rem;
  text-align: left;
  color: inherit;
  text-decoration: none;
  border: 1px solid #eaeaea;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-items: center;
  width: 300px;
  height: 350px;
  transition: all 0.15s ease, border-color 0.15s ease;

  &:hover,
  &:active,
  &:focus {
    border: 1px solid #000000;
    transform: scale(1.05);
  }
`;

export const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 20px;
  align-items: center;
  justify-items: center;
  margin-top: 20px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;

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

  const { data } = useQuery(GET_CHARACTERS, {
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

  function handleText(e: React.ChangeEvent<HTMLInputElement>) {
    setText(e.target.value);
  }

  function handlePreviousPage() {
    setPage((prev) => prev - 1);
  }

  function handleNextPage() {
    setPage((prev) => prev + 1);
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
          <Pagination
            isNextPage={isNextPage}
            handleNextPage={handleNextPage}
            handlePreviousPage={handlePreviousPage}
            page={page}
          />
          <Filter text={text} handleText={handleText} />
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
                  <p>More info</p>
                </CharacterCard>
              </Link>
            ))}
          </CharactersGrid>
          {characters.length === 0 ? <Title>No matches</Title> : null}
        </Container>
      </Main>
    </>
  );
}
