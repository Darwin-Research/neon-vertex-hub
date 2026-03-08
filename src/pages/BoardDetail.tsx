import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { supabase } from "@/integrations/supabase/client";
import { motion } from "framer-motion";
import { ArrowLeft, ChevronRight, Download, FileText } from "lucide-react";
import { Button } from "@/components/ui/button";

const categoryConfig: Record<string, { label: string; tag: string; path: string }> = {
  notice: { label: "공지사항", tag: "NOTICE", path: "/notice" },
  ir: { label: "IR 자료실", tag: "IR LIBRARY", path: "/ir" },
  press: { label: "보도자료", tag: "PRESS RELEASE", path: "/press" },
};

interface Post {
  id: string;
  title: string;
  content: string | null;
  file_url: string | null;
  created_at: string;
  category: string;
}

export default function BoardDetail() {
  const { category, id } = useParams<{ category: string; id: string }>();
  const navigate = useNavigate();
  const config = categoryConfig[category || "notice"] || categoryConfig.notice;

  const [post, setPost] = useState<Post | null>(null);
  const [nextPost, setNextPost] = useState<Post | null>(null);
  const [prevPost, setPrevPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPost = async () => {
      setLoading(true);

      const { data: current } = await supabase
        .from("posts")
        .select("id, title, content, file_url, created_at, category")
        .eq("id", id!)
        .single();

      if (!current) {
        setLoading(false);
        return;
      }

      setPost(current);

      // Fetch next (older) post
      const { data: nextData } = await supabase
        .from("posts")
        .select("id, title, content, file_url, created_at, category")
        .eq("category", current.category)
        .lt("created_at", current.created_at)
        .order("created_at", { ascending: false })
        .limit(1);

      setNextPost(nextData?.[0] || null);

      // Fetch previous (newer) post
      const { data: prevData } = await supabase
        .from("posts")
        .select("id, title, content, file_url, created_at, category")
        .eq("category", current.category)
        .gt("created_at", current.created_at)
        .order("created_at", { ascending: true })
        .limit(1);

      setPrevPost(prevData?.[0] || null);

      setLoading(false);
    };

    if (id) fetchPost();
  }, [id, category]);

  return (
    <Layout>
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary font-semibold tracking-widest text-sm mb-4">{config.tag}</p>

          {loading ? (
            <p className="text-muted-foreground">불러오는 중...</p>
          ) : !post ? (
            <p className="text-muted-foreground">게시물을 찾을 수 없습니다.</p>
          ) : (
            <>
              {/* Header */}
              <div className="border-b border-border pb-6 mb-8">
                <h1 className="text-2xl md:text-3xl font-bold text-foreground mb-3">
                  {post.title}
                </h1>
                <span className="text-sm text-muted-foreground">
                  {new Date(post.created_at).toLocaleDateString("ko-KR", {
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </span>
              </div>

              {/* Content */}
              <div className="prose prose-sm max-w-none text-foreground leading-relaxed whitespace-pre-wrap min-h-[200px] mb-10">
                {post.content || "내용이 없습니다."}
              </div>

              {/* File download */}
              {post.file_url && (
                <div className="flex items-center gap-3 p-4 rounded-lg bg-secondary/30 border border-border mb-10">
                  <FileText size={20} className="text-primary shrink-0" />
                  <span className="text-sm text-foreground flex-1">첨부파일</span>
                  <a
                    href={post.file_url}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <Button variant="outline" size="sm" className="gap-2">
                      <Download size={14} />
                      다운로드
                    </Button>
                  </a>
                </div>
              )}

              {/* Navigation */}
              <div className="border-t border-border pt-4 space-y-0">
                {prevPost && (
                  <button
                    onClick={() => navigate(`/${category}/${prevPost.id}`)}
                    className="flex items-center gap-3 w-full py-3 px-2 text-left hover:bg-secondary/30 rounded transition-colors border-b border-border"
                  >
                    <span className="text-xs font-semibold text-primary shrink-0 w-16">이전글</span>
                    <span className="text-sm text-foreground truncate flex-1">{prevPost.title}</span>
                    <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                  </button>
                )}
                {nextPost && (
                  <button
                    onClick={() => navigate(`/${category}/${nextPost.id}`)}
                    className="flex items-center gap-3 w-full py-3 px-2 text-left hover:bg-secondary/30 rounded transition-colors"
                  >
                    <span className="text-xs font-semibold text-primary shrink-0 w-16">다음글</span>
                    <span className="text-sm text-foreground truncate flex-1">{nextPost.title}</span>
                    <ChevronRight size={16} className="text-muted-foreground shrink-0" />
                  </button>
                )}
              </div>

              {/* Back to list */}
              <div className="mt-8 flex justify-center">
                <Button
                  variant="outline"
                  onClick={() => navigate(config.path)}
                  className="gap-2"
                >
                  <ArrowLeft size={16} />
                  목록으로
                </Button>
              </div>
            </>
          )}
        </motion.div>
      </section>
    </Layout>
  );
}
