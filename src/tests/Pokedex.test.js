import React from 'react'; // Importa React da biblioteca.
import userEvent from '@testing-library/user-event'; // Importa userEvent da biblioteca de testes.
import { screen } from '@testing-library/react'; // Importa screen da biblioteca de testes.
import renderWithRouter from './rederWithRouter'; // Importa a funcao renderWithRouter do arquivo rederWithRouter.
import App from '../App'; // Importa o component App.
import pokemons from '../data'; // Importa o Array de Objetos "pokemons" de data.

describe('Testing Component Pokedex:', () => { // Describe englobando os tests, com descricao e uma callback para estruturar e realizar todos os tests.
  const pokename = 'pokemon-name'; // Cria constante com a string a ser utilizada no test. (como uso varias vezes, o lint pede para criar uma constante)

  test('Teste se página contém um heading h2 com o texto Encountered pokémons', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    renderWithRouter(<App />); // Renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history, para o history ser resgistrado e utilizado ao seguir qualquer rotas.

    const pokedexText = screen.getByRole('heading', { // Cria uma constante para definir o elemento a ser testado "h2" que e representado pelo termo "heading".
      name: /Encountered pokémons/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
      level: 2, // Key "level" para definio o level do elemento "h2".
    });
    expect(pokedexText).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.
  });

  test('Teste se é exibido o próximo Pokémon da lista quando o botão é clicado.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    renderWithRouter(<App />); // Renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history, para o history ser resgistrado e utilizado ao seguir qualquer rotas.

    // - O botão deve conter o texto Próximo pokémon;
    const pokeButtonNext = screen.getByRole('button', { // Cria uma constante para definir o elemento a ser testado/utilizado "button" que e representado pelo termo "button".
      name: /Próximo pokémon/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });

    expect(pokeButtonNext).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.

    // - Os próximos Pokémons da lista devem ser mostrados, um a um, ao clicar sucessivamente no botão;
    const pokeId = screen.getByTestId(pokename); // Cria constante que pega o elemento que contem uma Id de teste com o valor correspondente a constante "pokename(linha 9)".

    expect(pokeId).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.

    pokemons.map((pokemon, index) => { // Realiza um .map para vasculhar os objetos dentro do array "pokemons" (importado de data).
      expect(pokeId).toHaveTextContent(pokemon.name); // Testa se a constante "pokeId"(Linha 31) tem um texto com valor da key "name" do objeto mapeado.
      userEvent.click(pokeButtonNext); // Realiza um click na constante mencionada para mudar de pokemon na tela.
      return expect(pokeId).not.toHaveTextContent(pokemons[index].name); // Testa se a constante "pokeId"(linha 31) NAO tem um texto com valor da key "name" do objeto mapeado(utilizando o parametro index para o mapeamento).
    });

    // - O primeiro Pokémon da lista deve ser mostrado ao clicar no botão, se estiver no último Pokémon da lista;
    pokemons.forEach((pokemon, index) => { // Utiliza a funcao forEach para percorrer o array de objetos "pokemons" (importado de data).
      if (index < pokemons.length - 1) userEvent.click(pokeButtonNext); // Utiliza uma condicional "if", se o index do item percorrido no array for menor que o da ultima posicao do array, realiza um click na constante mencionada.
    }); // Logica criada para clicar no botao percorrendo por todos os pokemons e parando no ultimo.

    const lastPoke = pokemons[8].name; // Cria constante que pega o ultimo objeto do array pokemons (importado de data) -Solucao NAO dinamica-

    expect(pokeId).toHaveTextContent(lastPoke); // Testa se a constante pokeId tem o texto da constante lastPoke;

    const firstPoke = pokemons[0].name; // Cria constante que pega o primeiro objeto do array pokemons (importado de data) -Solucao NAO dinamica-
    userEvent.click(pokeButtonNext); // Realiza um click na constante mencionada, para voltar do ultimo para o primeiro pokemon, fechando o ciclo de cliques.

    expect(pokeId).toHaveTextContent(firstPoke); // Testa se a constante pokeId tem o texto da constante firstPoke;
  });

  test('Teste se é mostrado apenas um Pokémon por vez.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    renderWithRouter(<App />); // Renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history, para o history ser resgistrado e utilizado ao seguir qualquer rotas.

    const pokeAlone = screen.getAllByTestId(pokename); // Cria constante para pegar todos os elementos que contenham uma TestId de valor igual a contante "pokename(linha 9"

    expect(pokeAlone.length).toBe(1); // Testa se a constante "pokeAlone" tem somente um elemento dentro dela.
  });

  test('Teste se a Pokédex tem os botões de filtro.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    renderWithRouter(<App />); // Renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history, para o history ser resgistrado e utilizado ao seguir qualquer rotas.

    const types = [
      'Electric',
      'Fire',
      'Bug',
      'Poison',
      'Psychic',
      'Normal',
      'Dragon',
    ]; // Cria uma constante para emglobar todos os tipos dos pokemons presentes dentro de data.js - solucao NAO dinamica -

    // - Deve existir um botão de filtragem para cada tipo de Pokémon, sem repetição.
    const typeButton = screen.getAllByTestId('pokemon-type-button'); // Cria uma constante para pegar todos os elementos com TestId de valor mencionado na string.

    expect(typeButton.length).toBe(types.length); // Testa a quantidade de elementos dentro da constante "typeButton" e a mesma dentro do da constante "types".

    // - A partir da seleção de um botão de tipo, a Pokédex deve circular somente pelos pokémons daquele tipo;
    // - O texto do botão deve corresponder ao nome do tipo, ex. Psychic;
    typeButton.map((button, index) => { // Realiza um .map para vasculhar os objetos dentro do array da constante "typeButton" (linha 79).
      expect(button).toBeInTheDocument(); // Testa se os elementos vasculhados por .map se encontram no component renderizado.
      return expect(typeButton[index]).toHaveTextContent(types[index]); // Testa se os elementos vasculhados por .map contem o texto de valor igual as strings vasculhadas na constante types. Ambas baseadas no parametro "index".
    });

    // - O botão All precisa estar sempre visível.
    const pokeButtonAll = screen.getByRole('button', { // Cria uma constante para definir o elemento a ser testado/utilizado "button" que e representado pelo termo "button".
      name: /All/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    expect(pokeButtonAll).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.
  });

  test('Teste se a Pokédex contém um botão para resetar o filtro.', () => { // Abre a funcao Test com uma descricao e a callback para estruturar e realizar os tests.
    renderWithRouter(<App />); // Renderiza o component App com a funcao renderWithRouter(importada) pra puxar ela junto do history, para o history ser resgistrado e utilizado ao seguir qualquer rotas.
    const theNextPoke = screen.getByTestId(pokename); // Cria constante para pegar o elemento que contem o TestId de valor igual a constante "pokename(Linha 9)"

    // - O texto do botão deve ser All;
    const pokeButtonAll = screen.getByRole('button', { // Cria uma constante para definir o elemento a ser testado/utilizado "button" que e representado pelo termo "button".
      name: /All/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    expect(pokeButtonAll).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.

    // - Ao carregar a página, o filtro selecionado deverá ser All;
    // - A Pokedéx deverá mostrar os Pokémons normalmente (sem filtros) quando o botão All for clicado;
    userEvent.click(pokeButtonAll); // Realiza um click na constante mencionada.
    const pokeButtonNext = screen.getByRole('button', { // Cria uma constante para definir o elemento a ser testado/utilizado "button" que e representado pelo termo "button".
      name: /Próximo pokémon/i, // Key "name" que define o texto dentro do elemento, a string deve ficar entre as barras e o "i" e para nao ser case sensitive.
    });
    pokemons.forEach((pokemon, index) => { // Utiliza a funcao forEach para percorrer o array de objetos "pokemons" (importado de data).
      expect(theNextPoke).toHaveTextContent(pokemons[index].name); // Testa se a constante "theNextPokemon" contem o texto igual ao da key "name" dentro do objeto(com index igual ao paramentro "index" percorrido por forEach) dentro da constante pokemons(importado de data).
      userEvent.click(pokeButtonNext); // Realiza um click na constante mencionada.
      expect(pokeButtonAll).toBeInTheDocument(); // Testa se o elemento puxado pela constante aparece no component renderizado.
    });
  });
});
