import React, {useState, useEffect} from 'react'
import Base from "../core/Base"
import {Link, Redirect} from "react-router-dom"
import { getCategories, createProduct } from './helper/adminapicall'
import {isAuthenticated} from "../auth/helper/index"

const AddProduct = () => {

    const {user, token} = isAuthenticated()

    const [values, setvalues] = useState({
        name: "",
        description: "",
        price: "",
        stock: "",
        photo: "",
        categories: [],
        category: "",
        loading: false,
        error: "",
        createdProduct: "",
        formData: ""
    })

    const {name, description,price,stock, categories, category, loading, error, createdProduct, formData} = values

    const preload = () => {
        getCategories()
        .then(data => {
            console.log(data)
            if (data.error) {
                setvalues({...values, error: data.error})
            }
            else{
                setvalues({...values,  error: "", categories: data, formData: new FormData() })
            }
        })
    }

    useEffect(() => {
            preload()
    }, [])

    const createProductForm = () => (
        <form >
          <span>Post photo</span>
          <div className="form-group">
        <label className="btn btn-block btn-success">
          <input
            onChange={handleChange("photo")}
            type="file"
            name="photo"
            accept="image"
            placeholder="choose a file"
          />
        </label>
      </div>
          <div className="form-group">
            <input
              onChange={handleChange("name")}
              name="photo"
              className="form-control"
              placeholder="Name"
              value={name}
            />
          </div>
          <div className="form-group">
            <textarea
              onChange={handleChange("description")}
              name="photo"
              className="form-control"
              placeholder="Description"
              value={description}
            />
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("price")}
              type="number"
              className="form-control"
              placeholder="Price"
              value={price}
            />
          </div>
          <div className="form-group">
            <select
              onChange={handleChange("category")}
              className="form-control"
              placeholder="Category"
            >
              <option>Select</option>
              {categories && categories.map((category, index)=>{
                  return(
                      <option key={index} value = {category._id}>{category.name}</option>
                  )
              })}
            </select>
          </div>
          <div className="form-group">
            <input
              onChange={handleChange("stock")}
              type="number"
              className="form-control"
              placeholder="Quantity"
              value={stock}
            />
          </div>
          
          <button type="submit" onClick={onSubmit} className="btn btn-warning">
            Create Product
          </button>
        </form>
      );

    const onSubmit = (event) =>{
        event.preventDefault()
        setvalues({...values, error: "", loading:true})
        createProduct(user._id, token, formData)
        .then(data => {
            if (data.error) {
                console.log(data.error)
                setvalues({...values, error: data.error})
            }else{
                setvalues({
                    ...values,
                    name:"",
                    description:"",
                    price: "",
                    photo: "",
                    stock: "",
                    loading: false,
                    createdProduct: data.name 
                })
            }
        })
    }
    const handleChange = name => event =>{
        const value = name === "photo" ? event.target.files[0] : event.target.value
        formData.set(name, value);
        setvalues({...values, [name]: value})
    }

    const successMessage = () =>{
        return(
        <div style={{ display: createdProduct ? "" : "none" }} 
        className="alert alert-success mt-3">
            <h4>{createdProduct} created successfully</h4>
        </div>)
    }

    const errorMessage = () =>{
        return(
        <div style={{ display: error ? "" : "none" }} 
        className="alert alert-danger mt-3">
            <h4>Create Product Failed</h4>
        </div>)
    }

    return (
        <Base title="Welcome Admin" 
        description="Add new products from here"
        classname="container bg-success p-4"
        >
            <Link to="/admin/dashboard" className="btn btn-dark mb-3">Admin Dashboard</Link>
            <div className="p-4 bg-dark">
            <div className="row bg-dark text-white rounded">
                <div className="col-md-8 offset-md-2">
                    {successMessage()}
                    {errorMessage()}
                    {createProductForm()}
                </div>
            </div>
        </div></Base>
    )
}
export default AddProduct
