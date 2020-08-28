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


## Para rodar o projeto:

1. Dar o comando `yarn` no terminal na pasta do projeto para baixar as dependências
2. Ter o postgres instalado, criar um database chamado `sellpoint`, um usuário `selluser` senha `123321`
  * sugestão utilizar o docker: https://hub.docker.com/_/postgres
2. Alterar o caminho da url do banco de dados no arquivo `ormconfig.json`
3. Rodar a migração do typeorm `yarn typeorm migrate:run`
4. Rodar a aplicação `yarn dev:server`

