<h3 align="center">
  Desafio 09: Relacionamentos com banco de dados no Node.js
</h3>


<p align="center">
  <a href="#-sobre">Sobre</a>&nbsp;&nbsp;&nbsp;|&nbsp;&nbsp;&nbsp;
  <a href="#-instalação">Instalação</a>&nbsp;&nbsp;&nbsp;
</p>


## 🚀 **Sobre**
Esta é uma aplicação feita em NodeJS, que permite a criação de clientes, produtos e pedidos, onde o cliente pode gerar novos pedidos de compra de certos produtos, como um pequeno e-commerce.

Para sua construção utilizamos o conceito de Repositories e Services para retirar do arquivo de routes, a responsabilidade de tratar com as regras de negócio e a comunicação com os dados. Também utilizamos os conceitos de relacionamentos N:N em tabelas relacionais.

Desafio proposto em: https://github.com/Rocketseat/bootcamp-gostack-desafios/tree/master/desafio-database-relations

## 🚀 **Instalação**
1 - Clonar o [repositório](https://github.com/MateusTymoniuk/gostack2020-desafio09-database-relations) em seu computador;

2 - **Instalar as dependências do projeto** digitando no terminal o comando:

    yarn

3 - **Aplicar as migrations para criar as tabelas no banco de dados**:

    yarn typeorm migration:run

4 - **Executar a aplicação**:

    yarn dev:server
