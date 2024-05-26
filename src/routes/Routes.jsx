import { Route, Routes } from "react-router-dom";
// import { useDispatch, useSelector } from "react-redux";
// import { useEffect } from "react";
import { Login } from "../pages/auth/Login";
import { Home } from "../pages/home/Home";
import { Register } from "../pages/auth/Register";
import { Landing } from "../pages/landing/Landing";
import { Profile } from "../pages/profile/Profile";


export const Routers = () => {
    // const dispatch = useDispatch()

    // const { authedUser = null } = useSelector(({ users }) => users)
    // const isPreload = useSelector(({ preload }) => preload)

    // useEffect(() => {
    //     dispatch(/*preloadAction()*/)
    // }, [dispatch]);

    // if (isPreload) {
    //     return null
    // }
    
    // if (authedUser === null) {
    //     return (
    //         <Routes>
    //             <Route path="/" element={<Home />}/>
    //             <Route path="/register" element={'/*register*/'}/>
    //             <Route path="/login" element={<Login />}/>
    //             <Route path="/*" element={'/*NotFoundPage*/'}/>
    //         </Routes>
    //     )
    // }

    return (
        <Routes>
            <Route path="/" element={<Home />}/>
            <Route path="/register" element={<Register/>}/>
            <Route path="/login" element={<Login />}/>
            <Route path="/*" element={'/*NotFoundPage*/'}/>
            <Route path="/feedback" element={'/*Feedback*/'}/>
            <Route path="/feedback/:id" element={'/*FeedbackDetails*/'}/>
            <Route path="/landing" element={<Landing />} />
            <Route path="/profile" element={<Profile />} />
        </Routes>
    )
}