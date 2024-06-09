import { LoginInput } from "../../components/auth/LoginInput";
import { Layout } from "../../components/commons/Layout";

export const Login = () => {
    return (
        <Layout isAuth>
            <LoginInput/>
        </Layout>
    )
}