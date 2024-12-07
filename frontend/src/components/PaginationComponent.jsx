import { Link } from 'react-router-dom';

const PaginationComponent = ({
  pages,
  page,
  keyword = '',
}) => {
  return (
    <div className="flex justify-center mt-4">
      <nav>
        <ul className="flex list-style-none space-x-2">
          {[...Array(pages).keys()].map((x) => (
            <li key={x + 1}>
              <Link
                to={
                  keyword ? `search/${keyword}/page/${x + 1}` : `/page/${x + 1}`
                }
              >
                <button
                  className={`px-4 py-2 border rounded-md ${
                    x + 1 === page
                      ? 'bg-blue-500 text-white'
                      : 'bg-white text-blue-500 hover:bg-blue-100'
                  }`}
                >
                  {x + 1}
                </button>
              </Link>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default PaginationComponent;
