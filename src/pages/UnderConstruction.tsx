import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";

export default function UnderConstruction() {
  return (
    <Layout>
      <section className="min-h-[92vh] flex items-center justify-center bg-canvas">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 text-center py-24">
          <div className="max-w-xl mx-auto">
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

          <div className="mt-16 pt-12 border-t border-line">
            <p className="dr-label mb-3">DARWIN RESEARCH</p>
            <p className="text-ink-sub">매칭이 아니라, 리서치입니다.</p>
            <p className="text-ink-sub">정식 오픈 시 더 충실한 내용으로 찾아뵙겠습니다.</p>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-10 text-left">
              <div className="rounded-xl border border-line bg-plate/40 p-5">
                <p className="text-ink-muted text-xs mb-2">준비 중</p>
                <p className="text-ink font-bold mb-1">회사소개</p>
                <p className="text-ink-sub text-sm">회사 연혁과 비전을 준비하고 있습니다.</p>
              </div>
              <div className="rounded-xl border border-line bg-plate/40 p-5">
                <p className="text-ink-muted text-xs mb-2">준비 중</p>
                <p className="text-ink font-bold mb-1">사업실적</p>
                <p className="text-ink-sub text-sm">주요 투자·연결 실적을 정리하고 있습니다.</p>
              </div>
              <div className="rounded-xl border border-line bg-plate/40 p-5">
                <p className="text-ink-muted text-xs mb-2">준비 중</p>
                <p className="text-ink font-bold mb-1">IR 자료실</p>
                <p className="text-ink-sub text-sm">투자자 대상 자료를 준비하고 있습니다.</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
