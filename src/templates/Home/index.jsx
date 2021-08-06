import './styles.css';
import { useEffect, useState, useCallback } from 'react';
import { Posts } from '../../components/Posts';
import { Button } from '../../components/Button';
import { TextInput } from '../../components/TextInput';
import { loadPosts } from '../../utils/load-posts';

export const Home = () => {
  // state = {
  //   posts: [],
  //   allPosts: [],
  //   page: 0,
  //   postsPerPage: 6,
  //   searchValue: "",
  // };

  const [posts, setPosts] = useState([]);
  const [allPosts, setAllPosts] = useState([]);
  const [page, setPage] = useState(0);
  const [postsPerPage] = useState(6);
  const [searchValue, setSearchValue] = useState('');

  const noMorePosts = page + postsPerPage >= allPosts.length;

  const filteredPosts = searchValue
    ? allPosts.filter((post) => {
        return post.title.toLowerCase().includes(searchValue.toLowerCase());
      })
    : posts;

  const handleChange = (e) => {
    const { value } = e.target;
    setSearchValue(value);
  };

  const handleLoadPosts = useCallback(async (page, postsPerPage) => {
    // const { page, postsPerPage } = this.state;
    const postsAndPhotos = await loadPosts();
    setPosts(postsAndPhotos.slice(page, postsPerPage));
    setAllPosts(postsAndPhotos);
  }, []);

  const loadMorePosts = () => {
    const nextPage = page + postsPerPage;
    const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
    posts.push(...nextPosts);

    setPosts(posts);
    setPage(nextPage);
  };

  useEffect(() => {
    console.log(new Date().toLocaleString('pt-br'));
    handleLoadPosts(0, postsPerPage);
  }, [handleLoadPosts, postsPerPage]);

  return (
    <section className="container">
      <div className="search-container">
        {!!searchValue && <h1>Search value: {searchValue}</h1>}
        <TextInput value={searchValue} handleChange={handleChange} />
      </div>

      {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
      {filteredPosts.length === 0 && <p>Não existem posts =(</p>}
      <div className="button-container">
        {!searchValue && <Button onClick={loadMorePosts} text="Load more posts" disabled={noMorePosts} />}
      </div>
    </section>
  );
};

// class Home2 extends Component {
//   state = {
//     posts: [],
//     allPosts: [],
//     page: 0,
//     postsPerPage: 6,
//     searchValue: "",
//   };

//   loadPosts = async () => {
//     const { page, postsPerPage } = this.state;
//     const postsAndPhotos = await loadPosts();
//     this.setState({
//       posts: postsAndPhotos.slice(page, postsPerPage),
//       allPosts: postsAndPhotos,
//     });
//   };
//   // caso acessar dados remotos de ser async
//   loadMorePosts = () => {
//     const { page, postsPerPage, allPosts, posts } = this.state;
//     const nextPage = page + postsPerPage;
//     const nextPosts = allPosts.slice(nextPage, nextPage + postsPerPage);
//     posts.push(...nextPosts);
//     this.setState({ posts, page: nextPage });
//   };

//   async componentDidMount() {
//     await this.loadPosts();
//   }

//   componentDidUpdate() {}

//   componentWillUnmount() {}

//   // state = {
//   //   name: "Jovennan Ramalho",
//   //   counter: 0,
//   // };

//   handleChange = (e) => {
//     const { value } = e.target;
//     this.setState({ searchValue: value });
//   };

//   render() {
//     const { posts, page, postsPerPage, allPosts, searchValue } = this.state;
//     const noMorePosts = page + postsPerPage >= allPosts.length;

//     const filteredPosts = !!searchValue
//       ? allPosts.filter((post) => {
//           return post.title.toLowerCase().includes(searchValue.toLowerCase());
//         })
//       : posts;

//     return (
//       <section className="container">
//         <div className="search-container">
//           {!!searchValue && <h1>Search value: {searchValue}</h1>}
//           <TextInput value={searchValue} handleChange={this.handleChange} />
//         </div>

//         {filteredPosts.length > 0 && <Posts posts={filteredPosts} />}
//         {filteredPosts.length === 0 && <p>Não existem posts =(</p>}
//         <div className="button-container">
//           {!searchValue && (
//             <Button
//               onClick={this.loadMorePosts}
//               text="Load more posts"
//               disabled={noMorePosts}
//             />
//           )}
//         </div>
//       </section>
//     );
//   }
// }

export default Home;
