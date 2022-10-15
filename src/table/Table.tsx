import React, {FC, HTMLAttributes, useEffect, useState} from 'react';
import Thead from './Thead';
import Tbody from './Tbody';

import './style.css';
import {list} from "postcss";

export interface Column extends HTMLAttributes<HTMLElement> {
  id?: string;
  title: string;
  dataIndex?: string;
  className?: string;
  colWidth?: number;
    sorter?: (args: any)=>any,
  render?: (key: string) => React.ReactNode;
}[];


interface TableProps extends HTMLAttributes<HTMLTableElement> {
  dataSource: any;
  theadClass?: { th?: string; td?: string; thead?: string };
  tbodyClass?: { tr?: string; td?: string; tbody?: string };
  columns: Column[];
  scroll?: {x?: number, y?:number}
    fixed?: boolean
}

const Table: FC<TableProps> = (props) => {
  const { theadClass, tbodyClass, className, dataSource, columns, fixed, scroll } = props;
  let fixedTable = {maxHeight: 0, minWidth: 0}

    const [state, setState] = useState({
        items: [],
        order: 1
    })
    
    useEffect(()=>{
        setState(prevState => ({
            ...prevState,
            items: dataSource,
            order: 1
        }))
    }, [])
    
  if(scroll && scroll.y){
      fixedTable.maxHeight = scroll.y
  }
  if(scroll && scroll.x){
        fixedTable.minWidth = scroll.x
  }
  
  function handleSort(compareFn: any, column: Column){
      let list = dataSource
      if(state.order){
          list = list.sort((a: Column, b: Column)=>compareFn(a[column.dataIndex], b[column.dataIndex]))
      } else {
          list = list.sort((a: Column, b: Column)=>compareFn(b[column.dataIndex], a[column.dataIndex]))
      }
      
      setState(prevState => ({
          ...prevState,
            items: list,
          order: prevState.order ? 0 : 1
      }))
  }
  
  return (
    <div className={`rsl-table ${fixed ? 'table-fixed': ''}`} style={ fixedTable.maxHeight ? { maxHeight: fixedTable.maxHeight } : {}}>
      <table className={className} style={ fixedTable.minWidth ? { minWidth: fixedTable.minWidth } : {}}>
          <Thead onSort={handleSort} theadClass={theadClass} columns={columns} />
          <Tbody
              tbodyClass={tbodyClass}
              dataSource={state.items}
              columns={columns}
          />
        </table>
    </div>
  );
};


export default Table;
