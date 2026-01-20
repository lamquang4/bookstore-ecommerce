import { useNavigate, useParams } from "react-router-dom";
import BookDetail from "./BookDetail";
import toast from "react-hot-toast";
import { useEffect } from "react";
import BookSlider from "../BookSlider";
import useGetBookDetail from "../../../../hooks/client/useGetBookDetail";
import useGetActiveBooks from "../../../../hooks/client/useGetActiveBooks";
import Loading from "../../../Loading";
import BreadCrumb from "../../BreadCrumb";

function BookDetailContainer() {
  const { slug } = useParams();
  const navigate = useNavigate();
  const { book, isLoading } = useGetBookDetail(slug as string);
  const { books } = useGetActiveBooks();
  useEffect(() => {
    if (isLoading) return;

    if (!book) {
      toast.error("Sách không tìm thấy");
      navigate("/", { replace: true });
      return;
    }
  }, [book, isLoading, navigate]);

  const array = [
    {
      name: "Trang chủ",
      href: "/",
    },
    {
      name: book?.category?.name ?? "",
      href: `/books/${book?.category?.slug ?? ""}`,
    },
    {
      name: book?.title ?? "",
    },
  ];

  return (
    <>
      {isLoading ? (
        <Loading height={70} size={50} color="black" thickness={2} />
      ) : (
        <>
          <BreadCrumb items={array} />

          {book && <BookDetail book={book} />}
          <BookSlider books={books} title="Bạn có thể thích" />
        </>
      )}
    </>
  );
}

export default BookDetailContainer;
