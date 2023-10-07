import { Link, useNavigate } from "react-router-dom";
import Logo from "../Logo";
import { Container, Logoutbtn } from "../index";
import { useSelector } from "react-redux";

const Header = () => {
  const authstatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();
  const navitems = [
    { name: "Home", slug: "/", active: true },
    { name: "Login", slug: "/login", active: !authstatus },
    { name: "Signup", slug: "/signup", active: !authstatus },
    { name: "All Posts", slug: "/all-posts", active: authstatus },
    { name: "Add Post", slug: "/add-post", active: authstatus },
  ];
  return (
    <header className="py-3 shadow bg-gray-500">
      <Container>
        <nav className="flex">
          <div className="mr-4">
            <Link to="/">
              <Logo />
            </Link>
          </div>
          <ul className="flex ml-auto ">
            {navitems.map((item) =>
              item.active ? (
                <li key={item.name}>
                  <button
                    className="inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full"
                    onClick={() => navigate(item.slug)}
                  >
                    {item.name}
                  </button>
                </li>
              ) : null
            )}
          </ul>

          {authstatus && (
            <li>
              <Logoutbtn />
            </li>
          )}
        </nav>
      </Container>
    </header>
  );
};

export default Header;
