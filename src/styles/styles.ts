import styled from "styled-components";

export const Main = styled.main`
  padding: 5rem 0;
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

export const Title = styled.h1`
  font-size: 1.5em;
  text-align: center;
  color: black;
`;

export const Container = styled.section`
  min-height: 100vh;
  padding: 0 0.5rem;
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

  &:hover {
    border: 1px solid #000000;
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

export const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

export const Button = styled.button`
  padding: 10px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #eaeaea;

  &:hover {
    border: 1px solid #000000;
  }
`;

export const Input = styled.input`
margin-top: 20px;
padding: 10px;
width: 90%;
border-radius: 10px;
font-size: 20px;
`

export const InputWrapper = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: center;
`