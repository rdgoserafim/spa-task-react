# Projeto SPA Task

Este é um projeto de aplicação de página única (SPA) utilizando Laravel para o backend e React para o frontend.

## Instalação

### Backend (Laravel)

1. Clone o repositório

2. instale as dependencias do backend

```bash
cd ~/spa-taskreact/backend
composer require install
```    

3. configure as credenciais de base de dados da aplicação em .env utilizando .env.exemple

4. rode as migrations
```bash
php artisan migrate
php artisan key:generate
```    

5. inicie o servidor de desenvolvimento
```bash
php artisan serve --port=8001
```    

6. instale as dependencias do frontend
```bash
cd ~/spa-taskreact/frontend
npm install
```    

7. inicie a aplicação
```bash
npm run dev
```    


