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
  };

  componentDidMount() {
    axios
      .get("https://reqres.in/api/users")
      .then((response) => {
        console.log(response.data.data);
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

  render() {
    const {
      people,
      modalActive,
      modalUser,
      currentPage,
      usersPerPage,
    } = this.state;

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
          class={number === currentPage ? "active" : "nope"}
        >
          {number}
        </div>
      );
    });

    console.log(currentPage);
    return (
      <>
        {modalActive && (
          <div id="myModal" class="modal">
            <div
              class="modal-header"
              onClick={() => this.handleModal({ modalActive })}
            >
              <span class="close">&times;</span>
              <h3>User Info</h3>
            </div>
            <div class="modal-body">
              <table class="container">
                <thead>
                  <tr>
                    <th>{/* <h1>User Info</h1> */}</th>
                    <th style={{ width: "12vw" }}>
                      {/* <h1>First Name</h1> */}
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td>
                      <span class="skyblue">ID: </span>
                      {modalUser.id}
                    </td>
                    <td rowSpan="4">
                      <img
                        src={modalUser.avatar}
                        style={{ width: "10vw", height: "10vw" }}
                      />
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="skyblue">First Name: </span>
                      {modalUser.first_name}
                    </td>
                  </tr>
                  <tr>
                    <td>
                      <span class="skyblue">Last Name: </span>
                      {modalUser.last_name}
                    </td>
                  </tr>

                  <tr>
                    <td>
                      <span class="skyblue">Email: </span> {modalUser.email}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="modal-footer">
              <h3>Presented by Bala</h3>
            </div>
          </div>
        )}
        <h1>
          <span class="blue">Users</span> <span class="yellow">List</span>
        </h1>
        <h2>
          Created by{" "}
          <a href="" target="_blank">
            Senjuti Bala
          </a>
        </h2>

        <table class="container">
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
                  />
                </td>
                <td>{user.first_name}</td>
                <td>{user.last_name}</td>
              </tr>
            ))}
          </tbody>
          <div class="pagination">{renderPageNumbers}</div>
        </table>
      </>
    );
  }
}
export default App;
