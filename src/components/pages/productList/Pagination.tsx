import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const Pagination = ({ products, currentPage, setCurrentPage }: any) => {
  const totalPages = Math.ceil(products.length / 16);

  const handlePageChange = (
    _event: React.ChangeEvent<unknown>,
    page: number,
  ) => {
    setCurrentPage(page);
    setTimeout(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, 500);
  };

  return (
    <>
      {totalPages > 1 && (
        <div className="join mt-4">
          {/* Prev Button */}
          <button
            className="join-item btn rounded-full mx-3 text-black dark:text-white px-3"
            disabled={currentPage === 1}
            onClick={(e) => handlePageChange(e as any, currentPage - 1)}
          >
            <IoIosArrowForward />
          </button>

          {/* Page Numbers */}
          {Array.from({ length: totalPages }, (_, index) => {
            const page = index + 1;

            return (
              <button
                key={page}
                onClick={(e) => handlePageChange(e as any, page)}
                className={`join-item btn mx-1 px-3.75 pt-1.5 pb-1 rounded-full transition-all ease-in-out duration-300 cursor-pointer ${
                  currentPage === page
                    ? "btn-active bg-blue-700 text-white"
                    : "text-black dark:text-white hover:bg-blue-100 dark:hover:bg-blue-950"
                }`}
              >
                {page}
              </button>
            );
          })}

          {/* Next Button */}
          <button
            className="join-item btn mx-2! rounded-full text-black dark:text-white px-3"
            disabled={currentPage === totalPages}
            onClick={(e) => handlePageChange(e as any, currentPage + 1)}
          >
            <IoIosArrowBack />
          </button>
        </div>
      )}
    </>
  );
};

export default Pagination;
