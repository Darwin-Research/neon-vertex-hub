import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <footer className="border-t border-border bg-card">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <Link to="/" className="text-xl font-black tracking-tight">
              <span className="text-foreground">DARWIN</span>
              <span className="text-primary">UNIVERSE</span>
            </Link>
            <p className="mt-3 text-sm text-muted-foreground leading-relaxed">
              혁신 기업과 함께 성장하며,<br />
              대한민국 벤처 생태계의 새로운 기준을 만들어갑니다.
            </p>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">바로가기</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <Link to="/about" className="block hover:text-primary transition-colors">회사소개</Link>
              <Link to="/portfolio" className="block hover:text-primary transition-colors">사업실적</Link>
              <Link to="/ir" className="block hover:text-primary transition-colors">IR 자료실</Link>
              <Link to="/contact" className="block hover:text-primary transition-colors">문의하기</Link>
            </div>
          </div>
          <div>
            <h4 className="text-sm font-semibold text-foreground mb-3">연락처</h4>
            <div className="space-y-2 text-sm text-muted-foreground">
              <p>서울특별시 강남구 테헤란로 123</p>
              <p>Tel: 02-1234-5678</p>
              <p>Email: info@darwinuniverse.co.kr</p>
            </div>
          </div>
        </div>
        <div className="mt-8 pt-8 border-t border-border text-center text-xs text-muted-foreground">
          © {new Date().getFullYear()} Vertex Capital. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
