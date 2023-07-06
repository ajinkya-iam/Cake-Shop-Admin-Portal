import { Button, Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { orders } from "../assets/OrderData";
import { BiExport } from "react-icons/bi";

const Orders = () => {
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
                            className="uppercase font-semibold"
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
            <header className="w-full top-0 h-16 pt-2">
                <h1 className="text-2xl py-2 font-semibold text-black">
                    Orders
                </h1>
            </header>
            <div>
                <div className="bg-white shadow-lg rounded-md px-10 py-4 my-5">
                    <div className="flex w-full justify-between">
                        <div className="flex flex-col">
                            <h1 className="text-blue-950 font-semibold text-xl">
                                Total Orders
                            </h1>
                            <p className="text-gray-600 font-medium text-sm">
                                Orders Summery
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
            </div>
        </>
    );
};

export default Orders;
