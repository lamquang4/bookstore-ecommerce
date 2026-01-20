import { memo, useState } from "react";
import toast from "react-hot-toast";
import { HiOutlineMinusSmall } from "react-icons/hi2";
import { HiOutlinePlusSmall } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import useGetCurrentUser from "../../../../hooks/useGetCurrentUser";
import useGetCart from "../../../../hooks/client/useGetCart";
import { useAddItemToCart } from "../../../../hooks/client/useAddItemToCart";
import type { Book } from "../../../../types/type";
import BookGallery from "./BookGallery";
import BookDescription from "./BookDescription";
import BookInformation from "./BookInformation";
type Props = {
  book: Book;
};

function BookDetail({ book }: Props) {
  const navigate = useNavigate();
  const max = 15;

  const { user } = useGetCurrentUser("client");
  const { addItem, isLoading: isLoadingAddItem } = useAddItemToCart();
  const { cart, mutate } = useGetCart(user?.id || "");

  const [quantity, setQuantity] = useState<number>(1);

  const HandleIncrement = () => {
    const maxQuantity = book?.stock > max ? max : book?.stock;
    setQuantity((prev) => (prev < maxQuantity ? prev + 1 : prev));
  };

  const HandleDecrement = () => {
    setQuantity((prev) => (prev > 1 ? prev - 1 : prev));
  };

  const handleAddItemToCart = async () => {
    if (book.stock === 0) {
      toast.error(`Sách đã hết hàng`);
      return;
    }

    if (!user?.id) {
      toast.error("Bạn phải đăng nhập để mua sách");
      navigate("/login");
      return;
    }

    const existingItem = cart?.items?.find(
      (item: any) => item.bookId === book.id,
    );

    const currentQuantity = existingItem ? existingItem.quantity : 0;
    const newQuantity = currentQuantity + quantity;

    const maxQuantity = Math.min(book.stock, max);

    if (newQuantity > maxQuantity) {
      toast(`Cuốn sách này bạn chỉ có thể mua tối đa ${maxQuantity}`);
      return;
    }

    try {
      await addItem(user.id, book?.id, quantity);
      mutate();
    } catch (err: any) {
      toast.error(err?.response?.data?.message);
    }
  };
  return (
    <section className="w-full mb-[40px] px-[15px]">
      <div className="mx-auto w-full max-w-[1200px]">
        <div className="flex flex-col lg:flex-row gap-x-[15px] gap-y-[30px] w-full">
          <div className="flex-1/6" id="div1">
            <div className="lg:items-start items-center flex lg:flex-row flex-col-reverse gap-3 flex-1/6 lg:sticky lg:top-[100px]">
              <BookGallery images={book.images} />
            </div>
          </div>

          <div className="relative flex-1" id="div2">
            <div className="space-y-[10px] ">
              <h2 className="line-clamp-2">{book?.title}</h2>

              <div className="flex items-center gap-[15px]">
                {book && book?.discount > 0 ? (
                  <>
                    <del className="text-[#707072] font-light text-[1.4rem]">
                      {book?.price.toLocaleString("vi-VN")}₫
                    </del>

                    <h3 className="text-[#C62028] font-medium">
                      {(book?.price - book?.discount).toLocaleString("vi-VN")}₫
                    </h3>

                    <p className="text-white p-1.5 bg-[#C62028] rounded-sm font-semibold">
                      -{Math.floor((book.discount / book.price) * 100)}%
                    </p>
                  </>
                ) : (
                  <h3 className="font-medium text-[#C62028]">
                    {book?.price.toLocaleString("vi-VN")}₫
                  </h3>
                )}
              </div>

              <div className="space-y-[15px]">
                {book && book.stock > 0 ? (
                  <>
                    <div className="w-full flex items-center gap-[15px]">
                      <h5 className="font-medium">Số lượng:</h5>
                      <div className="relative flex justify-between items-center max-w-[8rem] border border-gray-300 rounded-sm">
                        <button
                          type="button"
                          onClick={HandleDecrement}
                          disabled={quantity <= 1}
                          className=" p-3 h-11 outline-none"
                        >
                          <HiOutlineMinusSmall size={22} />
                        </button>
                        <input
                          type="number"
                          name="quantity"
                          readOnly
                          className="h-11 text-center text-black w-11 outline-none placeholder:text-[1.2rem] font-medium"
                          placeholder="1"
                          min={1}
                          max={book?.stock > max ? max : book?.stock}
                          value={quantity}
                        />
                        <button
                          type="button"
                          onClick={HandleIncrement}
                          disabled={
                            quantity >= (book?.stock > max ? max : book?.stock)
                          }
                          className=" p-3 h-11 outline-none"
                        >
                          <HiOutlinePlusSmall size={22} />
                        </button>
                      </div>
                    </div>

                    <button
                      type="button"
                      data-testid="btn-add-to-cart"
                      onClick={handleAddItemToCart}
                      disabled={isLoadingAddItem}
                      className="p-[10px] w-full uppercase text-[0.9rem] font-semibold border bg-[#C62028] text-white"
                    >
                      Thêm vào giỏ
                    </button>
                  </>
                ) : (
                  <button
                    type="button"
                    className="p-[10px] w-full uppercase text-[0.9rem] font-semibold border bg-transparent border-[#C62028] text-[#C62028]"
                  >
                    Hết hàng
                  </button>
                )}

                <BookInformation book={book} />

                <BookDescription description={book.description} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default memo(BookDetail);
