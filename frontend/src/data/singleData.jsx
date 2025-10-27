import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import { toast } from 'react-toastify';
import { URL } from '../URL';
import { ToastContainer } from 'react-toastify';
import { IoArrowBackSharp } from "react-icons/io5";
import loader from '../assets/loader.gif';

const SingleData = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [file, setFile] = useState("");
    const [load2, setLoad2] = useState(false);

    const param = useParams();
    let navigate = useNavigate();
    let index = param.id;

    const getSinglePageData = async () => {
        try {
            setLoad2(true);
            let result = await fetch(`${URL}/data/getSingleData/${index}`);
            let data = await result.json();
            if (data.success) {
                let d1 = data?.data;
                setName(d1?.name);
                setPrice(d1?.price);
                setCompany(d1?.company);
                setCategory(d1?.category);
                setQuantity(d1?.quantity);
                setFile(d1?.url);
                setLoad2(false);
            }
        }
        catch (err) {
            toast.error("somethiong went wrong...", err.message);
            setLoad2(false);
        }
    }

    useEffect(() => {
        getSinglePageData();
    }, []);

    return (
        <>
            <ToastContainer />

            <div className="single-data">
                {load2 ? <div className="load"><img src={loader} alt="" /></div> : <><div className="image">{file && <img src={file} alt="" />}</div>
                    <div className="data">
                        <p>Name: {name.length > 13 ? name.slice(0, 10) + "..." : name}</p>
                        <p>Price: {String(price).length > 13 ? String(price).slice(0, 10) + "..." : price}</p>
                        <p>Company: {company.length > 13 ? company.slice(0, 10) + "..." : company}</p>
                        <p>Category: {category.length > 13 ? name.slice(0, 10) + "..." : name}</p>
                        <p>Quantity: {String(quantity).length > 13 ? String(quantity).slice(0, 10) + "..." : quantity}</p>
                    </div>
                    <div className="allData-btn" onClick={() => navigate(`/`)}>
                        <IoArrowBackSharp />Goto All Data
                    </div></>}
            </div>
        </>
    );
};
export default SingleData
