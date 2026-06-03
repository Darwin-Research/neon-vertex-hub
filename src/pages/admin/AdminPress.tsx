import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Pencil, LogOut, Plus, Upload, ArrowLeft, ExternalLink } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Post = Tables<"posts">;

const CATEGORY = "press";

export default function AdminPress() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    source: "",
    external_url: "",
  });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) { navigate("/admin/login"); return; }
      const { data: roleData } = await supabase
        .from("user_roles").select("role")
        .eq("user_id", data.session.user.id).eq("role", "admin").maybeSingle();
      if (!roleData) {
        await supabase.auth.signOut();
        navigate("/admin/login");
      }
    };
    checkAuth();
    fetchPosts();
  }, [navigate]);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts").select("*")
      .eq("category", CATEGORY)
      .order("created_at", { ascending: false });
    setPosts(data || []);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let file_url: string | null = null;
    if (file) {
      const path = `${CATEGORY}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("documents").upload(path, file);
      if (uploadError) {
        toast({ title: "파일 업로드 실패", description: uploadError.message, variant: "destructive" });
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("documents").getPublicUrl(path);
      file_url = urlData.publicUrl;
    }

    const payload = {
      title: form.title,
      content: form.content || null,
      source: form.source || null,
      external_url: form.external_url || null,
      ...(file_url && { file_url }),
    };

    if (editing) {
      const { error } = await supabase.from("posts").update(payload).eq("id", editing.id);
      if (error) toast({ title: "수정 실패", variant: "destructive" });
      else toast({ title: "수정 완료" });
    } else {
      const { error } = await supabase.from("posts").insert({ category: CATEGORY, ...payload });
      if (error) toast({ title: "작성 실패", variant: "destructive" });
      else toast({ title: "작성 완료" });
    }

    resetForm();
    setLoading(false);
    fetchPosts();
  };

  const resetForm = () => {
    setForm({ title: "", content: "", source: "", external_url: "" });
    setFile(null);
    setEditing(null);
  };

  const startEdit = (post: Post) => {
    setEditing(post);
    setForm({
      title: post.title,
      content: post.content || "",
      source: post.source || "",
      external_url: post.external_url || "",
    });
  };

  const handleDelete = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await supabase.from("posts").delete().eq("id", id);
    toast({ title: "삭제 완료" });
    fetchPosts();
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Link to="/admin" className="text-muted-foreground hover:text-foreground transition-colors">
            <ArrowLeft size={18} />
          </Link>
          <Link to="/" className="text-lg font-black">
            <span className="text-foreground">DARWIN</span>
            <span className="text-primary">UNIVERSE</span>
          </Link>
          <span className="text-sm text-muted-foreground">/ 보도자료 관리</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
          <LogOut size={16} className="mr-1" /> 로그아웃
        </Button>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
          <h2 className="text-sm font-semibold text-primary">
            {editing ? "보도자료 수정" : "새 보도자료 작성"}
          </h2>

          <Input
            placeholder="제목"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="bg-secondary"
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <Input
              placeholder="언론사 / 출처 (예: 한국경제)"
              value={form.source}
              onChange={(e) => setForm({ ...form, source: e.target.value })}
              className="bg-secondary"
            />
            <Input
              placeholder="외부 링크 URL (언론사 기사)"
              value={form.external_url}
              onChange={(e) => setForm({ ...form, external_url: e.target.value })}
              className="bg-secondary"
            />
          </div>

          <Textarea
            placeholder="내용 / 요약"
            rows={4}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="bg-secondary"
          />

          <label className="flex items-center gap-2 text-sm cursor-pointer w-fit">
            <Upload size={16} className="text-muted-foreground" />
            <input type="file" className="hidden" accept=".pdf,.doc,.docx"
              onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <span className="text-muted-foreground">{file ? file.name : "PDF 첨부"}</span>
          </label>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading} size="sm">
              <Plus size={14} className="mr-1" /> {editing ? "수정" : "작성"}
            </Button>
            {editing && (
              <Button type="button" variant="outline" size="sm" onClick={resetForm}>취소</Button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="space-y-2">
          {posts.length === 0 && <p className="text-sm text-muted-foreground">등록된 보도자료가 없습니다.</p>}
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-3 py-3 px-4 bg-card border border-border rounded-lg">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{post.title}</h3>
                <div className="flex items-center gap-3 mt-0.5">
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </span>
                  {post.source && (
                    <span className="text-xs text-primary">{post.source}</span>
                  )}
                  {post.external_url && (
                    <a href={post.external_url} target="_blank" rel="noopener noreferrer"
                      className="text-xs text-muted-foreground hover:text-foreground flex items-center gap-1">
                      <ExternalLink size={11} /> 링크
                    </a>
                  )}
                  {post.file_url && <span className="text-xs text-muted-foreground">📎 PDF</span>}
                </div>
              </div>
              <Button variant="ghost" size="icon" onClick={() => startEdit(post)}>
                <Pencil size={14} />
              </Button>
              <Button variant="ghost" size="icon" onClick={() => handleDelete(post.id)}>
                <Trash2 size={14} className="text-destructive" />
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
