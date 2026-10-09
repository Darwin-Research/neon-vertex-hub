import { useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, Calculator, FileText, Layers, RefreshCw, ShieldCheck, Zap, PlayCircle } from "lucide-react";
import Layout from "@/components/layout/Layout";
import LegalNoticePopup from "@/components/LegalNoticePopup";

const fadeUp = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const products = [
  {
    id: "teaser",
    label: "DOCUMENT AUTOMATION",
    name: "Darwin Teaser",
    ko: "기업 티저 문서 자동 작성",
    icon: FileText,
    summary:
      "IR 자료와 공개 출처를 읽어 1페이지 티저 문서를 자동으로 작성합니다. 수 시간 걸리던 초안 작업을 몇 분으로 줄입니다.",
    points: [
      "인터넷등기소에서 등기부를 발급받고 DART 전자공시를 조회해 IR 덱과 함께 한 장으로 정리",
      "사이트에서 받아온 데이터가 항목별로 자동 반영되고, 숫자마다 IR·등기·공시 출처 표기",
      "근거가 없는 항목은 추측하지 않고 입력 대기로 표시",
      "웹 UI와 메신저 봇 양쪽에서 같은 엔진으로 작성",
    ],
    video: {
      src: "/media/darwin-teaser-demo-v5.mp4",
      poster: "/media/darwin-teaser-demo-poster-v5.jpg",
      label: "15초 데모 미리보기",
      aria: "Darwin Teaser가 IR 자료로 1페이지 티저를 만드는 과정 데모 영상",
      headline: "손이 많이 가는 자료 수집까지 자동으로.",
      caption:
        "IR 덱 분석, 등기부 발급, 전자공시 조회까지 사람이 하던 수집을 자동화하고, 받아온 데이터가 각 항목으로 채워집니다. 영상 속 기업·수치·화면은 모두 가상의 예시입니다.",
    },
  },
  {
    id: "shopfit",
    label: "E-COMMERCE AUTOMATION",
    name: "ShopFit",
    ko: "크로스보더 셀러 손익 자동화",
    icon: Calculator,
    summary:
      "Shopee에서 판매하는 한국 셀러를 위한 SaaS. 소싱부터 등록, 정산 손익 분석까지 하나의 루프로 자동화하고, 누구나 쉽게 시작할 수 있도록 단계별 온보딩을 제공합니다.",
    points: [
      "5단계 온보딩 안내로 마켓 연결과 이익 기준을 바로 설정",
      "쿠팡·네이버 상품을 크롬 확장 프로그램으로 수집해 소싱 후보로 정리",
      "환율·수수료를 반영한 예상 손익 계산 후 Shopee에 바로 등록",
      "정산 명세로 실측 손익과 실효 수수료율을 확인하고 다음 소싱에 반영",
      "셀러마다 데이터베이스를 분리해 데이터가 섞이지 않는 구조",
    ],
    video: {
      src: "/media/shopfit-onboarding-v3.mp4",
      poster: "/media/shopfit-onboarding-poster-v3.jpg",
      label: "15초 온보딩 미리보기",
      aria: "ShopFit 셀러 온보딩 과정 영상",
      headline: "처음 쓰는 셀러도 5단계면 시작합니다.",
      caption:
        "화면의 안내를 따라 마켓 연결과 이익 기준만 정하면 되고, 나머지 설정은 기본값으로 두고 나중에 바꿀 수 있습니다.",
    },
  },
];

const principles = [
  {
    icon: Layers,
    title: "반복 업무를 제품으로",
    desc: "현장에서 매일 반복되는 업무를 찾아 직접 쓰는 도구로 먼저 만들고, 검증된 뒤에 제품으로 내놓습니다.",
  },
  {
    icon: ShieldCheck,
    title: "근거가 남는 자동화",
    desc: "결과만 내놓지 않고 어떤 자료에서 나온 값인지 함께 보여 줍니다. 사람이 검토하기 쉬운 AI를 지향합니다.",
  },
  {
    icon: RefreshCw,
    title: "측정하고 되먹임",
    desc: "자동화 결과를 실제 데이터로 측정하고, 그 결과를 다시 다음 판단에 반영하는 루프를 설계합니다.",
  },
];

