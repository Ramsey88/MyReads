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
  updateShelf(book, shelf) {
    BooksAPI.update(" Jf1vQAACAAJ", " wantToRead").then((book) => {
      console.log("boooooooooooooooook", book);
      this.setState(() => ({
        currentlyReading: book.currentlyReading.filter(
          (book) => book.shelf === "currentlyReading"
        ),
        wantToRead: book.wantToRead.filter(
          (book) => book.shelf === "wantToRead"
        ),
        read: book.read.filter((book) => book.shelf === "read"),
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
              onUpdateState={this.updateState}
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
