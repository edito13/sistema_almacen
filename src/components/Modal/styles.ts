import styled from "styled-components";
import { Dialog } from "@mui/material";

export const Container = styled(Dialog)`
  backdrop-filter: blur(3px);

  && .MuiDialog-paperWidthSm {
    width: 100%;
    max-width: 600px;
    border-radius: 10px;
  }
`;
