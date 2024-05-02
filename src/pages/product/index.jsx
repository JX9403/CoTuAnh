import { useLocation, useParams } from "react-router-dom";

const ProductPage = () => { 
    let param = useParams();
    console.log(param);
    console.log(param.id);
    return (
        <>
            Product page
        </>
    )
}

export default ProductPage;