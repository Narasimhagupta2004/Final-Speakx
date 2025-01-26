import React, { useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {
  const [title, setTitle] = useState("");
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchQuestions = async (searchTitle, currentPage) => {
    try {
      const response = await axios.get(`https://final-speakx.onrender.com/${searchTitle}`, {
        params: { page: currentPage, limit: 10 },
      });
      setResult(response.data.data); 
      setPage(response.data.page);
      setTotalPages(response.data.pages);
    } catch (err) {
      setResult(null);
      setError("An error occurred while fetching the data.");
    }
  };

  const handleSearch = () => {
    if (!title) {
      setError("Please enter a title.");
      return;
    }
    setError(null);
    fetchQuestions(title, 1); 
  };

  const changePage = (newPage) => {
    fetchQuestions(title, newPage);
  };

  return (
    <div className="app">
      <h1>Question Search</h1>
      <div className="search-container">
        <input type="text" placeholder="Enter question title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        <button onClick={handleSearch}>Search</button>
      </div>

      {error && <p className="error">{error}</p>}

      {result &&
        result.map((question) => (
          <div key={question._id} className="questionInfo">
            <h3>Title: {question.title}</h3>
            <p>Type: {question.type}</p>
          </div>
        ))}

      {result && totalPages > 1 && (
        <div className="pagination">
          <button onClick={() => changePage(page - 1)} disabled={page === 1}>
            Previous
          </button>
          <span>
            Page {page} of {totalPages}
          </span>
          <button onClick={() => changePage(page + 1)} disabled={page === totalPages}>
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default App;
