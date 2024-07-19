import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ArticleList from "./components/article-list/ArticleList";

function App() {
  return (
    <>
      <Header />
      <main className="container footer mt-auto py-3">
        <Routes>
          {/* <Route path='/' /> */}
          <Route path="/articles" element={<ArticleList />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
