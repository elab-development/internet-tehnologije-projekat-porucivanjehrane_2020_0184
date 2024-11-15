# Decentralized app for ordering food

This application is a decentralized platform for ordering food, combining the power of Laravel for backend functionality, React.js for the frontend, and blockchain technology to create a secure, transparent transaction process using Ethereum and smart contracts written in Solidity.

## Features
- Full-stack development using Laravel (backend) and React.js (frontend)
- Integration with the Ethereum blockchain to manage food order transactions via smart contracts
- Database management through XAMPP and MySQL

## Setup instructions
### 1. Prerequisites
- Ensure you have Composer and Node.js installed on your system.
- XAMPP is needed to access and manage the database.

### 2. Installing dependencies
- After cloning the repository, install the following dependencies
  ~~~
  composer install
  ~~~
  ~~~
  npm install
  ~~~

### 3. Environment setup
- Copy the .env.example file to .env and adjust the settings as necessary (database connection, API keys, etc.).
- Generate a unique application key:
   ~~~
    php artisan key:generate
   ~~~
### 4. Database setup
- Start your XAMPP server and ensure MySQL is running.
- Import laravel.sql to database with the same name in phpmyadmin
- Run the migrations to create the necessary database tables:
   ~~~
    php artisan migrate
   ~~~

### 5. Start application
- First, start the Laravel server
   ~~~
    php artisan serve
   ~~~  
- Then, in a new terminal start React.js terminal
   ~~~
    npm start
   ~~~  
### 6. Blockchain Configuration:
- Ensure you have installed digital wallet (MetaMask etc.) in order to make transactions

## Documentation
- [Laravel and React.js](https://github.com/user-attachments/files/17759805/Dokumentacija.pdf): Documentation in Serbian on backend and frontend usage and configuration
- [Blockchain](https://github.com/user-attachments/files/17759810/Zavrsni.rad.Ana.Pavlovic.pdf): Documentation in Serbian on how Ethereum and Solidity integrate within the app and handle transactions




