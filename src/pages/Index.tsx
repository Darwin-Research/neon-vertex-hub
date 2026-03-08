import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, Building2, Newspaper } from "lucide-react";
import Layout from "@/components/layout/Layout";
import PopupNotice from "@/components/PopupNotice";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  title: string;
  category: string;
  created_at: string;
}

export default function Index() {
  const [notices, setNotices] = useState<Post[]>([]);
  const [press, setPress] = useState<Post[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const [n, p] = await Promise.all([
        supabase.from("posts").select("id,title,category,created_at").eq("category", "notice").order("created_at", { ascending: false }).limit(5),
        supabase.from("posts").select("id,title,category,created_at").eq("category", "press").order("created_at", { ascending: false }).limit(5),
      ]);
      if (n.data) setNotices(n.data);
      if (p.data) setPress(p.data);
    };
    fetch();
  }, []);

  return (
    <Layout>
      <PopupNotice />

      {/* Hero */}
      <section className="relative min-h-[85vh] flex items-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-primary/5" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-primary font-semibold tracking-widest text-sm mb-6"
          >
            VENTURE CAPITAL · PRIVATE EQUITY
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.1 }}
            className="text-4xl sm:text-5xl md:text-7xl font-black leading-tight mb-6"
          >
            미래를 향한<br />
            <span className="text-primary glow-text">전략적 투자</span>
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-muted-foreground text-lg max-w-xl mb-10"
          >
            Vertex Capital은 혁신 기업과 함께 성장하며, 대한민국 벤처 생태계의 새로운 기준을 만들어갑니다.
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="flex flex-wrap gap-4"
          >
            <Link to="/portfolio">
              <Button size="lg" className="glow-box font-semibold text-base px-8">
                투자 실적 보기 <ArrowRight className="ml-1" size={18} />
              </Button>
            </Link>
            <Link to="/contact">
              <Button size="lg" variant="outline" className="font-semibold text-base px-8">
                문의하기
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Stats */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { label: "누적 투자금", value: "5,000억+" },
            { label: "투자 기업", value: "120+" },
            { label: "IPO 실적", value: "28건" },
            { label: "운용 펀드", value: "12개" },
          ].map((s, i) => (
            <motion.div
              key={s.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <p className="text-3xl md:text-4xl font-black text-primary glow-text">{s.value}</p>
              <p className="text-sm text-muted-foreground mt-1">{s.label}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent posts */}
      <section className="border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Notices */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Newspaper size={20} className="text-primary" />
                <h2 className="text-xl font-bold">공지사항</h2>
                <Link to="/notice" className="ml-auto text-xs text-muted-foreground hover:text-primary">더보기 →</Link>
              </div>
              <div className="space-y-3">
                {notices.length === 0 && <p className="text-sm text-muted-foreground">등록된 공지가 없습니다.</p>}
                {notices.map((n) => (
                  <div key={n.id} className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-foreground truncate flex-1 mr-4">{n.title}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{new Date(n.created_at).toLocaleDateString("ko-KR")}</span>
                  </div>
                ))}
              </div>
            </div>
            {/* Press */}
            <div>
              <div className="flex items-center gap-2 mb-6">
                <Building2 size={20} className="text-primary" />
                <h2 className="text-xl font-bold">보도자료</h2>
                <Link to="/press" className="ml-auto text-xs text-muted-foreground hover:text-primary">더보기 →</Link>
              </div>
              <div className="space-y-3">
                {press.length === 0 && <p className="text-sm text-muted-foreground">등록된 보도자료가 없습니다.</p>}
                {press.map((p) => (
                  <div key={p.id} className="flex items-center justify-between py-2 border-b border-border">
                    <span className="text-sm text-foreground truncate flex-1 mr-4">{p.title}</span>
                    <span className="text-xs text-muted-foreground shrink-0">{new Date(p.created_at).toLocaleDateString("ko-KR")}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}
