import { useState } from "react";
import "./pagination.scss";

export default function Pagination({
  totalTasks,
  page,
  totalPage,
  changePage,
  setPage,
}) {
  // console.log(totalPage);
  const nextClasses = [
    "page-link page-item",
    totalPage == page ? "disabled" : "",
  ].join(" ");
  const prevClasses = ["page-link page-item", 1 == page ? "disabled" : ""].join(
    " "
  );
  function changeNumberOfPage(numInput) {
    if (numInput > 0 && numInput <= totalPage) {
      const myNum = parseInt(numInput);
      // setNumberOfPage(myNum);
      setPage(myNum);
      changePage(myNum);
    } else {
      return;
    }
  }

  const pages = [];
  for (let i = 1; i <= totalPage; i++) {
    const classes = ["page-link", i === page ? "active" : ""].join(" ");
    pages.push(
      <li className="page-item" key={i}>
        <span className={classes} onClick={() => changePage(i)}>
          {i}
        </span>
      </li>
    );
  }

  if (totalTasks.filtered < 4) {
    return;
  }
  return (
    <ul className="pagination paginate">
      <li>
        <span
          className="page-link page-item "
          aria-label="Next"
          onClick={() => changePage(1)}
        >
          <span aria-hidden="true">First</span>
        </span>
      </li>

      <li>
        <span
          className={prevClasses}
          aria-label="Previous"
          onClick={() => changePage(page - 1)}
        >
          <span aria-hidden="true">&laquo;</span>
        </span>
      </li>
      {totalPage > 5 ? (
        <div>
          <span>
            <input
              className=" numberOfPage"
              value={page}
              onChange={(e) => changeNumberOfPage(e.target.value)}
            />
          </span>
          <span className="totalNumberOfPage"></span>
        </div>
      ) : (
        pages
      )}

      <li>
        <span
          className={nextClasses}
          aria-label="Next"
          onClick={() => changePage(page + 1)}
        >
          <span aria-hidden="true">&raquo;</span>
        </span>
      </li>

      <li>
        <span
          className="page-link page-item"
          aria-label="Next"
          onClick={() => changePage(totalPage)}
        >
          <span aria-hidden="true">Last</span>
        </span>
      </li>
    </ul>
  );
}
