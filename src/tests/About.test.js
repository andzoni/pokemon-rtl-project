import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import About from '../components/About'; 

describe('Testing Component About:', () => { 
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => { 
    render(<About />); 

    const aboutText = screen.getByRole('heading', { 
      name: /About Pokédex/i, 
      level: 2, 
    });
    expect(aboutText).toBeInTheDocument(); 
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => { 
    render(<About />); 
    const text1 = (
      'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons'
    ); 

    const aboutText1 = screen.getByText(text1); 
    expect(aboutText1).toBeInTheDocument(); 

    const aboutText2 = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    ); 
    expect(aboutText2).toBeInTheDocument();
  }); 

  test('Teste se a página contém a imagem de uma Pokédex.', () => { 
    render(<About />); 

    const aboutImg = screen.getByRole('img'); 
    expect(aboutImg).toBeInTheDocument(); 
    expect(aboutImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png');
    expect(aboutImg).toHaveAttribute('alt', 'Pokédex'); 
  });
});
