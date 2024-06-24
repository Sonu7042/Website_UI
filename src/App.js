import './App.css'
import { Outlet } from "react-router-dom";
import Header from './components/Header'
import Footer from './components/Footer'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useEffect, useState } from "react";
import SummeryApi from './common/index'
import Context from "./context";
import { useDispatch } from 'react-redux'
import { setUserDetails } from "./store/userSlice";


function App() {

  const dispatch = useDispatch()

  const [cartProductCount, setCartProductCount] = useState(0)

  const fetchUserDetails = async () => {
    const response = await fetch(SummeryApi.current_user.url, {
      method: SummeryApi.current_user.method,
      credentials: "include"
    })
    const json = await response.json()
    if (json.success) {
      dispatch(setUserDetails(json.data))


    }
  }



  const fetchUserAddToCart = async () => {
    const response = await fetch(SummeryApi.addToCardProductCount.url, {
      method: SummeryApi.addToCardProductCount.method,
      credentials: "include",

    })

    const json = await response.json()
    setCartProductCount(json?.data?.count)
    // console.log("json", json)
  }







  useEffect(() => {
    // user Details
    fetchUserDetails()
    // detail of add to cart
    fetchUserAddToCart()

  }, [])


  return (
    <>

      <Context.Provider value={{
        fetchUserDetails,  // user detail fetch

        //current user add to product to count
        cartProductCount,   
        fetchUserAddToCart  

      }}>

        <ToastContainer position='top-center' />

        <Header />
        <main className="min-h-[calc(100vh-120px)] pt-16">
          <Outlet />
        </main>
        <Footer />


      </Context.Provider>

    </>

  );
}

export default App;
