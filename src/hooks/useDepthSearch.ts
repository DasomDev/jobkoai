import { useState, useMemo } from 'react';
import areaData from '../data/area.json';
import jobData from '../data/job.json';

export interface DepthItem {
  id: string;
  name: string;
  children?: DepthItem[];
}

export interface DepthSearchConfig {
  type: 'area' | 'job' | 'custom';
  title: string;
  searchPlaceholder: string;
  columns: {
    title: string;
    data: DepthItem[];
  }[];
  showGroupOption?: boolean;
  groupOptionLabel?: string;
}

export const useDepthSearch = (config: DepthSearchConfig) => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedItems, setSelectedItems] = useState<string[]>([]);
  const [groupSimilar, setGroupSimilar] = useState(false);

  // Transform data based on type
  const transformedColumns = useMemo(() => {
    switch (config.type) {
      case 'area':
        return [
          {
            title: '지역',
            data: [
              {
                id: 'seoul',
                name: areaData.name,
                children: areaData.collection.map((area, index) => ({
                  id: `seoul-${index}`,
                  name: area
                }))
              }
            ]
          },
          {
            title: '구/군',
            data: areaData.collection.map((area, index) => ({
              id: `area-${index}`,
              name: area
            }))
          }
        ];
      
      case 'job':
        return [
          {
            title: '업종',
            data: [
              {
                id: 'food',
                name: jobData.name,
                children: jobData.collection.map((job, index) => ({
                  id: `job-${index}`,
                  name: job
                }))
              }
            ]
          },
          {
            title: '직종',
            data: jobData.collection.map((job, index) => ({
              id: `job-${index}`,
              name: job
            }))
          }
        ];
      
      case 'custom':
        return config.columns;
      
      default:
        return config.columns;
    }
  }, [config.type, config.columns]);

  // Filter data based on search term
  const filteredColumns = useMemo(() => {
    if (!searchTerm) return transformedColumns;
    
    return transformedColumns.map(column => ({
      ...column,
      data: column.data.filter(item => 
        item.name.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }));
  }, [transformedColumns, searchTerm]);

  const handleItemSelect = (item: DepthItem, columnIndex: number) => {
    const newSelectedItems = [...selectedItems];
    newSelectedItems[columnIndex] = item.name;
    setSelectedItems(newSelectedItems);
  };

  const handleConfirm = (onSelect: (selectedItems: string[]) => void, onClose: () => void) => {
    onSelect(selectedItems.filter((item) => item));
    onClose();
  };

  const reset = () => {
    setSearchTerm("");
    setSelectedItems([]);
    setGroupSimilar(false);
  };

  return {
    searchTerm,
    setSearchTerm,
    selectedItems,
    groupSimilar,
    setGroupSimilar,
    filteredColumns,
    handleItemSelect,
    handleConfirm,
    reset
  };
};
