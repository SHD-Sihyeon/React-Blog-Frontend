import React, { useState } from "react";
import styled from "styled-components";
import { VscChevronDown, VscChevronRight } from "react-icons/vsc";

function Accordion({ title, children, isBold, initialExpanded }) {
  const [expanded, setExpanded] = useState(initialExpanded || false);
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
      <AccordionContentWarp expanded={expanded}>
        {children}
      </AccordionContentWarp>
    </>
  );
}

export default Accordion;

const AccordionWarp = styled.div`
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
  max-height: ${({ expanded }) => (expanded ? "500px" : "0")};
  overflow: hidden;
  transition: ${({ expanded }) =>
    expanded ? "max-height 0.25s ease-in" : "max-height 0.15s ease-out"};
  margin-bottom: 5px;
  margin-left: 15px;
  user-select: none;
`;
