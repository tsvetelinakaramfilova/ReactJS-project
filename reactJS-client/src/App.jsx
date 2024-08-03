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
import ArticleEdit from "./components/article-edit/ArticleEdit";
import NotFound from "./components/not-found/NotFound";
import PrivateGuard from "./components/common/PrivateGuard";
import PublicGuard from "./components/common/PublicGuard";

function App() {
  return (
    <AuthContextProvider>
      <Header />
      <main className="container mt-auto py-3">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/articles" element={<ArticleList />} />
          <Route
            path="/articles/details/:articleId"
            element={<ArticleDetails />}
          />

          <Route element={<PublicGuard />}>
            <Route path="/login" element={<LogIn />} />
            <Route path="/registration" element={<Registration />} />
          </Route>

          <Route element={<PrivateGuard />}>
            <Route path="/articles/create" element={<ArticleCreate />} />
            <Route path="/articles/edit/:articleId" element={<ArticleEdit />} />
            <Route path="/logout" element={<LogOut />} />
          </Route>

          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </AuthContextProvider>
  );
}

export default App;
