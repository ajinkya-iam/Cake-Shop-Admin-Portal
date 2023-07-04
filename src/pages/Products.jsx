import { Button, Popconfirm, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";
import { collection, addDoc, getDocs, doc, setDoc } from "firebase/firestore";
import { firestore } from "../firebase";
import { BiExport } from "react-icons/bi";
import moment from "moment/moment";

const Products = () => {
    const history = useHistory();

    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(false);

    const handlePathChnage = () => {
        history.push("/add-product");
    };

    async function fetchProductList() {
        setLoading(true);
        const querySnapshot = await getDocs(collection(firestore, "products"));

        const jsonData = [];

        querySnapshot.forEach((doc) => {
            jsonData.push(doc.data());
        });

        console.log(JSON.stringify(jsonData));
        setData(jsonData);
        setLoading(false);
    }

    useEffect(() => {
        fetchProductList();
    }, []);

    const columns = [
        {
            title: "Product Name",
            dataIndex: "product_name",
            key: "product_name",
        },
        {
            title: "Weight",
            dataIndex: "product_weight",
            key: "product_weight",
        },
        {
            title: "Price",
            dataIndex: "product_price",
            key: "product_price",
        },
        {
            title: "Type",
            dataIndex: "product_type",
            key: "product_type",
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Tag
                            color={
                                text === "Veg" ? "green-inverse" : "red-inverse"
                            }
                            className="uppercase"
                        >
                            {text}
                        </Tag>
                    </Space>
                );
            },
        },
        {
            title: "Last Updated",
            dataIndex: "update_at",
            key: "update_at",
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <p>{moment(text).format("MMM DD yyyy")}</p>
                    </Space>
                );
            },
        },
        {
            title: 'Action',
            key: 'action',
            render: (text,record,index) => (
                <Space size="middle" key={index}>
                    <Button 
                    // onClick={() => handleEditButton(record)} 
                    type='default' >Edit</Button>
                    <Popconfirm
                        title="Delete Device"
                        description={record.process_type_name?.length > 0 ? `This device is attached with process. Are you sure you want to delete?` : "Are you sure to delete?"}
                        // onConfirm={() => deleteDevice(record.device_id)}
                        okText="Yes"
                        okType='danger'
                        cancelText="No"
                    >
                        <Button danger>Delete</Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <>
            <header className="w-full top-0 h-16 pt-2 bg-white">
                <div className="flex w-full justify-between it">
                    <h1 className="text-2xl py-2 font-semibold text-black">
                        Products List
                    </h1>
                    <Button onClick={() => handlePathChnage()} danger>
                        Add Product
                    </Button>
                </div>
            </header>

            <div className="bg-white shadow-lg rounded-md px-10 py-4 my-5">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-blue-950 font-semibold text-xl">
                            Active Products
                        </h1>
                        <p className="text-gray-600 font-medium text-sm">
                            Products Summery
                        </p>
                    </div>
                    <Button
                        type="default"
                        className="uppercase text-xs"
                        icon={<BiExport />}
                    >
                        Export
                    </Button>
                </div>
                <Table
                    className="mt-5"
                    columns={columns}
                    dataSource={data}
                    loading={loading}
                />
            </div>
        </>
    );
};

export default Products;
