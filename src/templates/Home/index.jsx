import "./styles.css";
import { Component } from "react";
import { Posts } from "../../components/Posts";
import { Button } from "../../components/Button";
import { TextInput } from "../../components/TextInput";
import { loadPosts } from "../../utils/load-posts";

class Home extends Component {
  state = {
    posts: [],
    allPosts: [],
    page: 0,
    postsPerPage: 6,
    searchValue: "",
  };

  loadPosts = async () => {
    const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    this.setState({
      posts: postsAndPhotos.slice(page, postsPerPage),
      allPosts: postsAndPhotos,
    });
  };
  // caso acessar dados remotos de ser async
  loadMorePosts = () => {
    const { page, postsPerPage, allPosts, posts } = this.state;
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);
    this.setState({ posts, page: nextPage });
  };

  async componentDidMount() {
    await this.loadPosts();
  }

  componentDidUpdate() {}

  componentWillUnmount() {}

  // state = {
  //   name: "Jovennan Ramalho",
  //   counter: 0,
  // };

  handleChange = (e) => {
    const { value } = e.target;
    this.setState({ searchValue: value });
  };

  render() {
    const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
    const noMorePosts = page + postsPerPage >= allPosts.length;

    const filteredPosts = !!searchValue
      ? allPosts.filter((post) => {
          return post.title.toLowerCase().includes(searchValue.toLowerCase());
        })
      : posts;

    return (
      <section className="container">
        <div className="search-container">
          {!!searchValue && <h1>Search value: {searchValue}</h1>}
          <TextInput value={searchValue} handleChange={this.handleChange} />
        </div>

        {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
        {filteredPosts.length === 0 && <p>Não existem posts =(</p>}
        <div className="button-container">
          {!searchValue && (
            <Button
              onClick={this.loadMorePosts}
              text="Load more posts"
              disabled={noMorePosts}
            />
          )}
        </div>
      </section>
    );
  }
}

export default Home;
