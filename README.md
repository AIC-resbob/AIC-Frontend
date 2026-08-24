## Stockflow AI Frontend

Frontend website for Stockflow AI. 

## Features
1. Signup and Logins
2. Predict restock amount for a given period of time
3. Giving discount recommendeation for a given "modal" and "harga jual" for a given period of time

## how to use
1. Clone this repo
```https://github.com/AIC-resbob/AIC-Frontend```
2. cd into this repo
```cd AIC-Frontend```
3. do ```npm install```
4. Create .env file following the fields in  ```.env.example```
5. if you use localhost, you need a backend server ```https://github.com/AIC-resbob/AIC-backend```
6. do ```npm run dev``` and visit ```localhost:5173``` to see the results



## Tech Stack
1. React.js
2. Vite
3. Tailwind css

## project structure
```
.
├── .env.development -> for npm run dev
├── .env.example ->for reference
├── .env.production ->for npm run build
├── eslint.config.js
├── .gitignore
├── index.html
├── package.json
├── package-lock.json
├── postcss.config.js
├── public
│   ├── favicon.svg
│   └── icons.svg
├── README.md
├── src
│   ├── App.tsx
│   ├── assets
│   │   ├── hero.png
│   │   ├── react.svg
│   │   └── vite.svg
│   ├── components
│   │   ├── AuthForm.tsx
│   │   ├── DiscountForm.tsx
│   │   ├── RestockForm.tsx
│   │   └── ResultBox.tsx
│   ├── index.css
│   ├── main.tsx
│   └── utils
│       ├── api.ts
│       └── constants.ts
├── tailwind.config.js
├── tsconfig.app.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts

6 directories, 29 files
```