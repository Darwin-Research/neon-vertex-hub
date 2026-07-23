import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import Layout from "@/components/layout/Layout";
import LegalNoticePopup from "@/components/LegalNoticePopup";

export default function Index() {
  return (
    <Layout>
      <LegalNoticePopup />

      {/* ── Hero ── */}
      <section className="relative min-h-[88vh] flex items-center overflow-hidden bg-canvas">
        <div className="absolute inset-0 bg-gradient-to-br from-canvas via-canvas to-plate" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="dr-label mb-6"
          >
            VENTURE CAPITAL · PRIVATE EQUITY
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
            className="text-base sm:text-lg text-ink-sub max-w-lg mb-10 leading-relaxed"
          >
            매칭이 아니라, 리서치입니다.<br />
            한 건의 연결을 위해 수십 시간의 리서치가 먼저 진행됩니다.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="flex flex-wrap gap-3"
          >
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-2.5 text-sm font-semibold text-ink-sub hover:bg-plate transition-colors">
                문의하기
              </button>
            </Link>
          </motion.div>
        </div>
      </section>
    </Layout>
  );
}
