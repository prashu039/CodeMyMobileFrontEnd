import React, { Component } from "react";
import request from "axios";
import User from "./User";

import Config from "../config/dev.json";

class UserList extends Component {
  constructor() {
    super();
    this.state = {
      userList: [],
      friendsList: [],
      userLimit: Config.pagination.userList.limit,
      userOffset: Config.pagination.userList.offset,
      friendLimit: Config.pagination.userList.limit,
      friendOffset: Config.pagination.userList.offset,
      selectedUser: "",
    };
    this.getUserList = this.getUserList.bind(this);
  }

  /**
   * Load User List Once DOM is Rendered
   */
  componentDidMount() {
    this.updateUserList();
  }

  async updateUserList() {
    let userList = await this.getUserList();

    this.setState({ userList });

    console.log(this.state.userList);
  }

  async getUserList() {
    try {
      var req = await request.get(Config.server.host + "/users/userList", {
        params: {
          limit: this.state.userLimit,
          offset: this.state.userOffset,
        },
      });
      var res = req.data;
      return res;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  /**
   * Get Next User List
   */
  async getNextUserList() {
    await this.setState({
      userOffset: this.state.userOffset + Config.pagination.userList.limit,
    });

    this.updateUserList();
  }

  /**
   * Get Previous User List
   */
  async getPreviousUserList() {
    if (this.state.userOffset > 0) {
      await this.setState({
        userOffset: this.state.userOffset - Config.pagination.userList.limit,
      });
    }

    this.updateUserList();
  }

  /**
   * Get Previous User List
   */
  async getPreviousFriendList() {
    if (this.state.friendOffset > 0) {
      await this.setState({
        friendOffset:
          this.state.friendOffset - Config.pagination.friendsList.limit,
      });
    }

    this.updateFriendsList();
  }

  /**
   * Get Next User List
   */
  async getNextFriendList() {
    await this.setState({
      friendOffset:
        this.state.friendOffset + Config.pagination.friendsList.limit,
    });

    this.updateFriendsList();
  }

  async updateFriendsList() {
    let friendsList = await this.getFriendList(this.state.selectedUser.id);

    this.setState({ friendsList });
  }

  /**
   * Get Friend List For User
   */

  async getFriendList(id) {
    try {
      var req = await request.get(Config.server.host + "/users/friends/" + id, {
        params: {
          limit: this.state.friendLimit,
          offset: this.state.friendOffset,
        },
      });
      var res = req.data;
      return res;
    } catch (error) {
      console.error(error);
      return [];
    }
  }

  // async updateFriendList(){
  //     let userList = await this.getUserList();

  //     this.setState({ userList });

  //     console.log(this.state.userList)
  // }

  getFriends = async (user) => {
    console.log(user);
    let friendsList = await this.getFriendList(user.id);

    this.setState({
      selectedUser: user,
      friendsList: friendsList,
      friendLimit: Config.pagination.userList.limit,
      friendOffset: Config.pagination.userList.offset,
    });
  };

  render(){
    return(
        <React.Fragment>
             <h1>User List</h1>
             <ul>
             {
                 !this.state.userList?"User information is loading":
                 this.state.userList.map((user)=>{
                     return <User key={user.id} user={user} getFriends={()=>{this.getFriends(user)}}/>
                 })
             }
             </ul>

             <button onClick={()=>{this.getPreviousUserList()}}>Prev</button>

             <button onClick={()=>{this.getNextUserList()}}>Next</button>                 

             <h1>{this.state.selectedUser.firstName} {this.state.selectedUser.lastName} Friends List</h1>
             
             <ul>
             {
                 !this.state.userList?"Friend information is loading":
                 this.state.friendsList.map((friend)=>{
                    return <User key={friend.friendId} user={friend}/>
                })
                 
             }  
             </ul>
             
                <button onClick={()=>{this.getPreviousFriendList()}}>Prev</button>

                <button onClick={()=>{this.getNextFriendList()}}>Next</button>

        </React.Fragment>
    )
}
}

export default UserList;
