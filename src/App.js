import React, { Component } from "react";
import axios from "axios";
import "./App.scss";
class App extends Component {
  state = {
    people: [],
    modalActive: false,
    modalUser: null,
    currentPage: 1,
    usersPerPage: 4,
    searchTerm: null,
  };

  componentDidMount() {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        this.successShow(response);
      })
      .catch((error) => {
        this.successShow(error);
      });
  }

  successShow(response) {
    this.setState({
      people: response.data.data,
    });
  }

  handleModal = ({ user, modalActive }) => {
    this.setState({
      modalUser: modalActive ? null : user,
      modalActive: !modalActive,
    });
  };

  handleClick = (number) => {
    this.setState({
      currentPage: number,
    });
  };

  handleSearchTermInput = (event) => {
    const searchTerm = event.target.value;
    this.setState({ searchTerm: searchTerm.length > 0 ? searchTerm : null });
  };

  render() {
    const {
      modalActive,
      modalUser,
      currentPage,
      usersPerPage,
      searchTerm,
    } = this.state;

    let { people } = this.state;
    //getting people after filtering with searchTerm in first_name, lastt_name and email
    people = !searchTerm
      ? people
      : people.filter(
          (person) =>
            person.first_name
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase()) ||
            person.last_name
              .toLowerCase()
              .includes(searchTerm.toLocaleLowerCase()) ||
            person.email.toLowerCase().includes(searchTerm.toLocaleLowerCase())
        );

    const indexOfLastPage = currentPage * usersPerPage;
    const indexOfFirstPage = indexOfLastPage - usersPerPage;
    const currentPeople = people.slice(indexOfFirstPage, indexOfLastPage);

    // Logic for displaying page numbers
    const pageNumbers = [];
    for (let i = 1; i <= Math.ceil(people.length / usersPerPage); i++) {
      pageNumbers.push(i);
    }

    const renderPageNumbers = pageNumbers.map((number) => {
      return (
        <div
          key={number}
          id={number}
          onClick={() => this.handleClick(number)}
          className={number === currentPage ? "active" : "nope"}
        >
          {number}
        </div>
      );
    });

    return (
      <>
        {modalActive && (
          <div id="myModal" className="modal">
            <div
              className="modal-header"
              onClick={() => this.handleModal({ modalActive })}
            >
              <span className="close">&times;</span>
              <h3>User Info</h3>
            </div>
            <div className="modal-body">
              <table className="container">
                <thead>
                  <tr>
                    <th />
                    <th style={{ width: "12vw" }} />
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span className="skyblue">ID: </span>
                      {modalUser.id}
                    </td>
                    <td rowSpan="4">
                      <img
                        src={modalUser.avatar}
                        style={{ width: "10vw", height: "10vw" }}
                        alt="avtar"
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="skyblue">First Name: </span>
                      {modalUser.first_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span className="skyblue">Last Name: </span>
                      {modalUser.last_name}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span className="skyblue">Email: </span> {modalUser.email}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div className="modal-footer">
              <h3>Presented by Bala</h3>
            </div>
          </div>
        )}
        <h1>
          <span className="skyblue">Users</span>{" "}
          <span className="yellow">List</span>
        </h1>
        <h2>
          Created by <a href="#">Senjuti Bala</a>
        </h2>

        <div className="wrap">
          <div className="search">
            <input
              type="text"
              className="searchTerm"
              placeholder="What are you looking for?"
              value={searchTerm || ""}
              onChange={(text) => this.handleSearchTermInput(text)}
            />
            <button type="submit" className="searchButton">
              <span className="darkblue">Search</span>
            </button>
          </div>
        </div>
        <table className="container">
          <thead>
            <tr>
              <th style={{ width: "5vw" }}>
                <h1>Avatars</h1>
              </th>
              <th>
                <h1>First Name</h1>
              </th>
              <th>
                <h1>Last Name</h1>
              </th>
            </tr>
          </thead>
          <tbody>
            {currentPeople.map((user) => (
              <tr
                key={user.id}
                onClick={() => this.handleModal({ user, modalActive })}
              >
                <td>
                  <img
                    src={user.avatar}
                    style={{ width: "3vw", height: "3vw" }}
                    alt="avtar"
                  />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
              </tr>
            ))}
          </tbody>
          <div className="pagination">{renderPageNumbers}</div>
        </table>
      </>
    );
  }
}
export default App;
