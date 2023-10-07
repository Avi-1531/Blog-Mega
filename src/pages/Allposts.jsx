import { useEffect, useState } from "react";
import service from "../../appwrite/configuration";
import { Container, Postcard } from "../components";
// import { useSelector } from "react-redux";

// import PostForm from "../components/post-form/PostForm";

const Allposts = () => {
  const [posts, setposts] = useState([]);
  // const userdata = useSelector((state) => state.auth.userdata);
  // console.log(userdata.$id);
  useEffect(() => {
    service
      .getposts()
      .then((post) => {
        if (post) {
          setposts(post.documents);
        }
      })
      .catch((err) => console.log(err));
  }, []);
  // console.log(posts);

  return (
    <div className="w-full py-8">
      <Container>
        <div className="flex flex-wrap">
          {posts.map((post) => (
            <div key={post.$id} className="p-2 w-1/4">
              <Postcard
                $id={post.$id}
                title={post.title}
                featuredimage={post.featuredimage}
              />
            </div>
          ))}
        </div>
      </Container>
    </div>
  );
};

export default Allposts;
