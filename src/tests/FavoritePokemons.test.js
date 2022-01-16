import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import FavoritePokemons from '../components/FavoritePokemons'; 

describe('Testing Component FavoritePokemons:', () => { 
  test('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => { 
    render(<FavoritePokemons />); 

    expect(
      screen.getByText('No favorite pokemon found'),
    ).toBeDefined(); 
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => { 
    render(<FavoritePokemons />); 
  });
});
