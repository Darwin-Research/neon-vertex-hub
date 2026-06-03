import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { User } from "lucide-react";

const leaders = [
  { name: "홍길동", title: "대표이사 / CEO", desc: "다윈벤처투자 출신, 다윈대 경영학 석사. 20년 이상의 VC 투자 경험." },
  { name: "홍일동", title: "부대표 / CIO", desc: "디윈벤처투자 출신, 다윈대 MBA. 글로벌 투자 전략 및 포트폴리오 관리 총괄." },
  { name: "홍이동", title: "전무 / 투자1본부장", desc: "디윈대 전산학 박사. AI/딥테크 분야 전문 투자 책임." },
  { name: "홍삼동", title: "상무 / 투자2본부장", desc: "바이오·헬스케어 섹터 전문. 15년 이상 벤처투자 경력." },
];

export default function Leadership() {
  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary font-semibold tracking-widest text-sm mb-4">LEADERSHIP</p>
          <h1 className="text-4xl md:text-5xl font-black mb-16">경영진</h1>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {leaders.map((l, i) => (
            <motion.div
              key={l.name}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors"
            >
              <div className="w-16 h-16 rounded-full bg-secondary flex items-center justify-center mb-4">
                <User className="text-primary" size={28} />
              </div>
              <h3 className="text-lg font-bold">{l.name}</h3>
              <p className="text-primary text-sm font-medium mb-2">{l.title}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{l.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
