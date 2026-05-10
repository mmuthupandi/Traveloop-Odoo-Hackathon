import { useState } from "react";
import { Bell, Plane, Tag, WalletCards, Sparkles } from "lucide-react";
import { Switch } from "@/components/ui/switch";
import { initialNotifications } from "@/data/settings";
import type { LucideIcon } from "lucide-react";

const notifIcons: Record<string, LucideIcon> = {
  plane: Plane,
  wallet: WalletCards,
  tag: Tag,
  sparkles: Sparkles
};

export function NotificationsCard() {
  const [notifications, setNotifications] = useState(initialNotifications);

  function toggle(id: string) {
    setNotifications((prev) =>
      prev.map((n) => (n.id === id ? { ...n, enabled: !n.enabled } : n))
    );
  }

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#FEF6EE]">
          <Bell className="h-5 w-5 text-[#C46A2D]" strokeWidth={1.8} />
        </div>
        <div>
          <h3 className="font-serif text-lg font-bold text-[#1F261F]">Notifications</h3>
          <p className="text-xs font-medium text-[#7F7A70]">Choose what you want to be notified about.</p>
        </div>
      </div>

      {/* Toggle rows */}
      <ul className="mt-5 space-y-0">
        {notifications.map((notif) => {
          const Icon = notifIcons[notif.icon] ?? Bell;
          return (
            <li
              key={notif.id}
              className="flex items-center gap-4 border-b border-[#F0EDE8] py-3.5 last:border-0"
            >
              <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#F7F4EE]">
                <Icon className="h-4 w-4 text-[#7F7A70]" strokeWidth={1.8} />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-semibold text-[#1F261F]">{notif.title}</p>
                <p className="text-xs font-medium text-[#7F7A70]">{notif.description}</p>
              </div>
              <Switch
                checked={notif.enabled}
                onCheckedChange={() => toggle(notif.id)}
                aria-label={`Toggle ${notif.title}`}
              />
            </li>
          );
        })}
      </ul>
    </div>
  );
}
