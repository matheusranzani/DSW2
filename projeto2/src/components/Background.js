import React from 'react';
import styled from 'styled-components';

const StyledBackground = styled.div`
  background-image: url('background.png');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: cover;
  margin: 0;
  padding: 0;
  min-height: calc(100vh - 80px);
`;

const Background = ({ children }) => {
  return <StyledBackground>{children}</StyledBackground>;
}

export default Background;
