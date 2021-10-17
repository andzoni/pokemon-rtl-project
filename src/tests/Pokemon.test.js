import React from 'react'; // Importa React da biblioteca.
import userEvent from '@testing-library/user-event'; // Importa userEvent da biblioteca de testes.
import { screen } from '@testing-library/react'; // Importa screen da biblioteca de testes.
import renderWithRouter from './rederWithRouter'; // Importa a funcao renderWithRouter do arquivo rederWithRouter.
import App from '../App'; // Importa o component App.
import pokemons from '../data'; // Importa o Array de Objetos "pokemons" de data.

describe('Testing Component Pokemon:', () => { // Describe englobando os tests, com descricao e uma callback para estruturar e realizar todos os tests.
  const {
    id,
    name,
    type,
    averageWeight: {
      value,
      measurementUnit,
    },
    image,
  } = pokemons[0]; // Constante desconstruido as keys dentro do objeto(de index=0) dentro do array de objetos "pokemons"(importado de data.js) - solucao NAO dinamica -

  test('Teste se é renderizado um card com as informações do pokémon.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    renderWithRouter(<App />); // Renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history, para o history ser resgistrado e utilizado ao seguir qualquer rotas.

    // - O nome correto do Pokémon deve ser mostrado na tela;
    expect(screen.getByTestId('pokemon-name')).toHaveTextContent(name); // Testa se o elemento puxado com TestId com o valor da string tem o mesmo valor da key "name" desconstruido na linha 11.

    // - O tipo correto do pokémon deve ser mostrado na tela.
    expect(screen.getByTestId('pokemon-type')).toHaveTextContent(type); // Testa se o elemento puxado com TestId com o valor da string tem o mesmo valor da key "type" desconstruido na linha 12.

    // - O peso médio do pokémon deve ser exibido com um texto no formato Average weight: <value> <measurementUnit>; onde <value> e <measurementUnit> são, respectivamente, o peso médio do pokémon e sua unidade de medida.
    expect(screen.getByTestId('pokemon-weight'))
      .toHaveTextContent(`Average weight: ${value} ${measurementUnit}`); // Testa se o elemento puxado com TestId com o valor da string tem o mesmo valor da string em template literals mencionada que contem dentro dela o valor das keys "name" e "measurementUnit" desconstruidos nas linhas 11 e 15.

    // - A imagem do Pokémon deve ser exibida. Ela deve conter um atributo src com a URL da imagem e um atributo alt com o texto <name> sprite, onde <name> é o nome do pokémon;
    expect(screen.getByAltText(`${name} sprite`)).toHaveAttribute('src', image); // Testa se o elemento puxado com o texto com valor da string em template literals tem o mesmo valor na propriedade "src" do mesmo.
  });

  test('Teste se o card do Pokémon contém um link de navegação para os detalhes.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    const { history } = renderWithRouter(<App />); // Cria constante que desconstroi "history" e renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history, para o history ser resgistrado e utilizado ao seguir qualquer rota.

    // - Chama o botao de detalhes e clica nele
    // - Teste também se a URL exibida no navegador muda para /pokemon/<id>, onde <id> é o id do Pokémon cujos detalhes se deseja ver;
    const pokeDetails = screen.getByRole('link', { // Cria uma constante para definir o elemento a ser testato "Link" que e representado pelo termo "link".
      name: /More details/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    expect(pokeDetails).toBeDefined(); // Testa se o elemento puxado na constante "pokeDetails" e "defined" na pagina renderizada.
    userEvent.click(pokeDetails); // Realiza um click na constante mencionada.
    expect(history.location.pathname).toBe(`/pokemons/${id}`); // Testa se a key "pathname" dentro de "location" dentro de "history"(que ta desconstruido na linha 38) tem o valor da string(template literals) que contem a key "id" que foi desconstruida na linha 10.
  });

  test('Teste se existe um ícone de estrela nos Pokémons favoritados.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    renderWithRouter(<App />); // Renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history, para o history ser resgistrado e utilizado ao seguir qualquer rotas.

    // - Chama o botao de detalhes e clica nele
    // - O ícone deve ser uma imagem com o atributo src contendo o caminho /star-icon.svg
    // - A imagem deve ter o atributo alt igual a <pokemon> is marked as favorite, onde <pokemon> é o nome do Pokémon exibido.
    const pokeDetails = screen.getByRole('link', { // Cria uma constante para definir o elemento a ser testato "Link" que e representado pelo termo "link".
      name: /More details/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    userEvent.click(pokeDetails); // Realiza um click na constante mencionada.

    const favCheckBox = screen.getByRole('checkbox', { // Cria uma constante para definir o elemento a ser testato "input" que e representado pelo termo "checkbox".
      name: 'Pokémon favoritado?', // Key "name" que define o texto(string) dentro do elemento.
    });
    userEvent.click(favCheckBox); // Realiza um click na constante mencionada.

    const starIcon = screen.getByRole('img', { // Cria uma constante para definir o elemento a ser testato "img" que e representado pelo termo "img".
      name: `${name} is marked as favorite`, // Key "name" que define o texto(string) em template literals, dentro do elemento.
    });
    expect(starIcon).toHaveAttribute('src', '/star-icon.svg'); // Testa se a constante "starIcon" tem o elemento com o atributo(propriedade) "src" com valor mencionado pela string.
  });
});
