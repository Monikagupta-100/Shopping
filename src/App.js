import About from './Components/About';
import Cart from './Components/Cart';
import Checkout from './Components/Checkout';
import Contact from './Components/Contact';
import Index from './Components/Index';
import Shop from './Components/Shop';
import Shopsingle from './Components/Shopsingle';
import Thankyou from './Components/Thankyou';
import {BrowserRouter,Routes,Route} from 'react-router-dom'
import { CartProvider} from "react-use-cart";
import Login from './Components/Login';
import Register from './Components/Register';
import {loadStripe} from '@stripe/stripe-js';
import {
  CardElement,
  Elements,
  useStripe,
  useElements,
} from '@stripe/react-stripe-js';

function App() {
  const stripePromise = loadStripe('pk_test_51KqIEtSJaq9WAKLHge2tJ8o5GqJmHnr9PZaEQxv1mPhl41ecbVeG8d8JPUvJnIlGLFVoKd3gbsPBTyxaGjPGFwAX00MTh4AH8k');
  return (<>
     <CartProvider>
<BrowserRouter>
<Routes>
<Route path="/" element={<Index/>}/>
<Route path="/about" element={<About/>}/>
<Route path="/cart" element={<Cart/>}/>
<Route path="/checkout" element={
   <Elements stripe={stripePromise}>
     <Checkout/>
   </Elements>
}/>
<Route path="/contact" element={<Contact/>}/>
<Route path="/shop" element={<Shop/>}/>
<Route path="/shopsingle/:id" element={<Shopsingle/>}/>
<Route path="/thankyou" element={<Thankyou/>}/>
<Route path="/login" element={<Login/>}/>
<Route path="/register" element={<Register/>}/>
</Routes>
</BrowserRouter>
</CartProvider>

  </>
 
  );
}

export default App;
