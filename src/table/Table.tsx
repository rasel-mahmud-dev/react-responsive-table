import React, { FC, HTMLAttributes, useEffect, useState } from "react";
import Thead from "./Thead";
import Tbody from "./Tbody";

import "./style.css";

export interface Column extends HTMLAttributes<HTMLElement> {
    id?: string;
    title: string;
    dataIndex?: string;
    className?: string;
    colWidth?: number;
    sorter?: (args1: any, args2: any) => any;
    render?: (key: string) => React.ReactNode;
}
[];

interface TableProps extends HTMLAttributes<HTMLTableElement> {
    dataSource: any;
    theadClass?: { th?: string; td?: string; thead?: string };
    tbodyClass?: { tr?: string; td?: string; tbody?: string };
    columns: Column[];
    scroll?: { x?: number; y?: number };
    fixed?: boolean;
    pagination?: { pageSize: number; currentPage: number };
}

const Table: FC<TableProps> = (props) => {
    const {
        theadClass,
        tbodyClass,
        className,
        dataSource,
        columns,
        fixed,
        scroll,
        pagination = { pageSize: 100, currentPage: 1 },
    } = props;

    let fixedTable = { maxHeight: 0, minWidth: 0 };

    const [state, setState] = useState({
        items: [],
        paginatedItems: [],
        order: 1,
        sortedField: "",
        currentPage: 1,
        pageSize: 100,
    });

    useEffect(() => {
        setState((prevState) => {
            let list = dataSource;

            if (pagination) {
                list = sliceForPaginate(
                    {
                        currentPage: pagination.currentPage,
                        pageSize: pagination.pageSize,
                    },
                    list
                );
            }

            return {
                ...prevState,
                items: dataSource,
                paginatedItems: list,
                order: 1,
                currentPage: pagination.currentPage,
                pageSize: pagination.pageSize,
            };
        });
    }, []);

    if (scroll && scroll.y) {
        fixedTable.maxHeight = scroll.y;
    }
    if (scroll && scroll.x) {
        fixedTable.minWidth = scroll.x;
    }

    function handleSort(compareFn: (args1: any, args2: any) => void, column: any) {
        let list = dataSource;
        if (state.order) {
            list = list.sort((a: any, b: any) => compareFn(a[column.dataIndex], b[column.dataIndex]));
        } else {
            list = list.sort((a: any, b: any) => compareFn(b[column.dataIndex], a[column.dataIndex]));
        }

        setState((prevState) => ({
            ...prevState,
            items: list,
            sortedField: column.dataIndex,
            order: prevState.order ? 0 : 1,
        }));
    }

    function sliceForPaginate(state: any, list: any) {
        return list.slice((state.currentPage - 1) * state.pageSize, state.pageSize * state.currentPage);
    }

    function handleSelectPage(pageNumber: number) {
        let list = sliceForPaginate(
            {
                currentPage: pageNumber,
                pageSize: state.pageSize,
            },
            state.items
        );

        setState((prevState) => ({
            ...prevState,
            currentPage: pageNumber,
            paginatedItems: list,
        }));
    }

    return (
        <div>
            <div
                className={`rsl-table ${fixed ? "table-fixed" : ""}`}
                style={fixedTable.maxHeight ? { maxHeight: fixedTable.maxHeight } : {}}
            >
                <table className={className} style={fixedTable.minWidth ? { minWidth: fixedTable.minWidth } : {}}>
                    <Thead
                        onSort={handleSort}
                        theadClass={theadClass}
                        columns={columns}
                        sortedField={state.sortedField}
                        order={state.order}
                    />
                    <Tbody
                        tbodyClass={tbodyClass}
                        dataSource={pagination ? state.paginatedItems : state.items}
                        columns={columns}
                    />
                </table>
            </div>

            <div className="flex items-center flex-wrap ">
                {state.items.slice(0, state.items.length / state.pageSize).map((_, index) => (
                    <div
                        className={`bg-gray-100 rounded-full font-medium m-2 w-12 h-12 flex justify-center text-center items-center cursor-pointer ${
                            state.currentPage === index + 1 ? "!bg-amber-400" : ""
                        }`}
                        onClick={() => handleSelectPage(index + 1)}
                    >
                        <button>{index + 1}</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Table;
