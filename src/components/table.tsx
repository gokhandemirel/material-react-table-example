import { useMemo, useState } from 'react';
import { MaterialReactTable, MRT_PaginationState, MRT_SortingState, type MRT_ColumnDef } from 'material-react-table';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowUp } from '@fortawesome/free-solid-svg-icons';
import { Country } from '../types/country';
import { styled } from '@mui/material';
import country from '../data/country.json';

const TableWrapper = styled('div')({
  '.MuiPaper-root': {
    display: 'grid',
    width: '100%',
    boxShadow: 'none',
    border: 'solid 1px #efefef',
    borderRadius: '10px',
    overflow: 'hidden',

    '.MuiTableContainer-root': {
      '.MuiTable-root': {
        '.MuiTableHead-root': {
          '.MuiTableRow-root': {
            backgroundColor: '#cadde2 !important',

            '.MuiTableCell-root': {
              padding: '8px 16px',
              color: '#535f72',
              fontFamily: `'Open Sans', serif`,
              fontWeight: 600,
              borderBottom: 'none'
            }
          }
        },
        '.MuiTableBody-root': {
          '.MuiTableRow-root': {
            backgroundColor: '#eef5f8 !important',

            '&:nth-of-type(odd)': {
              backgroundColor: '#fff !important'
            },

            '.MuiTableCell-root': {
              color: '#535f72',
              fontFamily: `'Open Sans', serif`,
              fontWeight: 400,
              borderBottom: 'none'
            }
          }
        }
      }
    }
  }
});

const Table = () => {
  const data: Country[] | any = country;
  const columns = useMemo<MRT_ColumnDef<Country>[]>(
    () => [
      {
        id: '0',
        accessorKey: 'emoji',
        header: '',
        size: 40
      },
      {
        id: '1',
        accessorKey: 'code',
        header: 'Code',
        size: 40
      },
      {
        id: '2',
        accessorKey: 'name',
        header: 'Name',
        size: 150
      },
      {
        id: '3',
        accessorKey: 'region',
        header: 'Region',
        size: 100
      },
      {
        id: '4',
        accessorKey: 'capital',
        header: 'Capital',
        size: 120
      },
      {
        id: '5',
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
        }
      },
      {
        id: '6',
        accessorKey: 'geo.lat',
        header: 'Latitude',
        size: 60
      },
      {
        id: '7',
        accessorKey: 'geo.long',
        header: 'Longitude',
        size: 60
      },
      {
        id: '8',
        accessorKey: 'alpha3',
        header: 'Currency',
        size: 120
      }
    ],
    []
  );

  const [sorting, setSorting] = useState<MRT_SortingState>([]);
  const [pagination, setPagination] = useState<MRT_PaginationState>({
    pageIndex: 0,
    pageSize: 10
  });

  return (
    <TableWrapper>
      <MaterialReactTable
        data={data}
        columns={columns}
        enableStickyHeader={true}
        enableColumnPinning={true}
        enableColumnActions={true}
        enableTopToolbar={false}
        enableBottomToolbar={false}
        icons={{
          ArrowDownwardIcon: (props: any) => <FontAwesomeIcon icon={faArrowUp} {...props} />
        }}
        // ----- Server side operations
        manualSorting={false}
        onSortingChange={setSorting}
        manualPagination={false}
        onPaginationChange={setPagination}
        state={{
          sorting,
          pagination
        }}
      />
    </TableWrapper>
  );
};

export default Table;
