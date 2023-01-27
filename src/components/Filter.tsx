import styled from "styled-components";

export const Input = styled.input`
  margin-top: 20px;
  padding: 10px;
  width: 90%;
  border-radius: 10px;
  font-size: 20px;
  padding:10px;
  border:0;
  box-shadow:0 0 2px 2px rgba(0,0,0,0.06);
  &:focus {
    outline: solid 1px #239DA9;
}
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin-top: 20px;
`;

interface Props {
  text: string;
  handleText: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Filter({ text, handleText }: Props) {
  return (
    <InputWrapper>
      <Input type="text" placeholder="Search a character..." value={text} onChange={handleText} />
    </InputWrapper>
  );
}
