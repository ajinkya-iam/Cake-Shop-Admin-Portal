import { Button, Space, Table, Tag } from "antd";
import React, { useEffect, useState } from "react";
import { BiExport } from "react-icons/bi";
import { HiDocumentReport } from "react-icons/hi";
import { AiFillTag } from "react-icons/ai";
import { BsFillPersonCheckFill, BsFillPersonFill } from "react-icons/bs";
import { IoIosStats } from "react-icons/io";
import { orders } from "../assets/OrderData";

const Dashboard = () => {
    const [data, setData] = useState(orders);
    const [loading, setLoading] = useState(false);


    const columns = [
        {
            title: "Order ID",
            dataIndex: "order_id",
            key: "order_id",
        },
        {
            title: "Cake Name",
            dataIndex: "cake_name",
            key: "cake_name",
        },
        {
            title: "Order Date",
            dataIndex: "create_date",
            key: "create_date",
        },
        {
            title: "Weight",
            dataIndex: "weight",
            key: "weight",
        },
        {
            title: "Price",
            dataIndex: "price",
            key: "price",
        },
        {
            title: "Status",
            dataIndex: "status",
            key: "status",
            render: (text, record) => {
                return (
                    <Space size="middle">
                        <Tag
                            color={
                                text === "complete"
                                    ? "green-inverse"
                                    : text === "pending"
                                    ? "yellow-inverse"
                                    : "red-inverse"
                            }
                            className="uppercase"
                        >
                            {text}
                        </Tag>
                    </Space>
                );
            },
        },
    ];

    return (
        <>
            <header className="w-full top-0 h-16 pt-2 fixed bg-white">
                <h1 className="text-2xl py-2 font-semibold text-black">
                    Dashboard
                </h1>
            </header>

            <div className="bg-white shadow-lg rounded-md px-10 py-8 my-5 mt-14">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-blue-950 font-semibold text-xl">
                            Today's Sales
                        </h1>
                        <p className="text-gray-600 font-medium text-sm">
                            Sales Summery
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-4 gap-10">
                    <div className="flex flex-col bg-gradient-to-t from-pink-50 to-pink-100 mt-8 w-full h-[140px] rounded-md px-4 py-3">
                        <IoIosStats
                            className="bg-pink-500 text-white p-1 rounded-full w-8 h-8"
                            size={24}
                        />
                        <h1 className="text-2xl font-semibold text-blue-950 mt-5">
                            ₹ 10,000
                        </h1>
                        <p className="text-sm font-semibold mt-2">
                            Total Sales
                        </p>
                    </div>
                    <div className="flex flex-col bg-gradient-to-t from-orange-50 to-orange-100 mt-8 w-full h-[140px] rounded-md px-4 py-3">
                        <HiDocumentReport
                            className="bg-orange-500 text-white p-1 rounded-full w-8 h-8"
                            size={24}
                        />
                        <h1 className="text-2xl font-semibold text-blue-950 mt-5">
                            100
                        </h1>
                        <p className="text-sm font-semibold mt-2">
                            Total Orders
                        </p>
                    </div>
                    <div className="flex flex-col bg-gradient-to-t from-green-50 to-green-100 mt-8 w-full h-[140px] rounded-md px-4 py-3">
                        <AiFillTag
                            className="bg-green-500 text-white p-1 rounded-full w-8 h-8"
                            size={24}
                        />
                        <h1 className="text-2xl font-semibold text-blue-950 mt-5">
                            10
                        </h1>
                        <p className="text-sm font-semibold mt-2">
                            Product Sold
                        </p>
                    </div>
                    <div className="flex flex-col bg-gradient-to-t from-purple-50 to-purple-100 mt-8 w-full h-[140px] rounded-md px-4 py-3">
                        <BsFillPersonFill
                            className="bg-purple-500 text-white p-1 rounded-full w-8 h-8"
                            size={24}
                        />
                        <h1 className="text-2xl font-semibold text-blue-950 mt-5">
                            4
                        </h1>
                        <p className="text-sm font-semibold mt-2">
                            New Costomers
                        </p>
                    </div>
                </div>
            </div>

            <div className="bg-white shadow-lg rounded-md px-10 py-8 my-5">
                <div className="flex w-full justify-between">
                    <div className="flex flex-col">
                        <h1 className="text-blue-950 font-semibold text-xl">
                            Today's Order
                        </h1>
                        <p className="text-gray-600 font-medium text-sm">
                            Order Summery
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

export default Dashboard;
