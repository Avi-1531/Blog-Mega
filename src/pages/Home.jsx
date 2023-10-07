import { useEffect, useState } from "react";
import { Container, Postcard } from "../components";
import service from "../../appwrite/configuration";

const Home = () => {
  const [posts, setposts] = useState([]);
  // async function allmyusers() {
  //   try {
  //     const users = await service.listusers();
  //     console.log("Fetched users:", users);
  //   } catch (error) {
  //     console.error("Error fetching users:", error);
  //   }
  // }

  useEffect(() => {
    // allmyusers();
    service.getposts().then((post) => {
      if (post) {
        setposts(post.documents);
      }
    });
  }, []);
  // console.log(posts);
  if (posts.length === 0) {
    return (
      <div className="w-full py-8 mt-4 text-center">
        <Container>
          <div className="flex flex-wrap">
            <div className="p-2 w-full">
              <h1 className="text-2xl font-bold hover:text-gray-500">
                Login to read posts
              </h1>
            </div>
          </div>
        </Container>
      </div>
    );
  }
  return (
    <div>
      {" "}
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
    </div>
  );
};

export default Home;
