import Link from "next/link";
import { FaUser } from "react-icons/fa";

const ProfileBtn = () => {
  return (
    <>
      <Link
        href="/profile"
        className="p-2.5 text-gray-700 dark:text-gray-300 rounded-lg hover:shadow-[0px_2px_5px_0_rgba(0,0,0,0.2)] dark:hover:bg-gray-800 transition-all ease-in-out duration-200"
      >
        <FaUser size="20px" />
      </Link>
    </>
  );
};

export default ProfileBtn;
