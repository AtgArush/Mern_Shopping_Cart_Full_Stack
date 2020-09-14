import React, {useState, useEffect} from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from "./Base"
import Card from './card'
import { loadCart } from './helper/CartHelper'



const Cart = () => {

    const [products, setproducts] = useState([])
    const [reload, setreload] = useState(false)

    useEffect(() => {
        setproducts(loadCart())
    }, [reload])

    const LoadAllProducts = () => {
        return(
            <div>
                <h2>This Section is to load Products</h2>
                {products.map((product, index)=>{
                    return (
                        <Card key={index} product={product} GoToCart={false} AddtoCart = {false} RemovefromCart={true} setReload = {setreload} reload = {reload} ></Card>
                    )
                })}
            </div>
        )
    }

    const LoadCheckOut = () => {
        return(
            <div>
                <h2>This Section is for CheckOut</h2>
            </div>
        )
    }



    return (
        <Base title="Cart Page" description = "Ready To Check Out">
            <div className="row">
                <div className="col-6">
                    {LoadAllProducts()}
                </div>
                <div className="col-6">
                    {LoadCheckOut()}
                </div>
            </div>
        </Base>
    )
}

export default Cart