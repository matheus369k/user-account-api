<h1 align='center'>User Account - API Node</h1>

<div align='center'>

  [Descrição](#descrição)
  |
  [Iniciando](#iniciando)
  |
  [Dependências](#dependências)
  |
  [Rotas](#rotas)
  |
  [Licença](#licença)

</div>

<div align='center'>
  <img src='https://img.shields.io/github/license/matheus369k/user-account-api.svg'/>
  <img src='https://img.shields.io/github/watchers/matheus369k/user-account-api.svg' />
</div>

## Descrição

A aplicação e a API do repositório __[User Account](https://github.com/matheus369k/user-account)__. Um site de login e registro de usuário, usando jwt para, autorizar login automático.

Principais características:
- registro e login de usuário.
- validação com jwt(json web token), para login automático.

## Dependências

- Git - [baixar](https://git-scm.com)
- Node - [baixar](https://nodejs.org/pt)
- Docker ( Recomendado ) - [baixar](https://www.docker.com/)
- VSCode ( Recomendado ) - [baixar](https://code.visualstudio.com)
- Front-end ( Recomendado ) - [repositório](https://github.com/matheus369k/user-account)

## Iniciando

Para testar o projeto na sua maquina, recomenda-se clonar o repositório em uma pasta local, como seguinte comando.

### Instalando o projeto

Digite no terminal:

__HTTPS__
```
$ git clone https://github.com/matheus369k/user-account-api.git
```
Acesse o projeto com seguinte comando 
```
$ user-account-api
```
Instalando as dependências
```
$ npm install
```
inicie o docker e insira o comando
```
$ docker compose up -d
```
### Configurando

crie um arquivo __.env__ e adicione as variáveis ambiente a seguir

```
// Obrigatório
DATABASE_URL="postgresql://root:root@localhost:5432/users"
JWT_SECRET_KEY="3809dkbkdt739udg7"

// Opcional
FRONT_END_URL="http://localhost:5173"
PORT=3000
```
Esse comando ira criar as tabela no banco de dados.
```
$ npm run prisma:migrate
$ npm run prisma:generate
```
Aplicação pronta, use o comando abaixo para rodar a aplicação
```
$ npm run dev
```
## Rotas
__Método HTTP GET__<br/>
Auto login com jwt token
```
/api/user
```
__Método HTTP POST__<br/>
Registro de usuário
```
/api/user/register
```
Login de usuário
```
/api/user/login
```

## 📜Licença

Para o projeto fora usado a licença 🔗[MIT](/LICENSE.txt).