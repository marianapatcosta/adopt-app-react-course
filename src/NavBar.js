//CSS in JS

import React, { useState } from "react";
import { Link } from "@reach/router";
import { css, keyframes } from "@emotion/core";
import colors from "./colors";

const spin = keyframes`
to {
    transform: rotate(360deg)
}`;

const NavBar = () => {
  const [padding, setPadding] = useState(15);

  return (
    // use css prop to pass css to the component
    <header
      css={css`
        background-color: ${colors.secondary};
        position: sticky;
        top: 0;
        z-index: 10;
      `}
    >
      {/* onClick={() => setPadding(padding + 15)} 
     padding: ${padding}px; */}
      <Link to="/">Adopt Me!</Link>
      <span
        css={css`
          font-size: 60px;
          display: inline-block;
          animation: 1s ${spin} linear infinite;
          
          &:hover {
            animation: 0.1s ${spin} linear infinite reverse;
            text-decoration: underline;
          }
        `}
        aria-label="logo"
        role="img"
      >
        🐩 
      </span>
    </header>
  );
};

export default NavBar;
