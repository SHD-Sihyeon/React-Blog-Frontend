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
  const {
    setOpenPost,
    setSelectedPost,
    selectedPost,
    postData,
    openPost,
    theme,
    setTheme,
  } = useContext(Appcontext);
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
        <div>
          {listArr.map((one, index) => (
            <IconWarp
              selected={selected === index}
              onClick={() => setSelected(selected === index ? null : index)}
              key={index}
            >
              {one.icon}
            </IconWarp>
          ))}
        </div>
        <div>
          <div
            className={theme}
            onClick={() => {
              setTheme(theme === "dark" ? "light" : "dark");
            }}
          ></div>
        </div>
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
        <RightContent selected={selected}>
          {(() => {
            const data = getPostOne(postData, selectedPost);
            return (
              data && (
                <>
                  <p>{data?.path}</p>
                  <div>
                    <h1>{data?.title}</h1>
                    <p>Sihyeon | {data?.data?.date}</p>
                    <div>
                      {data?.data?.tag.map((one, index) => (
                        <span key={index}>{one}</span>
                      ))}
                    </div>
                    <div>{data?.data?.content}</div>
                  </div>
                </>
              )
            );
          })()}
        </RightContent>
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
  display: flex;
  justify-content: space-between;
  flex-direction: column;
  > div:last-child {
    padding-bottom: 30px;
    display: flex;
    align-items: center;
    flex-direction: column;
    > div {
      height: 42px;
      width: 24px;
      //border: 1px solid ${({ theme }) => theme.color.text};
      background: ${({ theme }) => theme.color.primary};
      border-radius: 50px;
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 2px;
        left: 2px;
        width: 20px;
        height: 20px;
        border-radius: 20px;
        background-color: ${({ theme }) => theme.color.text};
        transition: 0.3s;
      }
      &.light::after {
        top: 20px;
      }
    }
  }
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
  padding: 10px 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  > p {
    width: 100%;
    color: #a7a7a7;
  }
  > div {
    width: 100%;
    max-width: 600px;
    > h1 {
      padding: 20px 0 20px;
    }
    > p {
      padding-bottom: 10px;
      color: #a7a7a7;
    }
    > div:nth-child(3) {
      padding: 10px 0 20px 0;
      > span {
        padding: 5px 10px;
        margin-right: 10px;
        border-radius: 10px;
        background-color: ${({ theme }) => theme.color.third};
      }
    }
  }
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
