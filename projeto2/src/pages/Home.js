import React from 'react';
import styled, { keyframes } from 'styled-components';
import useCatImage from '../hooks/useCatImage';
import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Main from '../components/Main';
import { useUser } from '../hooks/useUser';

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

const StyledCatContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 735px;
  height: 400px;
  background-color: #D9D9D9;
  border-radius: 15px;
  margin-bottom: 60px;
  font-size: 36px;
`;

const StyledImageText = styled.p`
  font-family: 'Passion One', sans-serif;
  font-size: 44px;
  padding: 26px;
`;

const StyledCatImage = styled.img`
  width: 685px;
  height: 350px;
  border-radius: 15px;
  text-align: center;
  line-height: 350px;
  font-family: 'Passion One', sans-serif;
  font-size: 28px;
`;

const StyledButton = styled.button`
  background-color: #000;
  padding: 25px;
  font-family: 'Passion One', sans-serif;
  font-size: 50px;
  color: #FFF;
  cursor: pointer;
  border-radius: 15px;
  width: 360px;
  height: 115px;
  transition: 0.4s;
  margin-bottom: 39px;

  &:hover {
    background-color: #353535;
  }

  &:disabled {
    background-color: #353535;
    cursor: not-allowed;
  }
`;

const StyledLink = styled(Link)`
  color: #696969;
  text-decoration: none;
  transition: 0.4s;

  &:hover {
    text-decoration: none;
    color: #969696;
  }
`;

const spin = keyframes`
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
`;

const StyledLoader = styled.div`
  border: 6px solid #FFF;
  border-top: 6px solid #000;
  border-radius: 50%;
  width: 50px;
  height: 50px;
  animation: ${spin} 2s linear infinite;
  margin: auto;
`;

const StyledResponsiveHome = styled.div`
  @media screen and (max-width: 810px) {
    ${StyledLink} {
      width: 100%;
      text-align: center;
      padding: 10px 0;
    }

    ${StyledCatContainer} {
      width: 90%;
      height: auto;
      max-width: 90%;
      margin-bottom: 30px;
      padding: 30px;
      font-size: 24px;
      border-radius: 10px;
    }

    ${StyledCatImage} {
      width: 100%;
      height: auto;
      border-radius: 10px;
      font-size: 12px;
    }

    ${StyledButton} {
      width: 80%;
      height: auto;
      font-size: 24px;
      padding: 15px;
      margin-bottom: 20px;
    }
  }
`;

const Home = () => {
  const { user } = useUser();
  const [catImage, generateCat, loading, checkTodaysCat] = useCatImage();
  const [showInitialText, setShowInitialText] = useState(true);
  const [isCatGeneratedForToday, setIsCatGeneratedForToday] = useState(false);

  useEffect(() => {
    document.title = 'Home - Que gato você é hoje?';

    if (checkTodaysCat()) {
      setIsCatGeneratedForToday(true);
    }
  }, [checkTodaysCat]);

  const handleDescobrirClick = async () => {
    setShowInitialText(false);

    if (!isCatGeneratedForToday) {
      await generateCat();
      setIsCatGeneratedForToday(true);
    }
  };

  return (
    <StyledResponsiveHome>
      <Main>
        <StyledContainer>
          <StyledH1>QUE GATO VOCÊ É HOJE?</StyledH1>
          {user ? (
            <StyledCatContainer>
              {showInitialText && !isCatGeneratedForToday && !loading && (
                <StyledImageText>
                  Clique no botão abaixo para descobrir o seu gato de hoje!
                </StyledImageText>
              )}
              {loading && <StyledLoader />}
              {catImage && !loading && (
                <StyledCatImage src={catImage} />
              )}
              {!loading && isCatGeneratedForToday && !catImage && (
                <StyledImageText>
                  O seu gato do dia de hoje já foi gerado! {'\n'}
                  Você pode ver todos os seus gatos gerados na página de {' '}
                  <StyledLink to="/perfil">Perfil</StyledLink>.
                </StyledImageText>
              )}
            </StyledCatContainer>
          ) : (
            <StyledCatContainer>
              <StyledImageText>
                Você precisa estar logado para gerar um gato!{' '}
                <StyledLink to="/login">Faça login</StyledLink> para continuar.
              </StyledImageText>
            </StyledCatContainer>
          )}

          <StyledButton
            onClick={handleDescobrirClick}
            disabled={!user || isCatGeneratedForToday}
          >
            DESCOBRIR
          </StyledButton>
        </StyledContainer>
      </Main>
    </StyledResponsiveHome>
  );
};

export default Home;
