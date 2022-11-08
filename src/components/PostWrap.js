import React, { useContext } from "react";
import styled from "styled-components";
import Appcontext from "../context/Appcontext";

function PostWrap({ path, title, isClose }) {
  const { selectedPost, setSelectedPost, openPost, setOpenPost } =
    useContext(Appcontext);
  function selectedFunction() {
    setSelectedPost(path);
    if (!openPost.includes(path)) {
      setOpenPost([...openPost, path]);
    }
  }
  return (
    <PoatwrapStyled
      onClick={selectedFunction}
      className={selectedPost === path ? "selected" : ""}
    >
      <span
        className={isClose && selectedPost === path ? "visible" : ""}
        onClick={(e) => {
          e.stopPropagation();
          const openPostFilter = openPost.filter((one) => one !== path);
          setOpenPost(openPostFilter);
          setSelectedPost(
            openPostFilter.length !== 0 ? openPostFilter[0] : null
          );
        }}
      >
        &#215;
      </span>
      &nbsp;&nbsp;&nbsp;&nbsp;📝{title}
    </PoatwrapStyled>
  );
}

export default PostWrap;

const PoatwrapStyled = styled.div`
  padding: 5px 0;
  cursor: pointer;
  position: relative;
  &:not(.selected):hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  &.selected {
    background-color: ${({ theme }) => theme.color.selected};
  }
  &:hover > span {
    display: block;
  }
  > span {
    position: absolute;
    left: 5px;
    display: none;
    &.visible {
      display: block;
    }
  }
`;
