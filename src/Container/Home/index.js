import React, { useEffect, useState } from "react";
import { connect } from "react-redux";
import Banner from "../../Components/Banner"
import { GetProducts } from "../../Actions";

const Home = props => {
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

    console.log(isLoading)

    return (
        <div>
            <Banner />
            <section className="wrapper product">
                <h4>Products</h4>
                <div className="row">
                    {
                        isLoading
                        ?<div className="col-md-12 text-center">
                            <div class="lds-ellipsis"><div></div><div></div><div></div><div></div></div>
                        </div>
                        :null
                    }                    
                    {products && products.map((item, i) => {
                        return (
                            <div className="col-md-3 mb-4" key={i}>
                                <div className="pdt-list">
                                    <h6>{item.productName}</h6>
                                    {item.productImage
                                        ? <img src={`${item.productImage}`} alt={`${item.productName}`} />
                                        : <img src='http://www.intersped-logistics.ba/bundles/websitenews/img/no-thumbnail.jpg' alt={`${item.productName}`} />
                                    }
                                    <p>{item.productDesc}</p>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    );
};

function mapStateToProps(state) {
    return {
        isAuthenticated: state.auth.isAuthenticated,
        products: state.product.products,
        isLoading: state.product.loading,
    };
}
export default connect(mapStateToProps, null)(Home);