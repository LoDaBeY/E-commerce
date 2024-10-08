import Header2 from "Components/Header/Header2/Header2";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { addToBasket } from "../../Redux/userSlice";
import { toast } from "react-toastify";
import Comments from "../../Components/Comments/Comments";
import { CircularProgress, useTheme } from "@mui/material";
import Magnifier from "react18-image-magnifier";
import { useTranslation } from "react-i18next";

export default function ProductDetails() {
  const [comments, setcomments] = useState(false);
  const theme = useTheme().palette.mode;
  const [Isloading, setIsloading] = useState(false);

  const HandleComments = () => {
    setcomments((prev) => !prev);
  };
  const [Product, setProduct] = useState(null);
  const { id } = useParams();
  const API = process.env.REACT_APP_BASE_URL;

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      setIsloading(true);
      const response = await fetch(`${API}/api/products/${id}`);
      const data = await response.json();
      setProduct(data.product);
      setIsloading(false);
    };
    fetchProduct();
  }, [id]);

  const dispatch = useDispatch();
  // @ts-ignore
  const user = useSelector((state) => state.UserStore);
  const nevigate = useNavigate();

  const BasketHandler = (P) => {
    if (user.currentUser === null) {
      toast.warning("Please login to add to cart");
      nevigate("/login");
    } else {
      dispatch(addToBasket(P));
      toast.success("Added to basket");
    }
  };
const {t} = useTranslation()
  return (
    <div className="relative">
      <Header2 />
      <div
        className={`container mx-auto my-10 p-5 ${
          theme === "dark" ? "text-white" : "text-black"
        }`}
      >
        {Isloading ? (
          <div className="w-full h-dvh flex justify-center items-center">
            <CircularProgress />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
            <div className="relative">
              <Magnifier
                src={Product?.img}
                className="rounded-lg w-full h-full object-cover p-3"
              />

              <div className="absolute -bottom-10 left-0 right-0 opacity-75 rounded-lg px-4 mt-4 text-center font-bold ">
                {Product?.name}
              </div>
            </div>
            <div>
              <h1 className="text-2xl font-bold mb-4">
                {Product?.description}
              </h1>
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 text-yellow-500"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                    strokeWidth={2}
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371.26 1.605.643l.738 1.405c.234.447.177 1.072-.219 1.455l-5.28 8.073c-.27.409-.683.617-1.083.54-.396-.077-.792-.406-.99-.807L11.049 2.927z"
                    />
                  </svg>
                  <span className="ml-2">{Product?.rating}</span>
                </div>
                <span className="ml-4 ">{Product?.ratingCount} Review</span>
                <span className="ml-4 ">
                  | {Product?.ratingCount} Question & Answer
                </span>
              </div>

              <div className="flex items-center mb-4">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6 "
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth={2}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
                <span className="ml-2 ">
                  27.5B in people's carts, get it while it lasts!
                </span>
              </div>
              <p className="text-4xl font-bold  mb-4">$ {Product?.price}</p>
              <button
                type="button"
                onClick={() => {
                  BasketHandler(Product);
                }}
                className="bg-orange-500 hover:bg-orange-600  transition-all duration-300 font-bold py-2 px-4 rounded-lg w-full mb-4"
              >
              {t("Add to basket")}
              </button>

              <div className="bg-slate-400 rounded-lg px-4 py-2 mb-4">
                <h3 className="text-lg font-bold  mb-2">
                  Estimated Shipping: Within 3 days
                </h3>
                <p className="text-gray-900">See some of customers reviews!</p>
                <button
                  onClick={HandleComments}
                  className="text-blue-500 font-bold"
                >
                  See Reviews
                </button>
              </div>
            </div>
          </div>
        )}
        <div className="mt-10">
          <h2 className="text-lg font-bold  mb-4">Highlights:</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div>
              <h3 className=" font-bold mb-2">Additional name</h3>
              <p className="">Organik</p>
            </div>
            <div>
              <h3 className=" font-bold mb-2">Volume</h3>
              <p className="">100-199 ml</p>
            </div>
            <div>
              <h3 className=" font-bold mb-2">Impact</h3>
              <p className="">Besleyici / Onarıcı</p>
            </div>
          </div>
        </div>
        <div className="mt-10">
          <h3 className="font-bold mb-4">
            This product will be sent by HC CARE.
          </h3>
          <ul className="list-disc pl-6 ">
            <li>
              More than 100 stocks to be sold at the campaign price presented.
            </li>
            <li>
              The sales price of the product you have reviewed is determined by
              the seller.
            </li>
            <li>
              A product can be sold by more than one seller. Sellers of products
              offered for sale by more than one seller can sell the product
              based on the price they set for the product, seller points,
              delivery status.
            </li>
          </ul>
        </div>
        <Comments
          comments={comments}
          HandleComments={HandleComments}
          title={Product?.name}
        />
      </div>
    </div>
  );
}
