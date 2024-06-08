import { LoginInput } from "../../components/auth/LoginInput";
import { Layout } from "../../components/commons/Layout";
import { Footer } from "../../components/commons/Footer";

export const Login = () => {
    return (
        <Layout isAuth>
            <LoginInput/>
            <Footer />
        </Layout>
    )
}