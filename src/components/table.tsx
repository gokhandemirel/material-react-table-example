import { useMemo, useState } from 'react';
import {
  MaterialReactTable,
  MRT_PaginationState,
  MRT_SortingState,
  type MRT_ColumnDef,
} from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Country } from '../types/country';
import country from '../data/country.json';

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
        size: 150,
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
        size: 100,
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
        accessorKey: 'geo.lat',
        header: 'Latitude',
        size: 60,
      },
      {
        accessorKey: 'geo.long',
        header: 'Longitude',
        size: 60,
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
    pageSize: 10,
  });

  return (
    <MaterialReactTable
      data={data}
      columns={columns}
      enableStickyHeader={true}
      enableColumnPinning={true}
      enableColumnActions={false}
      enableSorting={false}
      enableTopToolbar={false}
      enableBottomToolbar={false}
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
          width: '100%',
          boxShadow: 'none',
          border: 'solid 1px #efefef',
          borderRadius: '8px',
          overflow: 'hidden',
        },
      }}
      muiTableProps={{
        sx: {
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
    />
  );
};

export default Table;
