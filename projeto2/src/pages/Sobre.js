import React, { useEffect } from 'react';
import styled from 'styled-components';
import Main from '../components/Main';

const StyledContainer = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  text-align: center;
  background-color: #FFF;
  width: 90%;
  max-width: 750px;
  margin: 0 auto;
  box-sizing: border-box;
  min-height: calc(100vh - 80px);
  position: relative;
`;

const StyledH1 = styled.h1`
  font-size: 50px;
  margin: 90px 0px 50px 0px;
`;

const StyledP = styled.p`
  font-family: 'Passion One', sans-serif;
  font-size: 34px;
  text-align: center;
  padding: 26px;
`;

const StyledLink = styled.a`
  color: #696969;
  text-decoration: none;
  transition: 0.4s;

  &:hover {
    text-decoration: none;
    color: #969696;
  }
`;

const Sobre = () => {
  useEffect(() => {
    document.title = 'Sobre - Que gato você é hoje?';
  }, [])

  return(
    <Main>
      <StyledContainer>
        <StyledH1>COMO FUNCIONA</StyledH1>
        <StyledP>
          Você gosta de gatos? Está se sentindo triste e apenas uma foto de gatinho pode te alegrar? Está muito feliz e uma foto de gatinho te deixaria mais feliz ainda? Acredita que o universo é tão aleatório que tudo deve estar conectado?
        </StyledP>
        <StyledP>
          Então venha descobrir que gato você é hoje!
        </StyledP>
        <StyledP>
          Clique no botão descobrir da página inicial e receba uma foto aleatória de um gatinho que pode ou não representar o que te espera no dia que está por vir.
        </StyledP>
        <StyledP>
          Para gerar as imagens de gato, utilizamos a API pública <StyledLink href="https://thecatapi.com/" target="_blank">The Cat API</StyledLink>.
        </StyledP>
      </StyledContainer>
    </Main>
  )
};

export default Sobre;
