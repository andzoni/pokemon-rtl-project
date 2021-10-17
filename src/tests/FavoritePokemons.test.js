import React from 'react'; // Importa React da biblioteca.
import { render, screen } from '@testing-library/react'; // Importa render e screen da biblioteca de testes.
import FavoritePokemons from '../components/FavoritePokemons'; // Importa o component FavoritePokemons.

describe('Testing Component FavoritePokemons:', () => { // Describe englobando os tests, com descricao e uma callback para estruturar e realizar todos os tests.
  test('Teste se é exibido na tela a mensagem No favorite pokemon found.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(<FavoritePokemons />); // Renderiza o component FavoritePokemons para realizacao do test.

    expect(
      screen.getByText('No favorite pokemon found'),
    ).toBeDefined(); // Testa se o elemento puxado pelo texto da string e "defined" na pagina renderizada.
  });

  test('Teste se é exibido todos os cards de pokémons favoritados.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(<FavoritePokemons />); // Renderiza o component FavoritePokemons.
  });
});
