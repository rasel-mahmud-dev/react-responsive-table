import React, { FC, HTMLAttributes } from 'react';
import Thead from './Thead';
import Tbody from './Tbody';

import './style.css';

export interface Column extends HTMLAttributes<HTMLElement> {
  id?: string;
  title: string;
  dataIndex?: string;
  className?: string;
  colWidth?: number;
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
  
  if(scroll && scroll.y){
      fixedTable.maxHeight = scroll.y
  }
  if(scroll && scroll.x){
        fixedTable.minWidth = scroll.x
  }
  
  return (
    <div className={`rsl-table ${fixed ? 'table-fixed': ''}`} style={ fixedTable.maxHeight ? { maxHeight: fixedTable.maxHeight } : {}}>
      <table className={className} style={ fixedTable.minWidth ? { minWidth: fixedTable.minWidth } : {}}>
          <Thead theadClass={theadClass} columns={columns} />
          <Tbody
              tbodyClass={tbodyClass}
              dataSource={dataSource}
              columns={columns}
          />
        </table>
    </div>
  );
};


export default Table;
