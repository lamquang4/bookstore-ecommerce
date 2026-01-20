import { memo } from "react";
import type { Book } from "../../../../types/type";

type Props = {
  book: Book;
};

function BookInformation({ book }: Props) {
  return (
    <div className="text-black space-y-[15px]">
      <h4>Thông tin chi tiết</h4>

      <div className="divide-y divide-gray-200 text-[0.9rem]">
        <div className="grid grid-cols-2 gap-2 py-2">
          <span>Danh mục</span>
          <span className="font-medium">{book.category.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 py-2">
          <span>Ngày xuất bản</span>
          <span className="font-medium">
            {new Date(book.publicationDate).toLocaleDateString("vi-VN", {
              day: "2-digit",
              month: "2-digit",
              year: "numeric",
            })}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 py-2">
          <span>Tác giả</span>
          <span className="font-medium">{book.author.fullname}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 py-2">
          <span>Nhà xuất bản</span>
          <span className="font-medium">{book.publisher.name}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 py-2">
          <span>Khối lượng (gr)</span>
          <span className="font-medium">{book.weight}</span>
        </div>

        <div className="grid grid-cols-2 gap-2 py-2">
          <span>Kích thước bao bì (cm)</span>
          <span className="font-medium">
            {book.length} x {book.width} x {book.thickness}
          </span>
        </div>

        <div className="grid grid-cols-2 gap-2 py-2">
          <span>Số trang</span>
          <span className="font-medium">{book.numberOfPages}</span>
        </div>
      </div>
    </div>
  );
}

export default memo(BookInformation);