export default function Index() {
  const { hash } = useLocation();

  // In-app hash links (e.g. "/#products") scroll here without a full page reload.
  useEffect(() => {
    if (!hash) return;
    const t = window.setTimeout(() => {
      document.getElementById(hash.slice(1))?.scrollIntoView({ behavior: "smooth" });
    }, 50);
    return () => window.clearTimeout(t);
  }, [hash]);

  return (
    <Layout>
      <LegalNoticePopup />

      {/* ── Hero ── */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden bg-canvas">
        <div className="absolute inset-0 bg-gradient-to-br from-canvas via-canvas to-plate" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="dr-label mb-6"
          >
            AI SERVICE COMPANY
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl sm:text-6xl md:text-8xl font-black leading-[1.1] tracking-tight text-ink mb-4"
          >
            다윈리서치
          </motion.h1>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand dr-glow-text mb-6"
          >
            Darwin Research
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.35 }}
            className="text-base sm:text-lg text-ink-sub max-w-xl mb-10 leading-relaxed"
          >
            반복되는 업무를 AI로 자동화하는 도구를 만듭니다.<br />
            이커머스 셀러의 손익부터 기업 티저 문서까지, 실제 현장에서 쓰는 툴을 제품으로 내놓습니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <a href="#products">
              <button className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
                제품 보기 <ArrowRight size={16} />
              </button>
            </a>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-2.5 text-sm font-semibold text-ink-sub hover:bg-plate transition-colors">
                문의하기
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Products ── */}
      <section id="products" className="bg-canvas border-t border-line scroll-mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div {...fadeUp} className="mb-12">
            <p className="dr-label mb-3">PRODUCTS</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
              자동화 툴
            </h2>
          </motion.div>

          <div className="space-y-6">
            {products.map((p, i) => (
              <motion.article
                key={p.id}
                id={p.id}
                {...fadeUp}
                className="rounded-xl border border-line bg-surface p-6 sm:p-8 dr-shadow scroll-mt-24"
              >
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-center">
                  <div className={`lg:col-span-2 ${i % 2 === 1 ? "lg:order-2" : ""}`}>
                    <div className="flex items-center justify-between mb-6">
                      <p className="dr-label">{p.label}</p>
                      <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand">
                        <p.icon size={20} />
                      </span>
                    </div>
                    <h3 className="text-3xl font-black text-ink tracking-tight">{p.name}</h3>
                    <p className="text-sm font-semibold text-brand mt-1 mb-4">{p.ko}</p>
                    <p className="text-sm sm:text-base text-ink-sub leading-relaxed mb-6">{p.summary}</p>
                    <ul className="space-y-2.5 border-t border-line pt-5">
                      {p.points.map((pt) => (
                        <li key={pt} className="flex gap-2.5 text-sm text-ink leading-snug">
                          <Zap size={14} className="mt-0.5 shrink-0 text-brand" />
                          <span>{pt}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className={`lg:col-span-3 ${i % 2 === 1 ? "lg:order-1" : ""}`}>
                    <p className="dr-label mb-3 flex items-center gap-1.5">
                      <PlayCircle size={14} /> {p.video.label}
                    </p>
                    <div className="overflow-hidden rounded-lg border border-line bg-ink aspect-video">
                      <video
                        className="h-full w-full object-cover"
                        src={p.video.src}
                        poster={p.video.poster}
                        controls
                        muted
                        loop
                        playsInline
                        preload="metadata"
                        aria-label={p.video.aria}
                      />
                    </div>
                    <p className="mt-4 text-sm text-ink-sub leading-relaxed">
                      <span className="font-semibold text-ink">{p.video.headline}</span>{" "}
                      {p.video.caption}
                    </p>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      {/* ── Principles ── */}
      <section className="bg-plate/50 border-t border-line">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.div {...fadeUp} className="mb-12">
            <p className="dr-label mb-3">HOW WE BUILD</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink">
              우리가 툴을 만드는 방식
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {principles.map((p, i) => (
              <motion.div
                key={p.title}
                {...fadeUp}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-xl border border-line bg-surface p-6"
              >
                <span className="flex h-10 w-10 items-center justify-center rounded-lg bg-brand-light text-brand mb-4">
                  <p.icon size={20} />
                </span>
                <h3 className="text-lg font-bold text-ink mb-2">{p.title}</h3>
                <p className="text-sm text-ink-sub leading-relaxed">{p.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="bg-canvas border-t border-line">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 py-20 text-center">
          <motion.div {...fadeUp}>
            <p className="dr-label mb-3">CONTACT</p>
            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-ink mb-4">
              우리 팀의 반복 업무도 자동화할 수 있을까요?
            </h2>
            <p className="text-sm sm:text-base text-ink-sub leading-relaxed mb-8">
              제품 도입이나 맞춤형 자동화 도구 제작이 필요하시면 편하게 문의해 주세요.
            </p>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 rounded-md bg-brand px-7 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
                문의하기 <ArrowRight size={16} />
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
