import React from 'react';
import styled from 'styled-components';

const StyledMain = styled.div`
  display: flex;
  width: 100%;
  justify-content: center;
  font-family: 'Luckiest Guy', sans-serif;
`;

const Main = ({ children }) => {
  return <StyledMain>{children}</StyledMain>;
};

export default Main;
