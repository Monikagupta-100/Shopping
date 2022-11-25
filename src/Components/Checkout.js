import React, { useState,useEffect } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useCart } from 'react-use-cart';
import StripeCheckout from "react-stripe-checkout";
import { toast } from 'react-toastify';
import axios from 'axios';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
  CardNumberElement,
} from '@stripe/react-stripe-js';

function Checkout() {
  const stripe = useStripe();
  const elements = useElements();
  const [PaymentMethod, setPaymentMethod] = useState('');
  const [payment, setPayment] = useState({
    firstname: "",
    lastname: "",
    address: "",
    country: "",
    postal: "",
    state: "",
    email: "",
    mob: ""
  })
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
  } = useCart()
  let carttotal = { cartTotal };
  const navigate = useNavigate();
  console.log(carttotal);
  const [checkbox, setCheckbox] = useState("false");
  // const handleToken=async (token,addresses)=>
  // {
  //    const response=await axios.post('/checkoutPayment',
  //   {
  //  token,carttotal
  //   })
  //   console.log(response)
  //   if(response.status===200)
  //    {
  // toast("Success!check email for details",{type:"success"});
  //   }
  //     else{
  //     toast("Something went wrong",{type:"errror"})
  //   }
  //  }

  // const makePayment = token => {


  //   const body = {
  //     token,
  //     cartTotal
  //   };
  //   const headers = { "Content-Type": "application/json" }
  //   // const userToken = JSON.parse(localStorage.getItem('token'))
  //   //   const headers = {
  //   //     Authorization: `Bearer ${userToken && userToken}`,
  //   //   }
  //   return fetch("/checkoutPayment", {
  //     method: "post",
  //     headers,
  //     body: JSON.stringify(body)
  //   })
  //     .then(response => {
  //       console.log("Response", response)
  //       const { status } = response;
  //       console.log("STATUS", status)
  //     }).catch(err =>
  //       console.log(err))
  // }
  //   axios.post("/checkoutPayment", body, headers).then((res) => {
  //     console.log("Payment Successful");
  //     const { status } = res.status;
  //     console.log("STATUS", status);
  //   }).catch((err) => {
  //     console.log(err);
  //   })
  // }


  const logoutfunction = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("react-use-cart")
    navigate("/")

  }
  const handleChange = (e) => {
    console.log(payment);
    setPayment({ ...payment, [e.target.name]: e.target.value })
  }
   const OrderPlace = async () => {
   const response = await axios.post("/cashpayment", {
      firstname: payment.firstname,
      lastname: payment.lastname,
      address: payment.address,
      country: payment.country,
      postal: payment.postal,
     state: payment.state,
     email: payment.email,
      mob: payment.mob
   })
    console.log(response);
   }

  const [clientSecret,setclientSecret]=useState()
console.log("clientSecret",clientSecret)

const fetchClientSecret = async () =>{
    const body = {
    cartTotal
  };
  const {data} = await axios.post("/makepayment",body)
  setclientSecret(data.clientSecret)
  console.log(data.clientSecret)
}

const confirmPayment = async(e) => {
  e.preventDefault()

  await stripe.confirmCardPayment(clientSecret,{
    payment_method:{
      card:elements.getElement(CardElement)
    },
  }).then((result)=>{
    alert('payment successfull')
    console.log(result);
  })
  .catch((err)=>console.warn(err))
}

