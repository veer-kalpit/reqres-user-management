# 🚀 React User Management App

This is a simple **React application** that allows users to **log in, view a list of users, edit user details, delete users, and sort them** based on their names. The app interacts with the **Reqres API** to fetch, update, and manage users.

---

## 📌 Features

✔️ **User Login** with authentication token storage  
✔️ **User List Display** in a **tile/card format** with avatars  
✔️ **Edit User Details** (first name, last name, and email)  
✔️ **Delete Users** from the list  
✔️ **Sort Users** by first name or last name (A-Z, Z-A)  
✔️ **Pagination** for navigating through users  
✔️ **Token Persistence** with **LocalStorage**  
✔️ **Redirect to Login** if the token is missing or expired

---

## 📂 Project Structure

```sh

/user-management-app 
│── /src
│ ├── /components 
│ │      ├── Auth.js # Login Screen 
│ │      ├── UserList.js # User List + Sort, Pagination, Delete, Edit 
│ ├── App.js # App Component 
│ ├── index.js # Entry Point
| ├── index.css #(Tailwind Css)
│── /public 
│── package-lock.json 
│── tailwind.config.js
│── package.json 
│── README.md

```

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

## Authentication 

```sh

Email : eve.holt@reqres.in
Password : cityslicka

```

### Hosted Link 

````sh
 https://user-management-two-phi.vercel.app/

````