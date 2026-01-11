import { FaGithub, FaLinkedinIn } from "react-icons/fa";

export default function Footer() {
  return (
    <footer className="border-t border-gray-800 text-center py-8">
      <p>&copy; 2024 Raditya Firman Syaputra </p>

      <div className="flex justify-center items-center mt-4 space-x-4">
        <a
          className="flex items-center justify-center border-2 border-white rounded-full w-12 h-12 "
          href="https://linkedin.com/in/radityafirmansyaputra"
          target="_blank"
        >
          <FaLinkedinIn className=" w-6 h-6" />
        </a>
        <a
          className="flex items-center justify-center border-2 border-white rounded-full w-12 h-12 "
          href="https://github.com/radityafs"
          target="_blank"
        >
          <FaGithub className=" w-6 h-6" />
        </a>
      </div>
    </footer>
  );
}
