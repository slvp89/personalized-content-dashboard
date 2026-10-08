"use client";

import React, { useState } from "react";
import { X, User, Sparkles, Check } from "lucide-react";
import { useAppDispatch, useAppSelector } from "@/store";
import { setUser, updateUserProfile, loginAsGuest } from "@/store/slices/authSlice";
import { UserProfile } from "@/types/content";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const personaPresets: UserProfile[] = [
  {
    id: "user_alex",
    name: "Alex Vance",
    email: "alex.vance@techfrontier.io",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80",
    role: "Lead Systems Architect & Tech Enthusiast",
    bio: "Curating AI breakthroughs, indie games, cosmic science, and electronic soundscapes.",
    joinedDate: "January 2024",
  },
  {
    id: "user_maya",
    name: "Dr. Maya Lin",
    email: "maya.lin@quantumlabs.org",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=200&q=80",
    role: "Astrophysics Researcher & Sci-Fi Aficionado",
    bio: "Obsessed with exoplanet atmospheres, space telescope telemetry, and ambient synthesis.",
    joinedDate: "August 2024",
  },
  {
    id: "user_marcus",
    name: "Marcus Sterling",
    email: "m.sterling@capitalsurge.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80",
    role: "FinTech Strategist & Angel Investor",
    bio: "Tracking clean power infrastructure debt, venture rounds, and sports data modeling.",
    joinedDate: "November 2024",
  },
];

export const AuthModal: React.FC<AuthModalProps> = ({ isOpen, onClose }) => {
  const dispatch = useAppDispatch();
  const currentUser = useAppSelector((state) => state.auth.user);

  const [name, setName] = useState(currentUser.name);
  const [role, setRole] = useState(currentUser.role);
  const [bio, setBio] = useState(currentUser.bio);
  const [avatar, setAvatar] = useState(currentUser.avatar);

  if (!isOpen) return null;

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    dispatch(
      updateUserProfile({
        name,
        role,
        bio,
        avatar,
      })
    );
    onClose();
  };

  const handleSelectPreset = (preset: UserProfile) => {
    dispatch(setUser(preset));
    setName(preset.name);
    setRole(preset.role);
    setBio(preset.bio);
    setAvatar(preset.avatar);
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
    >
      <div
        className="relative w-full max-w-lg max-h-[90vh] overflow-y-auto rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-2xl p-6 md:p-8 space-y-6 text-slate-900 dark:text-slate-100"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 flex items-center justify-center text-indigo-600 dark:text-indigo-400">
              <User className="w-5 h-5" />
            </div>
            <div>
              <h3 className="font-extrabold text-lg">User Profile & Account</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Personalize your profile or switch personas
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Persona quick switchers */}
        <div className="space-y-2">
          <label className="text-xs font-bold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>Switch Persona Preset</span>
          </label>
          <div className="grid grid-cols-3 gap-2">
            {personaPresets.map((preset) => {
              const isCurrent = currentUser.name === preset.name;
              return (
                <button
                  key={preset.id}
                  type="button"
                  onClick={() => handleSelectPreset(preset)}
                  className={`p-2.5 rounded-2xl border text-center flex flex-col items-center gap-1.5 transition-all ${
                    isCurrent
                      ? "border-indigo-500 bg-indigo-50/60 dark:bg-indigo-950/40 text-indigo-600 dark:text-indigo-400 font-bold"
                      : "border-slate-200 dark:border-slate-800 hover:border-indigo-300"
                  }`}
                >
                  <img
                    src={preset.avatar}
                    alt={preset.name}
                    className="w-9 h-9 rounded-full object-cover border border-slate-200 dark:border-slate-700"
                  />
                  <span className="text-[11px] truncate w-full">{preset.name.split(" ")[0]}</span>
                </button>
              );
            })}
          </div>
        </div>

        {/* Profile Edit Form */}
        <form onSubmit={handleSaveProfile} className="space-y-4">
          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Display Name
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Role & Title
            </label>
            <input
              type="text"
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium"
            />
          </div>

          <div>
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-1.5">
              Bio
            </label>
            <textarea
              rows={2}
              value={bio}
              onChange={(e) => setBio(e.target.value)}
              className="w-full px-3.5 py-2 text-sm rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-800 focus:outline-none focus:ring-2 focus:ring-indigo-500 font-medium resize-none"
            />
          </div>

          {/* Buttons */}
          <div className="pt-2 flex items-center justify-between">
            <button
              type="button"
              onClick={() => dispatch(loginAsGuest())}
              className="flex items-center gap-1.5 text-xs text-slate-500 hover:text-slate-700 dark:hover:text-slate-300 font-medium transition-colors"
            >
              <span>Guest Preset</span>
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-xs shadow-md shadow-indigo-500/20 transition-all flex items-center gap-1.5"
            >
              <Check className="w-3.5 h-3.5" />
              <span>Update Profile</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
