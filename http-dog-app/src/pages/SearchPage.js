import React, { useState } from 'react';
import axios from 'axios';

function SearchPage() {
  const [code, setCode] = useState('');
  const [images, setImages] = useState([]);
  const [listName, setListName] = useState('');

  const handleSearch = async () => {
    try {
      const response = await axios.get(`https://http.dog/${code}.jpg`);
      setImages([{ code, url: response.config.url }]);
    } catch (error) {
      console.error('Search failed:', error);
    }
  };

  const handleSaveList = async () => {
    try {
      await axios.post('/api/lists', { name: listName, images });
    } catch (error) {
      console.error('Save list failed:', error);
    }
  };

  return (
    <div>
      <h2>Search</h2>
      <input type="text" placeholder="Response Code" value={code} onChange={(e) => setCode(e.target.value)} />
      <button onClick={handleSearch}>Search</button>
      <div>
        {images.map((image) => (
          <div key={image.code}>
            <img src={image.url} alt={`HTTP ${image.code}`} />
            <p>{image.code}</p>
          </div>
        ))}
      </div>
      <input type="text" placeholder="List Name" value={listName} onChange={(e) => setListName(e.target.value)} />
      <button onClick={handleSaveList}>Save List</button>
    </div>
  );
}

export default SearchPage;
