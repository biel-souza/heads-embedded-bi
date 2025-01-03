import { Pagination as PaginationMui } from "@mui/material";

import { PaginationContainer } from "./style";

interface Props {
  page: number;
  itemsPerPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, itemsPerPage, onPageChange, total }: Props) => {
  const pages = Math.ceil(total / itemsPerPage);

  return (
    <PaginationContainer>
      <PaginationMui count={pages} size="small" page={page + 1} onChange={(e, p) => onPageChange(p - 1)} />
    </PaginationContainer>
  );
};

export default Pagination;
