import { Hero } from "../../components/commons/Hero"
import { Layout } from "../../components/commons/Layout"
import { NavBar } from "../../components/commons/NavigationBar"

export const Landing = () => {
    return (
        <Layout isAuth>
            <NavBar/>
            <Hero />
        </Layout>
    )
}