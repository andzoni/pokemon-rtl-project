import React from 'react'; // Importa React da biblioteca.
import { render, screen } from '@testing-library/react'; // Importa render e screen da biblioteca de testes.
import NotFound from '../components/NotFound'; // Importa o component NotFound.

describe('Testing Component NotFound:', () => { // Describe englobando os tests, com descricao e uma callback para estruturar e realizar todos os tests.
  test('Teste se página contém um texto Page requested not found Crying emoji', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(<NotFound />); // Renderiza o component NotFound para realizacao do test.

    const aboutText = screen.getByRole('heading', { // Cria uma constante para definir o elemento a ser testado "h2" que e representado pelo termo "heading".
      name: /Page requested not found Crying emoji/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
      level: 2, // Key "level" para definio o level do elemento "h2".
    });
    expect(aboutText).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.
  });

  test('Teste se a página contém a imagem do Pikachu chorando.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(<NotFound />); // Renderiza o component NotFound para realizacao do test

    const aboutImg = screen
      .getByAltText(/Pikachu crying because the page requested was not found/i); // Cria uma constante para definir o elemento a ser testado basedado no texto de sua propriedade "Alt". (o texto e a string entre parenteses e o "i" e para nao ser case sensitive)
    expect(aboutImg).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.
    expect(aboutImg).toHaveAttribute('src', 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif'); // Testa se o elemento tem um atributo(propriedade) "src" com o texto da string.
  });
});
