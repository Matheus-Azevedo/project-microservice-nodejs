### README

---

## Projeto de Autenticação/Autorização

### Descrição

Este projeto tem como objetivo implementar um sistema de autenticação e autorização utilizando microserviços. Ele faz parte da disciplina de pós-graduação e deve ser desenvolvido em grupo.

### Funcionalidades

- **Proteção de Rotas**: Os microserviços de posts e usuários terão suas rotas protegidas, sendo acessíveis apenas através de um token JWT. A única rota liberada será a de consulta de um usuário por username.
- **Autenticação JWT**: Um microserviço dedicado gerará tokens JWT com expiração de uma hora, oferecendo uma rota de login.
- **Middleware de Verificação**: Implementação de um middleware para verificar a validade dos tokens JWT antes de acessar as rotas protegidas.
- **API Gateway**: Utilização de uma API Gateway para redirecionamento de chamadas aos microserviços.

### Estrutura do Projeto

- **Microserviços**:
  - `users-ms`: Microserviço para gestão de usuários.
  - `posts-ms`: Microserviço para gestão de posts.
  - `auth-ms`: Microserviço responsável pela autenticação e geração de tokens JWT.

### Configuração e Execução

1.  **Instalação de Dependências**:

    - No diretório de cada microserviço, execute:

      `npm install`

2.  **Variáveis de Ambiente**:

    - Configure as variáveis de ambiente necessárias, incluindo a variável `APP_NAME` para cada microserviço.

3.  **Execução dos Microserviços**:

    - Inicie cada microserviço individualmente:

      `npm start`

4.  **API Gateway**:

    - Utilize a URL padrão para chamadas via API Gateway:

      `http://localhost:3000/nome_microservico/endpoint`

### Exemplos de Uso

- **Consulta de Usuários**:

  `GET http://localhost:3000/users-ms/users`

- **Login e Geração de Token**:

  `POST http://localhost:3000/auth-ms/login`
