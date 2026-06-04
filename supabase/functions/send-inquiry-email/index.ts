import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
const TO_EMAIL = "mail@darwin-research-kr.com";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const { name, email, company, phone, message } = await req.json();

    const res = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Darwin Research <noreply@darwin-research-kr.com>",
        to: [TO_EMAIL],
        reply_to: email,
        subject: `[문의] ${name}${company ? ` (${company})` : ""}`,
        html: `
          <h2>새 문의가 접수되었습니다</h2>
          <table style="border-collapse:collapse;width:100%;max-width:600px">
            <tr><td style="padding:8px;font-weight:bold;width:100px">이름</td><td style="padding:8px">${name}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">이메일</td><td style="padding:8px">${email}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">회사명</td><td style="padding:8px">${company || "-"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold">연락처</td><td style="padding:8px">${phone || "-"}</td></tr>
            <tr><td style="padding:8px;font-weight:bold;vertical-align:top">문의 내용</td><td style="padding:8px;white-space:pre-wrap">${message}</td></tr>
          </table>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      return new Response(JSON.stringify({ error: err }), {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      });
    }

    return new Response(JSON.stringify({ ok: true }), {
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  } catch (e) {
    return new Response(JSON.stringify({ error: String(e) }), {
      status: 500,
      headers: { ...corsHeaders, "Content-Type": "application/json" },
    });
  }
});
