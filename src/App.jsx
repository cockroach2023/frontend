import "./App.css";
import { Route, Routes } from "react-router-dom";
import MainPage from "./pages/MainPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import MyPage from "./pages/MyPage.jsx";
import ProductPage from "./pages/ProductPage.jsx";
import ProductCreatePage from "./pages/ProductCreatePage.jsx";

function App() {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/mypage" element={<MyPage />} />
      <Route path="/product/:product_id" element={<ProductPage />} />
      <Route path="/product-create" element={<ProductCreatePage />} />
      <Route path="/" element={<MainPage />} />
    </Routes>
  );
}

export default App;
