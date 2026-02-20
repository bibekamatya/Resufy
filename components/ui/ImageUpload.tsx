"use client";

import { useState } from "react";
import { Upload, X, User } from "lucide-react";
import Image from "next/image";
import { Button } from "./Button";

interface ImageUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export function ImageUpload({ value, onChange }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.size > 2 * 1024 * 1024) {
      alert("Image must be less than 2MB");
      return;
    }

    setUploading(true);
    const reader = new FileReader();
    reader.onloadend = () => {
      onChange(reader.result as string);
      setUploading(false);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex items-center gap-4">
      <div className="relative h-24 w-24 overflow-hidden rounded-full border-2 border-gray-200 bg-gray-100">
        {value ? (
          <Image src={value} alt="Profile" fill className="object-cover" />
        ) : (
          <div className="flex h-full w-full items-center justify-center">
            <User className="h-10 w-10 text-gray-400" />
          </div>
        )}
      </div>
      
      <div className="flex flex-col gap-2">
        <label htmlFor="photo-upload">
          <Button
            as="span"
            variant="outline"
            size="sm"
            icon={Upload}
            isLoading={uploading}
            className="cursor-pointer"
          >
            Upload Photo
          </Button>
          <input
            id="photo-upload"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />
        </label>
        {value && (
          <Button
            onClick={() => onChange("")}
            variant="ghost"
            size="sm"
            icon={X}
            className="text-red-600 hover:bg-red-50"
          >
            Remove
          </Button>
        )}
        <p className="text-xs text-gray-500">Max 2MB, JPG/PNG</p>
      </div>
    </div>
  );
}
