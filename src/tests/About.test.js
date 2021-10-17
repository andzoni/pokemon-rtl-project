import React from 'react'; // Importa React da biblioteca.
import { render, screen } from '@testing-library/react'; // Importa render e screen da biblioteca de testes.
import About from '../components/About'; // importa o component About.

describe('Testing Component About:', () => { // Describe englobando os tests, com descricao e uma callback para estruturar e realizar todos os tests.
  test('Teste se a página contém um heading h2 com o texto About Pokédex.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(<About />); // Renderiza o component About para realizacao do test.

    const aboutText = screen.getByRole('heading', { // Cria uma constante para definir o elemento a ser testado "h2" que e representado pelo termo "heading".
      name: /About Pokédex/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
      level: 2, // Key "level" para definio o level do elemento "h2".
    });
    expect(aboutText).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.
  });

  test('Teste se a página contém dois parágrafos com texto sobre a Pokédex.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(<About />); // Renderiza o component About para realizacao do test.
    const text1 = (
      'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons'
    ); // Cria uma constante com uma string com valor que queremos buscar no elemento p do component testado.

    const aboutText1 = screen.getByText(text1); // Cria uma constante para puxar o elemento que contem o texto definido na cosntante anterior.
    expect(aboutText1).toBeInTheDocument(); // Testa se o elemento puxado pelo texto informado na constante, esta ou nao renderizado na pagina.

    const aboutText2 = screen.getByText(
      /One can filter Pokémons by type, and see more details for each one of them/i,
    ); // Cria uma constante para puxar o elemento que contem o texto definido entre as barras. A letre "i" serve para o texto nao ser case sensitive.
    expect(aboutText2).toBeInTheDocument();
  }); /// Testa se o elemento puxado pelo texto informado na constante, esta ou nao renderizado na pagina.

  test('Teste se a página contém a imagem de uma Pokédex.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(<About />); // Renderiza o component About para realizacao do test.

    const aboutImg = screen.getByRole('img'); // Cria uma constante para definir o elemento a ser testato "img" que e representado pelo termo "img".
    expect(aboutImg).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.
    expect(aboutImg).toHaveAttribute('src', 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png'); // Testa se o elemento puxado pela constante contem a propriedade "src" com o valor passado.
    expect(aboutImg).toHaveAttribute('alt', 'Pokédex'); // Testa se o elemento puxado pela constante contem a propriedade "alt" com o valor passado.
  });
});
