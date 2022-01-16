import React from 'react'; 
import { render, screen } from '@testing-library/react'; 
import { BrowserRouter } from 'react-router-dom'; 
import userEvent from '@testing-library/user-event'; 
import App from '../App'; 
import renderWithRouter from './rederWithRouter'; 

describe('Testing Component App:', () => { 
  test('Teste se é redirecionado para a página inicial.', () => { 
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    ); 

    

    const homeLink = screen.getByRole('link', { 
      name: /home/i, 
    });
    userEvent.click(homeLink); 
  });

  test('Teste se é redirecionado para a página de About.', () => { 
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    ); 

    const aboutLink = screen.getByRole('link', { 
      name: /about/i, 
    });
    userEvent.click(aboutLink); 
  });

  test('Teste se é redirecionado para a página de Pokémons Favoritados.', () => { 
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>,
    ); 

    const favPokeLink = screen.getByRole('link', { 
      name: /Favorite pokémons/i, 
    });
    userEvent.click(favPokeLink); 
  });

  test('Teste se é redirecionado para a página Not Found.', () => { 
    const { history } = renderWithRouter(<App />); 

    history.push('/rota-que-nao-existe'); 
  });
});
