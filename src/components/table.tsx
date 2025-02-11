import { useEffect, useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_PaginationState,
  MRT_SortingState,
  useMaterialReactTable,
  type MRT_ColumnDef,
} from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Country } from '../types/country';
import country from '../data/country.json';
import { usePagination } from '../hooks/usePagination';

const Table = () => {
  const data: Country[] | any = country;
  const columns = useMemo<MRT_ColumnDef<Country>[]>(
    () => [
      {
        accessorKey: 'emoji',
        header: '',
        size: 40,
      },
      {
        accessorKey: 'code',
        header: 'Code',
        size: 60,
      },
      {
        accessorKey: 'name',
        header: 'Name',
        size: 220,
      },
      {
        accessorKey: 'region',
        header: 'Region',
        size: 100,
      },
      {
        accessorKey: 'capital',
        header: 'Capital',
        size: 120,
      },
      {
        accessorKey: 'timezones',
        header: 'Timezones',
        size: 140,
        columnDefType: 'data',
        Cell: ({ cell }: any) => {
          return (
            <>
              {cell.getValue()?.map((item: string, index: number) => {
                return index < 1 && <span key={index}>{item}</span>;
              })}
            </>
          );
        },
      },
      {
        accessorKey: 'alpha3',
        header: 'Currency',
        size: 120,
      },
    ],
    []
  );

  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 5,
  });

  const table = useMaterialReactTable({
    columns: columns,
    data: data,
  });

  const paginationRange = usePagination({
    currentPage: pagination.pageIndex,
    totalCount: table.options.data.length,
    siblingCount: 1,
    pageSize: pagination.pageSize,
  });

  useEffect(() => {
    console.log(JSON.stringify(paginationRange), pagination.pageIndex);
  }, [pagination]);

  return (
    <div style={{ width: '70%' }}>
      <MaterialReactTable
        data={data}
        columns={columns}
        enableStickyHeader={true}
        enableColumnPinning={true}
        enableColumnActions={false}
        enableSorting={false}
        enableTopToolbar={false}
        enableBottomToolbar={false}
        enablePagination={true}
        initialState={{
          columnPinning: {
            right: ['code'],
          },
        }}
        // Icons
        // ---------------
        icons={{
          ArrowDownwardIcon: (props: any) => (
            <FontAwesomeIcon icon={faArrowUp} {...props} />
          ),
        }}
        // Server side operations
        // ---------------
        manualSorting={false}
        onSortingChange={setSorting}
        manualPagination={false}
        onPaginationChange={setPagination}
        state={{
          sorting,
          pagination,
        }}
        // Styles
        // ---------------
        muiTablePaperProps={{
          sx: {
            display: 'grid',
            gap: '16px',
            width: '100%',
            boxShadow: 'none',
          },
        }}
        muiTableProps={{
          sx: {
            border: 'solid 1px #efefef',
            borderRadius: '8px',
            '& [data-pinned="true"]': {
              background: '#cadde2',
            },
            '& [data-pinned="true"]:before': {
              backgroundColor: 'inherit !important',
            },
          },
        }}
        muiTableHeadRowProps={{
          sx: {
            backgroundColor: '#cadde2',
          },
        }}
        muiTableHeadCellProps={{
          sx: {
            padding: '8px 16px',
            color: '#535f72',
            fontFamily: `'Open Sans', serif`,
            fontWeight: 600,
            borderBottom: 'none',
          },
        }}
        muiTableBodyRowProps={{
          sx: {
            '&': {
              backgroundColor: '#eef5f8 !important',
            },
            '&:nth-of-type(odd)': {
              backgroundColor: '#fff !important',
            },
            '&:hover': {
              backgroundColor: '#d2dbdf !important',
            },
          },
        }}
        muiTableBodyCellProps={{
          sx: {
            background: 'transparent',
            color: '#535f72',
            fontFamily: `'Open Sans', serif`,
            fontWeight: 400,
            borderBottom: 'none',
          },
        }}
        muiBottomToolbarProps={{
          sx: {
            width: '100%',
            minHeight: 'auto',
            boxShadow: 'none',
            '& > .MuiBox-root': {
              '& > .MuiBox-root': {
                position: 'relative',
              },
              '.MuiTablePagination-root': {
                padding: '0',
              },
            },
          },
        }}
        enableRowOrdering={true}
      />
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
        }}
      >
        <select
          onChange={(e) =>
            setPagination({
              pageIndex: pagination.pageIndex,
              pageSize: Number(e.target.value),
            })
          }
          style={{
            padding: '5px',
            border: 'solid 1px #ddd',
            borderRadius: '4px',
          }}
        >
          {[5, 10, 15].map((item: number, index: number) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </select>
        <ul style={{ display: 'flex', gap: '5px', listStyleType: 'none' }}>
          {paginationRange?.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                return (
                  item !== '...' &&
                  setPagination({
                    pageIndex: item,
                    pageSize: pagination.pageSize,
                  })
                );
              }}
              style={{
                padding: '5px',
                border: 'solid 1px #ddd',
                borderRadius: '4px',
                cursor: 'pointer',
              }}
            >
              {item}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Table;
