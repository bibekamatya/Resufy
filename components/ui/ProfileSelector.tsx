"use client";

import { useState } from "react";
import { ResumeProfile } from "@/lib/types";
import { Plus, Check, Trash2, Edit2, Star, Copy, Share2 } from "lucide-react";

interface ProfileSelectorProps {
  profiles: ResumeProfile[];
  currentProfileId: string;
  onSelectProfile: (profileId: string) => void;
  onCreateProfile: (name: string) => void;
  onDeleteProfile: (profileId: string) => void;
  onRenameProfile: (profileId: string, name: string) => void;
  onSetDefault: (profileId: string) => void;
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
  onSetDefault,
  onDuplicateProfile,
  onShareProfile,
}: ProfileSelectorProps) => {
  const [showInput, setShowInput] = useState(false);
  const [newName, setNewName] = useState("");
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState("");

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
          <div key={profile.id}>
            {editingId === profile.id ? (
              <div className="flex gap-1">
                <input
                  type="text"
                  value={editName}
                  onChange={(e) => setEditName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleRename(profile.id)}
                  className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
                  autoFocus
                />
                <button
                  onClick={() => handleRename(profile.id)}
                  className="px-2 py-1 bg-blue-600 text-white text-xs rounded"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex items-center gap-1">
                <button
                  onClick={() => onSelectProfile(profile.id)}
                  className={`flex-1 text-left px-3 py-2 rounded text-sm flex items-center gap-2 ${
                    currentProfileId === profile.id
                      ? "bg-blue-50 text-blue-700 font-medium"
                      : "hover:bg-gray-50 text-gray-700"
                  }`}
                >
                  {profile.is_default && <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />}
                  <span className="flex-1 truncate">{profile.name}</span>
                  {currentProfileId === profile.id && <Check className="h-4 w-4" />}
                </button>
                <button
                  onClick={() => {
                    setEditingId(profile.id);
                    setEditName(profile.name);
                  }}
                  className="p-1.5 hover:bg-gray-100 rounded"
                  title="Rename"
                >
                  <Edit2 className="h-3.5 w-3.5 text-gray-500" />
                </button>
                {onDuplicateProfile && (
                  <button
                    onClick={() => onDuplicateProfile(profile.id)}
                    className="p-1.5 hover:bg-gray-100 rounded"
                    title="Duplicate"
                  >
                    <Copy className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                )}
                {onShareProfile && (
                  <button
                    onClick={() => onShareProfile(profile.id)}
                    className="p-1.5 hover:bg-gray-100 rounded"
                    title="Share for feedback"
                  >
                    <Share2 className="h-3.5 w-3.5 text-gray-500" />
                  </button>
                )}
                {!profile.is_default && (
                  <button
                    onClick={() => onSetDefault(profile.id)}
                    className="p-1.5 hover:bg-gray-100 rounded"
                    title="Set as default"
                  >
                    <Star className="h-3.5 w-3.5 text-gray-400" />
                  </button>
                )}
                {profiles.length > 1 && (
                  <button
                    onClick={() => onDeleteProfile(profile.id)}
                    className="p-1.5 hover:bg-red-50 rounded"
                    title="Delete"
                  >
                    <Trash2 className="h-3.5 w-3.5 text-red-500" />
                  </button>
                )}
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
            className="flex-1 px-2 py-1 text-sm border border-gray-300 rounded"
            autoFocus
          />
          <button
            onClick={handleCreate}
            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
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
    </div>
  );
};
