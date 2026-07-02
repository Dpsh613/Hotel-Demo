import Link from "next/link";
import type { Route } from "next";

interface QuickNavItem {
  label: string;
  id: string;
}

interface QuickNavBarProps {
  items: QuickNavItem[];
}

export function QuickNavBar({ items }: QuickNavBarProps) {
  if (!items || items.length === 0) return null;

  return (
    <div className="flex flex-row items-center gap-3 flex-wrap">
      <span className="text-[16px] tracking-[0.12em] uppercase text-[#111] font-semibold w-full md:w-auto md:mr-2">
        QUICK NAV →
      </span>
      {items.map((item) => (
        <Link
          key={item.id}
          href={`#${item.id}` as Route}
          className="bg-white text-[#111] border border-[#111]/30 rounded-full px-4 py-1.5 text-[12px] tracking-[0.1em] uppercase transition-colors cursor-pointer hover:border-[#111]/60 font-semibold"
        >
          {item.label}
        </Link>
      ))}
    </div>
  );
}
