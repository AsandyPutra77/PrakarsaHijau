import { Route, Routes } from "react-router-dom";
import { Login } from "../pages/auth/Login";
import { Home } from "../pages/home/Home";
import { Register } from "../pages/auth/Register";
import { Landing } from "../pages/landing/Landing";
import { Profile } from "../pages/profile/Profile";
import { Article } from "../pages/article/Article";
import { ArticleDetail } from "../pages/article/ArticleDetails";
import { Tips } from "../pages/tips/Tips";
import { TipsForm } from "../pages/tips/TipsForm";
import { ProtectedRoute } from "../utils/ProtectedRoute";

export const Routers = () => {
    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/*" element={'/*NotFoundPage*/'}/>
            <Route path="/tips" element={<Tips />}/>
            <Route path="/tips/:id" element={'/*FeedbackDetails*/'}/>
            {ProtectedRoute("/contribute", <TipsForm />)}
            <Route path="/landing" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/article" element={<Article />} />
            <Route path="/article/:id" element={<ArticleDetail />}/>
        </Routes>
    )
}