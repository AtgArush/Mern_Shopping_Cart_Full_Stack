import React from 'react'
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper/index"
import {Link} from "react-router-dom"

const AdminDashboard = () => {

    const {user : {name, lastname, _id, email}} = isAuthenticated()
    const adminLeftSide = () =>{
        return(
            <div className="card">
                <h3 className="card-header bg-dark text-white">
                    Admin Navigation
                </h3>
                <ul className="list-group bg-info">
                    <li className="list-group-item bg-dark">
                        <Link to="/admin/create/category" className="nav-link text-warning" >
                            Create Categories
                        </Link>
                    </li>
                    <li className="list-group-item bg-dark">
                        <Link to="/admin/category" className="nav-link text-warning" >
                            Manage Categories
                        </Link>
                    </li>
                    <li className="list-group-item bg-dark">
                        <Link to="/admin/create/product" className="nav-link text-warning" >
                            Create Products
                        </Link>
                    </li>
                    <li className="list-group-item bg-dark">
                        <Link to="/admin/products" className="nav-link text-warning" >
                            Manage Products
                        </Link>
                    </li>
                    <li className="list-group-item bg-dark">
                        <Link to="/admin/orders" className="nav-link text-warning" >
                            Manage Orders
                        </Link>
                    </li>
                </ul>
            </div>
       )
    }


    const adminRightSide = () =>{
        return(
            <div className="card bg-dark">
            <h3 className="card-header bg-dark text-white">
                Admin Info
            </h3>
            <table className="table table-striped table-dark">
  <tbody>
    <tr>
      <th scope="row">Name</th>
        <th scope="row">{name}</th>
    </tr>
    <tr>
      <th scope="row">Lastname</th>
      <th scope="row">{lastname}</th>
    </tr>
    <tr>
      <th scope="row">E-Mail</th>
      <th scope="row">{email}</th>
    </tr>
    <tr>
      <th scope="row">Id</th>
      <th scope="row">{_id}</th>
    </tr>
    <tr>
      <th scope="row">Role</th>
        <th scope="row"> <span className = "text-warning">Admin</span></th>
    </tr>
  </tbody>
</table>
            </div>
        )
    }


    return (
        <Base 
        title = {`Welcome back Mr ${isAuthenticated().user.name}`} 
        description="Manage all of your products here"
        classname="container bg-success p-4"
        >
            <div className="row">
                <div className="col-4">
        {adminLeftSide()}
                </div>
                <div className="col-8">
        {adminRightSide()}
                </div>
            </div>
        </Base>
    )
}

export default AdminDashboard