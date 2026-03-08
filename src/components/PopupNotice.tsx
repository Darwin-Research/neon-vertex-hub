import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";

interface Post {
  id: string;
  title: string;
  content: string | null;
  category: string;
}

export default function PopupNotice() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const fetchPopups = async () => {
      const { data } = await supabase
        .from("posts")
        .select("id, title, content, category")
        .eq("is_popup", true)
        .in("category", ["notice", "press"])
        .order("created_at", { ascending: false });

      if (!data) return;

      // Filter out posts hidden for today
      const visible = data.filter((p) => {
        const key = `popup_hidden_${p.id}`;
        const hidden = localStorage.getItem(key);
        if (!hidden) return true;
        return Date.now() - parseInt(hidden) > 24 * 60 * 60 * 1000;
      });
      setPosts(visible);
    };
    fetchPopups();
  }, []);

  if (posts.length === 0 || currentIndex >= posts.length) return null;

  const post = posts[currentIndex];

  const close = () => setCurrentIndex((i) => i + 1);

  const hideToday = () => {
    localStorage.setItem(`popup_hidden_${post.id}`, Date.now().toString());
    close();
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-card border border-border rounded-lg shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-border">
          <span className="text-xs font-semibold text-primary uppercase tracking-wider">
            {post.category === "notice" ? "공지사항" : "보도자료"}
          </span>
          <button onClick={close} className="text-muted-foreground hover:text-foreground">
            <X size={18} />
          </button>
        </div>
        <div className="px-5 py-6">
          <h3 className="text-lg font-bold text-foreground mb-3">{post.title}</h3>
          <p className="text-sm text-muted-foreground leading-relaxed line-clamp-6">
            {post.content}
          </p>
        </div>
        <div className="flex items-center justify-between px-5 py-3 border-t border-border bg-secondary/30">
          <button
            onClick={hideToday}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors"
          >
            오늘 하루 보지 않기
          </button>
          <Button size="sm" onClick={close}>
            닫기
          </Button>
        </div>
      </div>
    </div>
  );
}
