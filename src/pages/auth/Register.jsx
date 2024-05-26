import { RegisterInput } from '../../components/auth/RegisterInput'
import { Layout } from '../../components/commons/Layout'

export const Register = () => {
    return (
        <Layout>
            <RegisterInput isAuth/>
        </Layout>
    )
}