// import React, {useState, useEffect} from 'react'
// import Base from "../core/Base"
// import {Link} from "react-router-dom"
// import {isAuthenticated} from "../auth/helper/index"
// import {getCategories, deleteCategory} from "./helper/adminapicall"

// const ManagaCategories = () => {

//     const { user, token} = isAuthenticated()

//     const [categories, setcategories] = useState([])

//     const [success, setsuccess] = useState(false)
//     const [error, seterror] = useState(false)

//     const deleteThisCategory = (categoryId) => {
//         deleteCategory(user._id, categoryId, token)
//         .then(data=>{
//             if (data.error) {
//                 seterror(true)
//                 setsuccess(false)
//             }else{
//                 getAllCategories()
//                 seterror(false)
//                 setsuccess(true)
//             }
//         })
//         .catch(err => console.log(err))
//     }

//     const getAllCategories = () => {
//         getCategories(user._id, token)
//         .then(data=>{
//             setcategories(data)
//             console.log(data)
//         })
//     }

//     useEffect(() => {
//         getAllCategories()
//     }, [])

//     const isDeleted = () => {
//         return(
//             <div className="row bg-danger" style={{display: success ? "" : "none"}}>
//                 <h1>Category Deleted successfully</h1>
//             </div>
//         )
//     }
    
//     return (
//         <Base title="Welcome Admin" 
//         description="Manage Your Categories Here"
//         classname="container bg-warning p-4"
//         >
//             <Link to="/admin/dashboard" className="btn btn-dark mb-3">Admin Dashboard</Link>
//             <h2 className ="p-3 bg-dark text-white">All Categories</h2>
//             <div className="p-4 bg-dark">
//                 {isDeleted()}
//                 <div className="row bg-dark text-white rounded">
//                     <div className="col-12">
//                         <h2 className="text-center text-white-my-3">
//                             Total {categories.length} categories
//                         </h2>
//                         {categories.map((category, index)=>(
//                             <div key={index} >
//                             <div className="row text-center m-3 p-2 bg-dark">
//                             <div className="col-4">
//                                 <h3 className="text-white text-left">
//                                     {category.name}
//                                 </h3>
//                             </div>
//                             <div className="col-4">
//                                 <Link className="btn btn-success" to = {`/admin/category/update/${category._id}`}>
//                                     <span>Update</span>
//                                 </Link>
//                             </div>
//                             <div className="col-4">
//                                 <button onClick={() => {
//                                     deleteThisCategory(category._id)
//                                 }} className="btn btn-danger">
//                                     Delete
//                                 </button>
//                             </div>
//                         </div>
//                         <div className="row bg-info" style={{height: "3px"}}></div>
//                         </div>
//                         ))}
//                     </div>
//                 </div>
//             </div>
//         </Base>
//     )
// }

// export default ManagaCategories



import React, {useState, useEffect} from 'react'
import Base from "../core/Base"
import { Link } from 'react-router-dom'
import {isAuthenticated} from "../auth/helper/index"
import {getCategories, deleteCategory} from "../admin/helper/adminapicall"

const ManageCategory = () => {
    const { user, token} = isAuthenticated()

    const [categories, setcategories] = useState([])

    const preload = () =>{
        getCategories(user._id, token)
        .then(data=>{
            setcategories(data)
            console.log(data)
        })
    }

    const deleteThisProduct = productId =>{
        deleteCategory(user._id, productId, token)
        .then(data=>{
            if(data.error){
                console.log(data.error)
            }else{
                preload()
            }
        })
    }

    useEffect(() => {
        preload()
    }, [])

    return (
        <Base title="Welcome Admin" 
        description="Add new products from here"
        classname="container bg-warning p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-dark mb-3">Admin Dashboard</Link>
            <h2 className ="p-3 bg-dark text-white">All Products</h2>
            <div className="p-4 bg-dark">
                <div className="row bg-dark text-white rounded">
                    <div className="col-12">
                        <h2 className="text-center text-white-my-3">
                            Total {categories.length} Categories
                        </h2>
                        {categories.map((product, index)=>(
                            <>
                            <div key={index} className="row text-center m-3 p-2 bg-dark">
                            <div className="col-4">
                                <h3 className="text-white text-left">
                                    {product.name}
                                </h3>
                            </div>
                            <div className="col-4">
                                <button onClick={() => {
                                    deleteThisProduct(product._id)
                                }} className="btn btn-danger">
                                    Delete
                                </button>
                            </div>
                        </div>
                        <div className="row bg-info" style={{height: "3px"}}></div>
                        </>
                        ))}
                    </div>
                </div>
            </div>
        </Base>
    )
}

export default ManageCategory;