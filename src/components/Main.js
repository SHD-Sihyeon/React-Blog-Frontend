import React, { useState } from "react";
import styled from "styled-components";
import { HiOutlineDocument } from "react-icons/hi";
import { AiOutlineSearch } from "react-icons/ai";

const listArr = [
  {
    icon: <HiOutlineDocument size={32} />,
    path: "post",
  },
  {
    icon: <AiOutlineSearch size={32} />,
    path: "search",
  },
];

function Main() {
  const [selected, setSelected] = useState(0);
  return (
    <Warp>
      <LeftBar>
        {listArr.map((one, index) => (
          <IconWarp
            selected={selected === index}
            onClick={() => setSelected(index)}
          >
            {one.icon}
          </IconWarp>
        ))}
      </LeftBar>
    </Warp>
  );
}

export default Main;

const Warp = styled.div`
  height: 100vh;
  background-color: aqua;
`;
const LeftBar = styled.div`
  height: 100%;
  width: 50px;
  background-color: #333333;
`;
const IconWarp = styled.div`
  display: flex;
  justify-content: center;
  padding: 10px 0;
  cursor: pointer;
  svg {
    color: ${({ selected }) => (selected ? "white" : "a7a7a7")};
  }
`;
