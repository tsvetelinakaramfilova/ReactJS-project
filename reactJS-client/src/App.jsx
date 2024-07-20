import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ArticleList from "./components/article-list/ArticleList";
import LogIn from "./components/login/LogIn";
import Registration from "./components/registration/Registration";
import UserContext from "./contexts/UserContext";

function App() {
  const [currentUser, setCurrentUser] = useState({});

  const login = (username, password) => {
      // TODO: validate password

      setCurrentUser({ username });
  }


  return (
    <>
      <UserContext.Provider value={{ user: currentUser, login }}>
        <Header />
        <main className="container footer mt-auto py-3">
          <Routes>
            {/* <Route path='/' /> */}
            <Route path="/login" element={<LogIn />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/articles" element={<ArticleList />} />
          </Routes>
        </main>
        <Footer />
      </UserContext.Provider>
    </>
  );
}

export default App;
