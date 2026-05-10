import { useState } from "react";
import { Camera, MapPin, UserRound } from "lucide-react";
import { avatarImage } from "@/data/travel-dashboard";

export function ProfileCard() {
  const [editing, setEditing] = useState(false);
  const [form, setForm] = useState({
    name: "Aarav Sharma",
    email: "aarav.sharma@email.com",
    bio: "Travel enthusiast, adventure seeker, and story collector.",
    location: "New Delhi, India"
  });
  const [draft, setDraft] = useState({ ...form });

  function handleSave() {
    setForm({ ...draft });
    setEditing(false);
  }

  const fieldClass =
    "w-full rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-3 py-2 text-sm font-medium text-[#1F261F] outline-none placeholder:text-[#B0A898] focus:border-[#2F4F3E]/50 focus:ring-2 focus:ring-[#2F4F3E]/10 transition-all duration-200";
  const readClass = "text-sm font-medium text-[#1F261F]";

  return (
    <div className="rounded-2xl border border-[#E8DED1]/60 bg-white p-6 shadow-[0_4px_20px_rgba(0,0,0,0.04)]">
      {/* Card header */}
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#EAF4EE]">
            <UserRound className="h-5 w-5 text-[#3C8B68]" strokeWidth={1.8} />
          </div>
          <div>
            <h3 className="font-serif text-lg font-bold text-[#1F261F]">Profile Information</h3>
            <p className="text-xs font-medium text-[#7F7A70]">Update your personal details and profile photo.</p>
          </div>
        </div>
        <button
          type="button"
          onClick={() => (editing ? handleSave() : setEditing(true))}
          className="rounded-xl border border-[#E8DED1] bg-[#F7F4EE] px-4 py-2 text-sm font-semibold text-[#2F4F3E] transition-all duration-200 hover:bg-[#2F4F3E] hover:text-white hover:border-[#2F4F3E]"
        >
          {editing ? "Save" : "Edit Profile"}
        </button>
      </div>

      {/* Avatar */}
      <div className="mt-5 flex items-center gap-4">
        <div className="relative">
          <img
            src={avatarImage}
            alt="Aarav Sharma"
            className="h-20 w-20 rounded-2xl object-cover ring-2 ring-[#E8DED1]"
          />
          <button
            type="button"
            aria-label="Change photo"
            className="absolute -bottom-1.5 -right-1.5 flex h-7 w-7 items-center justify-center rounded-full bg-[#2F4F3E] text-white shadow-md transition-transform duration-200 hover:scale-110"
          >
            <Camera className="h-3.5 w-3.5" />
          </button>
        </div>
        <div>
          <p className="font-serif text-xl font-bold text-[#1F261F]">{form.name}</p>
          <p className="text-sm text-[#7F7A70]">{form.email}</p>
        </div>
      </div>

      {/* Fields */}
      <div className="mt-5 space-y-0">
        {/* Full Name */}
        <div className="border-b border-[#F0EDE8] py-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#7F7A70]">Full Name</p>
          {editing ? (
            <input
              className={fieldClass}
              value={draft.name}
              onChange={(e) => setDraft((d) => ({ ...d, name: e.target.value }))}
            />
          ) : (
            <p className={readClass}>{form.name}</p>
          )}
        </div>

        {/* Email */}
        <div className="border-b border-[#F0EDE8] py-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#7F7A70]">Email Address</p>
          {editing ? (
            <input
              type="email"
              className={fieldClass}
              value={draft.email}
              onChange={(e) => setDraft((d) => ({ ...d, email: e.target.value }))}
            />
          ) : (
            <p className={readClass}>{form.email}</p>
          )}
        </div>

        {/* Bio */}
        <div className="border-b border-[#F0EDE8] py-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#7F7A70]">Bio</p>
          {editing ? (
            <textarea
              rows={2}
              className={`${fieldClass} resize-none`}
              value={draft.bio}
              onChange={(e) => setDraft((d) => ({ ...d, bio: e.target.value }))}
            />
          ) : (
            <p className={readClass}>{form.bio}</p>
          )}
        </div>

        {/* Location */}
        <div className="pt-4">
          <p className="mb-1.5 text-xs font-semibold uppercase tracking-wide text-[#7F7A70]">Location</p>
          {editing ? (
            <input
              className={fieldClass}
              value={draft.location}
              onChange={(e) => setDraft((d) => ({ ...d, location: e.target.value }))}
            />
          ) : (
            <p className={`${readClass} flex items-center gap-1.5`}>
              <MapPin className="h-3.5 w-3.5 text-[#7F7A70]" />
              {form.location}
            </p>
          )}
        </div>
      </div>

      {editing && (
        <button
          type="button"
          onClick={() => { setDraft({ ...form }); setEditing(false); }}
          className="mt-4 text-sm font-medium text-[#7F7A70] hover:text-[#E87565] transition-colors duration-200"
        >
          Cancel
        </button>
      )}
    </div>
  );
}
