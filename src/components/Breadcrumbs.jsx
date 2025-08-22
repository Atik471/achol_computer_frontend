const Breadcrumb = ({ category }) => {
  return (
    <div className="text-sm breadcrumbs mb-4 inline">
      <ul>
        <li>
          <a className="hover:underline">Home</a>
        </li>
        <li>
          <a className="hover:underline">All Categories</a>
        </li>
        <li className="font-semibold text-primary">{category}</li>
      </ul>
    </div>
  );
};

export default Breadcrumb;
