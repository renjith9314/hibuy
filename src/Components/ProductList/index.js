import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { GetProducts, AddToCart } from "../../Actions";
import { NavLink } from "react-router-dom";

const ProductList = (props) => {
    let [products, setProduct] = useState(props.products);
    let [isLoading, setLoading] = useState(props.isLoading);

    useEffect(() => {
        const { dispatch } = props;
        dispatch(GetProducts());
    }, []);

    setTimeout(() => {
        setProduct(props.products);
        setLoading(props.isLoading);
    }, 1);

    const { isAuthenticated } = props;

    const onClick = (productId) => {
        const { dispatch } = props;
        dispatch(AddToCart(productId));
    }


    return (
        <section className="wrapper product">
            <h4>Products</h4>
            <div className="row">
                {
                    isLoading
                        ? <div className="col-md-12 text-center">
                            <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                        : null
                }
                {products && products.map((item, i) => {
                    let productId = item.productId;
                    return (
                        <div className="col-md-3 mb-4" key={i}>
                            <div className="pdt-list">
                                <h6>{item.productName}{item.id}</h6>
                                {item.productImage
                                    ? <img src={`${item.productImage}`} alt={`${item.productName}`} />
                                    : <img src='http://www.intersped-logistics.ba/bundles/websitenews/img/no-thumbnail.jpg' alt={`${item.productName}`} />
                                }
                                <p>{item.productDesc}</p>                                
                                {isAuthenticated
                                    ? <div>
                                        <NavLink className="btn btn-primary" to="/cart" onClick={() => onClick(productId)}>Add to Cart</NavLink>
                                    </div>
                                    : null
                                }
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    );
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        products: state.product.products,
        isLoading: state.product.loading,
        message: state.product.message,
    };
}
export default connect(mapStateToProps, null)(ProductList);