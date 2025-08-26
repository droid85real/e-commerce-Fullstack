import React, { createContext, useEffect, useState } from 'react'

// Customers
const customers = [
  { id: 1, email: "user1@example.com", password: "123" },
  { id: 2, email: "user2@example.com", password: "123" },
  { id: 3, email: "user3@example.com", password: "123" },
  { id: 4, email: "user4@example.com", password: "123" },
  { id: 5, email: "user5@example.com", password: "123" }
]

// Admin
const admins = [
  { id: 1, email: "admin@example.com", password: "123" }
]

// Save to localStorage
export const setLocalStorage = () => {
  localStorage.setItem('customers', JSON.stringify(customers))
  localStorage.setItem('admins', JSON.stringify(admins))
}

// Get from localStorage
export const getLocalStorage = () => {
  const customersData = JSON.parse(localStorage.getItem('customers')) || []
  const adminsData = JSON.parse(localStorage.getItem('admins')) || []
  return { customersData, adminsData }
}

// Create Context
export const AuthContext = createContext()

// Provider
const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState({ customersData: [], adminsData: [] })

  useEffect(() => {
    // Ensure data exists in localStorage
    setLocalStorage()
    const { customersData, adminsData } = getLocalStorage()
    setUserData({ customersData, adminsData })
  }, [])

  return (
    <AuthContext.Provider value={userData}>
      {children}
    </AuthContext.Provider>
  )
}

export default AuthProvider


// import React, { createContext, useEffect, useState } from "react";

// export const AuthContext = createContext();

// const initialCustomers = [
//   { id: 1, email: "user1@example.com", password: "123" },
//   { id: 2, email: "user2@example.com", password: "123" },
// ];

// const initialAdmins = [
//   { id: 1, email: "admin@example.com", password: "123" },
// ];

// export const setLocalStorage = (customers = initialCustomers, admins = initialAdmins) => {
//   localStorage.setItem("customers", JSON.stringify(customers));
//   localStorage.setItem("admins", JSON.stringify(admins));
// };

// export const getLocalStorage = () => {
//   const customersData = JSON.parse(localStorage.getItem("customers")) || [];
//   const adminsData = JSON.parse(localStorage.getItem("admins")) || [];
//   return { customersData, adminsData };
// };

// const AuthProvider = ({ children }) => {
//   const [customers, setCustomers] = useState([]);
//   const [admins, setAdmins] = useState([]);

//   useEffect(() => {
//     setLocalStorage(); // initialize localStorage if empty
//     const { customersData, adminsData } = getLocalStorage();
//     setCustomers(customersData);
//     setAdmins(adminsData);
//   }, []);

//   // Login function
//   const login = (email, password) => {
//     const customer = customers.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (customer) return "customer";

//     const admin = admins.find(
//       (u) => u.email === email && u.password === password
//     );
//     if (admin) return "admin";

//     return null;
//   };

//   // Signup function
//   const signup = (email, password) => {
//     const newUser = { id: Math.random, email, password };
//     const updatedCustomers = [...customers, newUser];
//     setCustomers(updatedCustomers);
//     localStorage.setItem("customers", JSON.stringify(updatedCustomers));
//     return true;
//   };

//   return (
//     <AuthContext.Provider value={{ customers, admins, login, signup }}>
//       {children}
//     </AuthContext.Provider>
//   );
// };

// export default AuthProvider;

