import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

export default function UnderConstruction() {
  return (
    <Layout>
      <section className="min-h-[70vh] flex items-center justify-center bg-canvas">
        <div className="max-w-xl mx-auto px-4 sm:px-6 text-center py-24">
          <p className="dr-label mb-4">COMING SOON</p>
          <h1 className="text-4xl sm:text-5xl font-black text-ink tracking-tight mb-3">
            준비 중입니다
          </h1>
          <p className="text-xl font-semibold text-brand mb-6">Under Construction</p>
          <p className="text-sm sm:text-base text-ink-sub leading-relaxed mb-10">
            해당 페이지는 현재 준비 중입니다. 빠른 시일 내에 찾아뵙겠습니다.
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            <Link to="/">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors"
              >
                홈으로
              </button>
            </Link>
            <Link to="/contact">
              <button
                type="button"
                className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-2.5 text-sm font-semibold text-ink-sub hover:bg-plate transition-colors"
              >
                문의하기
              </button>
            </Link>
          </div>
        </div>
      </section>
    </Layout>
  );
}
