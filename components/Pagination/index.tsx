import { Pagination as PaginationMui } from "@mui/material";

import { PaginationContainer } from "./style";
import { ChangeEvent } from "react";

interface Props {
  page: number;
  itemsPerPage: number;
  total: number;
  onPageChange: (page: number) => void;
}

const Pagination = ({ page, itemsPerPage, onPageChange, total }: Props) => {
  return (
    <PaginationContainer>
      <PaginationMui count={total} size="small" page={page} onChange={(e, p) => onPageChange(p)} />
    </PaginationContainer>
  );
};

export default Pagination;
