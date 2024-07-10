import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";
import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const Sidenavigation = () => {
  const { systemTheme, theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;
  const currentTheme = theme === "system" ? systemTheme : theme;

  const isDark = currentTheme === "dark";

  const navLinks = [
    {
      name: "Home",
      activeIcon: "fa-solid fa-house text-[2rem] align-middle",
      icon: "bx bx-home text-[2.2rem] align-middle",
      href: "/",
    },
    {
      name: "Shop",
      activeIcon: "fa-sharp fa-solid fa-cart-shopping text-[2rem] align-middle",
      icon: "bx bx-cart text-[2.2rem] align-middle",
      href: "/shop",
    },
    {
      name: "Cart",
      activeIcon: "bx bxs-shopping-bag text-[2.2rem] align-middle",
      icon: "bx bx-shopping-bag text-[2.2rem] align-middle",
      href: "/cart",
    },
    {
      name: "Messages",
      activeIcon: "fa-brands fa-facebook-messenger text-[2rem] align-middle ",
      icon: "bx bx-message-rounded-dots text-[2.2rem] align-middle",
      href: "/messages",
    },
    {
      name: "Notification",
      activeIcon: "bx bxs-bell-ring text-[2rem] align-middle",
      icon: "bx bx-bell text-[2rem] align-middle",
      href: "/notification",
    },
    {
      name: "Profile",
      activeIcon: "bx bxs-user-circle text-[2.2rem] align-middle",
      icon: "bx bx-user-circle text-[2.2rem] align-middle",
      href: "/profile",
    },
    {
      name: "Setting",
      activeIcon: "fa-solid fa-gear text-[2rem] align-middle",
      icon: "bx bx-cog text-[2.2rem] align-middle",
      href: "/settings",
    },
  ];

  const newNavLinks = navLinks.filter((item, index) => index !== 3);

  const pathname = usePathname();

  return (
    <>
      <div className="smi:px-10 px-[1.5rem] border-t w-full z-10 block md:hidden fixed bg-white dark:bg-black bottom-0">
        <div className="flex w-full justify-between py-4">
          {newNavLinks.map((nav, index) => (
            <div key={index} className="hover:scale-125">
              <Link
                href={nav.href}
                className={
                  pathname === nav.href ? "link font-bold " : "link font-normal"
                }
              >
                <i
                  class={pathname === nav.href ? nav.activeIcon : nav.icon}
                ></i>
              </Link>
              <Link
                href={nav.href}
                className={
                  pathname === nav.href
                    ? "link font-bold hidden slg:block"
                    : "link font-normal hidden slg:block"
                }
              >
                {nav.name}
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="hidden h-screen md:block z-10  fixed left-0 border-r-[.05rem] border-r-[#c0c0c042] w-[inherit] md:w-[7.4rem] slg:w-[26rem] pl-[1rem] slg:pl-[2rem]">
        <Link href="/">
          <div className="ml-[1.2rem] slg:ml-[1.6rem] flex items-center gap-3 my-[2rem] ">
            <i className="fa-sharp fa-solid fa-cart-shopping  text-[1rem] p-4 text-white drop-shadow-xl rounded-xl bg-gradient-to-br from-[#6A08CD] to-[#8A1BA5] "></i>
            <h1 className="text-[1.5rem] font-bold hidden slg:block">
              <span className=" font-medium">mini</span>Mart
            </h1>
          </div>
        </Link>
        <div className="mt-[5rem]">
          {navLinks.map((nav, index) => (
            <div
              key={index}
              className={isDark ? "nav_link hover:bg-[#1A1A1A]" : "nav_link"}
            >
              <Link
                href={nav.href}
                className={
                  pathname === nav.href ? "link font-bold" : "link font-light"
                }
              >
                <i
                  class={pathname === nav.href ? nav.activeIcon : nav.icon}
                ></i>
              </Link>
              <Link
                href={nav.href}
                className={
                  pathname === nav.href
                    ? "link font-bold hidden slg:block"
                    : "link font-light hidden slg:block"
                }
              >
                {nav.name}
              </Link>
            </div>
          ))}
        </div>
        <div className="Switch-Toggle">
          {currentTheme === "dark" ? (
            <div
              className={
                isDark
                  ? "nav_link hover:bg-[#1A1A1A] hidden md:flex cursor-pointer"
                  : "nav_link hidden md:flex cursor-pointer"
              }
              onClick={() => setTheme("light")}
            >
              <i className="bx bx-sun text-[2rem] align-middle"></i>
              <button className="link font-light hidden slg:block">
                Switch mode
              </button>
            </div>
          ) : (
            <div
              className={
                isDark
                  ? "nav_link hover:bg-[#1A1A1A] hidden md:flex cursor-pointer"
                  : "nav_link hidden md:flex cursor-pointer"
              }
              onClick={() => setTheme("dark")}
            >
              <i className="fa-regular fa-moon text-[2rem] align-middle"></i>
              <button className="link font-light hidden slg:block">
                Switch mode
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidenavigation;
