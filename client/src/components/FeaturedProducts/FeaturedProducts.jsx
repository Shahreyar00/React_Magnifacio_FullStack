import React from "react";
import "./featuredProducts.scss";
import Card from "../Card/Card";
import useFetch from "../../hooks/useFetch";

const FeaturedProducts = ({ type }) => {
    // const error = false;
    // const loading = false;
    // let data;

    // if(type==="featured"){
    //     data = [
    //         {
    //             id:1,
    //             img:"https://images.pexels.com/photos/11288118/pexels-photo-11288118.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //             img2:"https://images.pexels.com/photos/1007017/pexels-photo-1007017.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             title:"Long Sleeve Graphic T-shirt",
    //             isNew:true,
    //             oldPrice:19,
    //             price:12,
    //         },
    //         {
    //             id:2,
    //             img:"https://images.pexels.com/photos/1152994/pexels-photo-1152994.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             img2:"https://images.pexels.com/photos/601316/pexels-photo-601316.jpeg?auto=compress&cs=tinysrgb&w=1600",
    //             title:"Skirt",
    //             isNew:true,
    //             oldPrice:29,
    //             price:18,
    //         },
    //         {
    //             id:3,
    //             img:"https://images.pexels.com/photos/9187786/pexels-photo-9187786.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             img2:"https://images.pexels.com/photos/8362984/pexels-photo-8362984.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             title:"Hat",
    //             isNew:false,
    //             oldPrice:22,
    //             price:16,
    //         },
    //         {
    //             id:4,
    //             img:"https://images.pexels.com/photos/375880/pexels-photo-375880.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             img2:"https://images.pexels.com/photos/1381553/pexels-photo-1381553.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             title:"Coat",
    //             isNew:false,
    //             oldPrice:20,
    //             price:17,
    //         }
    //     ]
    // } else{
    //     data = [
    //         {
    //             id:5,
    //             img:"https://images.pexels.com/photos/2068349/pexels-photo-2068349.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             img2:"https://images.pexels.com/photos/3908081/pexels-photo-3908081.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             title:"Jeans for your style and comfort",
    //             isNew:true,
    //             oldPrice:29,
    //             price:22,
    //         },
    //         {
    //             id:6,
    //             img:"https://images.pexels.com/photos/14257256/pexels-photo-14257256.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             img2:"https://images.pexels.com/photos/2800159/pexels-photo-2800159.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             title:"Top",
    //             isNew:true,
    //             oldPrice:19,
    //             price:15,
    //         },
    //         {
    //             id:7,
    //             img:"https://images.pexels.com/photos/11383130/pexels-photo-11383130.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             img2:"https://images.pexels.com/photos/9336309/pexels-photo-9336309.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             title:"Ash Jacket",
    //             isNew:false,
    //             oldPrice:22,
    //             price:16,
    //         },
    //         {
    //             id:8,
    //             img:"https://images.pexels.com/photos/2632670/pexels-photo-2632670.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             img2:"https://images.pexels.com/photos/2496157/pexels-photo-2496157.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
    //             title:"Lingerie",
    //             isNew:false,
    //             oldPrice:20,
    //             price:17,
    //         }
    //     ]
    // }

    // const [data, setData] = useState([]);

    // useEffect(()=>{
    //     const fetchData = async() => {
    //         try{
    //             const res = await axios.get(
    //                 process.env.REACT_APP_API_URL + "/products",
    //                 {
    //                     headers:{
    //                         Authorization:"bearer "+process.env.REACT_APP_API_TOKEN,
    //                     },
    //                 }
    //             );
    //             setData(res.data.data);
    //         }catch(err){
    //             console.log(err);
    //         }
    //     };
    //     fetchData();
    // },[]);

    const { data, loading, error } = useFetch(
        `/products?populate=*&[filters][type][$eq]=${type}`
    );
        
    return (
        <div className="featuredProducts">
            <div className="top">
                <h1>{type} products</h1>
                <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Quis ipsum
                    suspendisse ultrices gravida.
                </p>
            </div>
            <div className="bottom">
                {error
                    ? "Something went wrong!"
                    : loading
                    ? "Loading"
                    : data?.map((item)=><Card item={item} key={item.id} />)
                }
            </div>
        </div>
    );
};

export default FeaturedProducts;