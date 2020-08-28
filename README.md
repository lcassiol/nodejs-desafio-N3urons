# Desafio backend N3urons

## Proposta do desafio

O objetivo do projeto seria desenvolver o backend de um sistema de vendas. <br />
Entidades do sistema: 
- Filial
- Cliente
- Produto
- Estoque
- Pedido


Com as seguintes regras: 
- O usuário deve conseguir realizar, visualizar e cancelar seus pedidos
- O usuário logado só deve ver pedidos realizados por ele.
- O usuário logado só pode cancelar pedidos realizados por ele.


## Tecnologias
- [Autenticação JWT](https://github.com/auth0/node-jsonwebtoken#readme)
- [Typescript](https://github.com/microsoft/TypeScript)
- [Express](https://github.com/expressjs/express)
- [Tsyringe](https://github.com/microsoft/tsyringe)
- [Bcryptjs](https://github.com/dcodeIO/bcrypt.js/)
- [Cors](https://github.com/expressjs/cors)
- [Ts-Node](https://github.com/TypeStrong/ts-node)
- [Eslint](https://github.com/eslint/eslint)
- [Prettier](https://github.com/prettier/prettier)
- [EditorConfig](https://github.com/editorconfig/editorconfig-vscode)

## Utilização

- O sistema desenvolvido foi feito para que exista um usuário do tipo vendedor, onde ele pode **cadastrar um cliente e realizar uma compra para o mesmo, cadastrar produtos, listar clientes, verificar o estoque, atualizar o estoque**. Na listagem dos pedidos um usuário do tipo vendedor tambem só pode ver os pedidos realizados por ele, bem como cancelar seus pedidos. 
- Um usuário do tipo cliente tambem pode realizar o cadastro, o fluxo seria **criar um usuário,criar um cliente, ao criar um cliente com um usuário que não seja do tipo vendedor o usuário vai ficar associado ao cliente** assim a realização das compras podem ser feitas com toda as entidades preenchidas.


## Fluxo do sistema
- Usuario realiza login na aplicação, cria um cliente, lista produtos, seleciona os produtos e realiza a criação de um novo pedido, realiza chamada para pagamento do pedido.


## Para rodar o projeto:

 **1.** Dar o comando `yarn` no terminal na pasta do projeto para baixar as dependências<br />
 **2.** Ter o postgres instalado, criar um database chamado `sellpoint`, um usuário `selluser` senha `123321`<br />
  * **sugestão utilizar o docker**: https://hub.docker.com/_/postgres <br />
 
 **3.** Alterar o caminho da url do banco de dados no arquivo `ormconfig.json`<br />
 **4.** Rodar a migração do typeorm `yarn typeorm migration:run`<br />
 **5.** Rodar a aplicação `yarn dev:server`

