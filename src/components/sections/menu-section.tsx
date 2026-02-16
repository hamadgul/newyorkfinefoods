"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { MenuCategory, MenuItem } from "@/data/menus";

interface MenuSectionProps {
  title: string;
  subtitle?: string;
  categories?: MenuCategory[];
  items?: MenuItem[];
  dark?: boolean;
}

export function MenuSection({
  title,
  subtitle,
  categories,
  items,
  dark = false,
}: MenuSectionProps) {
  const bg = dark ? "bg-charcoal text-ivory" : "bg-ivory text-charcoal";
  const itemBg = dark
    ? "bg-ivory/5 border border-ivory/10"
    : "bg-white border border-charcoal/5 shadow-sm";
  const descColor = dark ? "text-ivory/60" : "text-charcoal/60";
  const dotColor = dark ? "bg-gold/40" : "bg-gold/30";

  const renderItem = (item: MenuItem) => (
    <div key={item.name} className={`rounded-lg p-5 transition-all duration-300 hover:scale-[1.02] ${itemBg}`}>
      <div className="flex items-center gap-3">
        <span className={`h-1.5 w-1.5 rounded-full ${dotColor}`} />
        <h3 className="font-heading text-lg font-semibold">{item.name}</h3>
      </div>
      <p className={`mt-1.5 pl-[18px] text-sm leading-relaxed ${descColor}`}>
        {item.description}
      </p>
    </div>
  );

  return (
    <section className={`py-24 ${bg}`}>
      <div className="mx-auto max-w-5xl px-6">
        <div className="text-center">
          <h2 className="font-heading text-3xl font-bold md:text-4xl">
            {title}
          </h2>
          {subtitle && (
            <p className={`mt-4 text-lg ${descColor}`}>{subtitle}</p>
          )}
          <div className="mx-auto mt-6 h-px w-16 bg-gold/50" />
        </div>

        {categories && (
          <Tabs defaultValue={categories[0].category} className="mt-12">
            <TabsList className="mx-auto flex w-fit flex-wrap gap-2 bg-transparent">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.category}
                  value={cat.category}
                  className={`rounded-full border px-6 py-2.5 text-sm font-semibold transition-all data-[state=active]:border-gold data-[state=active]:bg-gold data-[state=active]:text-charcoal ${
                    dark
                      ? "border-ivory/25 text-ivory/80 hover:border-ivory/50 hover:text-ivory"
                      : "border-charcoal/15 text-charcoal/60 hover:border-charcoal/30 hover:text-charcoal"
                  }`}
                >
                  {cat.category}
                </TabsTrigger>
              ))}
            </TabsList>
            {categories.map((cat) => (
              <TabsContent key={cat.category} value={cat.category}>
                <div className="mt-8 grid gap-4 md:grid-cols-2">
                  {cat.items.map(renderItem)}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        )}

        {items && !categories && (
          <div className="mt-12 grid gap-4 md:grid-cols-2">
            {items.map(renderItem)}
          </div>
        )}
      </div>
    </section>
  );
}
