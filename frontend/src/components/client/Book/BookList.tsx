import Image from "../../Image";
import Loading from "../../Loading";
import type { Book } from "../../../types/type";
import { useLocation, useNavigate } from "react-router-dom";
import AdvancedSearch from "../AdvancedSearch";
import { VscSettings } from "react-icons/vsc";
import { useCallback, useState } from "react";
import BookCard from "./BookCard";

interface Props {
  category?: string;
  books: Book[];
  isLoading: boolean;
  total: number;
}

function BookList({ category, books, isLoading, total }: Props) {
  const location = useLocation();
  const navigate = useNavigate();
  const searchParams = new URLSearchParams(location.search);
  const search = searchParams.get("q");
  const pathname = location.pathname;

  const [advancedSearchOpen, setAdvancedSearchOpen] = useState<boolean>(false);

  const sortArray = [
    {
      name: "Mới nhất",
      sort: "newest",
    },
    {
      name: "Giá (thấp-cao)",
      sort: "price-asc",
    },
    {
      name: "Giá (cao-thấp)",
      sort: "price-desc",
    },
    {
      name: "Bán chạy nhất",
      sort: "bestseller",
    },
  ];

  const toggleAdvancedSearch = useCallback(() => {
    setAdvancedSearchOpen((prev) => !prev);
  }, []);

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const sort = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (sort) {
      params.set("sort", sort);
    } else {
      params.delete("sort");
    }
    params.set("page", "1");
    navigate(`${pathname}?${params.toString()}`);
  };

  return (
    <>
      <div className="mb-[50px] space-y-[15px]">
        {!isLoading && (category || search) && (
          <h2 className=" text-black capitalize">
            {search ? search : category} ({total})
          </h2>
        )}

        <div className="flex justify-between items-center flex-wrap gap-[15px]">
          <button
            className="bg-gray-50 border border-gray-300 text-gray-900 rounded-sm block p-2 outline-0"
            onClick={toggleAdvancedSearch}
          >
            <span className="flex gap-2 items-center font-medium">
              <VscSettings size={20} /> Bộ lọc
            </span>
          </button>

          <select
            onChange={handleSortChange}
            value={searchParams.get("sort") ?? ""}
            className="bg-gray-50 border border-gray-300 text-gray-900 text-[0.9rem] rounded-sm block p-2 outline-0"
          >
            {sortArray.map((item, index) => (
              <option value={item.sort} key={index}>
                {item.name}
              </option>
            ))}
          </select>
        </div>
      </div>

      <AdvancedSearch
        isOpen={advancedSearchOpen}
        onToggleMenu={toggleAdvancedSearch}
      />

      {isLoading ? (
        <Loading height={60} size={50} color="black" thickness={2} />
      ) : books.length > 0 ? (
        <div
          className={`grid grid-cols-2 gap-x-[10px] gap-y-[35px] lg:grid-cols-3 2xl:grid-cols-4 ${
            books.length <= 0 ? "h-[50vh]" : ""
          }`}
        >
          {books.map((book) => {
            return (
           <BookCard book={book} key={book.id} />
            );
          })}
        </div>
      ) : (
        <div className="flex justify-center items-center h-[60vh]">
          <div className="flex flex-col justify-center items-center gap-[15px]">
            <Image
              source={"/assets/notfound1.png"}
              alt={""}
              className={"w-[140px]"}
              loading="eager"
            />

            <h4>Không tìm thấy sách nào</h4>
          </div>
        </div>
      )}
    </>
  );
}

export default BookList;
