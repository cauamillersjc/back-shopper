# Como Rodar o Projeto Back-end em Node.js com Express (Desenvolvimento)

Este guia explicará como configurar e rodar o projeto back-end em Node.js com Express durante o desenvolvimento usando TypeScript.

## Pré-requisitos

Antes de começar, você precisará ter o Node.js e o npm instalados em seu sistema. Certifique-se de que você está usando uma versão compatível do Node.js. Você pode verificar a versão do Node.js com o seguinte comando:

```bash
node -v
```

Certifique-se de que o npm também esteja instalado:

```bash
npm -v
```

## Configuração do Projeto

Clone o repositório do projeto para o seu computador:
```bash
git clone https://github.com/cauamillersjc/back-shopper.git
```

Navegue para o diretório do projeto:
```bash
cd back-shopper
```

Instale as dependências do projeto usando o npm:
```bash
npm install
```

## Rodando o Projeto em Desenvolvimento
Após a configuração inicial, você pode iniciar o servidor de desenvolvimento para rodar o projeto:

```bash
npx ts-node-dev --respawn --transpile-only src/index.ts
```

Isso iniciará o servidor em modo de desenvolvimento e estará pronto para atender às solicitações dos clientes. O servidor será recarregado automaticamente sempre que você fizer alterações nos arquivos TypeScript.

### [Documentação da API](https://app.swaggerhub.com/apis/CAUAMILLERSANTOS/products-shopper/1.0.0-oas3)
