"use client";

import React from "react";

export function DeleteButton({ type, slug, onDeleted }: { type: string; slug: string; onDeleted?: () => void }) {
  return (
    <button
      className="ml-4 text-red-400 hover:text-red-300 hover:underline font-medium transition-colors"
      title="Delete"
      onClick={async () => {
        if (confirm(`Are you sure you want to delete '${slug}'?`)) {
          const res = await fetch(`/api/admin/delete/${type}/${slug}`, { method: "DELETE" });
          if (res.ok) {
            if (onDeleted) onDeleted();
            else window.location.reload();
          } else {
            const data = await res.json();
            alert(data.error || "Delete failed");
          }
        }
      }}
    >
      Delete
    </button>
  );
}
