import React from 'react'; // Importa React da biblioteca.
import userEvent from '@testing-library/user-event'; // Importa userEvent da biblioteca de testes.
import { screen } from '@testing-library/react'; // Importa screen da biblioteca de testes.
import renderWithRouter from './rederWithRouter'; // Importa a funcao renderWithRouter do arquivo rederWithRouter.
import App from '../App'; // Importa o component App.
import pokemons from '../data'; // Importa o Array de Objetos "pokemons" de data.

describe('Testing Component PokemonDetails:', () => { // Describe englobando os tests, com descricao e uma callback para estruturar e realizar todos os tests.
  beforeEach(() => {
    renderWithRouter(<App />);
  }); // Renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history, para o history ser resgistrado e utilizado ao seguir qualquer rotas. Dentro de um beforeEach para ser utlizado em todos os tests daqui pra frente.

  const {
    name,
    foundAt,
    summary,
  } = pokemons[0]; // Constante desconstruido as keys dentro do objeto(de index=0) dentro do array de objetos "pokemons"(importado de data.js) - solucao NAO dinamica -

  test('Teste se informações detalhadas do Pokémon são mostradas na tela.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    // - Chama o botao de detalhes e clica nele
    const pokeDetails = screen.getByRole('link', { // Cria uma constante para definir o elemento a ser testato "Link" que e representado pelo termo "link".
      name: /More details/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    userEvent.click(pokeDetails); // Realiza um click na constante mencionada.

    // - A página deve conter um texto <name> Details, onde <name> é o nome do Pokémon;
    expect(screen.getByText(`${name} Details`)).toBeInTheDocument(); // Testa se o elemento que contem o texto da string(em templete literals, que usa o a key name descontruido na linha 14) aparece no component renderizado.

    // - Não deve existir o link de navegação para os detalhes do Pokémon selecionado.
    expect(pokeDetails).not.toBeInTheDocument(); // Testa se o elemento puxado na constante "pokeDetails" NAO aparece no component renderizado.

    // - A seção de detalhes deve conter um heading h2 com o texto Summary.
    const summaryText = screen.getByRole('heading', { // Cria uma constante para definir o elemento a ser testado "h2" que e representado pelo termo "heading".
      name: /Summary/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
      level: 2, // Key "level" para definio o level do elemento "h2".
    });
    expect(summaryText).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.

    // - A seção de detalhes deve conter um parágrafo com o resumo do Pokémon específico sendo visualizado.
    expect(screen.getByText(summary)).toBeInTheDocument(); // Testa se o elemento que contem o texto igual ao texto da key "summary" descontruido na linha 16) aparece no component renderizado.
  });

  test('Teste se existe uma seção com os mapas contendo as localizações do Poke.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    // - Chama o botao de detalhes e clica nele
    const pokeDetails = screen.getByRole('link', { // Cria uma constante para definir o elemento a ser testato "Link" que e representado pelo termo "link".
      name: /More details/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    userEvent.click(pokeDetails); // Realiza um click na constante mencionada.

    // - Na seção de detalhes deverá existir um heading h2 com o texto Game Locations of <name>; onde <name> é o nome do Pokémon exibido.
    const locationText = screen.getByRole('heading', { // Cria uma constante para definir o elemento a ser testado "h2" que e representado pelo termo "heading".
      name: `Game Locations of ${name}`, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
      level: 2, // Key "level" para definio o level do elemento "h2".
    });
    expect(locationText).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.

    // - Todas as localizações do Pokémon devem ser mostradas na seção de detalhes;
    // - Devem ser exibidos, o nome da localização e uma imagem do mapa em cada localização;
    foundAt.forEach((item, index) => { // Utiliza a funcao forEach para percorrer o array de objetos "foundAt" (desconstruido na linha 15).
      const imgMap = screen.getAllByRole('img', { // Cria uma constante para definir o elemento a ser testato "img" que e representado pelo termo "img".
        name: `${name} location`, // Key "name" que define o texto(string) em template literals, dentro do elemento.
      });

      // - A imagem da localização deve ter um atributo src com a URL da localização;
      expect(imgMap[index]).toHaveAttribute('src', item.map); // Testa se a constante "imgMap" contem o atributo(propriedade) "src" com valor igual ao da key "map" dentro do objeto(parametro "item, com index igual ao paramentro "index" percorrido por forEach) dentro da constante foundAt(desconstruido na linha 15 e percorrido pelo forEach).

      // - A imagem da localização deve ter um atributo alt com o texto <name> location, onde <name> é o nome do Pokémon;
      expect(imgMap[index]).toHaveAttribute('alt', `${name} location`); // Testa se a constante "imgMap" contem o atributo(propriedade) "alt" com valor igual a string(em template literal que puxa o "name desconstruido na linha 14").
    });
  });

  test('Teste se o usuário pode fav um pokémon através da página de detalhes.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    // - Chama o botao de detalhes e clica nele
    const pokeDetails = screen.getByRole('link', { // Cria uma constante para definir o elemento a ser testato "Link" que e representado pelo termo "link".
      name: /More details/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    userEvent.click(pokeDetails); // Realiza um click na constante mencionada.

    // - A página deve exibir um checkbox que permite favoritar o Pokémon;
    // - Cliques alternados no checkbox devem adicionar e remover respectivamente o Pokémon da lista de favoritos;
    // - O label do checkbox deve conter o texto Pokémon favoritado?;
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
