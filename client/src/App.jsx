import React from "react";
import Header from "./component/Header/Index";
import Home from "./Pages/Home";
import './App.css'

export default function App() {
  return (
    <>
      <div className="main w-[100%] h-[100vh]">
        <Header />
        <Home />
      </div>

    </>

  )
}