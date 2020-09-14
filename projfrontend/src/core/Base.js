import React from 'react'
import Menu from "./menu"



export default function BASE({
    title=`My Title`,
    description="My description",
    classname = "bg-dark text-white p-4",
    children
}) {
    return (
        <div>
            <Menu />
            <div className="container-fluid">
                <div className="jumbotron bg-dark text-white text-center">
                    <h2 className="display-4">{title}</h2>
                    <p className="lead">{description}</p>
                </div>
                <div className={classname}>{children}</div>
                </div>
            <footer className="footer bg-dark mt-auto py-3">
                <div className="container-fluid bg-success text-white">
                        <h5>If You got any questions, feel free to reach out</h5>
                        <button className="btn btn-warning p-1 m-1">Contact Us</button>
                </div>
                <div className="container">
                    <span className="text-muted">
                        Amazing Place for some <span className="text-white">shopping</span> 
                    </span>
                </div>
            </footer>
        </div>
    )
}
