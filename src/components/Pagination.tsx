import { Button } from "@/styles/styles";
import { StyledPagination } from "@/styles/styles";

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
