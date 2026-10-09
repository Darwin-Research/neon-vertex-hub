// 이용 안내 문구는 표준 템플릿입니다. 최종 문구·법적 효력은 회사/자문 변호사 검토로 확정하십시오.
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

const HIDE_DAY_KEY = "darwin:legal-notice:hide-day";
const AGREED_KEY = "darwin:legal-notice:agreed";

function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
}

// Storage can throw (private mode, blocked cookies); fall back to showing the notice.
function shouldShow() {
  try {
    if (sessionStorage.getItem(AGREED_KEY) === "1") return false;
    return localStorage.getItem(HIDE_DAY_KEY) !== todayKey();
  } catch {
    return true;
  }
}

export default function LegalNoticePopup() {
  const [open, setOpen] = useState(shouldShow);

  const agree = () => {
    try {
      sessionStorage.setItem(AGREED_KEY, "1");
    } catch {
      /* ignore */
    }
    setOpen(false);
  };

  const hideToday = () => {
    try {
      localStorage.setItem(HIDE_DAY_KEY, todayKey());
    } catch {
      /* ignore */
    }
    agree();
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-canvas/70 backdrop-blur-md border border-line rounded-lg shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="text-base font-bold text-ink">웹사이트 이용 안내</h2>
          <button
            type="button"
            onClick={agree}
            className="text-ink-muted hover:text-ink transition-colors"
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 max-h-[85vh] overflow-y-auto">
          <p className="text-sm text-ink leading-snug mb-3">
            본 웹사이트(darwin-research-kr.com, 이하 '본 사이트')는 다윈리서치(Darwin Research, 이하 '회사')의 회사 및 제품 소개를 위한 정보 제공 목적으로 운영됩니다.
          </p>
          <ol className="list-decimal list-outside pl-5 space-y-1.5 text-sm text-ink leading-snug">
            <li>
              본 사이트에 게재된 제품 설명과 기능은 정보 제공을 목적으로 하며, 개발·출시 상황에 따라 사전 고지 없이 변경될 수 있습니다.
            </li>
            <li>
              회사의 제품이 제공하는 계산·요약 결과는 참고용 자료이며, 최종 판단과 그 결과에 대한 책임은 이용자 본인에게 있습니다.
            </li>
            <li>
              회사는 본 사이트에 제공된 정보의 정확성·완전성·적시성을 보장하지 않으며, 해당 정보의 이용으로 발생한 직간접적 손해에 대해 법적 책임을 지지 않습니다.
            </li>
            <li>
              문의하기를 통해 제출된 개인정보는 문의 응대 목적으로만 사용됩니다.
            </li>
            <li>
              본 사이트의 콘텐츠에 대한 무단 복제·배포·전재를 금합니다.
            </li>
          </ol>
          <p className="text-sm text-ink leading-snug mt-3">
            위 내용에 동의하시는 경우 사이트 이용을 계속하시기 바랍니다.
          </p>
        </div>

        <div className="flex items-center justify-between gap-3 px-5 py-4 border-t border-line">
          <Button variant="outline" onClick={hideToday} className="border-line text-ink-sub hover:bg-plate">
            오늘 하루 보지 않기
          </Button>
          <Button onClick={agree} className="bg-brand text-white hover:bg-brand-dark">
            동의하고 계속
          </Button>
        </div>
      </div>
    </div>
  );
}
