import { useEffect, useState } from "react";
import { toast } from 'react-toastify';
import { useNavigate, useParams } from 'react-router';
import { BiLoaderAlt } from "react-icons/bi";
import { MdOutlineDriveFileRenameOutline } from "react-icons/md";
import { MdOutlinePriceCheck } from "react-icons/md";
import { TbCircleLetterC } from "react-icons/tb";
import { BiCategory } from "react-icons/bi";
import { URL } from "../URL";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { ToastContainer } from 'react-toastify';

const EditData = () => {

    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [company, setCompany] = useState("");
    const [category, setCategory] = useState("");
    const [quantity, setQuantity] = useState("");
    const [file, setFile] = useState(null);
    const [fileName, setFileName] = useState("");
    const [oldFile, setOldFile] = useState("");
    const [publicId, setPublicId] = useState("");

    const [error, setError] = useState(false);
    const [loading, setLoading] = useState(false);

    const param = useParams();
    let navigate = useNavigate();
    let index = param.id;

    const getSingleData = async () => {
        try {
            let result = await fetch(`${URL}/data/getSingleData/${index}`);
            let data = await result.json();
            if (data.success) {
                let d1 = data?.data;
                setName(d1?.name);
                setPrice(d1?.price);
                setCompany(d1?.company);
                setCategory(d1?.category);
                setQuantity(d1?.quantity);
                setOldFile(d1?.url);
                setFileName(d1?.fileName);
                setPublicId(d1?.public_id);
            }
        }
        catch (err) {
            toast.error("something went wrong...", err.message);
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (!name || !price || !company || !category || !quantity) {
                setError(true);
                return;
            }
            else if (name.trim() && category.trim() && company.trim()) {
                setLoading(true);
                let formData = new FormData();
                formData.append("name", name);
                formData.append("price", price);
                formData.append("company", company);
                formData.append("category", category);
                formData.append("quantity", quantity);
                if (file) {
                    formData.append("file", file);
                }
                formData.append("oldFile", oldFile);
                formData.append("fileName", fileName);
                formData.append("publicId", publicId);
                // console.log([...formData]);
                let result = await fetch(`${URL}/data/updateSingleData/${index}`, {
                    method: "put",
                    body: formData
                });

                let data = await result.json();
                if (data.success) {
                    navigate("/");
                    setLoading(false);
                    toast.success("data updated...");
                }
                else {
                    setLoading(false);
                    toast.error(data.message);
                }
            }
            else {
                setLoading(false);
                toast.warn("white space is not allowed...");
            }
        }
        catch (err) {
            setLoading(false);
            toast.error("something went wrong...", err.message);
        }
    }

    useEffect(() => {
        getSingleData();
    }, []);

    return (
        <>
            <ToastContainer />
            <div className="signup">
                <p className="heading1">EditData</p>
                <form onSubmit={handleSubmit}>
                    <div className="input-box1">
                        <MdOutlineDriveFileRenameOutline className="icon" /><input type="text" placeholder="Enter product name..." value={name} onChange={(e) => setName(e.target.value)} />
                    </div>
                    {error && !name && <p className="error-text">Enter Name</p>}
                    <div className="input-box1">
                        <MdOutlinePriceCheck className="icon" /><input type="number" placeholder="Enter product price..." value={price} onChange={(e) => setPrice(e.target.value)} />
                    </div>
                    {error && !price && <p className="error-text">Enter price</p>}
                    <div className="input-box1">
                        <TbCircleLetterC className="icon" /><input type="text" placeholder="Enter category name..." value={category} onChange={(e) => setCategory(e.target.value)} />
                    </div>
                    {error && !category && <p className="error-text">Enter category Name</p>}
                    <div className="input-box1">
                        <BiCategory className="icon" /><input type="text" placeholder="Enter company name..." value={company} onChange={(e) => setCompany(e.target.value)} />
                    </div>
                    {error && !company && <p className="error-text">Enter company Name</p>}
                    <div className="input-box1">
                        <MdOutlineProductionQuantityLimits className="icon" /><input type="number" placeholder="Enter quantity..." value={quantity} onChange={(e) => setQuantity(e.target.value)} />
                    </div>
                    {error && !quantity && <p className="error-text">Enter quantity</p>}

                    {/* for file */}
                    <div className="edit-img">
                        <div className="input-box-file1">
                            <input type="file" className="input-file" onChange={(e) => setFile(e.target.files[0])} />
                        </div>
                        <div className="show-img">
                            {oldFile && <img src={oldFile} alt="broken image" />}
                            <input type="hidden" value={oldFile} />
                            <input type="hidden" value={fileName} />
                            <input type="hidden" value={publicId} />
                        </div>
                    </div>
                    <div>
                        <button type="submit" className="submit-btn" disabled={loading}>{loading ? <span>Updating...<BiLoaderAlt className="loading-icon" /></span> : "Update"}</button>
                    </div>
                </form>
            </div>
        </>
    );
}

export default EditData;