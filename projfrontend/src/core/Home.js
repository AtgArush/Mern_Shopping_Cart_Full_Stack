import React, {useState, useEffect} from 'react'
import "../styles.css"
import {API} from "../backend"
import Base from "./Base"
import Card from './card'
import { getProducts, getAllProducts } from './helper/coreapicalls'



export default function Home() {
    
    const [products, setproducts] = useState([])
    const [error, seterror] = useState(false)
    const [productList, setproductList] = useState(false)

    const loadAllProduct = () => {
        if (productList) {
            getAllProducts()
        .then(data=> {
            if(data.error){
                console.log(error)
                seterror(data.error)
            }
            else{
                setproducts(data)
            }
        })
        }else{
            getProducts()
        .then(data=> {
            if(data.error){
                console.log(error)
                seterror(data.error)
            }
            else{
                setproducts(data)
            }
        })
        }
    }


    const toggleProductList = () => {
        if(productList){
            setproductList(false)
        }else{
            setproductList(true)
        }
        loadAllProduct()
    }

    useEffect(() => {
        loadAllProduct()
    }, [])

    return (
        <Base title="Home Page" description = "Welcome to the T-Shirt store">
            <h1 className="text-white">All Products</h1>
            <div className="row">
                {products.map((product, index)=>{
                    return(
                    <div className="col-4">
                        <Card product = {product}/>
                    </div>
                    )
                })}
            </div>
            <button onClick={toggleProductList} className="lead bg-info font-weight-normal text-wrap text-dark font-weight-bold rounded pl-2">
                Load All Products??
            </button>
        </Base>
    )
}
