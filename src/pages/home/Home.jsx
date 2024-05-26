import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

export const Home = () => {
    const navigate = useNavigate()
    
    useEffect(() => {
        setTimeout(() => navigate('/login'), 0)
    }, [navigate])
}