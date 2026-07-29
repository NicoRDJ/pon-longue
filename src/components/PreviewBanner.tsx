"use client";

import { useLanguage } from "@/lib/i18n/LanguageContext";
import type { DictKey } from "@/lib/i18n/dictionaries";

export default function PreviewBanner({
  textKey = "preview.banner",
}: {
  textKey?: DictKey;
}) {
  const { t } = useLanguage();
  return (
    <div className="bg-brass-light fixed inset-x-0 top-0 z-[101] flex min-h-[38px] items-center justify-center px-4 py-2 text-center text-[12.5px] font-semibold text-[#241a06]">
      {t(textKey)}
    </div>
  );
}
