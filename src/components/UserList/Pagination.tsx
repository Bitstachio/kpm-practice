type PaginationProps = {
  pageCurrent: number;
  pageTotal: number;
};

const Pagination = ({ pageCurrent, pageTotal }: PaginationProps) => {
  return (
    <div>
      <ul className="pagination pagination-sm">
        <li className="page-item disabled">
          <a className="page-link" href="#">&laquo;</a>
        </li>
        {Array.from({ length: pageTotal }).map((_, index) => (
          <li key={index} className={`page-item ${index + 1 === pageCurrent ? "active" : ""}`}>
            <a className="page-link" href="#">
              {index + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" href="#">&raquo;</a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
