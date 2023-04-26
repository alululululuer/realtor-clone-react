import { Link, NavLink } from "react-router-dom";
import { RiMenuFill } from "react-icons/ri";
import { useState, useEffect, useRef } from "react";

const tabs = [
  {
    text: "Home",
    path: "/",
  },
  {
    text: "Offers",
    path: "/offers",
  },
  {
    text: "Sign In",
    path: "/sign-in",
  },
];

const Header = () => {
  const [activeTabIndex, setActiveTabIndex] = useState(0);
  const [tabUnderlineWidth, setTabUnderlineWidth] = useState(0);
  const [tabUnderlineLeft, setTabUnderlineLeft] = useState(0);

  const tabsRef = useRef([]);

  useEffect(() => {
    const setTabPosition = () => {
      const currentTab = tabsRef.current[activeTabIndex];

      setTabUnderlineLeft(currentTab?.offsetLeft ?? 0);
      setTabUnderlineWidth(currentTab?.clientWidth ?? 0);
    };

    setTabPosition();
  }, [activeTabIndex]);

  return (
    <div className=" bg-white border-b shadow-sm sticky top-0 z-50">
      <header className="container flex justify-between items-center py-3">
        <Link to="/">
          <img src="/logo.svg" alt="Logo" className="h-5" />
        </Link>

        <div className="hidden sm:flex sm:gap-10 relative">
          {tabs.map((tab, idx) => (
            <NavLink
              key={idx}
              to={tab.path}
              ref={(el) => (tabsRef.current[idx] = el)}
              onClick={() => setActiveTabIndex(idx)}
              className={({ isActive }) =>
                isActive ? "text-black font-bold" : "text-gray-500"
              }
            >
              {tab.text}
            </NavLink>
          ))}
          {/* span的 -bottom-3取自header的py-3*/}
          <span
            className="absolute -bottom-3 block h-1 bg-[#D92228] transition-all duration-300"
            style={{ left: tabUnderlineLeft, width: tabUnderlineWidth }}
          ></span>
        </div>

        <div className="sm:hidden">
          <RiMenuFill className="text-xl" />
        </div>
      </header>
    </div>
  );
};
export default Header;
