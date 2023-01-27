import { Character } from "@/types/characters";
import Image from "next/image";
import Link from "next/link";
import styled from "styled-components";

export const StyledCharacterCard = styled.div`
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
    border: 1px solid #239DA9;
    transform: scale(1.05);
  }
`;

export const Title = styled.h1`
  font-size: 20px;
  text-align: center;
  color: black;
`;

interface Props {
  character: Character;
}

export function CharacterCard({ character }: Props) {
  return (
    <Link href={`character/${character.id}`} style={{ textDecoration: "none" }}>
      <StyledCharacterCard>
        <Image
          src={character.image}
          alt="Character"
          width={250}
          height={250}
          style={{ width: "250px", height: "250px" }}
        />
        <Title>{character.name}</Title>
        <p style={{color: "gray"}}>More info</p>
      </StyledCharacterCard>
    </Link>
  );
}
