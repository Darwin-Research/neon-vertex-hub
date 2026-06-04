import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { cn } from "@/lib/utils";

const mainNavItems = [
  { label: "회사소개",  path: "/about"      },
  { label: "사업실적",  path: "/portfolio"  },
  { label: "경영진",   path: "/leadership" },
  { label: "보도자료",  path: "/press"      },
  { label: "IR 자료실", path: "/ir"         },
  { label: "문의하기",  path: "/contact"    },
];

const mobileOnlyItems = [
  { label: "연혁",      path: "/history"    },
  { label: "공지사항",  path: "/notice"     },
  { label: "오시는 길", path: "/directions" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-canvas/90 backdrop-blur-xl border-b border-line">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-brand">
              Darwin Research
            </span>
            <span className="text-line select-none">·</span>
            <span className="text-xs font-medium text-ink-sub">다윈리서치</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden sm:flex items-center gap-0.5">
            {mainNavItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={cn(
                  "px-3 py-1.5 rounded-md text-xs font-medium transition-colors whitespace-nowrap",
                  location.pathname === item.path
                    ? "bg-brand text-white"
                    : "text-ink-sub hover:text-ink hover:bg-plate"
                )}
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Mobile toggle */}
          <button
            className="text-ink-sub hover:text-ink transition-colors"
            onClick={() => setOpen(!open)}
            aria-label="메뉴"
          >
            {open ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </div>

      {/* Dropdown */}
      {open && (
        <div className="absolute right-4 top-[68px] bg-surface border border-line rounded-xl shadow-lg w-auto min-w-[150px]" style={{ boxShadow: "var(--dr-shadow-md)" }}>
          <div className="px-2 py-2 space-y-0.5">
            {[...mainNavItems, ...mobileOnlyItems].map((item) => (
              <Link
                key={item.path}
                to={item.path}
                onClick={() => setOpen(false)}
                className={cn(
                  "block px-3 py-2 rounded-md text-sm font-medium transition-colors whitespace-nowrap",
                  location.pathname === item.path
                    ? "bg-brand text-white"
                    : "text-ink-sub hover:text-ink hover:bg-plate"
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
