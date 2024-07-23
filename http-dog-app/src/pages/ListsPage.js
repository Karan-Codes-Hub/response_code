import React, { useEffect, useState } from 'react';
import axios from 'axios';

function ListsPage() {
  const [lists, setLists] = useState([]);

  useEffect(() => {
    const fetchLists = async () => {
      try {
        const response = await axios.get('/api/lists');
        setLists(response.data);
      } catch (error) {
        console.error('Fetch lists failed:', error);
      }
    };

    fetchLists();
  }, []);

  const handleDeleteList = async (id) => {
    try {
      await axios.delete(`/api/lists/${id}`);
      setLists(lists.filter(list => list._id !== id));
    } catch (error) {
      console.error('Delete list failed:', error);
    }
  };

  return (
    <div>
      <h2>Your Lists</h2>
      <ul>
        {lists.map(list => (
          <li key={list._id}>
            <h3>{list.name}</h3>
            <button onClick={() => handleDeleteList(list._id)}>Delete</button>
            {/* Implement edit functionality here */}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListsPage;
