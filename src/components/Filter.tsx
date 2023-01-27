import { Input, InputWrapper } from "@/styles/styles";
import styled from "styled-components";

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
