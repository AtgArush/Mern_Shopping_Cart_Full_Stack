import React, {useState, useEffect} from 'react'
import Base from "../core/Base"
import { Link } from 'react-router-dom'
import {isAuthenticated} from "../auth/helper/index"
import {getProducts, deleteProduct} from "../admin/helper/adminapicall"

const ManageProducts = () => {
    const [products, setproducts] = useState([])

    const {user, token} = isAuthenticated()

    const preload = () =>{
        getProducts(user._id, token)
        .then(data => {
            if(data.error){
                console.log(data.error)
            }else{
                console.log(data)
                setproducts(data)
            }
        })
    }

    const deleteThisProduct = productId =>{
        deleteProduct(user._id, token, productId)
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
                            Total {products.length} Products
                        </h2>
                        {products.map((product, index)=>(
                            <>
                            <div key={index} className="row text-center m-3 p-2 bg-dark">
                            <div className="col-4">
                                <h3 className="text-white text-left">
                                    {product.name}
                                </h3>
                            </div>
                            <div className="col-4">
                                <Link className="btn btn-success" to = {`/admin/product/update/${product._id}`}>
                                    <span>Update</span>
                                </Link>
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

export default ManageProducts;