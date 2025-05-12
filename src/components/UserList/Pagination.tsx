type PaginationProps = {
  page: number;
  totalPages: number;
  onUpdate: (page: number) => void;
};

const Pagination = ({ page, totalPages, onUpdate }: PaginationProps) => {
  return (
    <div>
      <ul className="pagination pagination-sm">
        <li className="page-item disabled">
          <a className="page-link" style={{ cursor: "pointer" }}>
            &laquo;
          </a>
        </li>
        {Array.from({ length: totalPages }).map((_, index) => (
          <li key={index} className={`page-item ${index + 1 === page ? "active" : ""}`}>
            <a
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                onUpdate(index + 1);
              }}
              style={{ cursor: "pointer" }}
            >
              {index + 1}
            </a>
          </li>
        ))}
        <li className="page-item">
          <a className="page-link" style={{ cursor: "pointer" }}>
            &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
