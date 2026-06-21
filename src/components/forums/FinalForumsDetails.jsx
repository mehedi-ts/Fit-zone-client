import { Avatar } from "@heroui/react";
import Image from "next/image";

export default function FinalForumsDetails() {
  const post = {
    category: "Fitness & Training",
    title: "The Ultimate Beginner's Guide to Building a Stronger Chest",
    author: {
      name: "John Anderson",
      avatar: "https://i.pravatar.cc/80?img=12",
    },
    date: "May 20, 2024",
    readTime: "8 min read",
    coverImage:
      "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=1200&q=80",
    content: [
      "A well-developed chest is more than just a visual asset. It plays a crucial role in improving upper-body strength, enhancing posture, and supporting everyday functional movements.",
      "For beginners, focusing on proper technique and consistency is far more important than lifting heavy weights. Establishing a strong foundation will help prevent injuries and deliver better long-term results.",
      "Start your training with fundamental exercises such as push-ups, dumbbell presses, and incline chest presses. These movements effectively target different areas of the chest while improving overall muscle coordination.",
      "Remember to prioritize controlled repetitions over speed. Maintaining proper form throughout each exercise ensures maximum muscle engagement and reduces the risk of strain.",
      "Recovery is equally important. Adequate sleep, balanced nutrition, and sufficient protein intake will support muscle growth and improve your training performance.",
    ],
  };

  return (
    <div className="max-w-4xl mx-auto px-6 py-10">
      {/* Category */}
      <span className="inline-block bg-orange-100 text-orange-600 text-xs font-semibold uppercase tracking-wider px-3 py-2 rounded-md mb-5">
        {post.category}
      </span>

      {/* Title */}
      <h1 className="text-4xl font-extrabold text-gray-900 leading-tight mb-5">
        {post.title}
      </h1>

      {/* Author */}
      <div className="flex items-center gap-3 text-sm text-gray-500 mb-8">
        <Avatar src={post.author.avatar} name={post.author.name} size="sm" />

        <span className="font-semibold text-gray-900">{post.author.name}</span>

        <span>•</span>

        <span>{post.date}</span>

        <span>•</span>

        <span>{post.readTime}</span>
      </div>

      {/* Cover Image */}
      <div className="overflow-hidden rounded-2xl border border-gray-200 mb-8">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={700}
          className="w-full h-auto object-cover"
          priority
        />
      </div>

      {/* Content */}
      <div className="space-y-5 text-gray-700 leading-8 text-base">
        {post.content.map((paragraph, index) => (
          <p key={index}>{paragraph}</p>
        ))}
      </div>
    </div>
  );
}
