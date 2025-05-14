type PaginationProps = {
  page: number;
  totalPages: number;
  onUpdate: (page: number) => void;
};

const Pagination = ({ page, totalPages, onUpdate }: PaginationProps) => {
  return (
    <div>
      <ul className="pagination pagination-sm">
        <li className={`page-item ${page === 1 ? "disabled" : ""}`}>
          <a className="page-link" style={{ cursor: "pointer" }} onClick={() => onUpdate(page - 1)}>
            &laquo;
          </a>
        </li>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((index) => (
          <li key={index} className={`page-item ${index === page ? "active" : ""}`}>
            <a
              className="page-link"
              onClick={(e) => {
                e.preventDefault();
                onUpdate(index);
              }}
              style={{ cursor: "pointer" }}
            >
              {index}
            </a>
          </li>
        ))}
        <li className={`page-item ${page === totalPages ? "disabled" : ""}`}>
          <a className="page-link" style={{ cursor: "pointer" }} onClick={() => onUpdate(page + 1)}>
            &raquo;
          </a>
        </li>
      </ul>
    </div>
  );
};

export default Pagination;
