import React, { useEffect } from 'react';

const Sobre = () => {
  useEffect(() => {
    document.title = 'Sobre - Que gato você é hoje?';
  }, [])

  return(
    <p>Sobre</p>
  )
};

export default Sobre;
