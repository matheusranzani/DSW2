import React, { useEffect } from 'react';

const Perfil = () => {
  useEffect(() => {
    document.title = 'Perfil - Que gato você é hoje?';
  }, []);

  return(
    <p>Perfil</p>
  )
};

export default Perfil;
