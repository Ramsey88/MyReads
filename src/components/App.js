import React from "react";
import ListBooks from "./ListBooks";
import * as BooksAPI from ".././utils/BooksAPI";
class App extends React.Component {
  state = {
    books: [],
  };
  componentDidMount() {
    BooksAPI.getAll().then((books) => {
      this.setState(() => ({
        books,
      }));
    });
  }
  render() {
    return <div>{console.log("h", this.state)}</div>;
  }
}

export default App;
