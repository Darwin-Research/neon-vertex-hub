import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PopupNotice from "@/components/PopupNotice";
import { supabase } from "@/integrations/supabase/client";

interface Post {
  id: string;
  title: string;
  category: string;
  created_at: string;
}

const stats = [
  { label: "누적 투자금",  value: "5,000억+" },
  { label: "투자 기업",   value: "120+"    },
  { label: "IPO 실적",   value: "28건"    },
  { label: "운용 펀드",   value: "12개"    },
];

export default function Index() {
  const [notices, setNotices] = useState<Post[]>([]);
  const [press, setPress]     = useState<Post[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const [n, p] = await Promise.all([
        supabase.from("posts").select("id,title,category,created_at").eq("category", "notice").order("created_at", { ascending: false }).limit(5),
        supabase.from("posts").select("id,title,category,created_at").eq("category", "press").order("created_at", { ascending: false }).limit(5),
      ]);
      if (n.data) setNotices(n.data);
      if (p.data) setPress(p.data);
    };
    fetchData();
  }, []);

  return (
    <Layout>
      <PopupNotice />

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
            <Link to="/portfolio">
              <button className="inline-flex items-center gap-2 rounded-md bg-brand px-6 py-2.5 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
                투자 실적 보기 <ArrowRight size={16} />
              </button>
            </Link>
            <Link to="/contact">
              <button className="inline-flex items-center gap-2 rounded-md border border-line px-6 py-2.5 text-sm font-semibold text-ink-sub hover:bg-plate transition-colors">
                문의하기
              </button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* ── Stats ── */}
      <section className="border-t border-line bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <p className="text-3xl md:text-4xl font-black text-brand">{s.value}</p>
              <p className="mt-1 text-xs text-ink-muted uppercase tracking-wider">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Mission / Vision / Values ── */}
      <section className="border-t border-line bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="dr-label mb-3"
          >
            ABOUT
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-ink mb-10"
          >
            혁신의 파트너,<br />다윈리서치.
          </motion.h2>
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                tag: "MISSION",
                title: "근거가 있는 연결을 만듭니다.",
                desc: "수십 시간의 리서치를 거쳐, 창업가의 사업과 투자자의 논리에 함께 맞는 한 건의 연결을 설계합니다.",
              },
              {
                tag: "VISION",
                title: "속도가 아닌, 판단의 질로.",
                desc: "연결의 수가 아니라, 연결된 라운드가 12개월 뒤 어떤 모습인지로 평가받는 회사가 됩니다.",
              },
              {
                tag: "VALUES",
                title: "신뢰 · 전문성 명료함 · 따뜻함.",
                desc: "사적 은행의 매너로 진행되는 리서치. 친절하지만, 결론은 분명하게 전합니다.",
              },
            ].map((item, i) => (
              <motion.div
                key={item.tag}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="rounded-xl border border-line bg-surface p-6"
                style={{ boxShadow: "var(--dr-shadow-sm)" }}
              >
                <p className="dr-label mb-3">{item.tag}</p>
                <h3 className="text-lg font-bold text-ink mb-3 leading-snug">{item.title}</h3>
                <p className="text-sm text-ink-sub leading-relaxed">{item.desc}</p>
                <div className="mt-5 h-px w-8 bg-brand" />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Board posts ── */}
      <section className="border-t border-line bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-10">
            {/* Notices */}
            <div>
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <p className="dr-label mb-1">NOTICE</p>
                  <h2 className="text-xl font-bold text-ink">공지사항</h2>
                </div>
                <Link to="/notice" className="text-xs text-ink-muted hover:text-brand transition-colors">
                  더보기 →
                </Link>
              </div>
              <div className="space-y-0">
                {notices.length === 0 && (
                  <p className="text-sm text-ink-muted py-4">등록된 공지가 없습니다.</p>
                )}
                {notices.map((n) => (
                  <Link
                    key={n.id}
                    to={`/board/${n.id}`}
                    className="flex items-center justify-between py-3 border-b border-line hover:text-brand transition-colors group"
                  >
                    <span className="text-sm text-ink group-hover:text-brand truncate flex-1 mr-4 transition-colors">
                      {n.title}
                    </span>
                    <span className="text-xs text-ink-muted shrink-0">
                      {new Date(n.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>

            {/* Press */}
            <div>
              <div className="flex items-baseline justify-between mb-6">
                <div>
                  <p className="dr-label mb-1">PRESS</p>
                  <h2 className="text-xl font-bold text-ink">보도자료</h2>
                </div>
                <Link to="/press" className="text-xs text-ink-muted hover:text-brand transition-colors">
                  더보기 →
                </Link>
              </div>
              <div className="space-y-0">
                {press.length === 0 && (
                  <p className="text-sm text-ink-muted py-4">등록된 보도자료가 없습니다.</p>
                )}
                {press.map((p) => (
                  <Link
                    key={p.id}
                    to={`/board/${p.id}`}
                    className="flex items-center justify-between py-3 border-b border-line hover:text-brand transition-colors group"
                  >
                    <span className="text-sm text-ink group-hover:text-brand truncate flex-1 mr-4 transition-colors">
                      {p.title}
                    </span>
                    <span className="text-xs text-ink-muted shrink-0">
                      {new Date(p.created_at).toLocaleDateString("ko-KR")}
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Next Steps CTA ── */}
      <section className="border-t border-line bg-canvas">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="dr-label mb-3"
          >
            NEXT STEPS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-4xl font-black text-ink mb-4"
          >
            연결의 시작.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-ink-sub mb-10 max-w-md mx-auto leading-relaxed"
          >
            관심이 닿는 한 분, 한 분과 천천히 시작합니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.15 }}
            className="grid sm:grid-cols-3 gap-6 max-w-2xl mx-auto mb-12"
          >
            {[
              { step: "STEP 01", title: "자료 검토",   desc: "간단한 사업 자료를 보내 주시면 5영업일 내 회신드립니다.",              time: "약 1주" },
              { step: "STEP 02", title: "1:1 미팅",    desc: "담당 파트너가 직접 만나 사업 모델과 자본 계획을 함께 정리합니다.", time: "60–90분" },
              { step: "STEP 03", title: "리서치 착수", desc: "합의된 범위로 본격 리서치에 착수하고 결과를 문서로 공유합니다.",   time: "2–6주" },
            ].map((s, i) => (
              <div key={s.step} className="rounded-xl border border-line bg-surface p-5 text-left" style={{ boxShadow: "var(--dr-shadow-sm)" }}>
                <p className="dr-label mb-2">{s.step}</p>
                <h3 className="text-base font-bold text-ink mb-2">{s.title}</h3>
                <p className="text-xs text-ink-sub leading-relaxed mb-3">{s.desc}</p>
                <p className="text-[10px] text-ink-muted uppercase tracking-wider">소요 · {s.time}</p>
              </div>
            ))}
          </motion.div>
          <Link to="/contact">
            <button className="inline-flex items-center gap-2 rounded-md bg-brand px-8 py-3 text-sm font-semibold text-white hover:bg-brand-dark transition-colors">
              문의하기 <ArrowRight size={16} />
            </button>
          </Link>
        </div>
      </section>
    </Layout>
  );
}
