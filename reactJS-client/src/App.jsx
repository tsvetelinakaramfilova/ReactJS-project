import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Home from "./components/home/Home";
import LogIn from "./components/login/Login";
import Registration from "./components/registration/Registration";
import LogOut from "./components/logout/Logout";
import ArticleList from "./components/article-list/ArticleList";
import ArticleDetails from "./components/article-details/ArticleDetails";
import ArticleCreate from "./components/article-create/ArticleCreate";
import NotFound from "./components/not-found/NotFound";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <main className="container mt-auto py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/logout" element={<LogOut />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route
            path="/articles/details/:articleId"
            element={<ArticleDetails />}
          />

          <Route path="/articles/create" element={<ArticleCreate />} />

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
