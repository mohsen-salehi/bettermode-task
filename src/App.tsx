import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./apollo-client";
import PostList from "./components/PostList";
import PostDetail from "./components/PostDetail";

function App() {
  return (
    <ApolloProvider client={client}>
      <Router>
        <div className="container mx-auto p-4">
          <Routes>
            <Route path="/" element={<PostList />} />
            <Route path="/post/:id" element={<PostDetail />} />
          </Routes>
        </div>
      </Router>
    </ApolloProvider>
  );
}

export default App;
