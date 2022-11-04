import React, { useContext, useState } from "react";
import styled from "styled-components";
import { HiOutlineDocument } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";
import Accordion from "../components/Accordion.js";
import Content from "../components/Content.js";
import Appcontext from "../context/Appcontext.js";

function Main() {
  const [selected, setSelected] = useState(null);
  const { selectedPost, postData, openPost } = useContext(Appcontext);
  const listArr = [
    {
      icon: <HiOutlineDocument size={32} />,
      path: "EXPLORER",
      contents: (
        <>
          <Accordion title="OPEN POSTS" isBold={true}>
            내용~
          </Accordion>
          <Accordion title="VSCODE" isBold={true}>
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
      <RightContent>
        {JSON.stringify(openPost)}
        {selectedPost}
      </RightContent>
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
  background-color: #333333;
`;
const IconWarp = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
  border-left: ${({ selected }) => (selected ? 2 : 0)}px solid white;
  svg {
    color: ${({ selected }) => (selected ? "white" : "#a7a7a7")};
  }
`;
const LeftContent = styled.div`
  height: 100%;
  width: 320px;
  background-color: #252526;
  padding: 10px;
  > p {
    padding-bottom: 10px;
    color: #a7a7a7;
  }
`;

const RightContent = styled.div`
  width: 100%;
  background-color: #1e1e1e;
`;
