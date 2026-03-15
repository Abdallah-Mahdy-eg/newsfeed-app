import { Button, Container, Typography } from "@mui/material";
import NewsHeader from "./components/NewsHeader";
import NewsFeed from "./components/NewsFeed";
import { useEffect, useRef, useState } from "react";
import { debounce } from "lodash";
// import { Margin } from "@mui/icons-material";
import styled from "styled-components";

const Footer = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
}));

const PAGE_SIZE = 5;

function App() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [category, setCategory] = useState("general");
  const pageNumber = useRef(1);
  const queryValue = useRef("");

  // const [query,setQuery] =useState("")

  async function loadData(currentCategory) {
    const response = await fetch(
      `https://cors-anywhere.herokuapp.com/https://newsapi.org/v2/top-headlines?category=${currentCategory}&q=${queryValue.current}&pageSize=${PAGE_SIZE}&page=${pageNumber.current}&country=us&apiKey=${import.meta.env.VITE_NEWS_API_KEY}`,
    );
    const data = await response.json();
    if (data.status === "error") {
      throw new Error("An error has occurred");
    }
    return data.articles.map((article) => {
      const { title, description, author, publishedAt, urlToImage, url } =
        article;
      return {
        url,
        title,
        description,
        author,
        publishedAt,
        image: urlToImage,
      };
    });
  }

  const fetchAndUpdateArticles = (currentCategory) => {
    setLoading(true);
    setError("");
    loadData(currentCategory ?? category)
      .then((newData) => {
        setArticles(newData);
      })
      .catch((errorMessage) => {
        setError(errorMessage.message);
        // console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const debouncedLoadData = debounce(fetchAndUpdateArticles, 500);

  useEffect(() => {
    fetchAndUpdateArticles();
  }, []);

  const handleSearchChange = (newQuery) => {
    pageNumber.current = 1;
    queryValue.current = newQuery;
    debouncedLoadData();
  };

  const handleNextClick = () => {
    pageNumber.current = pageNumber.current + 1;
    fetchAndUpdateArticles();
  };
  const handlePreviousClick = () => {
    pageNumber.current = pageNumber.current - 1;
    fetchAndUpdateArticles();
  };

  const handelCategoryChange = (event) => {
    setCategory(event.target.value);
    pageNumber.current = 1;
    fetchAndUpdateArticles(event.target.value);
  };
  return (
    <>
      <Container>
        <NewsHeader
          onSearchChange={handleSearchChange}
          category={category}
          onCategoryChange={handelCategoryChange}
        />
        {error.length === 0 ? (
          <NewsFeed articles={articles} loading={loading} />
        ) : (
          <Typography color="error" align="center">
            {error}
          </Typography>
        )}
        <Footer>
          <Button
            variant="outlined"
            onClick={handlePreviousClick}
            disabled={loading || pageNumber.current === 1}
          >
            previous
          </Button>
          <Button
            variant="outlined"
            onClick={handleNextClick}
            disabled={loading || articles.length < PAGE_SIZE}
          >
            next
          </Button>
        </Footer>
      </Container>
    </>
  );
}

export default App;
