import React from "react";
import ListBooks from "./ListBooks";
import * as BooksAPI from ".././utils/BooksAPI";
import "./App.css";
import { Route } from "react-router-dom";
import SearchPage from "./SearchPage";
class App extends React.Component {
  state = {
    currentlyReading: [],
    wantToRead: [],
    read: [],
  };

  componentDidMount() {
    BooksAPI.getAll().then((book) => {
      this.setState(() => ({
        currentlyReading: book.filter(
          (book) => book.shelf === "currentlyReading"
        ),
        wantToRead: book.filter((book) => book.shelf === "wantToRead"),
        read: book.filter((book) => book.shelf === "read"),
      }));
    });
  }
  updateShelf = (book, shelf) => {
    BooksAPI.update({ id: book }, shelf).then((book) => {
      this.update();
    });
  };
  update() {
    BooksAPI.getAll().then((book) => {
      this.setState(() => ({
        currentlyReading: book.filter(
          (book) => book.shelf === "currentlyReading"
        ),
        wantToRead: book.filter((book) => book.shelf === "wantToRead"),
        read: book.filter((book) => book.shelf === "read"),
      }));
    });
  }

  render() {
    return (
      <div>
        <Route
          exact
          path="/"
          render={() => (
            <ListBooks
              currentlyReading={this.state.currentlyReading}
              wantToRead={this.state.wantToRead}
              read={this.state.read}
              onUpdateShelf={this.updateShelf}
            />
          )}
        />
        <Route
          path="/search"
          render={({ history }) => (
            <SearchPage
              books={this.state}
              onsearchBooks={(book) => {
                this.searchBooks(book);
              }}
              onUpdateShelf={(book, shelf) => {
                this.updateShelf(book, shelf);
                history.push("/");
              }}
            />
          )}
        />
      </div>
    );
  }
}

export default App;
