import Head from "next/head";
import { useQuery } from "@apollo/client";
import client from "@/apollo-client";
import { Character, Data, Info } from "@/types/characters";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { Filter } from "@/components/Filter";
import { Pagination } from "@/components/Pagination";
import { CharacterCard } from "@/components/CharacterCard";
import { GetStaticProps } from "next";
import { GET_CHARACTERS } from "@/graphql/getCharacters";

export const Main = styled.main`
  padding: 80px 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
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

export const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  color: black;
`;

export const CharactersGrid = styled.div`
  display: grid;
  grid-template-columns: 50% 50%;
  gap: 20px;
  align-items: center;
  justify-items: center;
  margin-top: 40px;

  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
  }
`;



export const getStaticProps:GetStaticProps = async () => {
  const { data }: { data: Data} = await client.query({
    query: GET_CHARACTERS,
    variables: { page: 1 },
  });

  return {
    props: {
      firstCharacters: data.characters.results,
      initialInfo: data.characters.info,
    },
  };
};

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
              <CharacterCard character={character} key={character.id} />
            ))}
          </CharactersGrid>
          {characters.length === 0 ? <Title>No matches</Title> : null}
        </Container>
      </Main>
    </>
  );
}
