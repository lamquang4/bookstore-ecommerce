import { Link } from "react-router-dom";
import type { Book } from "../../../types/type";
import Image from "../../Image";

interface Props {
  book: Book;
}

function BookCard({ book }: Props) {
  return (
    <div className="space-y-[15px] rounded-sm" key={book.id}>
      <div className="relative group">
        <Link to={`/book/${book.slug}`}>
          {book.images.length > 0 && (
            <div className=" w-full overflow-hidden pt-[100%]">
              <Image
                source={`${import.meta.env.VITE_BACKEND_URL}${
                  book.images[0].image
                }`}
                alt={book.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
            </div>
          )}
        </Link>

        {book.discount > 0 && (
          <div className="absolute top-0 left-0 z-10 font-semibold text-center">
            <p className="text-white text-[0.8rem] px-2 py-1 bg-[#C62028] w-10 h-10 rounded-full text-center flex justify-center items-center">
              -{Math.floor((book.discount / book.price) * 100)}%
            </p>
          </div>
        )}

        {book.stock === 0 && (
          <p className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full text-center text-white p-1 font-medium bg-[#C62028] uppercase">
            Hết hàng
          </p>
        )}
      </div>

      <div className="space-y-[6px]">
        <h5 className="font-medium capitalize line-clamp-2">{book.title}</h5>

        {book.discount > 0 ? (
          <div className="flex gap-[12px]">
            <del className="text-[#707072] text-[1rem]">
              {book.price.toLocaleString("vi-VN")}₫
            </del>

            <h5 className="font-semibold text-[#C62028]">
              {(book.price - book.discount).toLocaleString("vi-VN")}₫
            </h5>
          </div>
        ) : (
          <h5 className="font-semibold text-[#C62028]">
            {book.price.toLocaleString("vi-VN")}₫
          </h5>
        )}

        <p className="font-medium">{book.category.name}</p>
      </div>
    </div>
  );
}

export default BookCard;
