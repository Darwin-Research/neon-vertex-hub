import { useState } from "react";
import Layout from "@/components/layout/Layout";
import { motion } from "framer-motion";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { MapPin, Phone, Mail } from "lucide-react";

export default function Contact() {
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", company: "", phone: "", message: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const { error } = await supabase.from("inquiries").insert(form);
    setLoading(false);
    if (error) {
      toast({ title: "오류", description: "전송에 실패했습니다.", variant: "destructive" });
    } else {
      toast({ title: "전송 완료", description: "문의가 접수되었습니다." });
      setForm({ name: "", email: "", company: "", phone: "", message: "" });
    }
  };

  return (
    <Layout>
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <p className="text-primary font-semibold tracking-widest text-sm mb-4">CONTACT</p>
          <h1 className="text-4xl md:text-5xl font-black mb-16">문의하기</h1>
        </motion.div>

        <div className="max-w-xl">
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="이름 *" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} className="bg-card" />
              <Input placeholder="이메일 *" type="email" required value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} className="bg-card" />
            </div>
            <div className="grid grid-cols-2 gap-4">
              <Input placeholder="회사명" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className="bg-card" />
              <Input placeholder="연락처" value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} className="bg-card" />
            </div>
            <Textarea placeholder="문의 내용 *" required rows={6} value={form.message} onChange={(e) => setForm({ ...form, message: e.target.value })} className="bg-card" />
            <Button type="submit" size="lg" disabled={loading} className="glow-box font-semibold">
              {loading ? "전송 중..." : "문의 보내기"}
            </Button>
          </form>
        </div>
      </section>
    </Layout>
  );
}
