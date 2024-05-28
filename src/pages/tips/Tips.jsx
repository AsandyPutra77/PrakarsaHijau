import React from "react";
import { ListTips } from "../../components/tips/ListTips";
import { NavBar } from "../../components/commons/NavigationBar";

export const Tips = () => {
    return (
        <div>
             <NavBar />
             <ListTips />
        </div>
    )
}