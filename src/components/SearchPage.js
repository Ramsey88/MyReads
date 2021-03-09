import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import * as BooksAPI from ".././utils/BooksAPI";
import { PropTypes } from "prop-types";

class SearchPage extends React.Component {
  static protoTypes = {
    onUpdateShelf: PropTypes.func.isRequired,
  };
  state = {
    query: "",
    searchResult: [],
    bookID: "",
    i: 0,
  };
  updateQuery = (query) => {
    this.setState(() => ({
      query: query.trim(),
    }));
    if (query) {
      BooksAPI.search(query).then((book) => {
        this.setState(() => ({
          searchResult: book,
        }));
      });
    } else {
      this.clearQuery();
    }
  };
  componentDidMount() {
    this.setState(() => ({
      i: 1,
    }));
  }

  clearQuery = () => {
    this.setState(() => ({
      searchResult: [],
    }));
  };
  render() {
    const notfound = "https://i.imgur.com/sJ3CT4V.gif";
    const { onUpdateShelf } = this.props;
    const query = this.state.query;
    const searchKeys = [
      "Android",
      "Art",
      "Artificial Intelligence",
      "Astronomy",
      "Austen",
      "Baseball",
      "Basketball",
      "Bhagat",
      "Biography",
      "Brief",
      "Business",
      "Camus",
      "Cervantes",
      "Christie",
      "Classics",
      "Comics",
      "Cook",
      "Cricket",
      "Cycling",
      "Desai",
      "Design",
      "Development",
      "Digital Marketing",
      "Drama",
      "Drawing",
      "Dumas",
      "Education",
      "Everything",
      "Fantasy",
      "Film",
      "Finance",
      "First",
      "Fitness",
      "Football",
      "Future",
      "Games",
      "Gandhi",
      "Homer",
      "Horror",
      "Hugo",
      "Ibsen",
      "Journey",
      "Kafka",
      "King",
      "Lahiri",
      "Larsson",
      "Learn",
      "Literary Fiction",
      "Make",
      "Manage",
      "Marquez",
      "Money",
      "Mystery",
      "Negotiate",
      "Painting",
      "Philosophy",
      "Photography",
      "Poetry",
      "Production",
      "Programming",
      "React",
      "Redux",
      "River",
      "Robotics",
      "Rowling",
      "Satire",
      "Science Fiction",
      "Shakespeare",
      "Singh",
      "Swimming",
      "Tale",
      "Thrun",
      "Time",
      "Tolstoy",
      "Travel",
      "Ultimate",
      "Virtual Reality",
      "Web Development",
      "iOS",
    ];
    return (
      <div className="search-books">
        <div className="search-books-bar">
          <Link to="/" className="close-search-book">
            search
          </Link>{" "}
          <div className="search-books-input-wrapper">
            <input
              type="text"
              placeholder="Search by title or author"
              value={query}
              onChange={(e) => this.updateQuery(e.target.value)}
            />
          </div>
        </div>
        {this.state.i !== 0 &&
        this.state.searchResult.error &&
        this.state.searchResult.length !== 0 ? (
          <div
            className="search-books-results book-title "
            style={{
              textAlign: "center",
            }}
          >
            No result found, try searching for{" "}
            {searchKeys[Math.floor(Math.random() * searchKeys.length)]}
          </div>
        ) : (
          <div className="search-books-results">
            <ol className="books-grid">
              {this.state.searchResult.map((book) => (
                <li key={book.id}>
                  <div className="book">
                    <div className="book-top">
                      {book.imageLinks ? (
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${book.imageLinks.smallThumbnail})`,
                          }}
                        ></div>
                      ) : (
                        <div
                          className="book-cover"
                          style={{
                            width: 128,
                            height: 193,
                            backgroundImage: `url(${notfound})`,
                            backgroundPosition: "center",
                            backgroundSize: "contain",
                            backgroundrepeat: "no-repeat",
                          }}
                        ></div>
                      )}

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
        )}
      </div>
    );
  }
}
export default SearchPage;
