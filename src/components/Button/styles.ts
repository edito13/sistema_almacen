import colors from "@/utils/colors";
import styled from "styled-components";
import { Button } from "@mui/material";

export const Btn = styled(Button)`
  && {
    width: 100%;
    color: white;
    padding: 0.5rem 3rem;
    font-size: 1.3rem;
    border-radius: 6px;
    text-transform: none;
    transition: all 0.4s ease-in-out;

    svg {
      font-size: 2rem;
    }
  }

  &&.primary {
    background: ${colors.primary};

    /* &:hover {
      background: ;
    } */
  }

  &&.secondary {
    background: white;
    color: ${colors.primary};
  }

  &&.small {
    font-size: 1.4rem;
    padding: 0rem 0.8rem;
  }
`;
