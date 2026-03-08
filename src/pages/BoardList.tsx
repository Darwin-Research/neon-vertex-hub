import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { Download, FileText } from "lucide-react";

interface Post {
  id: string;
  title: string;
  content: string | null;
  file_url: string | null;
  created_at: string;
}

const categoryConfig: Record<string, { label: string; tag: string }> = {
  notice: { label: "공지사항", tag: "NOTICE" },
  ir: { label: "IR 자료실", tag: "IR LIBRARY" },
  press: { label: "보도자료", tag: "PRESS RELEASE" },
};

export default function BoardList({ category }: { category: string }) {
  const config = categoryConfig[category] || categoryConfig.notice;
  const navigate = useNavigate();
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {
      setLoading(true);
      const { data } = await supabase
        .from("posts")
        .select("id, title, content, file_url, created_at")
        .eq("category", category)
        .order("created_at", { ascending: false });
      setPosts(data || []);
      setLoading(false);
    };
    fetch();
  }, [category]);

  return (
    <Layout>
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary font-semibold tracking-widest text-sm mb-4">{config.tag}</p>
          <h1 className="text-4xl md:text-5xl font-black mb-10">{config.label}</h1>
        </motion.div>

        {loading ? (
          <p className="text-muted-foreground">불러오는 중...</p>
        ) : posts.length === 0 ? (
          <p className="text-muted-foreground">등록된 게시물이 없습니다.</p>
        ) : (
          <div className="space-y-3">
            {posts.map((post) => (
              <div
                key={post.id}
                className="flex items-center gap-4 py-4 px-4 border-b border-border hover:bg-card/50 rounded transition-colors"
              >
                <FileText size={18} className="text-primary shrink-0" />
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-medium text-foreground truncate">{post.title}</h3>
                  {post.content && (
                    <p className="text-xs text-muted-foreground mt-0.5 truncate">{post.content}</p>
                  )}
                </div>
                <span className="text-xs text-muted-foreground shrink-0">
                  {new Date(post.created_at).toLocaleDateString("ko-KR")}
                </span>
                {post.file_url && (
                  <a
                    href={post.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-primary hover:text-primary/80 shrink-0"
                  >
                    <Download size={16} />
                  </a>
                )}
              </div>
            ))}
          </div>
        )}
      </section>
    </Layout>
  );
}
