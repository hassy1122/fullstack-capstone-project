import React, { useState, useEffect } from 'react';

function LandingPage({ onGetStarted }) {
  return (
    <div className="landing-page">
      <div className="hero">
        <h1>GiftLink</h1>
        <p className="tagline">Give what you don't need. Find what you do.</p>
        <p className="description">
          GiftLink connects people who want to give away household items they no longer need
          with people who prefer to recycle or find free items instead of purchasing new ones.
          Reduce waste, help others, and declutter your home.
        </p>
        <button className="get-started-btn" onClick={onGetStarted}>
          Get Started
        </button>
      </div>
    </div>
  );
}

function GiftList({ user }) {
  const [gifts, setGifts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchGifts();
  }, []);

  const fetchGifts = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/gifts');
      const data = await response.json();
      setGifts(data);
    } catch (error) {
      console.error('Error fetching gifts:', error);
    } finally {
      setLoading(false);
    }
  };

  const searchGifts = async () => {
    try {
      const params = new URLSearchParams();
      if (searchTerm) params.append('q', searchTerm);
      if (category !== 'all') params.append('category', category);

      const response = await fetch(`http://localhost:3000/api/search?${params.toString()}`);
      const data = await response.json();
      setGifts(data);
    } catch (error) {
      console.error('Error searching gifts:', error);
    }
  };

  useEffect(() => {
    searchGifts();
  }, [searchTerm, category]);

  return (
    <div className="gift-list">
      <h2>Available Items</h2>

      <div className="search-bar">
        <input
          type="text"
          placeholder="Search items..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="all">All Categories</option>
          <option value="Furniture">Furniture</option>
          <option value="Kitchen">Kitchen</option>
          <option value="Electronics">Electronics</option>
          <option value="Outdoor">Outdoor</option>
          <option value="Books">Books</option>
          <option value="Garden">Garden</option>
          <option value="Sports">Sports</option>
          <option value="Clothing">Clothing</option>
          <option value="Toys">Toys</option>
          <option value="Appliances">Appliances</option>
          <option value="Hobby">Hobby</option>
        </select>
      </div>

      {loading ? (
        <p>Loading...</p>
      ) : (
        <div className="gift-grid">
          {gifts.length === 0 ? (
            <p>No items found.</p>
          ) : (
            gifts.map(gift => (
              <div key={gift._id} className="gift-card">
                <h3>{gift.title}</h3>
                <p className="category">{gift.category}</p>
                <p className="condition">{gift.condition}</p>
                <p className="location">{gift.location}</p>
                <p className="description">{gift.description}</p>
              </div>
            ))
          )}
        </div>
      )}
    </div>
  );
}

export { LandingPage, GiftList };
