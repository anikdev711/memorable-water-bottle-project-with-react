import { useEffect, useState } from "react";
import Bottle from "../Bottle/Bottle";
import './Bottles.css'
import { addToLs, getStoredCart, removeFromLs } from "../../utilities/localstorage";
import Cart from "../Cart/Cart";


const Bottles = () => {
    const [bottles, setBottles] = useState([]);
    const [cart, setCart] = useState([]);

    useEffect(() => {
        fetch('bottles.json')
            .then(res => res.json())
            .then(data => setBottles(data))
    }, [])

    //load cart from local storage
    useEffect(()=>{
        console.log('called the useEffect', bottles.length);
        if(bottles.length>0){
            const storedCart = getStoredCart();
            console.log(storedCart, bottles);
            const savedCart = [];
            for(const id of storedCart){
                console.log(id);
                const bottle = bottles.find(bottle => bottle.id === id)
                if(bottle){
                    savedCart.push(bottle)
                }
            }
            console.log('saved cart', savedCart);
            setCart(savedCart);
        }
    },[bottles])

    const handleCart = bottle => {
        // console.log(bottle);
        const newCart = [...cart, bottle];
        setCart(newCart);
        addToLs(bottle.id)
    }

    const handleRemoveFromCart = id =>{
        const remainingCart = cart.filter(bottle => bottle.id !== id)
        setCart(remainingCart)
        removeFromLs(id)
    }

    return (
        <div>
            <h3>Bottles: {bottles.length}</h3>
            {/* <h4>Cart: {cart.length}</h4> */}
            <Cart cart={cart} handleRemoveFromCart={handleRemoveFromCart}></Cart>
            <div className="bottle-container">
                {
                    bottles.map(bottle => <Bottle 
                        key={bottle.id} 
                        bottle={bottle} 
                        handleCart={handleCart}></Bottle>)
                }
            </div>

        </div>
    );
};

export default Bottles;