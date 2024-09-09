import { useEffect, useState } from "react";
import "./App.css";
import Category from "./Category";
import axios from "axios";

function App() {
  let [finalCategory, setFinalCategory] = useState([]);
  let [finalPro, setFinalPro] = useState([]);
  let [error, setError] = useState(null);
  let [catName, setCatname] = useState("");

  let getCategory = () => {
    axios
      .get("https://dummyjson.com/products/categories")
      .then((res) => setFinalCategory(res.data))
      .catch((err) => setError(err.message));
  };

  let getProduct = () => {
    axios
      .get("https://dummyjson.com/products")
      .then((prores) => setFinalPro(prores.data.products))
      .catch((err) => setError(err.message)); // Handle error if needed
  };

  useEffect(() => {
    getCategory();
    getProduct();
  }, []);

  useEffect(() => {
    if (catName !== "") {
      axios
        .get(`https://dummyjson.com/products/category/${catName}`)
        .then((prores) => setFinalPro(prores.data.products))
        .catch((err) => setError(err.message)); // Handle error if needed
    }
  }, [catName]);

  let Pitems = Array.isArray(finalPro)
    ? finalPro.map((product, index) => {
        return <ProductItems key={index} pdata={product} />;
      })
    : null;

  return (
    <>
      <div className="py-[40px]">
        <div className="max-w-[1320px] mx-auto">
          <h1 className="text-center text-[40px] font-bold mb-[30px]">
            Our Products
          </h1>
          {error ? (
            <div className="text-red-500">Error: {error}</div>
          ) : (
            <div className="grid grid-cols-[30%_auto] gap-[20px]">
              <div>
                <Category
                  finalCategory={finalCategory}
                  setCatname={setCatname}
                />
              </div>
              <div>
                <div className="grid grid-cols-3 gap-5">
                  {finalPro.length >= 1 ? Pitems : "No Products Found"}
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

export default App;

function ProductItems({ pdata }) {
  console.log(pdata);
  return (
    <div className="shadow-lg text-center pb-4 pt-2">
      <img
        src={pdata.thumbnail}
        alt="img-product"
        className="w-[100%] h-[220px]"
      />
      <h4>{pdata.title}</h4>
      <b>RS {pdata.price}</b>
    </div>
  );
}
