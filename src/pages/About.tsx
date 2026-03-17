import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { Target, Eye, Shield } from "lucide-react";

export default function About() {
  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary font-semibold tracking-widest text-sm mb-4">ABOUT US</p>
          <h1 className="text-4xl md:text-5xl font-black mb-6">
            혁신의 파트너,<br /><span className="text-primary glow-text">Darwin Universe</span>
          </h1>
          <p className="text-muted-foreground max-w-2xl text-lg leading-relaxed mb-16">
            Vertex Capital은 2010년 설립 이래, 기술 기반 혁신 기업에 대한 전략적 투자를 통해 
            대한민국 벤처 생태계의 성장을 이끌어 왔습니다. 초기 스타트업부터 성장 단계 기업까지, 
            단순한 자본 투자를 넘어 전략적 파트너십을 제공합니다.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {[
            { icon: Target, title: "미션", desc: "혁신 기술과 비즈니스 모델을 가진 기업을 발굴하고, 글로벌 경쟁력을 갖춘 챔피언으로 성장시킵니다." },
            { icon: Eye, title: "비전", desc: "아시아 최고의 벤처캐피탈로서, 투자 기업과 함께 지속 가능한 미래를 만들어 갑니다." },
            { icon: Shield, title: "핵심 가치", desc: "신뢰, 전문성, 혁신을 바탕으로 모든 이해관계자에게 최고의 가치를 제공합니다." },
          ].map((item, i) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-card border border-border rounded-lg p-6 hover:border-primary/30 transition-colors"
            >
              <item.icon className="text-primary mb-4" size={28} />
              <h3 className="text-lg font-bold mb-2">{item.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
