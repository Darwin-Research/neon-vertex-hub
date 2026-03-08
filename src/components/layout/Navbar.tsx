import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { label: "회사소개", path: "/about" },
  { label: "사업실적", path: "/portfolio" },
  { label: "경영진", path: "/leadership" },
  { label: "보도자료", path: "/press" },
  { label: "IR 자료실", path: "/ir" },
];

const mobileOnlyItems = [
  { label: "연혁", path: "/history" },
  { label: "공지사항", path: "/notice" },
  { label: "문의하기", path: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="flex items-center gap-1 text-xl font-black tracking-tight">
            <span className="text-foreground">VERTEX</span>
            <span className="text-primary">CAPITAL</span>
          </Link>

          {/* Always visible main nav */}
          <div className="hidden sm:flex items-center gap-0.5 overflow-x-auto">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-2 py-1.5 rounded-md text-xs md:text-sm font-medium transition-colors whitespace-nowrap",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button className="text-foreground" onClick={() => setOpen(!open)}>
            {open ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="lg:hidden bg-background border-b border-border">
          <div className="px-4 py-3 space-y-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors",
                  location.pathname === item.path
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}
