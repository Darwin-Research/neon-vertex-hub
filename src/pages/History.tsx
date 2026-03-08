import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";

const timeline = [
  { year: "2010", event: "Vertex Capital 설립" },
  { year: "2012", event: "1호 펀드 (300억) 결성" },
  { year: "2014", event: "첫 투자 기업 IPO 성공" },
  { year: "2016", event: "누적 투자 1,000억 돌파" },
  { year: "2018", event: "글로벌 네트워크 확장 (실리콘밸리 오피스)" },
  { year: "2020", event: "ESG 임팩트 펀드 출범" },
  { year: "2022", event: "누적 투자 3,000억 돌파, 20번째 IPO" },
  { year: "2024", event: "AI 특화 성장 펀드 결성" },
  { year: "2026", event: "누적 투자 5,000억 돌파" },
];

export default function History() {
  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary font-semibold tracking-widest text-sm mb-4">HISTORY</p>
          <h1 className="text-4xl md:text-5xl font-black mb-16">연혁</h1>
        </motion.div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 top-0 bottom-0 w-px bg-border" />
          {timeline.map((item, i) => (
            <motion.div
              key={item.year}
              initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className={`relative flex items-start mb-10 ${i % 2 === 0 ? "md:flex-row-reverse" : ""}`}
            >
              <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-primary glow-box mt-1.5" />
              <div className={`ml-10 md:ml-0 md:w-1/2 ${i % 2 === 0 ? "md:pr-12 md:text-right" : "md:pl-12"}`}>
                <span className="text-primary font-bold text-lg">{item.year}</span>
                <p className="text-foreground mt-1">{item.event}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
