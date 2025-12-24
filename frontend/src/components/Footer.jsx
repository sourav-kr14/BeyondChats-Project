const Footer = () => {
  return (
    <footer className="bg-white rounded-lg shadow-sm border border-slate-200 m-4">
      <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <a
            href="/"
            className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
          >
            <div className="flex title-font font-medium items-center text-gray-900 mb-4 md:mb-0">
              <img
                src="/scrap.png"
                alt="BeyondChats Logo"
                className="w-10 h-10 object-contain rounded-lg"
              />
              <div className="flex flex-col ml-3">
                <span className="text-2xl font-bold tracking-tight text-indigo-600 leading-none">
                  BeyondChats
                </span>
                <span className="text-[12px] font-medium text-slate-400 uppercase tracking-widest mt-1">
                  Article Processing & Enhancement
                </span>
              </div>
            </div>
          </a>
          <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-slate-500 sm:mb-0">
            <li>
              <a
                href="#"
                className="hover:underline me-4 md:me-6"
              >
                About
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline me-4 md:me-6"
              >
                Privacy Policy
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline me-4 md:me-6"
              >
                Licensing
              </a>
            </li>
            <li>
              <a
                href="#"
                className="hover:underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </div>
        <hr className="my-6 border-slate-100 sm:mx-auto lg:my-8" />
        <span className="block text-sm text-slate-400 sm:text-center">
          © {new Date().getFullYear()}{" "}
          <a
            href="/"
            className="hover:underline"
          >
            BeyondChats™
          </a>
          . All Rights Reserved.
        </span>
      </div>
    </footer>
  );
};

export default Footer;
