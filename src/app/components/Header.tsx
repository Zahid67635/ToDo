"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React from "react";

type MyListComponentProps = {
  links: {
    text: string;
    href: string;
  }[];
};
const Header: React.FC<MyListComponentProps> = () => {
  const pathname = usePathname();
  const links = [
    { text: "HOME", href: "/" },
    { text: "TODOS", href: "/todos" },
  ];
  return (
    <header className="p-4 text-gray-800">
      <ul className="items-stretch hidden space-x-3 lg:flex">
        {links.map((link, index) => (
          <li className="flex" key={index}>
            <Link
              href={link.href}
              className={`flex items-center px-4 -mb-1 border-b-2 border-transparent font-semibold ${
                pathname === link.href && "text-violet-600 border-violet-600"
              } `}
            >
              {link.text}
            </Link>
          </li>
        ))}
      </ul>
    </header>
  );
};

export default Header;
