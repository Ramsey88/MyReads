import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import * as BooksAPI from ".././utils/BooksAPI";
import { PropTypes } from "prop-types";

class SearchPage extends React.Component {
  /* constructor(props) {
    super(props);
    this.onUpdateShelf = this.onUpdateShelf.bind(this);
  }*/ static protoTypes = {
    onUpdateShelf: PropTypes.func.isRequired,
  };
  state = {
    query: "",
    searchResult: [],
    selectedShelf: "",
    bookID: "",
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
  };
  /* componentDidUpdate() {
    if (this.state.bookID !== "")
      this.props.onUpdateShelf(this.state.bookID, this.selectedShelf);
  }*/
  update = (e) => {
    e.preventDefault();

    if (this.state.query) {
      BooksAPI.search(this.state.query).then((book) => {
        this.setState(() => ({
          searchResult: book,
        }));
      });
    }
  };
  render() {
    const { onUpdateShelf } = this.props;
    const query = this.state.query;
    /*const result = [this.searchResult];*/
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search-book">
            search
          </Link>{" "}
          <form onSubmit={this.update}>
            <div className="search-books-input-wrapper">
              <input
                type="text"
                placeholder="Search by title or author"
                value={query}
                onChange={(e) => this.updateQuery(e.target.value)}
              />
            </div>
          </form>
        </div>
        {this.state.searchResult ? (
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
                        <select
                          onChange={(e) =>
                            onUpdateShelf(book.id, e.target.value.toString())
                          }
                          to="/"
                        >
                          <option value="move">Move to...</option>
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
