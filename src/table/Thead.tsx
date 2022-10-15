import React, { FC } from 'react';
import { Column } from './Table';

interface Props {
  columns: Column[];
  theadClass?: { th?: string; tr?: string; thead?: string };
    onSort?: (compareFn: any, column: Column)=> void
}

const Thead: FC<Props> = (props) => {
  const { columns, theadClass={th: "", thead: "", tr: ""}, onSort } = props;

  return (
    <thead className={theadClass.thead}>
      <tr className={theadClass.tr}>
        {columns?.map((column: Column) => (
          <th
            className={`${column.className ? column.className : ''} ${theadClass.th}`}
            style={{ width: column.colWidth }}
          >
              <div className="thead-item">
                {column.sorter && <button className="bg-pink-400 px-2 py-1 m-2" onClick={()=> onSort ? onSort(column.sorter, column) : {}}> Sort</button> }
                  {column.title}
              </div>
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
