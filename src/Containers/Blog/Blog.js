import React, { Component } from "react";
import axios from "../../axios";

import Post from "../../Components/Post/Post";
import FullPost from "../../Components/FullPost/FullPost";
import NewPost from "../../Components/NewPost/NewPost";
import classes from "./Blog.module.css";

class Blog extends Component {
  state = {
    posts: [],
    selectedPostId: null,
    error: false,
  };

  componentDidMount() {
    axios
      .get("/posts")
      .then((response) => {
        const posts = response.data.slice(0, 4);
        const updatedPosts = posts.map((post) => {
          return {
            ...post,
            author: "Max",
          };
        });
        this.setState({ posts: updatedPosts });
      })
      .catch((error) => {
        this.setState({ error: true });
        console.log('[Blog componentDidMount]:')
        console.log(error)
      });
  }

  handlePostClicked(id) {
    this.setState({ selectedPostId: id });
  }

  render() {
    let posts = <p style={{ color: "red" }}>Something went wrong!</p>;
    if (!this.state.error) {
      posts = this.state.posts.map((post) => {
        return (
          <Post
            key={post.id}
            title={post.title}
            author={post.author}
            clicked={() => this.handlePostClicked(post.id)}
          />
        );
      });
    }
    return (
      <div>
        <section className={classes.Posts}>{posts}</section>
        <section>
          <FullPost id={this.state.selectedPostId} />
        </section>
        <section>
          <NewPost />
        </section>
      </div>
    );
  }
}

export default Blog;
