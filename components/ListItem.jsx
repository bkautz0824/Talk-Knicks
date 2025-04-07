'use client'
import { useState } from 'react';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import {  getStrapiMedia } from '../lib/strapi/api';
import PlayerAttributesRadar from './PlayerAttributeDisplay';

const ListItem = ({ item, index }) => {
    const [expanded, setExpanded] = useState(false);
    const [showTimeline, setShowTimeline] = useState(false);
    console.log(item)
    // Extract information from item data
    const rank = item.rank || index + 1;
    const title = item.title || '';
    const subtitle = item.subtitle || '';
    const description = item.description || '';
    const rankHistory = item.rank_history || [];
    const lastUpdate = item.last_update || '';
    const stats = item.stats || [];
    const accolades = item.accolades || [];
    const image = item.image;
    
    const attributes = item.attributes
    
    // Format dates
    const formatDate = (dateString) => {
      if (!dateString) return '';
      try {
        const date = new Date(dateString);
        return `${date.getMonth() + 1}/${date.getDate() < 10 ? '0' + date.getDate() : date.getDate()}`;
      } catch (e) {
        return dateString;
      }
    };
  
    return (
      <div className="w-full mb-4"> {/* Simplified container with consistent margin */}
        <div className="rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800"> {/* Single container with rounded corners */}
          {/* Header - Always visible */}
          <div 
            className="px-5 lg:px-7 flex items-center transition-all duration-300 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-700"
            onClick={() => setExpanded(!expanded)}
          >
            {/* Left side with Rank and Player Image */}
            <div className="flex items-center py-4 md:w-auto">
              {/* Rank */}
              <div className="flex flex-col items-center mr-4">
                <span className="inline-flex w-auto border-b-2 border-red-600 dark:border-red-500 text-4xl font-bold mb-1">
                  {rank < 10 ? `0${rank}` : rank}
                </span>
                
                {/* Rank History Button */}
                {rankHistory.length > 0 && (
                  <div className="relative">
                    <button 
                      className="text-xs uppercase font-medium text-gray-700 dark:text-gray-300 hover:text-red-600 dark:hover:text-red-500"
                      onClick={(e) => {
                        e.stopPropagation();
                        setShowTimeline(!showTimeline);
                      }}
                    >
                      <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                      </svg>
                    </button>
                    
                    {/* Timeline Popup */}
                    {showTimeline && (
                      <div className="absolute left-0 top-6 w-48 md:w-64 bg-white dark:bg-gray-900 shadow-lg rounded-lg z-50">
                        <div className="bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <div className="w-full">
                            <div className="text-xs font-semibold mb-2 text-gray-500 dark:text-gray-400">Rank History</div>
                            <div className="flex w-full items-center justify-between mb-1">
                              {rankHistory.map((historyRank, i) => (
                                <div key={i} className="flex flex-col items-center">
                                  <span className="text-center text-xs font-medium text-gray-800 dark:text-gray-300 whitespace-nowrap">
                                    {i === 0 ? formatDate(lastUpdate) : `R${i+1}`}
                                  </span>
                                  <span className="w-6 h-6 mt-1 flex items-center justify-center bg-red-100 dark:bg-red-900/30 rounded-full text-red-600 dark:text-red-400 font-bold text-xs">{historyRank}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                )}
              </div>
              
            </div>
            
            {/* Separator line */}
            <div className="hidden md:block h-16 w-[1px] bg-black/10 dark:bg-white/10 mx-4"></div>
            
            {/* Player info - compact view */}
            <div className="flex flex-1 items-center">
              <div className="flex flex-col">
                <span className="text-xl font-bold text-gray-900 dark:text-white">{title}</span>
                {subtitle && (
                  <span className="text-sm text-gray-600 dark:text-gray-400">{subtitle}</span>
                )}
              </div>
              
              {/* Expand/collapse indicator */}
              <div className="ml-auto">
                <svg 
                  className={`w-6 h-6 text-gray-500 dark:text-gray-400 transition-transform duration-300 ${expanded ? 'rotate-180' : ''}`} 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
            </div>
          </div>
          
          {/* Expanded Content */}
          {expanded && (
            <div className="flex flex-col md:flex-row border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900">
              {/* Left sidebar with image and stats */}
              <div className="md:w-1/3 p-5 md:border-r border-gray-200 dark:border-gray-700">
                {/* Image - larger version in expanded state */}
                <div className="relative h-48 w-full mb-6 rounded-lg overflow-hidden bg-gray-200 dark:bg-gray-800 flex items-center justify-center">
                  {image ? (
                    <Image 
                      src={getStrapiMedia(image)} 
                      alt={title}
                      fill
                      className="object-contain"
                    />
                  ) : (
                    <svg className="w-24 h-24 text-gray-400 dark:text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
                
                {/* Stats */}
                {stats ? (
                 <div className="mb-6">
                 <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">Stats</h3>
                 <div className="grid grid-cols-3 gap-2">
                   {[
                     { label: 'Points', value: stats?.points },
                     { label: 'Rebounds', value: stats?.rebounds },
                     { label: 'Assists', value: stats?.assists },
                     { label: 'Steals', value: stats?.steals },
                     { label: 'Blocks', value: stats?.blocks }
                   ].map((stat, idx) => (
                     <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                       <div className="text-xs uppercase text-gray-500 dark:text-gray-400">{stat.label}</div>
                       <div className="text-xl font-bold text-gray-900 dark:text-white">{stat.value || '0'}</div>
                     </div>
                   ))}
                 </div>
               </div>
                ) : (
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">Stats</h3>
                    <div className="grid grid-cols-3 gap-2">
                      {['Points', 'Rebounds', 'Assists', 'Steals', 'Blocks'].map((stat, idx) => {

                        return(
                          <div key={idx} className="bg-gray-50 dark:bg-gray-800 p-2 rounded-lg">
                            <div className="text-xs uppercase text-gray-500 dark:text-gray-400">{stat}</div>
                            <div className="text-xl font-bold text-gray-900 dark:text-white">{stats[idx]}</div>
                          </div>
                        )
                        
                      
                      }

                        
                      
                      )}
                    </div>
                  </div>
                )}
                
                {/* Accolades */}
                {accolades ? (
                  <div>
                    <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">Accolades</h3>
                    <div className="flex flex-wrap gap-4">
                      {[
                        { label: 'Rings', value: accolades.rings || 0 },
                        { label: 'MVPs', value: accolades.mvps || 0 },
                        { label: 'All-NBA', value: accolades.allNba || 0 }
                      ].map((accolade, idx) => (
                        <div key={idx} className="flex flex-col items-center">
                          <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-1">
                            <div className="text-lg font-bold text-red-600 dark:text-red-500">
                              {accolade.value > 0 ? `${accolade.value}x` : '--'}
                            </div>
                          </div>
                          <span className="text-xs text-center text-gray-700 dark:text-gray-300">{accolade.label}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  ) : (
                    <div>
                      <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">Accolades</h3>
                      <div className="flex flex-wrap gap-4">
                        {['Rings', 'All-NBA', 'MVPs'].map((accolade, idx) => (
                          <div key={idx} className="flex flex-col items-center">
                            <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-full flex items-center justify-center mb-1">
                              <div className="text-lg font-bold text-red-600 dark:text-red-500">--</div>
                            </div>
                            <span className="text-xs text-center text-gray-700 dark:text-gray-300">{accolade}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                 )}
              </div>
              
              {/* Main content - Description */}
              <div className="md:w-2/3 p-5">
                <h3 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase mb-3">Analysis</h3>
                <div className="prose dark:prose-invert max-w-none">
                  <ReactMarkdown>{description}</ReactMarkdown>
                </div>
                
                <div className="mt-4 text-xs text-gray-500 dark:text-gray-400">
                  Last updated: {formatDate(lastUpdate)}
                </div>
                <PlayerAttributesRadar attributes={attributes[0]}/>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  };
  
  export default ListItem;