'use client'
// app/lists/components/ListContent.jsx
import { useState } from 'react';
import { getLivingListById, getStrapiMedia } from '../lib/strapi/api';
import Image from 'next/image';
import ListItem from './ListItem';

export default function ListContent({ lists, defaultList }) {
  const [selectedList, setSelectedList] = useState(defaultList);
  const [listItems, setListItems] = useState(
    defaultList?.attributes?.items || defaultList?.items || []
  );
  const [loading, setLoading] = useState(false);

  const handleListChange = async (listId) => {
    try {
      setLoading(true);
      
      const response = await getLivingListById(listId);
      const list = response.data;
      console.log(response, "list by id")
      setSelectedList(list);
      setListItems(list.attributes?.items || list.items || []);
    } catch (error) {
      console.error('Error fetching list:', error);
    } finally {
      setLoading(false);
    }
  };

  if (lists.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 dark:bg-gray-800">
          <svg className="h-10 w-10 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
        </div>
        <p className="mt-6 text-gray-500 dark:text-gray-400 text-lg">No lists available. Please add some lists in your Strapi admin panel.</p>
      </div>
    );
  }

  if (!selectedList) {
    return (
      <div className="text-center py-12">
        <div className="inline-block w-8 h-8 border-2 border-red-600 dark:border-red-500 border-t-transparent rounded-full animate-spin"></div>
        <p className="mt-4 text-gray-600 dark:text-gray-300">Loading list content...</p>
      </div>
    );
  }

  // Account for both possible data structures
  const attributes = selectedList.attributes || selectedList;
  const title = attributes.title || '';
  const description = attributes.description || '';
  
  // Sort items by rank
  const sortedItems = [...listItems].sort((a, b) => {
    const rankA = a.rank || Number.MAX_VALUE;
    const rankB = b.rank || Number.MAX_VALUE;
    return rankA - rankB;
  });
  
  return (
    <div className="max-w-6xl mx-auto">
      {/* List Tabs - styled more like the example */}
      <div className="border-b border-gray-200 dark:border-gray-700 mb-8">
        <div className="flex overflow-x-auto scrollbar-hide">
          {lists.map((list) => {
            const listAttributes = list.attributes || list;
            return (
              <button
                key={list.id}
                className={`py-4 px-8 font-medium text-sm whitespace-nowrap transition-colors
                  ${selectedList?.id === list.id
                    ? 'text-red-600 dark:text-red-500 border-b-2 border-red-600 dark:border-red-500'
                    : 'text-gray-600 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500'}`}
                onClick={() => handleListChange(list.id)}
                disabled={loading}
              >
                {listAttributes.title}
              </button>
            );
          })}
        </div>
      </div>

      {/* List Header */}
      <div className="mb-8 text-center">
        <h2 className="text-4xl font-bold mb-4 text-gray-900 dark:text-white">{title}</h2>
        <p className="text-lg text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
          {description}
        </p>
      </div>

      {/* Selected List Content */}
      <div className="mb-8">
        {loading ? (
          <div className="py-16 text-center">
            <div className="inline-block w-10 h-10 border-3 border-red-600 dark:border-red-500 border-t-transparent rounded-full animate-spin"></div>
            <p className="mt-6 text-gray-600 dark:text-gray-300 text-lg">Loading list items...</p>
          </div>
        ) : (
          <div className="space-y-4"> {/* Consistent spacing between items */}
            {sortedItems.map((item, index) => (
              <ListItem 
                key={item.id || index}
                item={item}
                index={index}
              />
            ))}
            
            {sortedItems.length === 0 && (
              <div className="text-center py-20 bg-gray-50 dark:bg-gray-800 rounded-lg">
                <svg xmlns="http://www.w3.org/2000/svg" className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                </svg>
                <p className="mt-4 text-gray-500 dark:text-gray-400 text-xl">No items in this list</p>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}