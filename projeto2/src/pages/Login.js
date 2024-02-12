import React, { useState } from 'react';
import styled from 'styled-components';
import Main from '../components/Main';
import api from '../service/api';
import { Link } from 'react-router-dom';
import { useUser } from '../hooks/useUser';
import { useNavigate } from "react-router-dom";

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

const StyledForm = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const StyledInput = styled.input`
  font-size: 16px;
  color: #6A6B6D;
  font-weight: bold;
  border: 1px solid #000;
  border-radius: 8px;
  width: 350px;
  height: 56px;
  margin-bottom: 46px;
  padding: 12px;
`;

const StyledButton = styled.button`
  background-color: #000;
  padding: 16px;
  font-family: 'Passion One', sans-serif;
  font-size: 22px;
  color: #FFF;
  cursor: pointer;
  border-radius: 15px;
  width: 166px;
  height: 56px;
  transition: 0.4s;

  &:hover {
    background-color: #353535;
  }

  &:disabled {
    background-color: #353535;
    cursor: not-allowed;
  }
`;

const Login = () => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });
  }

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await api.post('/auth/login', formData);

      console.log('Dados enviados com sucesso: ', response.data);

      setUser(response.data);
      navigate('/');
    } catch (error) {
      console.error('Erro ao logar: ', error);
    }
  }

  return (
    <Main>
      <StyledContainer>
        <StyledH1>LOGIN</StyledH1>
        <StyledP>Bem-vindo!</StyledP>
        <StyledForm onSubmit={handleSubmit}>
          <StyledInput type='email' name='email' value={formData.email} onChange={handleChange} placeholder='E-mail'></StyledInput>
          <StyledInput type='password' name='password' value={formData.password} onChange={handleChange} placeholder='Senha'></StyledInput>
          <StyledButton type='submit'>ENTRAR</StyledButton>
        </StyledForm>

        <StyledP style={{marginTop: '56px'}}>Ainda não possui cadastro?</StyledP>
        <Link to='/cadastro'>
          <StyledButton>CRIAR CONTA</StyledButton>
        </Link>
      </StyledContainer>
    </Main>
  );
}

export default Login;
