import { Hero } from "../../components/commons/Hero"
import { Layout } from "../../components/commons/Layout"
import { NavBar } from "../../components/commons/NavigationBar"
import { TrendingTips } from "../../components/tips/TrendingTips";

export const Landing = () => {
    return (
        <Layout isAuth>
            <NavBar/>
            <Hero />
            <TrendingTips />
        </Layout>
    )
}