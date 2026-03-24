"use client";

import { useState } from "react";
import { ResumeProfile } from "@/lib/types";
import { Plus, Check, Trash2, Edit2, Copy, Share2, MoreVertical, Link2 } from "lucide-react";
import { Dialog } from "./Dialog";

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  const hours = Math.floor(diff / 3600000);
  const days = Math.floor(diff / 86400000);
  if (mins < 1) return "just now";
  if (mins < 60) return `${mins}m ago`;
  if (hours < 24) return `${hours}h ago`;
  return `${days}d ago`;
}

interface ProfileSelectorProps {
  profiles: ResumeProfile[];
  currentProfileId: string;
  onSelectProfile: (profileId: string) => void;
  onCreateProfile: (name: string) => void;
  onDeleteProfile: (profileId: string) => void;
  onRenameProfile: (profileId: string, name: string) => void;
  onDuplicateProfile?: (profileId: string) => void;
  onShareProfile?: (profileId: string) => void;
}

export const ProfileSelector = ({
  profiles,
  currentProfileId,
  onSelectProfile,
  onCreateProfile,
  onDeleteProfile,
  onRenameProfile,
  onDuplicateProfile,
  onShareProfile,
}: ProfileSelectorProps) => {
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");
  const [openMenuId, setOpenMenuId] = useState<string | null>(null);
  const [deleteDialog, setDeleteDialog] = useState<{ show: boolean; profileId: string | null }>({ show: false, profileId: null });

  const handleCreate = () => {
    if (newName.trim()) {
      onCreateProfile(newName.trim());
      setNewName("");
      setShowInput(false);
    }
  };

  const handleRename = (profileId: string) => {
    if (editName.trim()) {
      onRenameProfile(profileId, editName.trim());
      setEditingId(null);
      setEditName("");
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
      <h3 className="text-sm font-semibold text-gray-700 mb-2">Resume Profiles</h3>
      <div className="space-y-1">
        {profiles.map((profile) => (
          <div key={profile._id}>
            {editingId === profile._id ? (
              <div className="flex gap-1">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRename(profile._id)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  autoFocus
                />
                <button
                  onClick={() => handleRename(profile._id)}
                  className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1 group">
                <button
                  onClick={() => onSelectProfile(profile._id)}
                  className={`flex-1 text-left px-3 py-2 rounded text-sm flex flex-col ${
                    currentProfileId === profile._id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="flex-1 truncate">{profile.title}</span>
                    {currentProfileId === profile._id && <Check className="h-4 w-4 shrink-0" />}
                  </div>
                  <span className="text-[10px] text-gray-400 font-normal">
                    {timeAgo(profile.updatedAt)}
                  </span>
                </button>
                
                <div className="relative">
                  <button
                    onClick={() => setOpenMenuId(openMenuId === profile._id ? null : profile._id)}
                    className="p-1.5 hover:bg-gray-100 rounded transition-colors"
                  >
                    <MoreVertical className="h-4 w-4 text-gray-500" />
                  </button>
                  
                  {openMenuId === profile._id && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setOpenMenuId(null)} />
                      <div className="absolute right-0 top-full mt-1 w-40 z-50 bg-white rounded-lg border border-gray-200 shadow-xl py-1">
                        <button
                          onClick={() => {
                            setEditingId(profile._id);
                            setEditName(profile.title);
                            setOpenMenuId(null);
                          }}
                          className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                        >
                          <Edit2 className="h-3.5 w-3.5" />
                          Rename
                        </button>
                        {onDuplicateProfile && (
                          <button
                            onClick={() => {
                              onDuplicateProfile(profile._id);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            <Copy className="h-3.5 w-3.5" />
                            Duplicate
                          </button>
                        )}
                        {onShareProfile && (
                          <button
                            onClick={() => {
                              onShareProfile(profile._id);
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-gray-700 hover:bg-gray-50"
                          >
                            {profile.isPublic ? <Link2 className="h-3.5 w-3.5" /> : <Share2 className="h-3.5 w-3.5" />}
                            {profile.isPublic ? 'Revoke Link' : 'Share'}
                          </button>
                        )}
                        {profiles.length > 1 && (
                          <button
                            onClick={() => {
                              setDeleteDialog({ show: true, profileId: profile._id });
                              setOpenMenuId(null);
                            }}
                            className="flex w-full items-center gap-2 px-3 py-2 text-sm text-red-600 hover:bg-red-50"
                          >
                            <Trash2 className="h-3.5 w-3.5" />
                            Delete
                          </button>
                        )}
                      </div>
                    </>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {showInput ? (
        <div className="mt-2 flex gap-2">
          <input
            type="text"
            value={newName}
            onChange={(e) => setNewName(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleCreate()}
            placeholder="Profile name"
            className="flex-1 min-w-0 px-2 py-1 text-sm border border-gray-300 rounded"
            autoFocus
          />
          <button
            onClick={handleCreate}
            className="shrink-0 px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
          >
            Add
          </button>
        </div>
      ) : (
        <>
          <button
            onClick={() => setShowInput(true)}
            className="w-full mt-2 px-3 py-2 border border-dashed border-gray-300 rounded text-sm text-gray-600 hover:border-blue-400 hover:text-blue-600 flex items-center justify-center gap-2"
          >
            <Plus className="h-4 w-4" />
            New Profile
          </button>
        </>
      )}

      <Dialog
        isOpen={deleteDialog.show}
        onClose={() => setDeleteDialog({ show: false, profileId: null })}
        onConfirm={() => {
          if (deleteDialog.profileId) {
            onDeleteProfile(deleteDialog.profileId);
          }
          setDeleteDialog({ show: false, profileId: null });
        }}
        title="Delete Profile"
        message="Are you sure you want to delete this profile? This action cannot be undone."
      />
    </div>
  );
};
