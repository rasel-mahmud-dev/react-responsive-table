import React, { useState } from "react";
// import data from "./data.json";

import Table, { Column } from "./table/Table";

function App() {
    const columns: Column[] = [
        {
            title: "Image",
            dataIndex: "coverPhoto",
            render: (i: string) => <img className="w-10" src="img_avatar5.png" alt="" />,
        },
        {
            title: "Title",
            dataIndex: "title",
            sorter: (a: string, b: string) => {
                return a.toLowerCase() > b.toLowerCase() ? 1 : a.toLowerCase() < b.toLowerCase() ? -1 : 0;
            },
        },
        {
            title: "brandId",
            dataIndex: "brandId",
        },
        {
            title: "categoryId",
            dataIndex: "categoryId",
        },
        {
            title: "Price",
            dataIndex: "price",
            sorter: (a: number, b: number) => {
                return a > b ? 1 : a < b ? -1 : 0;
            },
        },
        {
            title: "Stock",
            dataIndex: "qty",
            sorter: (a: number, b: number) => {
                return a > b ? 1 : a < b ? -1 : 0;
            },
        },
        {
            title: "Sold",
            dataIndex: "sold",
            sorter: (a: number, b: number) => {
                return a > b ? 1 : a < b ? -1 : 0;
            },
        },
    ];

    const [state, setState] = useState<any>({
        pageSize: 10,
        currentPage: 1,
    });

    const data = new Array(1000).fill(1).map((_, index) => ({
        title: "Lenovo IdeaPad 3 Core i3 10th Gen -- " + index,
        qty: index,
        sold: index,
        categoryId: "60df5e546419f56b97610607",
        price: 410 + index,
        brandId: "613511bba937c621233341c8",
        createdAt: "2011-08-04T11:55:16.887Z",
        coverPhoto: "",
    }));

    return (
        <div className="App p-4 md:p10">
            <h1 className="text-3xl my-6 text-center font-bold">Responsive Table</h1>
            <div>
                <label htmlFor="">Per Page show</label>
                <input
                    type="text"
                    className="border-2 border-amber-400"
                    placeholder="show items"
                    onChange={(e) => setState({ ...state, pageSize: e.target.value })}
                />
            </div>
            <div className="mt-10">
                <div className="card">
                    <Table
                        className=""
                        fixed={true}
                        dataSource={data ? data : []}
                        scroll={{ x: 800, y: 450 }}
                        columns={columns}
                        pagination={{ pageSize: state.pageSize, currentPage: 1 }}
                    />
                </div>
            </div>
        </div>
    );
}

export default App;
