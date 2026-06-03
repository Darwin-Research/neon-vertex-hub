import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { Trash2, Pencil, LogOut, Plus, Upload, ArrowLeft } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Post = Tables<"posts">;

const CATEGORY = "ir";

const DOC_TYPES = [
  "연간보고서",
  "반기보고서",
  "분기보고서",
  "실적발표",
  "IR 프레젠테이션",
  "사업계획서",
  "기타",
];

const QUARTERS = ["Q1", "Q2", "Q3", "Q4"];

const currentYear = new Date().getFullYear();
const YEARS = Array.from({ length: 10 }, (_, i) => currentYear - i);

export default function AdminIR() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({
    title: "",
    content: "",
    doc_type: "",
    fiscal_year: "",
    quarter: "",
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
      doc_type: form.doc_type || null,
      fiscal_year: form.fiscal_year ? parseInt(form.fiscal_year) : null,
      quarter: form.quarter || null,
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
    setForm({ title: "", content: "", doc_type: "", fiscal_year: "", quarter: "" });
    setFile(null);
    setEditing(null);
  };

  const startEdit = (post: Post) => {
    setEditing(post);
    setForm({
      title: post.title,
      content: post.content || "",
      doc_type: post.doc_type || "",
      fiscal_year: post.fiscal_year?.toString() || "",
      quarter: post.quarter || "",
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
          <span className="text-sm text-muted-foreground">/ IR 자료실 관리</span>
        </div>
        <Button variant="ghost" size="sm" onClick={() => supabase.auth.signOut()}>
          <LogOut size={16} className="mr-1" /> 로그아웃
        </Button>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        {/* Form */}
        <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-6 mb-8 space-y-4">
          <h2 className="text-sm font-semibold text-primary">
            {editing ? "IR 자료 수정" : "새 IR 자료 등록"}
          </h2>

          <Input
            placeholder="제목"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            required
            className="bg-secondary"
          />

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <Select value={form.doc_type} onValueChange={(v) => setForm({ ...form, doc_type: v })}>
              <SelectTrigger className="bg-secondary">
                <SelectValue placeholder="문서 유형" />
              </SelectTrigger>
              <SelectContent>
                {DOC_TYPES.map((t) => (
                  <SelectItem key={t} value={t}>{t}</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={form.fiscal_year} onValueChange={(v) => setForm({ ...form, fiscal_year: v })}>
              <SelectTrigger className="bg-secondary">
                <SelectValue placeholder="회계연도" />
              </SelectTrigger>
              <SelectContent>
                {YEARS.map((y) => (
                  <SelectItem key={y} value={y.toString()}>{y}년</SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Select value={form.quarter} onValueChange={(v) => setForm({ ...form, quarter: v })}>
              <SelectTrigger className="bg-secondary">
                <SelectValue placeholder="분기 (선택)" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="none">해당 없음</SelectItem>
                {QUARTERS.map((q) => (
                  <SelectItem key={q} value={q}>{q}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Textarea
            placeholder="설명 / 요약"
            rows={3}
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="bg-secondary"
          />

          <label className="flex items-center gap-2 text-sm cursor-pointer w-fit">
            <Upload size={16} className="text-muted-foreground" />
            <input type="file" className="hidden" accept=".pdf,.ppt,.pptx,.xls,.xlsx"
              onChange={(e) => setFile(e.target.files?.[0] || null)} />
            <span className="text-muted-foreground">{file ? file.name : "파일 첨부 (PDF, PPT, Excel)"}</span>
          </label>

          <div className="flex gap-2">
            <Button type="submit" disabled={loading} size="sm">
              <Plus size={14} className="mr-1" /> {editing ? "수정" : "등록"}
            </Button>
            {editing && (
              <Button type="button" variant="outline" size="sm" onClick={resetForm}>취소</Button>
            )}
          </div>
        </form>

        {/* List */}
        <div className="space-y-2">
          {posts.length === 0 && <p className="text-sm text-muted-foreground">등록된 IR 자료가 없습니다.</p>}
          {posts.map((post) => (
            <div key={post.id} className="flex items-center gap-3 py-3 px-4 bg-card border border-border rounded-lg">
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium truncate">{post.title}</h3>
                <div className="flex items-center gap-2 mt-0.5 flex-wrap">
                  {post.doc_type && (
                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded">{post.doc_type}</span>
                  )}
                  {post.fiscal_year && (
                    <span className="text-xs text-muted-foreground">{post.fiscal_year}년</span>
                  )}
                  {post.quarter && (
                    <span className="text-xs text-muted-foreground">{post.quarter}</span>
                  )}
                  <span className="text-xs text-muted-foreground">
                    {new Date(post.created_at).toLocaleDateString("ko-KR")}
                  </span>
                  {post.file_url && <span className="text-xs text-muted-foreground">📎</span>}
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
