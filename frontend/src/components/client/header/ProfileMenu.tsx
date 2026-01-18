import { memo } from "react";
import { Link } from "react-router-dom";
import useLogout from "../../../hooks/useLogout";
import useGetCurrentUser from "../../../hooks/useGetCurrentUser";


function ProfileMenu() {
  const { handleLogout } = useLogout();
  const { user } = useGetCurrentUser("client");

  return (
    <>
      <div className="absolute top-full right-0 z-20 bg-white shadow-md rounded-sm overflow-hidden hidden group-hover:block min-w-[120px]">
        {user ? (
          <>
            <p className="border-b p-2.5 border-gray-200 max-w-[210px] overflow-hidden text-ellipsis whitespace-nowrap text-center">
              Xin chào, {user.fullname}
            </p>

            <Link
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]"
              to="/account"
            >
              Thông tin tài khoản
            </Link>

            <Link
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]"
              to="/order"
            >
              Đơn hàng
            </Link>

            <Link
              to="/address"
              data-testid="address"
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]"
            >
              Sổ địa chỉ
            </Link>

            <button
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem] text-left"
              onClick={() => handleLogout("client")}
            >
              Đăng xuất
            </button>
          </>
        ) : (
          <>
            <Link
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]"
              to="/login"
            >
              Đăng nhập
            </Link>

            <Link
              className="hover:bg-gray-100 w-full block p-2.5 text-[0.9rem]"
              to="/register"
            >
              Đăng ký
            </Link>
          </>
        )}
      </div>
    </>
  );
}

export default memo(ProfileMenu);
