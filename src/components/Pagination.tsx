import styled from "styled-components";

export const Button = styled.button`
  padding: 10px;
  background: white;
  border-radius: 10px;
  cursor: pointer;
  border: 1px solid #eaeaea;
  transition: all 0.15s ease, border-color 0.15s ease;

  &:hover,
  &:active,
  &:focus {
    border: 1px solid #239DA9;
  }
`;

export const StyledPagination = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  gap: 20px;
`;

interface Props {
  handlePreviousPage: () => void;
  handleNextPage: () => void;
  page: number;
  isNextPage: boolean;
}

export function Pagination({
  handlePreviousPage,
  handleNextPage,
  page,
  isNextPage,
}: Props) {
  return (
    <StyledPagination>
      <Button onClick={handlePreviousPage} disabled={page < 2 ? true : false}>
        Previous Page
      </Button>
      <p>{page}</p>
      <Button onClick={handleNextPage} disabled={!isNextPage}>
        Next Page
      </Button>
    </StyledPagination>
  );
}
