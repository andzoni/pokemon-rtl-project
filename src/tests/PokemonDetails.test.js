import React from 'react'; 
import userEvent from '@testing-library/user-event'; 
import { screen } from '@testing-library/react'; 
import renderWithRouter from './rederWithRouter'; 
import App from '../App'; 
import pokemons from '../data'; 

describe('Testing Component PokemonDetails:', () => { 
  beforeEach(() => {
    renderWithRouter(<App />);
  }); 

  const {
    name,
    foundAt,
    summary,
  } = pokemons[0]; 

  test('Teste se informações detalhadas do Pokémon são mostradas na tela.', () => { 
    
    const pokeDetails = screen.getByRole('link', { 
      name: /More details/i, 
    });
    userEvent.click(pokeDetails); 

    
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument(); 

    
    expect(pokeDetails).not.toBeInTheDocument(); 

    
    const summaryText = screen.getByRole('heading', { 
      name: /Summary/i, 
      level: 2, 
    });
    expect(summaryText).toBeInTheDocument(); 

    
    expect(screen.getByText(summary)).toBeInTheDocument(); 
  });

  test('Teste se existe uma seção com os mapas contendo as localizações do Poke.', () => { 
    
    const pokeDetails = screen.getByRole('link', { 
      name: /More details/i, 
    });
    userEvent.click(pokeDetails); 

    
    const locationText = screen.getByRole('heading', { 
      name: `Game Locations of ${name}`, 
      level: 2, 
    });
    expect(locationText).toBeInTheDocument(); 

    
    
    foundAt.forEach((item, index) => { 
      const imgMap = screen.getAllByRole('img', { 
        name: `${name} location`, 
      });

      
      expect(imgMap[index]).toHaveAttribute('src', item.map); 

      
      expect(imgMap[index]).toHaveAttribute('alt', `${name} location`); 
    });
  });

  test('Teste se o usuário pode fav um pokémon através da página de detalhes.', () => { 
    
    const pokeDetails = screen.getByRole('link', { 
      name: /More details/i, 
    });
    userEvent.click(pokeDetails); 

    
    
    
    const favCheckBox = screen.getByRole('checkbox', { 
      name: 'Pokémon favoritado?', 
    });
    userEvent.click(favCheckBox); 

    const starIcon = screen.getByRole('img', { 
      name: `${name} is marked as favorite`, 
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg'); 
  });
});
