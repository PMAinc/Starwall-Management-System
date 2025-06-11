import React, { useMemo } from 'react';
import { ChevronDown, ChevronUp, Search, X } from 'lucide-react';

interface Column {
  accessor: string;
  header: string;
  Cell?: (props: { value: any; row: any }) => React.ReactNode;
}

interface DataTableProps {
  data: any[];
  columns: Column[];
  title: string;
  onAddNew?: () => void;
  addNewLabel?: string;
  onRowClick?: (row: any) => void;
}

const DataTable: React.FC<DataTableProps> = ({
  data,
  columns,
  title,
  onAddNew,
  addNewLabel = "Ajouter",
  onRowClick
}) => {
  const [filterValue, setFilterValue] = React.useState('');
  const [sortBy, setSortBy] = React.useState<string | null>(null);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>('asc');

  const handleSort = (accessor: string) => {
    if (sortBy === accessor) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortBy(accessor);
      setSortDirection('asc');
    }
  };

  const filteredData = useMemo(() => {
    if (!filterValue) return data;

    return data.filter(row => 
      Object.values(row).some(value => 
        String(value).toLowerCase().includes(filterValue.toLowerCase())
      )
    );
  }, [data, filterValue]);

  const sortedData = useMemo(() => {
    if (!sortBy) return filteredData;

    return [...filteredData].sort((a, b) => {
      const aValue = a[sortBy];
      const bValue = b[sortBy];

      if (aValue === bValue) return 0;
      
      if (sortDirection === 'asc') {
        return aValue > bValue ? 1 : -1;
      } else {
        return aValue < bValue ? 1 : -1;
      }
    });
  }, [filteredData, sortBy, sortDirection]);

  return (
    <div className="bg-white rounded-lg shadow-sm">
      <div className="p-4 sm:p-6 border-b border-gray-200">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4 gap-4">
          <h2 className="text-xl font-semibold text-gray-800">{title}</h2>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Search size={16} className="text-gray-400" />
              </div>
              <input
                type="text"
                className="pl-10 pr-10 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent w-full"
                placeholder="Recherche..."
                value={filterValue}
                onChange={(e) => setFilterValue(e.target.value)}
              />
              {filterValue && (
                <button 
                  className="absolute inset-y-0 right-0 pr-3 flex items-center"
                  onClick={() => setFilterValue('')}
                >
                  <X size={16} className="text-gray-400" />
                </button>
              )}
            </div>
            
            {onAddNew && (
              <button 
                className="btn btn-primary inline-flex items-center"
                onClick={onAddNew}
              >
                <span>+ {addNewLabel}</span>
              </button>
            )}
          </div>
        </div>
        
        {filteredData.length === 0 ? (
          <div className="text-center py-8 text-gray-500">
            Aucune donnée trouvée
          </div>
        ) : (
          <div className="table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  {columns.map((column) => (
                    <th 
                      key={column.accessor} 
                      className="table-header-cell cursor-pointer"
                      onClick={() => handleSort(column.accessor)}
                    >
                      <div className="flex items-center space-x-1">
                        <span>{column.header}</span>
                        {sortBy === column.accessor && (
                          sortDirection === 'asc' ? 
                          <ChevronUp size={16} /> : 
                          <ChevronDown size={16} />
                        )}
                      </div>
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="table-body">
                {sortedData.map((row, rowIndex) => (
                  <tr 
                    key={rowIndex}
                    className={`table-row ${onRowClick ? 'cursor-pointer' : ''}`}
                    onClick={() => onRowClick && onRowClick(row)}
                  >
                    {columns.map((column) => (
                      <td key={column.accessor} className="table-cell">
                        {column.Cell ? column.Cell({ value: row[column.accessor], row }) : row[column.accessor]}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
      <div className="px-6 py-3 border-t border-gray-200 text-xs text-gray-500">
        {filteredData.length} résultat{filteredData.length !== 1 ? 's' : ''}
      </div>
    </div>
  );
};

export default DataTable;