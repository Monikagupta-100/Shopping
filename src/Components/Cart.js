import React from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import {useCart} from 'react-use-cart';
function Cart() {
  const {
    isEmpty,
    totalUniqueItems,
    items,
    totalItems,
    cartTotal,
    updateItemQuantity,
    removeItem,
  } = useCart()
  let navigate=useNavigate();
  const token=localStorage.getItem("token")

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
                  <div className="col-md-12 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span> <strong className="text-black">Cart</strong></div>
                </div>
              </div>
            </div>
            <div className="site-section">
              <div className="container">
                <div className="row mb-5">
                  <form className="col-md-12" method="post">
                    <div className="site-blocks-table">
                      <table className="table table-bordered">
                        <thead>
                          <tr>  
                            <th className="product-thumbnail">Image</th>
                            <th className="product-name">Product</th>
                            <th className="product-price">Price</th>
                            <th className="product-quantity">Quantity</th>
                            <th className="product-total">Total</th>
                            <th className="product-remove">Remove</th>
                          </tr>
                        </thead>
                        <tbody>
                          {items.map((item)=>
                          {return(
                          <tr>
                            <td className="product-thumbnail">
                              <img src={item.filePath} alt="Image" className="img-fluid" />
                            </td>
                            <td className="product-name">
                              <h2 className="h5 text-black">{item.title}</h2>
                            </td>
                            <td>{item.price}</td>
                            <td>
                              <div className="input-group mb-3" style={{maxWidth: '120px'}}>
                                <div className="input-group-prepend">
                                  <button className="btn btn-outline-primary js-btn-minus" onClick={()=>updateItemQuantity(item.id,item.quantity-1)} type="button">−</button>
                                </div>
                                <input type="text" className="form-control text-center" value={item.quantity}  placeholder aria-label="Example text with button addon" aria-describedby="button-addon1" />
                                <div className="input-group-append">
                                  <button className="btn btn-outline-primary js-btn-plus" onClick={()=>updateItemQuantity(item.id,item.quantity+1)}  type="button">+</button>
                                </div>
                              </div>
                            </td>
                            <td>{item.price*item.quantity}</td>
                            <td><a onClick={()=>removeItem(item.id)} href="#" className="btn btn-primary btn-sm">X</a></td>
                          </tr>
                          )})}
                        
                        </tbody>
                      </table>
                    </div>
                  </form>
                </div>
                <div className="row">
                  <div className="col-md-6">
                    <div className="row mb-5">
                    
                      <div className="col-md-6">
                        <button className="btn btn-outline-primary btn-sm btn-block">Continue Shopping</button>
                      </div>
                    </div>
                    <div className="row">
                      <div className="col-md-12">
                        <label className="text-black h4" htmlFor="coupon">Coupon</label>
                        <p>Enter your coupon code if you have one.</p>
                      </div>
                      <div className="col-md-8 mb-3 mb-md-0">
                        <input type="text" className="form-control py-3" id="coupon" placeholder="Coupon Code" />
                      </div>
                      <div className="col-md-4">
                        <button className="btn btn-primary btn-sm">Apply Coupon</button>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-6 pl-5">
                    <div className="row justify-content-end">
                      <div className="col-md-7">
                        <div className="row">
                          <div className="col-md-12 text-right border-bottom mb-5">
                            <h3 className="text-black h4 text-uppercase">Cart Totals</h3>
                          </div>
                        </div>
                        {/* <div className="row mb-3">
                          <div className="col-md-6">
                            <span className="text-black">Subtotal</span>
                          </div>
                          <div className="col-md-6 text-right">
                            <strong className="text-black">$230.00</strong>
                          </div>
                         </div> */}
                        <div className="row mb-5">
                          <div className="col-md-6">
                            <span className="text-black">Total</span>
                          </div>
                          <div className="col-md-6 text-right">
                            <strong className="text-black">₹{cartTotal}</strong>
                          </div>
                        </div>
                        <div className="row">
                          <div className="col-md-12">
                            <button onClick={()=>{token?navigate("/checkout"):navigate("/login")}} className="btn btn-primary btn-lg py-3 btn-block"><Link to="/checkout">Proceed To Checkout</Link></button>
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
export default Cart;