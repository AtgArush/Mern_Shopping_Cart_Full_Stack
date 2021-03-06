import React, {Fragment} from 'react'
import {Link, withRouter} from "react-router-dom"
import {signout, isAuthenticated} from "../auth/helper/index"

const currentTab = (history, path) =>{
    if(history.location.pathname === path){
        return {color: "#fff", backgroundColor: "#28a745", margin: "2px"}
    } else{
        return {color: "#888"}
    }
}

 const Menu = ({history}) => {
    return (
        <div>
            <ul className="nav nav-tabs bg-dark">
                <li className="nav-item">
                    <Link style = {currentTab(history, "/")} className="nav-link" to ="/">
                        Home
                    </Link>
                </li>
                <li className="nav-item">
                    <Link style = {currentTab(history, "/cart")} className="nav-link" to ="/cart">
                        Cart
                    </Link>
                </li>
                {isAuthenticated() && isAuthenticated().user.role === 0 && (
                    <li className="nav-item">
                        <Link style = {currentTab(history, "/user/dashboard")} className="nav-link" to ="/user/dashboard">
                            DashBoard
                        </Link>
                    </li>
                )}
                {isAuthenticated() && isAuthenticated().user.role === 1 && (
                    <li className="nav-item">
                        <Link style = {currentTab(history, "/admin/dashboard")} className="nav-link" to ="/admin/dashboard">
                            Dashboard
                        </Link>
                    </li>
                )}
                {!isAuthenticated() && (
                    <Fragment>
                    <li className="nav-item">
                        <Link style = {currentTab(history, "/signup")} className="nav-link" to ="/signup">
                            Signup
                        </Link>
                    </li>
                    <li className="nav-item">
                        <Link style = {currentTab(history, "/signin")} className="nav-link" to ="/signin">
                            Signin
                        </Link>
                    </li>
                    </Fragment>
                )}
                {isAuthenticated() && (
                    <li className="nav-item">
                        <button
                        className="nav-link btn"
                        style={{backgroundColor: "#343a40"}, {color: "#ffc107"}}
                        onClick = {()=>{
                            signout(()=>{
                                history.push("/signin")
                            })
                        }}>
                            Sign Out
                        </button>
                    </li>
                )}
            </ul>
        </div>
    )
}

export default withRouter(Menu)