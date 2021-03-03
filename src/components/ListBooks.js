import React from "react";
import "./App.css";
import { Link } from "react-router-dom";
import { PropTypes } from "prop-types";

class ListBooks extends React.Component {
  static protoTypes = {
    onUpdateShelf: PropTypes.func.isRequired,
  };
  render() {
    /*const currentlyReading = this.props.books.filter(
      (book) => book.shelf === "currentlyReading"
    );
    const wantToRead = this.props.books.filter(
      (book) => book.shelf === "wantToRead"
    );
    const read = this.props.books.filter((book) => book.shelf === "read");*/
    const currentlyReading = this.props.currentlyReading;
    const wantToRead = this.props.wantToRead;
    const read = this.props.read;
    const { onUpdateShelf } = this.props;
    const notfound =
      "https://store.bookbaby.com/BookShop/CommonControls/BookShopThemes/bookshop/OnePageBookCoverImage.jpg?BookID=BK90012193&ImageType=FrontLarge";

    return (
      <div className="list-books">
        <div className="list-books-title">
          <h1>MyReads</h1>
        </div>
        <div className="list-books-content">
          <div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Currently Reading</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {currentlyReading.map((book) => (
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
                              }}
                            ></div>
                          )}
                          <div className="book-shelf-changer">
                            <select
                              onChange={(e) =>
                                onUpdateShelf(
                                  book.id,
                                  e.target.value.toString()
                                )
                              }
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
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Want to Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {wantToRead.map((book) => (
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
                              }}
                            ></div>
                          )}
                          <div className="book-shelf-changer">
                            <select
                              onChange={(e) =>
                                onUpdateShelf(
                                  book.id,
                                  e.target.value.toString()
                                )
                              }
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
            </div>
            <div className="bookshelf">
              <h2 className="bookshelf-title">Read</h2>
              <div className="bookshelf-books">
                <ol className="books-grid">
                  {read.map((book) => (
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
                              }}
                            ></div>
                          )}
                          <div className="book-shelf-changer">
                            <select
                              onChange={(e) =>
                                onUpdateShelf(
                                  book.id,
                                  e.target.value.toString()
                                )
                              }
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
            </div>
          </div>
        </div>
        <div className="open-search">
          <Link to="/search" className="search-book">
            search
          </Link>
        </div>
      </div>
    );
  }
}
export default ListBooks;
