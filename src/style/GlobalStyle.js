import { createGlobalStyle } from "styled-components";

export const GlobalStyle = createGlobalStyle`
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  transition: 0.3s;
}

*:not(svg, path) {
  color: ${({ theme }) => theme.color.text};
}

body {
  margin: 0;
  font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", "Roboto", "Oxygen",
    "Ubuntu", "Cantarell", "Fira Sans", "Droid Sans", "Helvetica Neue",
    sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

code {
  font-family: source-code-pro, Menlo, Monaco, Consolas, "Courier New",
    monospace;
}

*::-webkit-scrollbar {
  height: 7px; /* 스크롤바의 너비 */
  width: 7px;
}

*::-webkit-scrollbar-thumb {
  height: 10%; /* 스크롤바의 길이 */
  background: ${({ theme }) => theme.color.secondary}; /* 스크롤바의 색상 */

  border-radius: 10px;
}
*::-webkit-scrollbar-track {
  background: ${({ theme }) => theme.color.primary}; /*스크롤바 뒷 배경 색상*/
}
`;
