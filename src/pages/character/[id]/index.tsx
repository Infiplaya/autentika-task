import Head from "next/head";
import { gql } from "@apollo/client";
import client from "@/apollo-client";
import { Character, Info } from "@/types/characters";
import styled from "styled-components";
import { GetServerSideProps } from "next";
import Image from "next/image";

const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;

const Container = styled.section`
  min-height: 100vh;
  padding: 0 0.5rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { id } = query;
  const { data } = await client.query({
    query: gql`
      query Character($characterId: ID!) {
        character(id: $characterId) {
          id
          name
          image
        }
      }
    `,
    variables: { characterId: id },
  });

  return {
    props: {
      character: data.character,
    },
  };
};

export default function CharacterPage({ character }: { character: Character }) {
  return (
    <>
      <Head>
        <title>{character.name}</title>
        <meta name="description" content="Autentika task app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Main>
        <Container>
          <Image
            src={character.image}
            alt="Character"
            width={250}
            height={250}
          />
          <Title>{character.name}</Title>
        </Container>
      </Main>
    </>
  );
}
