import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const StyledHeader = styled.header`
  display: flex;
  align-items: center;
  width: 100%;
  height: 80px;
  background-color: #000;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
`;

const StyledParagraph = styled.p`
  color: #FFF;
  margin: 0;
  padding: 23px 50px;
  font-family: 'Passion One', sans-serif;
  font-size: 30px;
  transition: 0.4s;
  cursor: pointer;

  &:hover {
    background-color: #353535;
  }
`;

const StyledResponsiveHeader = styled.div`
  @media screen and (max-width: 810px) {
    ${StyledHeader} {
      flex-direction: column;
      height: auto;
    }

    ${StyledLink} {
      width: 100%;
      text-align: center;
      padding: 10px 0;
      border-bottom: 1px solid #999;
    }

    ${StyledParagraph} {
      padding: 15px 0;
    }
  }
`;

const Header = () => {
  return (
      <StyledResponsiveHeader>
        <StyledHeader>
            <StyledLink to="/">
              <StyledParagraph>Início</StyledParagraph>
            </StyledLink>
            <StyledLink to="/perfil">
              <StyledParagraph>Perfil</StyledParagraph>
            </StyledLink>
            <StyledLink to="/sobre">
              <StyledParagraph>Sobre</StyledParagraph>
            </StyledLink>
        </StyledHeader>
      </StyledResponsiveHeader>
  );
};

export default Header;
