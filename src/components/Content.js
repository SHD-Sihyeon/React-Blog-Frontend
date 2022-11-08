import { useContext } from "react";
import styled from "styled-components";
import Appcontext from "../context/Appcontext";
import Accordion from "./Accordion";

function Content({ type, title, children, path }) {
  const { selectedPost, setSelectedPost, openPost, setOpenPost } =
    useContext(Appcontext);
  function selectedFunction() {
    setSelectedPost(path);
    if (!openPost.includes(path)) {
      setOpenPost([...openPost, path]);
    }
  }
  return type === "directory" ? (
    <Accordion title={`📂${title}`}>
      {children?.map((one, index) => (
        <Content {...one} key={index} />
      ))}
    </Accordion>
  ) : (
    <Poatwrap
      onClick={selectedFunction}
      className={selectedPost === path ? "selected" : ""}
    >
      &nbsp;&nbsp;&nbsp;&nbsp;📝{title}
    </Poatwrap>
  );
}
export default Content;

const Poatwrap = styled.div`
  padding: 5px 0;
  cursor: pointer;
  &:not(.selected):hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  &.selected {
    background-color: ${({ theme }) => theme.color.selected};
  }
`;
