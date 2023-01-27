import styled from "styled-components";

export const Input = styled.input`
  margin-top: 20px;
  padding: 10px;
  width: 90%;
  border-radius: 10px;
  font-size: 20px;
`;

export const InputWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;

interface Props {
  text: string;
  handleText: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

export function Filter({ text, handleText }: Props) {
  return (
    <InputWrapper>
      <Input type="text" value={text} onChange={handleText} />
    </InputWrapper>
  );
}
