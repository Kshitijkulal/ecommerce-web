import React, { useState, useEffect } from "react";
import AdminMenu from "../../components/layout/AdminMenu";
import Layout from "../../components/layout/Layout";
import axios from "axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

const Products = () => {
  const [products, setProducts] = useState([]);

  // get all products

  const getAllProducts = async () => {
    try {
      const { data } = await axios.get(`api/v1/product/get-products`);
      setProducts(data.products);
    } catch (error) {
      toast.error(`Something went wrong while getting products`);
    }
  };

  // lifecycle method
  useEffect(() => {
    getAllProducts();
  }, []);

  return (
    <Layout>
      <div className="row">
        <div className="col-md-3">
          <AdminMenu />
        </div>
        <div className="col-md-9">
          <h1 className="text-center">All Products List</h1>
          <div className="d-flex">
          {products?.map((prod) => (
            <Link key = {prod._id} to={`/dashboard/admin/product${prod.slug}`} className = "product-link">
            <div className="card m-2" style={{ width: "18rem" }}>
              <img src={prod.photo} className="card-img-top" alt={prod.name}/>
              <div className="card-body">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">
                  {prod.description}
                </p>
              </div>
            </div>
            </Link>
          ))}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Products;
