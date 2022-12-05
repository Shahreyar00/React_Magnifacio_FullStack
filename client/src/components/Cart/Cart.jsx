import React from "react";
import "./cart.scss";
import DeleteOutlinedIcon from "@mui/icons-material/DeleteOutlined";
import { useDispatch, useSelector } from "react-redux";
import { removeItem, resetCart } from "../../redux/cartReducer";
import { makeRequest } from "../../makeRequest";
import { loadStripe } from "@stripe/stripe-js";

const Cart = () => {
    const products = useSelector((state) => state.cart.products);
    const dispatch = useDispatch();

    // const products = [
    //     {
    //         id:1,
    //         img:"https://images.pexels.com/photos/11288118/pexels-photo-11288118.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //         img2:"https://images.pexels.com/photos/1007017/pexels-photo-1007017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         title:"Long Sleeve Graphic T-shirt",
    //         isNew:true,
    //         desc:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium temporibus unde sit, laudantium atque incidunt, harum voluptates blanditiis.",
    //         oldPrice:19,
    //         price:12,
    //         quantity: 1,
    //     },
    //     {
    //         id:2,
    //         img:"https://images.pexels.com/photos/14257256/pexels-photo-14257256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         img2:"https://images.pexels.com/photos/2800159/pexels-photo-2800159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //         title:"Top",
    //         isNew:true,
    //         desc:"Lorem, ipsum dolor sit amet consectetur adipisicing elit. Architecto accusantium temporibus unde sit, laudantium atque incidunt, harum voluptates blanditiis.",
    //         oldPrice:19,
    //         price:15,
    //         quantity: 2,
    //     },
    // ]

    const totalPrice = () => {
        let total = 0;
        products.forEach((item)=>{
            total+=item.quantity*item.price;
        });
        return total.toFixed(2);
    };

    const shorten = (str,maxLen,separator=' ') => {
        if (str.length <= maxLen) return str;
        return str.substr(0, str.lastIndexOf(separator, maxLen));
    }

    const stripePromise = loadStripe(
        process.env.REACT_APP_STRIPE_PROMISE
    );

    const handlePayment = async () => {
        try {
            const stripe = await stripePromise;
            const res = await makeRequest.post("/orders", {
                products,
            });
            await stripe.redirectToCheckout({
                sessionId: res.data.stripeSession.id,
            });
        
        } catch (err) {
            console.log(err);
        }
    };

    return (
        <div className="cart">
            <h1>Products in your cart</h1>
            {products?.map((item)=>(
                <div className="item" key={item.id}>
                    <img src={process.env.REACT_APP_UPLOAD_URL + item.img} alt="" />
                    <div className="details">
                        <h1>{item.title}</h1> 
                        {item.desc?.length>100?(
                            <p>
                                {shorten(item.desc,100)}...
                            </p>
                        ):(
                            <p>
                                {shorten(item.desc,100)}
                            </p>
                        )}
                        <div className="price">
                            {item.quantity} x ${item.price} = {item.quantity*item.price}
                        </div>
                    </div>
                    <DeleteOutlinedIcon 
                        className="delete"
                        onClick={()=>dispatch(removeItem(item.id))}
                    />
                </div>
            ))}
            <div className="total">
                <span>SUBTOTAL</span>
                <span>${totalPrice()}</span>
            </div>
            <button onClick={handlePayment}>PROCEED TO CHECKOUT</button>
            <span className="reset" onClick={() =>dispatch(resetCart())}>
                Reset Cart
            </span>
        </div>
    )
}

export default Cart