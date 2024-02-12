import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Main from '../components/Main';
import useCalendar from '../hooks/useCalendar';

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
  font-size: 33px;
  text-align: center;
  margin-bottom: 28px;
`;

const ModalOverlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 9999;
  outline: none;
`;

const ModalContent = styled.div`
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  text-align: center;
  max-width: 80%;
  max-height: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const CatImageModal = styled.img`
  max-width: 100%;
  max-height: 50vh;
  border-radius: 10px;
  object-fit: contain;
  margin-bottom: 28px;
`;

const ModalText = styled.div`
  font-family: 'Passion One', sans-serif;
  font-size: 40px;
  margin: 0;
`;

const StyledCalendar = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(90px, 1fr));
  gap: 6px;
  width: calc(100% - 24px);
  margin-bottom: 42px;
  padding: 0 12px;
  font-family: 'Passion One', sans-serif;
`;

const StyledCalendarItem = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 15px;
  background-color: #D9D9D9;
  padding: 6px;
  box-sizing: border-box;
  height: 90px;
  width: 90px;
`;

const StyledDayNumber = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  margin: 6px;
  background-color: #fff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #000;
  text-decoration: none;
  cursor: default;
`;

const StyledCatImage = styled.img`
  height: 90px;
  width: 90px;
  border-radius: 15px;
  background-color: #D9D9D9;
  padding: 6px;
  box-sizing: border-box;
  cursor: pointer;
`;

const StyledResponsivePerfil = styled.div`
  @media screen and (max-width: 810px) {
    ${CatImageModal} {
      max-height: 60vh;
      margin-bottom: 10px;
    }

    ${ModalText} {
      font-size: 20px;
    }
  }

  @media screen and (max-width: 1200px) {
    ${CatImageModal} {
      max-height: 50vh;
      margin-bottom: 10px;
    }

    ${ModalText} {
      font-size: 16px;
    }
  }
`;

const Perfil = () => {
  const { calendarData, loading, LoadingScreen, Loader } = useCalendar();
  const [showModal, setShowModal] = useState(false);
  const [modalImageUrl, setModalImageUrl] = useState('');
  const [modalDay, setModalDay] = useState('');

  useEffect(() => {
    document.title = 'Perfil - Que gato você é hoje?';
  }, []);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === 'Escape') {
        handleCloseModal();
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [showModal]);

  const handleCatClick = (imageUrl, day) => {
    setModalImageUrl(imageUrl);
    setModalDay(day);
    setShowModal(true);
  };

  const handleCloseModal = () => {
    setShowModal(false);
  };

  return (
    <StyledResponsivePerfil>
      <Main>
        <StyledContainer>
          <StyledH1>PERFIL</StyledH1>
          <StyledP>Veja seu histórico felino!</StyledP>
          <StyledP>
            &lt;&lt; Fevereiro &gt;&gt;
          </StyledP>

          {loading ? (
            <LoadingScreen>
              <Loader />
            </LoadingScreen>
          ) : (
            <StyledCalendar>
              {calendarData.map((dayData, index) => (
                <StyledCalendarItem key={index}>
                  <StyledDayNumber>{dayData.formattedDay}</StyledDayNumber>
                  {dayData.imageUrl && (
                    <StyledCatImage
                      src={dayData.imageUrl}
                      alt={`Gato do dia ${dayData.formattedDay}`}
                      onClick={() => handleCatClick(dayData.imageUrl, dayData.formattedDay)}
                    />
                  )}
                </StyledCalendarItem>
              ))}
            </StyledCalendar>
          )}
          {showModal && (
            <ModalOverlay onClick={handleCloseModal}>
              <ModalContent>
                <CatImageModal src={modalImageUrl} />
                <ModalText>Gato do dia {modalDay} de fevereiro de 2024</ModalText>
              </ModalContent>
            </ModalOverlay>
          )}
        </StyledContainer>
      </Main>
    </StyledResponsivePerfil>
  );
};

export default Perfil;
