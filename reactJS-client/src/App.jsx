import { useState } from "react";
import "./App.css";
import { Route, Routes } from "react-router-dom";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ArticleList from "./components/article-list/ArticleList";
import LogIn from "./components/login/LogIn";
import Registration from "./components/registration/Registration";
import ArticleDetails from "./components/article-details/ArticleDetails";
import { AuthContext } from "./contexts/authContext";

function App() {
  const [authState, setAuthState] = useState({});

  const changeAuthState = (state) => {
    setAuthState(state);
  };

  const contextData = {
    userId: authState._id,
    email: authState.email,
    accessToken: authState.accessToken,
    isAuthenticated: !!authState.email,
    changeAuthState,
  };

  return (
    <>
      <AuthContext.Provider value={contextData}>
        <Header />
        <main className="container footer mt-auto py-3">
          <Routes>
            {/* <Route path='/' /> */}
            <Route path="/login" element={<LogIn />} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/articles" element={<ArticleList />} />
            <Route
              path="/articles/details/:articleId"
              element={<ArticleDetails />}
            />
          </Routes>
        </main>
        <Footer />
      </AuthContext.Provider>
    </>
  );
}

export default App;
