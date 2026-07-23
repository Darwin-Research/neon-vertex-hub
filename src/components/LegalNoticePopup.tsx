// 법적 고지 문구는 표준 템플릿입니다. 최종 문구·법적 효력은 회사/자문 변호사 검토로 확정하십시오.
import { useState } from "react";
import { X } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function LegalNoticePopup() {
  const [open, setOpen] = useState(true);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/60 backdrop-blur-sm">
      <div className="bg-canvas/95 backdrop-blur-md border border-line rounded-lg shadow-2xl w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between px-5 py-4 border-b border-line">
          <h2 className="text-base font-bold text-ink">투자 유의 및 면책 고지</h2>
          <button
            type="button"
            onClick={() => setOpen(false)}
            className="text-ink-muted hover:text-ink transition-colors"
            aria-label="닫기"
          >
            <X size={18} />
          </button>
        </div>

        <div className="px-5 py-4 max-h-[85vh] overflow-y-auto">
          <p className="text-sm text-ink leading-snug mb-3">
            본 웹사이트(darwin-research-kr.com, 이하 '본 사이트')는 다윈리서치(Darwin Research, 이하 '회사')의 회사 소개를 위한 정보 제공 목적으로 운영됩니다.
          </p>
          <ol className="list-decimal list-outside pl-5 space-y-1.5 text-sm text-ink leading-snug">
            <li>
              본 사이트에 게재된 모든 정보는 정보 제공만을 목적으로 하며, 특정 금융투자상품·종목의 매수·매도 또는 청약을 권유하거나 투자를 유인하기 위한 것이 아닙니다.
            </li>
            <li>
              본 사이트의 내용은 「자본시장과 금융투자업에 관한 법률」상 투자자문·투자일임·투자중개에 해당하지 않으며, 회사는 개별 투자자에게 투자자문을 제공하지 않습니다.
            </li>
            <li>
              모든 투자에는 원금 손실의 위험이 있으며, 과거의 운용·투자 실적은 미래의 수익을 보장하지 않습니다.
            </li>
            <li>
              투자에 관한 최종 판단과 그 결과에 대한 책임은 전적으로 이용자 본인에게 있습니다.
            </li>
            <li>
              회사는 본 사이트에 제공된 정보의 정확성·완전성·적시성을 보장하지 않으며, 해당 정보의 이용으로 발생한 어떠한 직간접적 손해에 대해서도 법적 책임을 지지 않습니다.
            </li>
            <li>
              본 사이트의 콘텐츠에 대한 무단 복제·배포·전재를 금합니다.
            </li>
          </ol>
          <p className="text-sm text-ink leading-snug mt-3">
            본 고지에 동의하시는 경우에만 사이트 이용을 계속하시기 바랍니다.
          </p>
        </div>

        <div className="flex justify-end px-5 py-4 border-t border-line bg-plate/50">
          <Button
            onClick={() => setOpen(false)}
            className="bg-brand text-white hover:bg-brand-dark"
          >
            동의하고 계속
          </Button>
        </div>
      </div>
    </div>
  );
}
