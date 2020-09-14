import React, {useState, useEffect} from 'react'
import ImageHelper from './helper/ImageHelper';
import { Redirect } from 'react-router-dom';
import { addItemToCart, removeItemFromCart } from './helper/CartHelper';

const Card = ({product, AddtoCart = true, GoToCart = true , RemovefromCart = false, setReload = f => f, reload = undefined}) => {

    const [redirect, setredirect] = useState(false)
    const [count, setCount] = useState(product.count)

    const cardTitle = product ? product.name : "Photo From Pexels"
    const cardDescription = product ? product.description : "Default Description"
    const cardPrice = product ? product.price : "DEFAULT"


    const showAddtoCart = () => {
        if (AddtoCart) {
            return(
            <button
                onClick={addToCart}
                className="btn btn-block btn-success mt-2 mb-2"
              >
                Add to Cart
              </button>)
        }
    }

    const showGotoCart = () => {
      if (GoToCart) {
          return(
            <button onClick={setRedirect} className="btn btn-block btn-warning mt-2 mb-2">
                Go To Cart
            </button>
            )
      }
  }

    const showRemovefromCart = () => {
        if (RemovefromCart) {
            return(
            <button
                onClick={()=>{
                  removeItemFromCart(product._id)
                  setReload(!reload)
                }}
                className="btn btn-block btn-danger mt-2 mb-2"
              >
                Remove from cart
              </button>)
        }
    }

    const addToCart = () =>{
        addItemToCart(product, ()=>{
        })
    }

    const setRedirect = () => {
      setredirect(true)
    }

    const getRedirect = () =>{
        if(redirect){
            return(
                <Redirect to="/cart" />
            )
        }
    }

    return (
      <>
      <div className="card text-white bg-dark border border-info m-2">
        <div className="card-header bg-success m-2 lead">{cardTitle}</div>
        <div className="card-body">
            {getRedirect()}
          <ImageHelper product = {product} />
          <div className="row">
              <div className="col-12">
                <p className="lead bg-warning font-weight-normal text-wrap text-dark font-weight-bold text-center rounded">
                    {cardDescription}
                </p>
              </div>
              <div className="col-4">
          <p className="lead bg-info font-weight-normal text-wrap text-dark font-weight-bold rounded pl-2">Rs. {cardPrice} </p>
              </div>
          </div>
          

          <div className="row">
            <div className="col-6">
              {showAddtoCart()}
            </div>
            <div className="col-6">
              {showGotoCart()}
            </div>
          </div>
          <div className="col-12">
              {showRemovefromCart()}
            </div>
        </div>
      </div>
      <div className="row bg-dark p-2"></div>
      </>
    );
};
export default Card