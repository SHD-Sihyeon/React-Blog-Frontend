import React, { useState } from "react";
import styled from "styled-components";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";

function Accordion({ title, children, isBold }) {
  const [expanded, setExpanded] = useState(false);
  return (
    <>
      <AccordionWarp
        onClick={() => {
          setExpanded(!expanded);
        }}
      >
        {expanded ? <VscChevronDown /> : <VscChevronRight />}
        <span>{isBold ? <strong>{title}</strong> : title}</span>
      </AccordionWarp>
      {expanded && <AccordionContentWarp>{children}</AccordionContentWarp>}
    </>
  );
}

export default Accordion;

const AccordionWarp = styled.div`
  color: white;
  align-items: center;
  display: flex;
  font-size: 0.8rem;
  padding: 5px 0;
  user-select: none;
  > span {
    padding-left: 5px;
    user-select: none;
  }
`;
const AccordionContentWarp = styled.div`
  padding-bottom: 5px;
  padding-left: 15px;
  user-select: none;
`;
