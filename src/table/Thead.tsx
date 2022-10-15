import React, { FC } from 'react';
import { Column } from './Table';

interface Props {
  columns: Column[];
  theadClass?: { th?: string; tr?: string; thead?: string };
}

const Thead: FC<Props> = (props) => {
  const { columns, theadClass } = props;

  return (
    <thead className={theadClass?.thead}>
      <tr className={theadClass?.tr}>
        {columns?.map((column: Column) => (
          <th
            className={`${column.className ? column.className : ''} ${
              theadClass?.th
            }`}
            style={{ width: column.colWidth }}
          >
            {column.title}
          </th>
        ))}
      </tr>
    </thead>
  );
};

export default Thead;
