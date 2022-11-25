import React from 'react';
import {Link,useParams} from 'react-router-dom';
import {useEffect,useState} from 'react';
 import {useCart } from "react-use-cart";
import axios from 'axios';

function Shopsingle() {
  const [cartproductstate,setcartproductstate]=useState([]);
 const [cart,setCart]=useState({title:"",para:"",id:"",filePath:"",category:"",price:""});
 const [SingleProduct,setSingleProduct]=useState();
  console.log("SingleProduct",SingleProduct);
  const {id}=useParams();
  const {addItem}=useCart();



   const getUsers=async()=>
  {const cartproduct=await axios.get(`/cartproduct/${id}`)
  .then((res)=>
 
  {

  console.log(res.data[0]);
  })
}

  const getSingleProduct = async()=>{
    try {
      const {data}=await axios.get(`/cartproduct/${id}`)
      setcartproductstate(data[0]);
      console.log("data",data);
      setSingleProduct(data[0])
    } catch (error) {
      console.log(error);
    }
  }
  
  useEffect(()=>
  {
    getSingleProduct();
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
                    <li className="active"><Link to="/shop">Shop</Link></li>
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
                  <div className="col-md-12 mb-0"><Link to="/">Home</Link> <span className="mx-2 mb-0">/</span> <strong className="text-black">Shop</strong></div>
                </div>
              </div>
            </div>  
            <div className="site-section">
              <div className="container">
                <div className="row">
                  <div className="col-md-6">
                    <img src={cartproductstate.filePath} alt={cartproductstate.filePath} className="img-fluid" />
                  </div>
                  <div className="col-md-6">
                    <h2 className="text-black">{cartproductstate.title}</h2>
                    <p>{cartproductstate.para}</p>
                    <p className="mb-4">Ex numquam veritatis debitis minima quo error quam eos dolorum quidem perferendis. Quos repellat dignissimos minus, eveniet nam voluptatibus molestias omnis reiciendis perspiciatis illum hic magni iste, velit aperiam quis.</p>
                    <p><strong className="text-primary h4">₹{cartproductstate.price}</strong></p>
                    <div className="mb-1 d-flex">
                      <label htmlFor="option-sm" className="d-flex mr-3 mb-3">
                        <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-sm" name="shop-sizes" /></span> <span className="d-inline-block text-black">Small</span>
                      </label>
                      <label htmlFor="option-md" className="d-flex mr-3 mb-3">
                        <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-md" name="shop-sizes" /></span> <span className="d-inline-block text-black">Medium</span>
                      </label>
                      <label htmlFor="option-lg" className="d-flex mr-3 mb-3">
                        <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-lg" name="shop-sizes" /></span> <span className="d-inline-block text-black">Large</span>
                      </label>
                      <label htmlFor="option-xl" className="d-flex mr-3 mb-3">
                        <span className="d-inline-block mr-2" style={{top: '-2px', position: 'relative'}}><input type="radio" id="option-xl" name="shop-sizes" /></span> <span className="d-inline-block text-black"> Extra Large</span>
                      </label>
                    </div>
                    {/* <div className="mb-5">
                      <div className="input-group mb-3" style={{maxWidth: '120px'}}>
                        <div className="input-group-prepend">
                          <button className="btn btn-outline-primary js-btn-minus" type="button">−</button>
                        </div>
                        <input type="text" className="form-control text-center" defaultValue={1} placeholder aria-label="Example text with button addon" aria-describedby="button-addon1" />
                         <div className="input-group-append">
                          <button className="btn btn-outline-primary js-btn-plus" type="button">+</button>
                        </div> 
                      </div>
                    </div> */}
                    <p><Link
                    to="/cart"
                    className="buy-now btn btn-sm btn-primary"
                    onClick={() => {
                      let item = {
                        ...SingleProduct,
                        id: SingleProduct._id,
                      }
                      addItem(item)
                    }}
                  >
                    Add To Cart
                  </Link></p>
                  
                  </div>
                </div>
              </div>
            </div>
            <div className="site-section block-3 site-blocks-2 bg-light">
              <div className="container">
                <div className="row justify-content-center">
                  <div className="col-md-7 site-section-heading text-center pt-4">
                    <h2>Featured Products</h2>
                  </div>
                </div>
                <div className="row">
                  <div className="col-md-12">
                    <div className="nonloop-block-3 owl-carousel">
                      <div className="item">
                        <div className="block-4 text-center">
                          <figure className="block-4-image">
                            <img src={`./Backend/${cartproductstate.filePath}`}alt="Image placeholder" className="img-fluid" />
                          </figure>
                          <div className="block-4-text p-4">
                            <h3><a href="#">Tank Top</a></h3>
                            <p className="mb-0">Finding perfect t-shirt</p>
                            <p className="text-primary font-weight-bold">$50</p>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="block-4 text-center">
                          <figure className="block-4-image">
                            <img src="../images/shoe_1.jpg" alt="Image placeholder" className="img-fluid" />
                          </figure>
                          <div className="block-4-text p-4">
                            <h3><a href="#">Corater</a></h3>
                            <p className="mb-0">Finding perfect products</p>
                            <p className="text-primary font-weight-bold">$50</p>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="block-4 text-center">
                          <figure className="block-4-image">
                            <img src="images/cloth_2.jpg" alt="Image placeholder" className="img-fluid" />
                          </figure>
                          <div className="block-4-text p-4">
                            <h3><a href="#">Polo Shirt</a></h3>
                            <p className="mb-0">Finding perfect products</p>
                            <p className="text-primary font-weight-bold">$50</p>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="block-4 text-center">
                          <figure className="block-4-image">
                            <img src="images/cloth_3.jpg" alt="Image placeholder" className="img-fluid" />
                          </figure>
                          <div className="block-4-text p-4">
                            <h3><a href="#">T-Shirt Mockup</a></h3>
                            <p className="mb-0">Finding perfect products</p>
                            <p className="text-primary font-weight-bold">$50</p>
                          </div>
                        </div>
                      </div>
                      <div className="item">
                        <div className="block-4 text-center">
                          <figure className="block-4-image">
                            <img src="images/shoe_1.jpg" alt="Image placeholder" className="img-fluid" />
                          </figure>
                          <div className="block-4-text p-4">
                            <h3><a href="#">Corater</a></h3>
                            <p className="mb-0">Finding perfect products</p>
                            <p className="text-primary font-weight-bold">$50</p>
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
export default Shopsingle;