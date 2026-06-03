import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-line bg-canvas">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10">
          {/* Brand */}
          <div>
            <Link to="/" className="inline-flex items-center gap-2 mb-4">
              <span className="text-[10px] font-semibold tracking-[0.15em] uppercase text-brand">
                Darwin Research
              </span>
              <span className="text-line select-none">·</span>
              <span className="text-xs font-medium text-ink-sub">다윈리서치</span>
            </Link>
            <p className="text-sm text-ink-sub leading-relaxed max-w-xs">
              매칭이 아니라, 리서치입니다.<br />
              한 건의 연결을 위해 수십 시간의 리서치가 먼저 진행됩니다.
            </p>
          </div>

          {/* Quick links */}
          <div>
            <p className="dr-label mb-4">바로가기</p>
            <div className="space-y-2 text-sm text-ink-sub">
              <Link to="/about"     className="block hover:text-brand transition-colors">회사소개</Link>
              <Link to="/portfolio" className="block hover:text-brand transition-colors">사업실적</Link>
              <Link to="/ir"        className="block hover:text-brand transition-colors">IR 자료실</Link>
              <Link to="/contact"   className="block hover:text-brand transition-colors">문의하기</Link>
            </div>
          </div>

          {/* Contact */}
          <div>
            <p className="dr-label mb-4">연락처</p>
            <div className="space-y-2 text-sm text-ink-sub">
              <p>서울특별시 강남구 테헤란로 123</p>
              <p>Tel: 02-1234-5678</p>
              <p>
                <a href="mailto:info@darwinresearch.kr" className="hover:text-brand transition-colors">
                  info@darwinresearch.kr
                </a>
              </p>
            </div>
          </div>
        </div>

        <div className="mt-10 pt-8 border-t border-line flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-xs text-ink-muted">
            © {new Date().getFullYear()} Darwin Research. All rights reserved.
          </p>
          <p className="text-[10px] font-semibold tracking-[0.12em] uppercase text-brand">
            VENTURE CAPITAL · PRIVATE EQUITY
          </p>
        </div>
      </div>
    </footer>
  );
}
