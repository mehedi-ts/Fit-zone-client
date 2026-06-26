// FinalForumsDetails.jsx
import Image from "next/image";
import { ShieldCheck, Dumbbell } from "lucide-react";

export default function FinalForumsDetails({ post }) {
  if (!post)
    return (
      <p className="text-center py-10 text-gray-400">
        Post not found.
      </p>
    );

  const formattedDate = new Date(post.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  const initials = post.authorName
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);

  const role = post.authorRole?.toLowerCase();

  const roleConfig = {
    admin: {
      label: "Admin",
      icon: <ShieldCheck size={14} />,
      className:
        "bg-white-500/100 text-black border  backdrop-blur-md",
    },
    trainer: {
      label: "Trainer",
      icon: <Dumbbell size={14} />,
      className:
        "bg-white-500/20 text-black border  backdrop-blur-md",
    },
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 font-sans">
      {/* Hero Image */}
      {post.image && (
        <div className="relative w-full aspect-video rounded-2xl overflow-hidden border border-gray-100 mb-6">
          <Image
            src={post.image}
            alt={post.title}
            width={800}
            height={450}
            className="w-full h-full object-cover"
            priority
          />

          {/* Glass Role Badge */}
          {roleConfig[role] && (
            <div
              className={`absolute top-4 left-4 z-10 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold shadow-lg ${roleConfig[role].className}`}
            >
              {roleConfig[role].icon}
              {roleConfig[role].label}
            </div>
          )}
        </div>
      )}

      {/* Title */}
      <h1 className="text-2xl md:text-3xl font-semibold text-gray-900 leading-snug mb-4">
        {post.title}
      </h1>

      {/* Author */}
      <div className="flex items-center gap-3 pb-5 mb-6 border-b border-gray-100">
        <div className="w-10 h-10 rounded-full bg-blue-50 flex items-center justify-center text-blue-600 text-sm font-semibold flex-shrink-0">
          {initials}
        </div>

        <div>
          <p className="text-sm font-medium text-gray-900 leading-none mb-0.5">
            {post.authorName}
          </p>

          <p className="text-xs text-gray-400">
            {post.authorEmail} &nbsp;·&nbsp; {formattedDate}
          </p>
        </div>
      </div>

      {/* Description */}
      <p className="text-base text-gray-600 leading-7">
        {post.description}
      </p>
    </div>
  );
}