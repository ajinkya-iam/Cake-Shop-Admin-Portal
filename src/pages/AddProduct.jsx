import { Button, Form, Input, Select, Upload, message } from "antd";
import React, { useState } from "react";
import { PlusOutlined, LoadingOutlined } from "@ant-design/icons";
import { type, weights } from "../assets/OrderData";
import { storage } from "../firebase";
import {
    getDownloadURL,
    getStorage,
    ref,
    uploadBytes,
    uploadString,
} from "firebase/storage";

import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { useHistory } from 'react-router-dom/cjs/react-router-dom.min';

const AddProduct = () => {
    const collectionRef = collection(firestore, 'products');
    const history = useHistory();
    const [loading, setLoading] = useState(false);
    const [imageUrl, setImageUrl] = useState();
    const [jsonData, setJsonData] = useState({
        product_name: "",
        product_price: "",
        product_type: "",
        product_weight: "",
        product_url: "",
        id: doc(collectionRef).id,
        create_at: Date.now(),
        update_at: Date.now(),
        is_deleted: false,
    });

    async function uploadData() {
        try {
            const docRef = doc(collectionRef, jsonData.id)
            await setDoc(docRef, jsonData)
            message.success("Successfully uploaded")
            history.goBack()
        } catch (e) {
            console.log(e.message);
            console.error("Error adding document: ");
        }
    }

    const handleUploadData = () => {
        const isAnyFieldEmpty = Object.values(jsonData).some(
            (value) => value === ""
        );

        if (isAnyFieldEmpty) {
            console.log("Some fields are empty. Cannot upload data.");
            message.warning("Some fields are empty. Cannot upload data.");
        } else {
            uploadData()
        }
    };

    const handleChange = (info) => {
        if (info.file.status === "uploading") {
            setLoading(true);
        }
        if (info.file.status === "done") {
            setLoading(false);
            getBase64(info.file.originFileObj, (url) => {
                setLoading(false);
                setImageUrl(url);
            });
        }
    };

    const handleUpload = async (file) => {
        const storageRef = ref(storage, "images/" + file.name);
        await uploadBytes(storageRef, file);
        const downloadURL = await getDownloadURL(storageRef);
        setLoading(false);
        console.log("Image uploaded to Firebase:", downloadURL);
        setJsonData({ ...jsonData, product_url: downloadURL });
    };

    console.log("Json Data: ", jsonData);

    const uploadButton = (
        <div>
            {loading ? <LoadingOutlined /> : <PlusOutlined />}
            <div
                style={{
                    marginTop: 8,
                }}
            >
                Upload
            </div>
        </div>
    );

    return (
        <Form>
            <header className="w-full top-0 h-16 pt-2 bg-white">
                <div className="flex justify-between items-center  w-[800px]">
                    <h1 className="text-2xl py-2 font-semibold text-black">
                        Add Products
                    </h1>
                    <Button
                        onClick={() => handleUploadData()}
                        className="bg-sky-400 text-white font-semibold"
                    >
                        Upload
                    </Button>
                </div>
            </header>

            <Form
                className="grid grid-cols-2 gap-10 w-[800px]"
                layout="vertical"
            >
                <Form.Item label="Product Name" required>
                    <Input
                        placeholder="Product Name"
                        onChange={(e) =>
                            setJsonData({
                                ...jsonData,
                                product_name: e.target.value,
                            })
                        }
                    />
                </Form.Item>

                <Form.Item label="Product Weight" required>
                    <Select
                        defaultValue={"Select Weight"}
                        onSelect={(value) =>
                            setJsonData({ ...jsonData, product_weight: value })
                        }
                        options={weights}
                    />
                </Form.Item>

                <Form.Item label="Product Price ( In ₹ )" required>
                    <Input
                        inputMode="decimal"
                        placeholder="Product Price"
                        onChange={(e) =>
                            setJsonData({
                                ...jsonData,
                                product_price: e.target.value,
                            })
                        }
                    />
                </Form.Item>

                <Form.Item label="Product Type" required>
                    <Select
                        defaultValue={"Select Type"}
                        onSelect={(value) =>
                            setJsonData({ ...jsonData, product_type: value })
                        }
                        options={type}
                    />
                </Form.Item>
            </Form>

            <Upload
                name="avatar"
                listType="picture-card"
                className="avatar-uploader mt-10"
                showUploadList={true}
                action={handleUpload}
                beforeUpload={beforeUpload}
                onChange={handleChange}
            >
                {imageUrl ? (
                    <img
                        src={imageUrl}
                        alt="avatar"
                        style={{
                            width: "100%",
                        }}
                    />
                ) : (
                    uploadButton
                )}
            </Upload>
        </Form>
    );
};

const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
};

const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
        message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 20;
    if (!isLt2M) {
        message.error("Image must smaller than 20MB!");
    }
    return isJpgOrPng && isLt2M;
};

export default AddProduct;
