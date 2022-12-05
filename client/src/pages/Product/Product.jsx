import React, { useState } from "react";
import { useParams } from "react-router-dom";
import "./product.scss";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import BalanceIcon from "@mui/icons-material/Balance";
import { useDispatch } from "react-redux";
import { addToCart } from "../../redux/cartReducer";
import useFetch from "../../hooks/useFetch";

const Product = () => {
    const id = useParams().id;
    const [selectedImg, setSelectedImg] = useState("img");
    const [quantity, setQuantity] = useState(1);
    

    const dispatch = useDispatch();
    const { data, loading, error } = useFetch(`/products/${id}?populate=*`);

    // const images = [
    //     "https://images.pexels.com/photos/14257256/pexels-photo-14257256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     "https://images.pexels.com/photos/2800159/pexels-photo-2800159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //     "https://images.pexels.com/photos/11288118/pexels-photo-11288118.jpeg?auto=compress&cs=tinysrgb&w=1600",
    // ]

    return (
        <div className="product">
            {error 
                ?"Something went wrong!" 
                :loading
                ?"Loading"
                : (
                <>
                    <div className="left">
                        <div className="images">
                            <img
                                src={
                                    process.env.REACT_APP_UPLOAD_URL +
                                    data?.attributes?.img?.data?.attributes?.url
                                }
                                alt=""
                                onClick={(e) => setSelectedImg("img")}
                            />
                            <img
                                src={
                                    process.env.REACT_APP_UPLOAD_URL +
                                    data?.attributes?.img2?.data?.attributes?.url
                                }
                                alt=""
                                onClick={(e) => setSelectedImg("img2")}
                            />
                            </div>
                            <div className="mainImg">
                            <img
                                src={
                                    process.env.REACT_APP_UPLOAD_URL +
                                    data?.attributes[selectedImg]?.data?.attributes?.url
                                }
                                alt=""
                            />
                        </div>
                    </div>
                    <div className="right">
                        <h1>{data?.attributes?.title}</h1>
                        <span className="price">$ {data?.attributes?.price}</span>
                        <p>
                        {data?.attributes?.desc}
                        </p>
                        <div className="quantity">
                            <button onClick={()=>setQuantity((prev)=>(prev===1?1:prev-1))}>-</button>
                            {quantity}
                            <button onClick={()=>setQuantity((prev)=>(prev+1))}>+</button>
                        </div>
                        <button
                            className="add"
                            onClick={()=>
                                dispatch(
                                    addToCart({
                                        id: data.id,
                                        title: data.attributes.title,
                                        desc: data.attributes.desc,
                                        price: data.attributes.price,
                                        img: data.attributes.img.data.attributes.url,
                                        quantity,
                                    })
                                )
                            }
                        >
                            <AddShoppingCartIcon /> ADD TO CART
                        </button>
                        <div className="links">
                            <div className="item">
                                <FavoriteBorderIcon /> ADD TO WISH LIST
                            </div>
                            <div className="item">
                                <BalanceIcon /> ADD TO COMPARE
                            </div>
                        </div>
                        <div className="info">
                            <span>Vendor: Magnifacio exclusive</span>
                            <span>Product Type: Summer Dress</span>
                            <span>Tag: Dress, Top, Women, T-Shirt</span>
                        </div>
                        <hr />
                        <div className="info">
                            <span>DESCRIPTION</span>
                            <hr />
                            <span>ADDITIONAL INFORMATION</span>
                            <hr />
                            <span>FAQ</span>
                            <hr />
                        </div>
                    </div>
                </>
                ) 
            }
        </div>
    );
};

export default Product;