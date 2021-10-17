import React from 'react'; // Importa React da biblioteca.
import { Router } from 'react-router-dom'; // Importa Router de react-router-dom.
import { render } from '@testing-library/react'; // Importa render da biblioteca de testes.
import { createMemoryHistory } from 'history'; // Importa a funcao createMemoryHistory de "history".

// Para entender melhor o uso dessa funcao, assista a aula da Maite da turma 13A (Aula 15.3 - RTL - Testando React Router // aos 39:00min). Mais especifico aos 52:24min.

function renderWithRouter(component) { // Cria funcao para acessar o historico de rotas do componente que vai ser inserido como parametro.
  const historyMock = createMemoryHistory(); // Cria constante para chamar a funcao importada na linha 4.

  const objectRender = render(
    <Router history={ historyMock }>
      { component }
    </Router>,
  ); // Cria constante para renderizar uma rota(contendo uma propridade "history" que tem como valor a constante "historyMock") que engloba o componente usado no parametro "component".

  // O "render" e um objeto com VARIAS keys (getByRole, getByText, getByTestId)

  return {
    ...objectRender,
    history: historyMock,
  }; // A funcao retorna adicionando mais uma key no objeto "render" que e definido na constante "objectRender". Dando um spread adicionando a key "history" tendo como value a constante "historyMock"(funcao createMemoryHistory).
  // Esse return serve para exportarmos o "history: hisotryMock" pra dentro do objeto "render" para podermos acessa-lo e adicionar o pathName que queremos de acordo com o componente que vamos testar.
}

export default renderWithRouter; // Exporta a funcao
