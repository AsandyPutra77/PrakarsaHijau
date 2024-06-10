import { Hero } from "../../components/commons/Hero"
import { Layout } from "../../components/commons/Layout"
import { NavBar } from "../../components/commons/NavigationBar"
import { TrendingTips } from "../../components/tips/TrendingTips";
import { ArticleRecycler } from "../../components/article/ArticleRecycler";
import { Footer } from "../../components/commons/Footer";
import { ListVideo } from "../../components/video/ListVideo";

export const Landing = () => {
    return (
        <Layout isAuth>
            <NavBar/>
            <Hero />
            <TrendingTips />
            <ArticleRecycler />
            <ListVideo />
            <Footer />
        </Layout>
    )
}