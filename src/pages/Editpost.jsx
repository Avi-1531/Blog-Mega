import { useNavigate, useParams } from "react-router-dom";
import service from "../../appwrite/configuration";
import { Container } from "../components";
import PostForm from "../components/post-form/PostForm";
import { useEffect, useState } from "react";

const Editpost = () => {
  const [post, setPosts] = useState(null);
  const { slug } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (slug) {
      service.getpost(slug).then((post) => {
        if (post) {
          setPosts(post);
        }
      });
    } else {
      navigate("/");
    }
  }, [slug, navigate]);
  return post ? (
    <div className="py-8">
      <Container>
        <PostForm post={post} />
      </Container>
    </div>
  ) : null;
};

export default Editpost;
