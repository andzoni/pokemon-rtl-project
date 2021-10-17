import React from 'react'; // Importa React da biblioteca.
import { render, screen } from '@testing-library/react'; // Importa render e screen da biblioteca de testes.
import { BrowserRouter } from 'react-router-dom'; // Importa BrowserRouter de react-router-dom.
import userEvent from '@testing-library/user-event'; // Importa userEvent da biblioteca de testes.
import App from '../App'; // Importa o component App.
import renderWithRouter from './rederWithRouter'; // Importa a funcao renderWithRouter do arquivo rederWithRouter.

describe('Testing Component App:', () => { // Describe englobando os tests, com descricao e uma callback para estruturar e realizar todos os tests.
  test('Teste se é redirecionado para a página inicial.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    ); // Renderiza o component App dentro de BrowserRouter para conseguir percorrer as rotas para realizacao do test.

    // - O primeiro link deve possuir o texto Home.

    const homeLink = screen.getByRole('link', { // Cria uma constante para definir o elemento a ser testato "Link" que e representado pelo termo "link".
      name: /home/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    userEvent.click(homeLink); // Realiza um click na constante mencionada.
  });

  test('Teste se é redirecionado para a página de About.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    ); // Renderiza o component App dentro de BrowserRouter para conseguir percorrer as rotas para realizacao do test.

    const aboutLink = screen.getByRole('link', { // Cria uma constante para definir o elemento a ser testato "Link" que e representado pelo termo "link".
      name: /about/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    userEvent.click(aboutLink); // Realiza um click na constante mencionada.
  });

  test('Teste se é redirecionado para a página de Pokémons Favoritados.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    ); // Renderiza o component App dentro de BrowserRouter para conseguir percorrer as rotas para realizacao do test

    const favPokeLink = screen.getByRole('link', { // Cria uma constante para definir o elemento a ser testato "Link" que e representado pelo termo "link".
      name: /Favorite pokémons/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    userEvent.click(favPokeLink); // Realiza um click na constante mencionada.
  });

  test('Teste se é redirecionado para a página Not Found.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    const { history } = renderWithRouter(<App />); // Renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history. (Verificar arquivo da funcao)

    history.push('/rota-que-nao-existe'); // Realiza um Push para adicionar a rota mencionada dentro do history da pagina, remetendo a mesma para uma rota nao existende.
  });
});
