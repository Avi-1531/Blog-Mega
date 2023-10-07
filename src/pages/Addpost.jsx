import { Container } from "../components";

// import PostForm from "../components/post-form/PostForm";
import { PostForm } from "../components/index";

const Addpost = () => {
  return (
    <div className="py-8">
      <Container>
        <PostForm />
      </Container>
    </div>
  );
};

export default Addpost;
