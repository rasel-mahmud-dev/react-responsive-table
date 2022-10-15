import React, { useState } from 'react';
import data from './data.json';

import Table from './table/Table';

function App() {

  const columns = [
    {
      title: 'Image',
      dataIndex: 'coverPhoto',
      render: (i: string) => <img src={i} alt="" />,
    },
    {
      title: 'Title',
      dataIndex: 'title',
      sorter: (a: any, b: any) => {
        return a > b ? 1 : a < b ? -1 : 0;
      },
    },
    {
      title: 'brandId',
      dataIndex: 'brandId',
    },
    {
      title: 'categoryId',
      dataIndex: 'categoryId',
    },
    {
      title: 'Price',
      dataIndex: 'price',
      sorter: (a: any, b: any) => {
        return a > b ? 1 : a < b ? -1 : 0;
      },
    },
    {
      title: 'Stock',
      dataIndex: 'qty',
    },
    {
      title: 'Sold',
      dataIndex: 'sold',
    },
  ];
  

  return (
    <div className="App p-5">
      <h1 className="text-3xl my-6 text-center font-bold">App JS</h1>
      <div className="card">
        <Table
          className=""
          fixed={true}
          dataSource={data ? data : []}
          scroll={{x: 1000, y: 500}}
          columns={columns}
        />
      </div>
    </div>
  );
}

export default App;
