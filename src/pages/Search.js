import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import Accordion from "../components/Accordion";
import AppContext from "../context/Appcontext";

function Search() {
  const { postData } = useContext(AppContext);
  const [tagData, setTagData] = useState([
    {
      tagTitle: "Tech",
      count: 3,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 1,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 1,
      postArr: [],
    },
    {
      tagTitle: "일상",
      count: 1,
      postArr: [],
    },
  ]);
  useEffect(() => {
    const tempArr = [];
    searcTagFnc(postData);
    function searcTagFnc(nowPostData) {
      nowPostData.map((nowPostData) => {
        if (nowPostData.type === "post") {
          nowPostData.data.tag?.map((tag) => {
            const tempTarget = tempArr.find((temp) => tag === temp.tagTitle);
            if (tempTarget) {
              tempTarget.count += 1;
            } else {
              tempArr.push({
                tagTitle: tag,
                count: 3,
                postArr: [],
              });
            }
          });
        } else {
          nowPostData.chilren && searcTagFnc(nowPostData.chilren);
        }
      });
    }
    setTagData(tempArr);
  }, []);
  return (
    <Accordion title="Tags" initialExpanded isBold>
      <TagWrap>
        {tagData.map((one, index) => (
          <Tag key={index}>
            {one.tagTitle} <span>{one.count}</span>
          </Tag>
        ))}
      </TagWrap>
    </Accordion>
  );
}

export default Search;

const TagWrap = styled.div`
  display: flex;
  flex-wrap: wrap;
`;
const Tag = styled.div`
  padding: 10px;
  margin: 5px;
  border-radius: 10px;
  background-color: ${({ theme }) => theme.color.third};
  cursor: pointer;
  &:hover {
    background-color: ${({ theme }) => theme.color.hover};
  }
  > span {
    color: #ce3354;
  }
`;
