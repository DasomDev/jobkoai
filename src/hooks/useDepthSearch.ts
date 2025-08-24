import React, { useState, useMemo, useCallback, useEffect } from 'react';
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

  // Set default selections based on type
  useEffect(() => {
    if (config.type === 'area' && selectedItems.length === 0) {
      setSelectedItems([areaData.name]);
    } else if (config.type === 'job' && selectedItems.length === 0) {
      setSelectedItems([jobData.categories[0].name]);
    }
  }, [config.type, selectedItems.length]);

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
    
    if (config.type === 'area') {
      // For area, only allow selection in the third column (동·읍·면)
      if (columnIndex === 2) {
        newSelectedItems[columnIndex] = item.name;
      } else {
        // For first and second columns, just update the selection without clearing subsequent columns
        newSelectedItems[columnIndex] = item.name;
      }
    } else {
      // For other types, use the original logic
      newSelectedItems[columnIndex] = item.name;
      
      // Clear subsequent columns when a selection is made
      for (let i = columnIndex + 1; i < newSelectedItems.length; i++) {
        newSelectedItems[i] = '';
      }
    }
    
    setSelectedItems(newSelectedItems);
  };

  const handleConfirm = (onSelect: (selectedItems: string[]) => void, onClose: () => void, selectedNeighborhoods?: string[]) => {
    if (config.type === 'area') {
      // For area, create joined strings for each selected neighborhood
      const areaStrings = selectedNeighborhoods?.map(neighborhood => 
        selectedItems.filter((item) => item).slice(0, 2).join(' ') + ' ' + neighborhood
      ) || [];
      onSelect(areaStrings);
    } else {
      // For other types, use the original logic
      onSelect(selectedItems.filter((item) => item));
    }
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
    setSelectedItems,
    groupSimilar,
    setGroupSimilar,
    filteredColumns,
    handleItemSelect,
    handleConfirm,
    reset
  };
};
