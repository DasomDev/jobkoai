import { useState, useMemo, useCallback } from 'react';
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
            title: '시·도',
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
            title: '시·구·군',
            data: areaData.collection.map((area, index) => ({
              id: `area-${index}`,
              name: area
            }))
          },
          {
            title: '동·읍·면',
            data: []
          }
        ];
      
      case 'job':
        return [
          {
            title: '업종',
            data: jobData.categories.map((category) => ({
              id: category.id,
              name: category.name
            }))
          },
          {
            title: '세부업종',
            data: []
          },
          {
            title: '직종',
            data: []
          }
        ];
      
      case 'custom':
        return config.columns;
      
      default:
        return [];
    }
  }, [config.type]);

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
    
    // Clear subsequent columns when a selection is made
    for (let i = columnIndex + 1; i < newSelectedItems.length; i++) {
      newSelectedItems[i] = '';
    }
    
    setSelectedItems(newSelectedItems);
  };

  const handleConfirm = (onSelect: (selectedItems: string[]) => void, onClose: () => void) => {
    onSelect(selectedItems.filter((item) => item));
    onClose();
  };

  const reset = useCallback(() => {
    setSearchTerm("");
    setSelectedItems([]);
    setGroupSimilar(false);
  }, []);

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
