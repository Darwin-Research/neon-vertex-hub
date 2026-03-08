import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const categories = ["전체", "AI/딥테크", "바이오", "핀테크", "플랫폼", "ESG"];

const companies = [
  { name: "NeuralWorks", category: "AI/딥테크", stage: "Series B", year: 2022, status: "성장" },
  { name: "BioGenix", category: "바이오", stage: "Series C", year: 2019, status: "IPO" },
  { name: "PayFlow", category: "핀테크", stage: "Series A", year: 2023, status: "성장" },
  { name: "CloudMesh", category: "플랫폼", stage: "Series B", year: 2020, status: "Exit" },
  { name: "GreenEnergy", category: "ESG", stage: "Series A", year: 2024, status: "성장" },
  { name: "DataBridge", category: "AI/딥테크", stage: "Pre-IPO", year: 2018, status: "IPO" },
  { name: "MediCare+", category: "바이오", stage: "Series B", year: 2021, status: "성장" },
  { name: "LendX", category: "핀테크", stage: "Series C", year: 2017, status: "IPO" },
  { name: "EcoTech", category: "ESG", stage: "Series A", year: 2025, status: "초기" },
];

export default function Portfolio() {
  const [filter, setFilter] = useState("전체");
  const filtered = filter === "전체" ? companies : companies.filter((c) => c.category === filter);

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary font-semibold tracking-widest text-sm mb-4">PORTFOLIO</p>
          <h1 className="text-4xl md:text-5xl font-black mb-10">사업실적</h1>
        </motion.div>

        <div className="flex flex-wrap gap-2 mb-10">
          {categories.map((c) => (
            <button
              key={c}
              onClick={() => setFilter(c)}
              className={cn(
                "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                filter === c
                  ? "bg-primary text-primary-foreground glow-box"
                  : "bg-secondary text-secondary-foreground hover:bg-secondary/80"
              )}
            >
              {c}
            </button>
          ))}
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {filtered.map((c, i) => (
            <motion.div
              key={c.name}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.05 }}
              className="bg-card border border-border rounded-lg p-5 hover:border-primary/30 transition-colors"
            >
              <div className="flex items-center justify-between mb-3">
                <h3 className="text-lg font-bold">{c.name}</h3>
                <span className={cn(
                  "text-xs px-2 py-0.5 rounded-full font-medium",
                  c.status === "IPO" && "bg-primary/20 text-primary",
                  c.status === "Exit" && "bg-blue-500/20 text-blue-400",
                  c.status === "성장" && "bg-yellow-500/20 text-yellow-400",
                  c.status === "초기" && "bg-secondary text-secondary-foreground"
                )}>{c.status}</span>
              </div>
              <p className="text-sm text-muted-foreground">{c.category} · {c.stage}</p>
              <p className="text-xs text-muted-foreground mt-1">투자연도: {c.year}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </Layout>
  );
}
