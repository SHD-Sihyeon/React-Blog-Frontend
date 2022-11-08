import React, { useContext, useState } from "react";
import styled from "styled-components";
import { HiOutlineDocument } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import Accordion from "../components/Accordion.js";
import Content from "../components/Content.js";
import Appcontext from "../context/Appcontext.js";
import { getPostOne } from "../common/common.function.js";
import PostWrap from "../components/PostWrap.js";

function Main() {
  const [selected, setSelected] = useState(null);
  const { setOpenPost, setSelectedPost, selectedPost, postData, openPost } =
    useContext(Appcontext);
  const listArr = [
    {
      icon: <HiOutlineDocument size={32} />,
      path: "EXPLORER",
      contents: (
        <>
          <Accordion title="OPEN POSTS" isBold={true} initialExpanded={true}>
            {openPost.map((one, index) => {
              const data = getPostOne(postData, one);
              return (
                <PostWrap
                  path={data.path}
                  title={data.title}
                  isClose={true}
                  key={index}
                />
              );
            })}
          </Accordion>
          <Accordion title="VSCODE" isBold={true} initialExpanded={true}>
            {postData.map((one, index) => (
              <Content {...one} key={index} />
            ))}
          </Accordion>
        </>
      ),
    },
    {
      icon: <AiOutlineSearch size={32} />,
      path: "search",
    },
  ];
  return (
    <Warp>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWarp
            selected={selected === index}
            onClick={() => setSelected(selected === index ? null : index)}
            key={index}
          >
            {one.icon}
          </IconWarp>
        ))}
      </LeftBar>
      {selected !== null && listArr[selected] && (
        <LeftContent>
          <p>{listArr[selected].path}</p>
          {listArr[selected].contents}
        </LeftContent>
      )}
      <RightWrap selected={selected}>
        <RightHeader>
          {openPost.map((one, index) => {
            const data = getPostOne(postData, one);
            return (
              <div
                className={selectedPost === one ? "selected" : ""}
                onClick={() => {
                  setSelectedPost(data.path);
                }}
                key={index}
              >
                📝{data.title}
                <span
                  onClick={(e) => {
                    e.stopPropagation();
                    const openPostFilter = openPost.filter(
                      (one) => one !== data.path
                    );
                    setOpenPost(openPostFilter);
                    setSelectedPost(
                      openPostFilter.length !== 0 ? openPostFilter[0] : null
                    );
                  }}
                >
                  ×
                </span>
              </div>
            );
          })}
        </RightHeader>
        <RightContent>{selectedPost}</RightContent>
      </RightWrap>
    </Warp>
  );
}

export default Main;

const Warp = styled.div`
  display: flex;
  height: 100vh;
`;
const LeftBar = styled.div`
  height: 100%;
  width: 50px;
  min-width: 50px;
  background-color: ${({ theme }) => theme.color.third};
`;
const IconWarp = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
  border-left: ${({ selected, theme }) =>
    `${selected ? 2 : 0}px solid ${theme.color.text}`};
  svg {
    color: ${({ selected, theme }) =>
      selected ? theme.color.text : "#a7a7a7"};
  }
`;
const LeftContent = styled.div`
  height: 100%;
  width: 320px;
  min-width: 320px;
  background-color: ${({ theme }) => theme.color.secondary};
  padding: 10px;
  > p {
    padding-bottom: 10px;
    color: #a7a7a7;
  }
  @media (max-width: 540px) {
    width: 100%;
  }
`;
const RightContent = styled.div`
  width: 100%;
  height: calc(100% - 50px);
  background-color: ${({ theme }) => theme.color.primary};
`;
const RightHeader = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  overflow-x: scroll;
  background-color: ${({ theme }) => theme.color.secondary};
  ::-webkit-scrollbar-thumb {
    display: none;
  }
  &:hover::-webkit-scrollbar-thumb {
    display: block;
  }
  > div {
    width: 150px;
    min-width: 150px;
    padding: 10px;
    background-color: ${({ theme }) => theme.color.secondary};
    position: relative;
    cursor: pointer;
    &.selected {
      background-color: ${({ theme }) => theme.color.primary};
    }
    &:not(.selected) > span {
      display: none;
    }
    &:hover > span {
      display: block;
    }
    > span {
      position: absolute;
      right: 15px;
      top: 10px;
    }
  }
`;
const RightWrap = styled.div`
  width: ${({ selected }) =>
    selected === null ? "calc(100% - 50px)" : "calc(100% - 320px - 50px)"};
  @media (max-width: 540px) {
    display: ${({ selected }) => (selected === null ? "block" : "none")};
  }
`;
