// app/lists/page.jsx
import { getLivingListsByRank, getLivingListById } from "../../lib/strapi/api";
import ListContent from "../../components/ListContent";

export const metadata = {
  title: 'Living Lists',
  description: 'Dynamic ranked lists'
};

export default async function ListsPage() {
  // Fetch all lists sorted by rank
  let lists = [];
  let defaultList = null;
  
  try {
    // Fetch all lists sorted by rank
    const listsData = await getLivingListsByRank();
    lists = listsData.data || [];
    console.log(lists)
    // Get the first list by rank as default (if any lists exist)
    const defaultListId = lists.length > 0 ? lists[0].documentId : null;
    
    if (defaultListId) {
      const defaultListData = await getLivingListById(defaultListId);
      
      defaultList = defaultListData.data;
      // console.log(defaultList, "default list")
    }
  } catch (error) {
    console.error('Error fetching lists:', error);
    // We'll handle the empty state in the component
  }
  
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold mb-2">Living Lists</h1>
        <p className="text-gray-600 max-w-2xl mx-auto">
          {defaultList?.attributes?.description || "Select a list to view its ranked items"}
        </p>
      </div>
      
      {/* Pass lists and defaultList to the client component */}
      <ListContent lists={lists} defaultList={defaultList} />
    </div>
  );
}