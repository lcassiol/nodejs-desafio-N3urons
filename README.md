# Desafio backend N3urons

Para rodar o projeto:

1. Dar o comando `yarn` no terminal na pasta do projeto para baixar as dependências
2. Ter o postgres instalado, criar um database chamado `sellpoint`, um usuário `selluser` senha `123321`
  * sugestão utilizar o docker: https://hub.docker.com/_/postgres
2. Alterar o caminho da url do banco de dados no arquivo `ormconfig.json`
3. Rodar a migração do typeorm `yarn typeorm migrate:run`
4. Rodar a aplicação `yarn dev:server`

