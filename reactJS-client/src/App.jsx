import "./App.css";
import { Route, Routes } from "react-router-dom";
import { AuthContextProvider } from "./contexts/authContext";
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import ArticleList from "./components/article-list/ArticleList";
import LogIn from "./components/login/Login";
import Registration from "./components/registration/Registration";
import LogOut from "./components/logout/Logout";
import ArticleDetails from "./components/article-details/ArticleDetails";
import ArticleCreate from "./components/article-create/ArticleCreate";
import NotFound from "./components/not-found/NotFound";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <main className="container footer mt-auto py-3">
        <Routes>
          {/* <Route path='/' /> */}
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
