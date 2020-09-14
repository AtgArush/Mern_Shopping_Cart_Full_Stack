import React, {useState} from 'react'
import Base from "../core/Base"
import {isAuthenticated} from "../auth/helper/index"
import {Link} from "react-router-dom"
import {createCategory} from "./helper/adminapicall"

const AddCategory = () => {
    const [name, setname] = useState("")
    const [error, seterror] = useState(false)
    const [success, setsuccess] = useState(false)

    const {user, token} = isAuthenticated()

    const goBack = () =>{
        return(
        <div className="mt-5">
            <Link className="btn btn-outline-warning mb-3" to = "/admin/dashboard">
                Admin Home
            </Link>
        </div>)
    }

    const handleChange = event =>{
        seterror ("")
        setname(event.target.value)
    }

    const onSubmit = (event) =>{
        event.preventDefault()
        seterror("")
        setsuccess(false)

        createCategory(user._id, token, {name})
        .then(data =>{
            if(data.error){
                seterror(true)
            }else{
                seterror(false)
                setsuccess(true)
                setname("")
            }
        })
        .catch(err => console.log(err))
    }

    const successMessage = () => {
        if(success){
            return(
            <h4 className="bg-dark text-warning">Category created successfully</h4>
            )
        }
    }

    const warningMessage = () => {
        if(error) {
            return(
                <h4 className="bg-dark text-danger">Error saving category</h4>
            )
        }
    }

    const categoryForm = () =>(
        <form>
            <div className="form-group">
                <p className="lead">Enter the Category</p>
                <input 
                type="text" 
                className="form-control my-3"
                onChange={handleChange}
                value={name}
                autoFocus
                required
                placeholder="Like Summer"
                style={{border: "3px #ffc107 solid"}}
                />
                <button onClick={onSubmit} className="btn btn-outline-warning">Create Category</button>
            </div>
        </form>
    )

    return (
        <Base 
        title = {`Welcome, ${isAuthenticated().user.name}`} 
        description="Create a new Category for Your T-Shirts"
        classname = "container bg-warning p-4"
        >
            <div className="row bg-dark rounded">
                <div className="col-md-8 offset-md-2 text-white">
                    {successMessage()}
                    {warningMessage()}
                    {categoryForm()}
                    {goBack()}
                </div>
            </div>
        </Base>
    )
}

export default AddCategory