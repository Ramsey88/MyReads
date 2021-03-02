import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import * as BooksAPI from ".././utils/BooksAPI";

class SearchPage extends React.Component {
  state = {
    query: "",
    searchResult: [],
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
    BooksAPI.search(query).then((book) => {
      this.setState(() => ({
        searchResult: book,
      }));
    });
    console.log(this.state.searchResult);
  };

  render() {
    const query = this.query;
    /*const result = [this.searchResult];*/
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search-book">
            search
          </Link>
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(event) => this.updateQuery(event.target.value)}
            />
          </div>
        </div>
        {this.state.searchResult !== undefined ? (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searchResult.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      <div
                        className="book-cover"
                        style={{
                          width: 128,
                          height: 193,
                          backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
                        }}
                      ></div>
                      <div className="book-shelf-changer">
                        <select>
                          <option value="move" disabled>
                            Move to...
                          </option>
                          <option value="currentlyReading">
                            Currently Reading
                          </option>
                          <option value="wantToRead">Want to Read</option>
                          <option value="read">Read</option>
                          <option value="none">None</option>
                        </select>
                      </div>
                    </div>
                    <div className="book-title">{book.title}</div>
                    <div className="book-authors">{book.authors}</div>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div></div>
        )}
      </div>
    );
  }
}
export default SearchPage;