useEffect(()=>{
 fetchClientSecret();
},[])
  return (
    <div>

      <div className="site-wrap">
        <header className="site-navbar" role="banner">
          <div className="site-navbar-top">
            <div className="container">
              <div className="row align-items-center">
                <div className="col-6 col-md-4 order-2 order-md-1 site-search-icon text-left">
                  <form action className="site-block-top-search">
                    <span className="icon icon-search2" />
                    <input type="text" className="form-control border-0" placeholder="Search" />
                  </form>
                </div>
                <div className="col-12 mb-3 mb-md-0 col-md-4 order-1 order-md-2 text-center">
                  <div className="site-logo">
                    <Link to="/" className="js-logo-clone">Shoppers</Link>
                  </div>
                </div>
                <div className="col-6 col-md-4 order-3 order-md-3 text-right">
                  <div className="site-top-icons">
                    <ul>
                      <li><a href="#"><span className="icon icon-person" /></a></li>
                      <li><a href="#"><span className="icon icon-heart-o" /></a></li>
                      <li>
                        <Link to="/cart" className="site-cart">
                          <span className="icon icon-shopping_cart" />
                          <span className="count">2</span>
                        </Link>
                      </li>
                      <li className="d-inline-block d-md-none ml-md-0"><a href="#" className="site-menu-toggle js-menu-toggle"><span className="icon-menu" /></a></li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <nav className="site-navigation text-right text-md-center" role="navigation">
            <div className="container">
              <ul className="site-menu js-clone-nav d-none d-md-block">
                <li className="has-children">
                  <Link to="/">Home</Link>
                  <ul className="dropdown">
                    <li><a href="#">Menu One</a></li>
                    <li><a href="#">Menu Two</a></li>
                    <li><a href="#">Menu Three</a></li>
                    <li className="has-children">
                      <a href="#">Sub Menu</a>
                      <ul className="dropdown">
                        <li><a href="#">Menu One</a></li>
                        <li><a href="#">Menu Two</a></li>
                        <li><a href="#">Menu Three</a></li>
                      </ul>
                    </li>
                  </ul>
                </li>
                <li className="has-children">
                  <Link to="/about">About</Link>
                  <ul className="dropdown">
                    <li><a href="#">Menu One</a></li>
                    <li><a href="#">Menu Two</a></li>
                    <li><a href="#">Menu Three</a></li>
                  </ul>
                </li>
                <li><Link to="/shop">Shop</Link></li>
                <li><a href="#">Catalogue</a></li>
                <li><a href="#">New Arrivals</a></li>
                <li><Link to="/contact">Contact</Link></li>
              </ul>
            </div>
          </nav>
        </header>
        <div className="bg-light py-3">
          <div className="container">
            <div className="row">
              <div className="col-md-12 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span> <a href="cart.html">Cart</a> <span className="mx-2 mb-0">/</span> <strong className="text-black">Checkout</strong></div>
            </div>
          </div>
        </div>
        <div className="site-section">
          <div className="container">
            <div className="row mb-5">
              <div className="col-md-12">
                <div className="border p-4 rounded" role="alert">
                  Returning customer? <a href="#">Click here</a> to login
                </div>
              </div>
            </div>
            <button onClick={logoutfunction} >Logout</button>

            <div className="row">

              <div className="col-md-6 mb-5 mb-md-0">
                <h2 className="h3 mb-3 text-black">Billing Details</h2>
                <div className="p-3 p-lg-5 border">
                  <div className="form-group">
                    <label htmlFor="c_country" className="text-black">Country <span className="text-danger">*</span></label>
                    <select id="c_country" name="country" onClick={handleChange} className="form-control">
                      <option value="india" name="country">India</option>
                      <option value="bangladesh" name="country">bangladesh</option>
                      <option value="algeria" name="country">Algeria</option>
                      <option value="afganistan" name="country">Afghanistan</option>
                      <option value="albania" name="country">Albania</option>
                      <option value="bahrain" name="country">Bahrain</option>
                      <option value="colombia" name="country">Colombia</option>
                    </select>
                  </div>
                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_fname" className="text-black">First Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" onChange={handleChange} id="c_fname" name="firstname" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_lname" className="text-black">Last Name <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" onChange={handleChange} cid="c_lname" name="lastname" />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-12">
                      <label htmlFor="c_address" className="text-black">Address <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="c_address" onChange={handleChange} name="address" placeholder="Street address" />
                    </div>
                  </div>

                  <div className="form-group row">
                    <div className="col-md-6">
                      <label htmlFor="c_state_country" className="text-black">State / Country <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" onChange={handleChange} id="c_state_country" name="state" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_postal_zip" className="text-black">Posta / Zip <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" onChange={handleChange} id="c_postal_zip" name="postal" />
                    </div>
                  </div>
                  <div className="form-group row mb-5">
                    <div className="col-md-6">
                      <label htmlFor="c_email_address" className="text-black">Email Address <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" onChange={handleChange} id="c_email_address" name="email" />
                    </div>
                    <div className="col-md-6">
                      <label htmlFor="c_phone" className="text-black">Phone <span className="text-danger">*</span></label>
                      <input type="text" className="form-control" id="c_phone" onChange={handleChange} name="mob" placeholder="Phone Number" />
                    </div>
                  </div>


                </div>

              </div>
              <div className="col-md-6">
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Coupon Code</h2>
                    <div className="p-3 p-lg-5 border">
                      <label htmlFor="c_code" className="text-black mb-3">Enter your coupon code if you have one</label>
                      <div className="input-group w-75">
                        <input type="text" className="form-control" id="c_code" placeholder="Coupon Code" aria-label="Coupon Code" aria-describedby="button-addon2" />
                        <div className="input-group-append">
                          <button className="btn btn-primary btn-sm" type="button" id="button-addon2">Apply</button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="row mb-5">
                  <div className="col-md-12">
                    <h2 className="h3 mb-3 text-black">Your Order</h2>
                    <div className="p-3 p-lg-5 border">
                      <table className="table site-block-order-table mb-5">
                        <thead>
                          <tr><th>Product</th>
                            <th>Total</th>
                          </tr></thead>
                        <tbody>
                          {items.map((item) => {
                            return (
                              <tr>
                                <td>{item.title} <strong className="mx-2">x</strong>{item.quantity}</td>
                                <td>₹{item.quantity * item.price}</td>
                              </tr>
                            )
                          })}
                          <tr>
                            <td className="text-black font-weight-bold"><strong>Order Total</strong></td>
                            <td className="text-black font-weight-bold"><strong>{cartTotal}</strong></td>
                          </tr>
                        </tbody>
                      </table>
                      <div className="border p-3 mb-3">
                        <label className="text-black">
                          Payment type <span className="text-danger">*</span>
                        </label>
                        <select
                          className="form-control"
                          name="PaymentMethod"
                          onClick={(e) => setPaymentMethod(e.target.value)}>
                          <option value="cod">Cash On delivery</option>
                          <option value="stripe">Pay using Stripe</option>

                        </select>
                      </div>
                      {/* <div className="border p-3 mb-3">
                        <h3 className="h6 mb-0"><a className="d-block" data-toggle="collapse" href="#collapsebank" role="button" aria-expanded="false" aria-controls="collapsebank">Direct Bank Transfer</a></h3>
                        <div className="collapse" id="collapsebank">
                          <div className="py-2">
                            <p className="mb-0">Make your payment directly into our bank account. Please use your Order ID as the payment reference. Your order won’t be shipped until the funds have cleared in our account.</p>
                          </div>
                        </div>
                      </div>
                      <div className="border p-3 mb-3">
                        <h3 className="h6 mb-0"><a className="d-block" data-toggle="collapse" href="#collapsecheque" role="button" aria-expanded="false" aria-controls="collapsecheque"> Payment on delivery</a></h3>
                        <div className="collapse" id="collapsecheque">
                          <div className="py-2">
                        
                            <form>
                              <input type="checkbox" name="checkbox" onClick={() => setCheckbox("true")} />
                              <label for="vehicle1"> Yes</label><br />
                              <input type="checkbox" name="checkbox" onClick={() => setCheckbox("false")} />
                              <label for="vehicle1">No</label><br />
                            </form>
                          </div>
                        </div>
                      </div> */}
                      {/* <div className="border p-3 mb-5">
                        <h3 className="h6 mb-0"><a className="d-block" data-toggle="collapse" href="#collapsepaypal" role="button" aria-expanded="false" aria-controls="collapsepaypal">Paypal</a></h3>
                        <div className="collapse" id="collapsepaypal">
                          <div className="py-2"> */}

                       <div className="form-group">
                        {
                          (PaymentMethod === "cod") ?
                            <Link
                              to="/thankyou"
                              className="btn btn-primary btn-lg py-3 btn-block"

                              onClick={OrderPlace}
                            >
                              Place Order
                            </Link> : 
                              // <StripeCheckout
                              //   stripeKey="pk_test_51KqIEtSJaq9WAKLHge2tJ8o5GqJmHnr9PZaEQxv1mPhl41ecbVeG8d8JPUvJnIlGLFVoKd3gbsPBTyxaGjPGFwAX00MTh4AH8k"
                              //   token={makePayment}
                              //   name="Buy now"
                              //   amount={cartTotal * 100}
                              //   shippingAddress
                              //   billingAddress
                              // >
                              //   <button className="btn btn-warning btn-lg py-3 btn-block">Pay with Stripe</button>
                              // </StripeCheckout>
                          <form>
                          <CardElement />
                          <button  onClick={confirmPayment} type="button" disabled={!stripe || !elements}>
                            Pay
                          </button>
                        </form>
                             }
                       
                      </div>  
                    
                      
                     
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
        <footer className="site-footer border-top">
          <div className="container">
            <div className="row">
              <div className="col-lg-6 mb-5 mb-lg-0">
                <div className="row">
                  <div className="col-md-12">
                    <h3 className="footer-heading mb-4">Navigations</h3>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li><a href="#">Sell online</a></li>
                      <li><a href="#">Features</a></li>
                      <li><a href="#">Shopping cart</a></li>
                      <li><a href="#">Store builder</a></li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li><a href="#">Mobile commerce</a></li>
                      <li><a href="#">Dropshipping</a></li>
                      <li><a href="#">Website development</a></li>
                    </ul>
                  </div>
                  <div className="col-md-6 col-lg-4">
                    <ul className="list-unstyled">
                      <li><a href="#">Point of sale</a></li>
                      <li><a href="#">Hardware</a></li>
                      <li><a href="#">Software</a></li>
                    </ul>
                  </div>
                </div>
              </div>
              <div className="col-md-6 col-lg-3 mb-4 mb-lg-0">
                <h3 className="footer-heading mb-4">Promo</h3>
                <a href="#" className="block-6">
                  <img src="images/hero_1.jpg" alt="Image placeholder" className="img-fluid rounded mb-4" />
                  <h3 className="font-weight-light  mb-0">Finding Your Perfect Shoes</h3>
                  <p>Promo from  nuary 15 — 25, 2019</p>
                </a>
              </div>
              <div className="col-md-6 col-lg-3">
                <div className="block-5 mb-5">
                  <h3 className="footer-heading mb-4">Contact Info</h3>
                  <ul className="list-unstyled">
                    <li className="address">203 Fake St. Mountain View, San Francisco, California, USA</li>
                    <li className="phone"><a href="tel://23923929210">+2 392 3929 210</a></li>
                    <li className="email">emailaddress@domain.com</li>
                  </ul>
                </div>
                <div className="block-7">
                  <form action="#" method="post">
                    <label htmlFor="email_subscribe" className="footer-heading">Subscribe</label>
                    <div className="form-group">
                      <input type="text" className="form-control py-4" id="email_subscribe" placeholder="Email" />
                      <input type="submit" className="btn btn-sm btn-primary" defaultValue="Send" />
                    </div>
                  </form>
                </div>
              </div>
            </div>
            <div className="row pt-5 mt-5 text-center">
              <div className="col-md-12">
                <p>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                  Copyright © All rights reserved | This template is made with <i className="icon-heart" aria-hidden="true" /> by <a href="https://colorlib.com" target="_blank" className="text-primary">Colorlib</a>
                  {/* Link back to Colorlib can't be removed. Template is licensed under CC BY 3.0. */}
                </p>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  );
}
export default Checkout;