import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import NotFound from '../components/NotFound'; 

describe('Testing Component NotFound:', () => { 
  test('Teste se página contém um texto Page requested not found Crying emoji', () => { 
    render(<NotFound />); 

    const aboutText = screen.getByRole('heading', { 
      name: /Page requested not found Crying emoji/i, 
      level: 2, 
    });
    expect(aboutText).toBeInTheDocument(); 
  });

  test('Teste se a página contém a imagem do Pikachu chorando.', () => { 
    render(<NotFound />); 

    const aboutImg = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i); 
    expect(aboutImg).toBeInTheDocument(); 
    expect(aboutImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif');
  });
});
