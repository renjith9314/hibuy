import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import { Redirect } from "react-router-dom";
import { GetCartProducts, RemoveFromCart } from "../../Actions";

const Cart = (props) => {

    let [cartdata, setCart] = useState(props.cart);
    let [isCartFetched, setLoading] = useState(props.isCartFetched);

    useEffect(() => {
        const { dispatch } = props;
        setTimeout(() => {
            setCart(props.cart);
            dispatch(GetCartProducts());
        }, 500);

    }, []);

    setTimeout(() => {
        setCart(props.cart);
        setLoading(props.isCartFetched);
    }, 10);

    const onClick = (productId) => {
        const { dispatch } = props;
        dispatch(RemoveFromCart(productId));
    }

    const { isAuthenticated, isCartLoaded } = props;

    if (isCartLoaded) {
        if (isAuthenticated) {
            return (
                <div>
                    {
                        !isCartFetched
                            ? <div className="g-loader">
                                <div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                            </div>
                            : null
                    }
                    <section className="main-content">
                        <h5><span>Cart</span></h5>
                        {
                            (cartdata.length > 0)
                                ?
                                <div>
                                    {
                                        cartdata && cartdata.map((item, i) => {
                                            let productId = item.productId;
                                            return (
                                                <div className="pdt-list" key={i}>
                                                    <div className="cart-row">
                                                        <div className="cart-col">
                                                            {item.productImage
                                                                ? <img src={`${item.productImage}`} alt={`${item.productName}`} />
                                                                : <img src='http://www.intersped-logistics.ba/bundles/websitenews/img/no-thumbnail.jpg' alt={`${item.productName}`} />
                                                            }
                                                        </div>
                                                        <div className="cart-col">
                                                            <h6>{item.productName}{item.id}</h6>
                                                            <p>{item.productDesc}</p>
                                                            <p><button type="button" onClick={() => onClick(productId)} className="btn btn-primary btn-sm">Remove</button></p>
                                                        </div>
                                                    </div>
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                :
                                <div>No products added</div>
                        }

                    </section>
                </div>
            );
        }
        else {
            return <Redirect to="/login" />;
        }
    }
    else {
        return (<div className="g-loader"><div className="lds-ellipsis"><div></div><div></div><div></div><div></div></div></div>)
    }
}

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        cart: state.product.cart,
        isCartFetched: state.product.isCartFetched,
        isCartLoaded: state.product.isCartLoaded
    };
}
export default connect(mapStateToProps)(Cart);