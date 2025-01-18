import { Outlet } from 'react-router-dom';
import { HomeIcon, ClipboardIcon, HeartIcon, ShoppingBagIcon, ChartBarIcon } from '@heroicons/react/24/outline';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Sidebar, SidebarBody, SidebarLink } from './ui/sidebar';
import { useState } from 'react';
import { motion } from 'framer-motion';
import { cn } from '../lib/utils';

export default function Layout() {
  const [open, setOpen] = useState(false);

  const links = [
    {
      label: "Home",
      href: "/",
      icon: <HomeIcon className="w-5 h-5" />,
    },
    {
      label: "Tasks",
      href: "/tasks",
      icon: <ClipboardIcon className="w-5 h-5" />,
    },
    {
      label: "History",
      href: "/history",
      icon: <ChartBarIcon className="w-5 h-5" />,
    },
    {
      label: "Pet",
      href: "/pet",
      icon: <HeartIcon className="w-5 h-5" />,
    },
    {
      label: "Shop",
      href: "/shop",
      icon: <ShoppingBagIcon className="w-5 h-5" />,
    },
  ];

  return (
    <div className="flex min-h-screen bg-neutral-50">
      <Sidebar open={open} setOpen={setOpen}>
        <SidebarBody className="justify-between gap-10">
          <div className="flex flex-col flex-1 overflow-y-auto overflow-x-hidden">
            {open ? <Logo /> : <LogoIcon />}
            <div className="mt-8 flex flex-col gap-1">
              {links.map((link, idx) => (
                <SidebarLink key={idx} link={link} />
              ))}
            </div>
          </div>
        </SidebarBody>
      </Sidebar>

      {/* Main content */}
      <main className="flex-1 p-8">
        <Outlet />
      </main>
    </div>
  );
}

const Logo = () => {
  return (
    <motion.div
      className="font-bold flex items-center justify-center text-lg text-neutral-900 py-2 px-3 relative z-20"
      whileHover={{ scale: 1.02 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <FontAwesomeIcon 
        icon="paw" 
        className="w-5 h-5 text-amber-500"
      />
      <motion.span
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.2 }}
        className="ml-3 tracking-[0.15em]"
      >
        PAWGRESS
      </motion.span>
    </motion.div>
  );
};

const LogoIcon = () => {
  return (
    <motion.div
      className="font-bold flex items-center justify-center text-lg text-neutral-900 py-2 px-3 relative z-20"
      whileHover={{ scale: 1.05 }}
      transition={{ type: "spring", stiffness: 400, damping: 10 }}
    >
      <FontAwesomeIcon 
        icon="paw" 
        className="w-5 h-5 text-amber-500"
      />
    </motion.div>
  );
}; 