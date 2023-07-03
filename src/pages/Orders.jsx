import { Space, Table, Tag } from "antd";
import React, { useState } from "react";
import { orders } from "../assets/OrderData";

const Orders = () => {

  const [data,setData] = useState(orders)
  const [loading,setLoading] = useState(false)


  const columns = [
    {
      title: 'Order ID',
      dataIndex: 'order_id',
      key: 'order_id'
    },
    {
      title:'Cake Name',
      dataIndex:'cake_name',
      key:'cake_name'
    },
    {
      title:'Order Date',
      dataIndex:'create_date',
      key:'create_date'
    },
    {
      title:'Weight',
      dataIndex:'weight',
      key:'weight'
    },
    {
      title:'Price',
      dataIndex:'price',
      key:'price'
    },
    {
      title:'Status',
      dataIndex:'status',
      key:'status',
      render: (text, record) => {
        return (
            <Space size="middle" >
                <Tag color={text === "complete" ? 'green-inverse' : text === "pending" ? 'yellow-inverse' : 'red-inverse'} className='uppercase'>
                    {text}
                </Tag>
            </Space>
        );
    }
    }

  ]

  return (
    <>
      <header className="w-full top-0 h-16 pt-2">
        <h1 className="text-2xl py-2 font-semibold text-black">Orders</h1>
      </header>
      <div>
        <Table
          columns={columns}
          dataSource={data}
          loading={loading}
        />
      </div>
    </>
  );
};

export default Orders;
