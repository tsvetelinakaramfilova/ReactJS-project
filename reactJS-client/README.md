# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## React

Version 18.3.1

## Start project

Run `npm i`. Start `npm run dev`. Local to `http://localhost:5173/`.

## Application Overview

An application has been created for two types of users - authorized and guests. Guests have the option to view the recordings in the app and authorize. After authentication, each user is allowed to add items to the available collections - articles and comments. We have different navigation for different users.
Backend for the project use `https://github.com/tsvetelinakaramfilova/ReactJS-project/tree/main/server`

### Idea

Create a article site with the ability to be added by any registered user.

The following pages have been built:

### Home page

The three added items in a articles collection are displayed. With reference to their detailed description.

### Login page

User authentication page. With link to registration page.

### Registration page

Possibility of registration for anyone by setting an email and password. With link to login page.

### Articles page

All available records are displayed again with a link to the article description.

### Add article page

Only logged in users have access to it, and guests are redirected to the log in page.

### Details article page

Any user can access the detailed information about the article. After user authorization, he can add comments. Only the author can edit and delete the article. After deleting the article, all comments about it are deleted.

### 404 page

Not found page. With link to home page.
