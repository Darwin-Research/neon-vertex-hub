import { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Switch } from "@/components/ui/switch";
import { Trash2, Pencil, LogOut, Plus, Upload, Mail, MoveRight } from "lucide-react";
import type { Tables } from "@/integrations/supabase/types";

type Post = Tables<"posts">;

interface Inquiry {
  id: string;
  name: string;
  email: string;
  company: string | null;
  phone: string | null;
  message: string;
  status: string;
  created_at: string;
}

const categories = [
  { value: "notice", label: "공지사항" },
  { value: "ir", label: "IR 자료실" },
  { value: "press", label: "보도자료" },
];

const kanbanColumns = [
  { key: "new", label: "신규", color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { key: "in_progress", label: "처리 중", color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { key: "done", label: "완료", color: "bg-green-500/20 text-green-400 border-green-500/30" },
];

export default function AdminDashboard() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [posts, setPosts] = useState<Post[]>([]);
  const [activeTab, setActiveTab] = useState("notice");
  const [editing, setEditing] = useState<Post | null>(null);
  const [form, setForm] = useState({ title: "", content: "", is_popup: false });
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [inquiries, setInquiries] = useState<Inquiry[]>([]);

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin/login");
        return;
      }
      const { data: roleData } = await supabase
        .from("user_roles")
        .select("role")
        .eq("user_id", data.session.user.id)
        .eq("role", "admin")
        .maybeSingle();
      if (!roleData) {
        toast({ title: "접근 거부", description: "관리자 권한이 없습니다.", variant: "destructive" });
        await supabase.auth.signOut();
        navigate("/admin/login");
      }
    };
    checkAuth();
    const { data: listener } = supabase.auth.onAuthStateChange((event) => {
      if (event === "SIGNED_OUT") navigate("/admin/login");
    });
    return () => listener.subscription.unsubscribe();
  }, [navigate, toast]);

  useEffect(() => {
    if (activeTab === "inquiries") {
      fetchInquiries();
    } else {
      fetchPosts();
    }
  }, [activeTab]);

  const fetchPosts = async () => {
    const { data } = await supabase
      .from("posts")
      .select("*")
      .eq("category", activeTab)
      .order("created_at", { ascending: false });
    setPosts(data || []);
  };

  const fetchInquiries = async () => {
    const { data } = await supabase
      .from("inquiries")
      .select("*")
      .order("created_at", { ascending: false });
    setInquiries((data as Inquiry[]) || []);
  };

  const moveInquiry = async (id: string, newStatus: string) => {
    const { error } = await supabase
      .from("inquiries")
      .update({ status: newStatus })
      .eq("id", id);
    if (error) {
      toast({ title: "상태 변경 실패", variant: "destructive" });
    } else {
      setInquiries((prev) =>
        prev.map((inq) => (inq.id === id ? { ...inq, status: newStatus } : inq))
      );
    }
  };

  const deleteInquiry = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await supabase.from("inquiries").delete().eq("id", id);
    toast({ title: "삭제 완료" });
    fetchInquiries();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    let file_url: string | null = null;
    if (file) {
      const path = `${activeTab}/${Date.now()}_${file.name}`;
      const { error: uploadError } = await supabase.storage.from("documents").upload(path, file);
      if (uploadError) {
        toast({ title: "파일 업로드 실패", description: uploadError.message, variant: "destructive" });
        setLoading(false);
        return;
      }
      const { data: urlData } = supabase.storage.from("documents").getPublicUrl(path);
      file_url = urlData.publicUrl;
    }

    if (editing) {
      const updateData: Record<string, unknown> = { title: form.title, content: form.content, is_popup: form.is_popup };
      if (file_url) updateData.file_url = file_url;
      const { error } = await supabase.from("posts").update(updateData).eq("id", editing.id);
      if (error) toast({ title: "수정 실패", variant: "destructive" });
      else toast({ title: "수정 완료" });
    } else {
      const { error } = await supabase.from("posts").insert({
        category: activeTab,
        title: form.title,
        content: form.content,
        is_popup: form.is_popup,
        file_url,
      });
      if (error) toast({ title: "작성 실패", variant: "destructive" });
      else toast({ title: "작성 완료" });
    }

    setForm({ title: "", content: "", is_popup: false });
    setFile(null);
    setEditing(null);
    setLoading(false);
    fetchPosts();
  };

  const handleDelete = async (id: string) => {
    if (!confirm("삭제하시겠습니까?")) return;
    await supabase.from("posts").delete().eq("id", id);
    toast({ title: "삭제 완료" });
    fetchPosts();
  };

  const startEdit = (post: Post) => {
    setEditing(post);
    setForm({ title: post.title, content: post.content || "", is_popup: post.is_popup });
  };

  const handleLogout = async () => {
    await supabase.auth.signOut();
  };

  const getNextStatus = (current: string) => {
    if (current === "new") return "in_progress";
    if (current === "in_progress") return "done";
    return null;
  };

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b border-border px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="text-lg font-black">
          <span className="text-foreground">VERTEX</span>
          <span className="text-primary">CAPITAL</span>
          <span className="text-sm font-normal text-muted-foreground ml-2">Admin</span>
        </Link>
        <Button variant="ghost" size="sm" onClick={handleLogout}>
          <LogOut size={16} className="mr-1" /> 로그아웃
        </Button>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
        <Tabs value={activeTab} onValueChange={(v) => { setActiveTab(v); setEditing(null); setForm({ title: "", content: "", is_popup: false }); }}>
          <TabsList className="mb-6">
            {categories.map((c) => (
              <TabsTrigger key={c.value} value={c.value}>{c.label}</TabsTrigger>
            ))}
            <TabsTrigger value="inquiries">
              <Mail size={14} className="mr-1" /> 문의
            </TabsTrigger>
          </TabsList>

          {categories.map((c) => (
            <TabsContent key={c.value} value={c.value}>
              <form onSubmit={handleSubmit} className="bg-card border border-border rounded-lg p-5 mb-8 space-y-4">
                <h2 className="text-sm font-semibold text-primary">
                  {editing ? "게시물 수정" : "새 게시물 작성"}
                </h2>
                <Input
                  placeholder="제목"
                  value={form.title}
                  onChange={(e) => setForm({ ...form, title: e.target.value })}
                  required
                  className="bg-secondary"
                />
                <Textarea
                  placeholder="내용"
                  rows={5}
                  value={form.content}
                  onChange={(e) => setForm({ ...form, content: e.target.value })}
                  className="bg-secondary"
                />
                <div className="flex items-center gap-6">
                  <label className="flex items-center gap-2 text-sm cursor-pointer">
                    <Upload size={16} className="text-muted-foreground" />
                    <input type="file" className="hidden" onChange={(e) => setFile(e.target.files?.[0] || null)} />
                    <span className="text-muted-foreground">{file ? file.name : "파일 첨부"}</span>
                  </label>
                  <label className="flex items-center gap-2 text-sm">
                    <Switch checked={form.is_popup} onCheckedChange={(v) => setForm({ ...form, is_popup: v })} />
                    <span className="text-muted-foreground">팝업 표시</span>
                  </label>
                </div>
                <div className="flex gap-2">
                  <Button type="submit" disabled={loading} size="sm">
                    <Plus size={14} className="mr-1" /> {editing ? "수정" : "작성"}
                  </Button>
                  {editing && (
                    <Button type="button" variant="outline" size="sm" onClick={() => { setEditing(null); setForm({ title: "", content: "", is_popup: false }); }}>
                      취소
                    </Button>
                  )}
                </div>
              </form>

              <div className="space-y-2">
                {posts.length === 0 && <p className="text-sm text-muted-foreground">게시물이 없습니다.</p>}
                {posts.map((post) => (
                  <div key={post.id} className="flex items-center gap-3 py-3 px-4 bg-card border border-border rounded-lg">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium truncate">{post.title}</h3>
                      <p className="text-xs text-muted-foreground">
                        {new Date(post.created_at).toLocaleDateString("ko-KR")}
                        {post.is_popup && <span className="ml-2 text-primary">● 팝업</span>}
                        {post.file_url && <span className="ml-2">📎</span>}
                      </p>
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
            </TabsContent>
          ))}

          {/* Inquiries Kanban */}
          <TabsContent value="inquiries">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {kanbanColumns.map((col) => {
                const items = inquiries.filter((inq) => inq.status === col.key);
                return (
                  <div key={col.key} className="space-y-3">
                    <div className="flex items-center gap-2 mb-2">
                      <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${col.color}`}>
                        {col.label}
                      </span>
                      <span className="text-xs text-muted-foreground">{items.length}</span>
                    </div>

                    {items.length === 0 && (
                      <p className="text-xs text-muted-foreground py-8 text-center border border-dashed border-border rounded-lg">
                        비어 있음
                      </p>
                    )}

                    {items.map((inq) => {
                      const next = getNextStatus(inq.status);
                      const nextLabel = kanbanColumns.find((c) => c.key === next)?.label;
                      return (
                        <div
                          key={inq.id}
                          className="bg-card border border-border rounded-lg p-4 space-y-2"
                        >
                          <div className="flex items-start justify-between gap-2">
                            <h4 className="text-sm font-semibold text-foreground">{inq.name}</h4>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="shrink-0 h-7 w-7"
                              onClick={() => deleteInquiry(inq.id)}
                            >
                              <Trash2 size={12} className="text-destructive" />
                            </Button>
                          </div>
                          <p className="text-xs text-muted-foreground">{inq.email}</p>
                          {inq.company && (
                            <p className="text-xs text-muted-foreground">{inq.company}</p>
                          )}
                          {inq.phone && (
                            <p className="text-xs text-muted-foreground">{inq.phone}</p>
                          )}
                          <p className="text-sm text-foreground leading-relaxed line-clamp-4 whitespace-pre-wrap">
                            {inq.message}
                          </p>
                          <div className="flex items-center justify-between pt-2 border-t border-border">
                            <span className="text-[10px] text-muted-foreground">
                              {new Date(inq.created_at).toLocaleDateString("ko-KR")}
                            </span>
                            {next && (
                              <Button
                                variant="outline"
                                size="sm"
                                className="h-7 text-xs gap-1"
                                onClick={() => moveInquiry(inq.id, next)}
                              >
                                {nextLabel} <MoveRight size={12} />
                              </Button>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                );
              })}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
