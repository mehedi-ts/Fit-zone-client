import { Avatar } from "@heroui/react";
import Image from "next/image";
import React from "react";

const ForumDetails = () => {
  // Dummy data (inline)
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

    paragraphs: [
      "A well-developed chest is more than just a visual asset. It plays a crucial role in improving upper-body strength, enhancing posture, and supporting everyday functional movements.",

      "For beginners, focusing on proper technique and consistency is far more important than lifting heavy weights. Establishing a strong foundation will help prevent injuries and deliver better long-term results.",

      "Start your training with fundamental exercises such as push-ups, dumbbell presses, and incline chest presses. These movements effectively target different areas of the chest while improving overall muscle coordination.",

      "Remember to prioritize controlled repetitions over speed. Maintaining proper form throughout each exercise ensures maximum muscle engagement and reduces the risk of strain.",

      "Recovery is equally important. Adequate sleep, balanced nutrition, and sufficient protein intake will support muscle growth and improve your training performance.",

      "With patience, dedication, and a structured workout routine, you can steadily build chest strength and develop a more balanced physique over time.",
    ],
  };

  return (
    <article className="forum-details">
      <span className="forum-details__badge">{post.category}</span>

      <h1 className="forum-details__title">{post.title}</h1>

      <div className="forum-details__meta">
        <Avatar
          src={post.author.avatar}
          name={post.author.name}
          size="sm"
          className="forum-details__avatar"
        />
        <span className="forum-details__author">{post.author.name}</span>
        <span className="forum-details__dot">•</span>
        <span className="forum-details__date">{post.date}</span>
        <span className="forum-details__dot">•</span>
        <span className="forum-details__read-time">{post.readTime}</span>
      </div>

      <div className="forum-details__cover">
        <Image
          src={post.coverImage}
          alt={post.title}
          width={1200}
          height={630}
          priority
        />
      </div>

      <div className="forum-details__content">
        {post.paragraphs.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>

      <style>{`
        .forum-details {
          max-width: 820px;
          margin: 0 auto;
          padding: 32px 24px 64px;
        }

        .forum-details__badge {
          display: inline-block;
          background: #FFE8D9;
          color: #E8590C;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.78rem;
          font-weight: 600;
          letter-spacing: 0.03em;
          text-transform: uppercase;
          padding: 6px 14px;
          border-radius: 6px;
          margin-bottom: 18px;
        }

        .forum-details__title {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 2.4rem;
          font-weight: 800;
          line-height: 1.2;
          color: #1A1A1A;
          margin: 0 0 18px;
          letter-spacing: -0.02em;
        }

        .forum-details__meta {
          display: flex;
          align-items: center;
          gap: 8px;
          margin-bottom: 28px;
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 0.92rem;
          color: #6B6B6B;
        }

        .forum-details__avatar {
          margin-right: 4px;
        }

        .forum-details__author {
          font-weight: 600;
          color: #1A1A1A;
        }

        .forum-details__dot {
          color: #C4C4C4;
        }

        .forum-details__cover {
          width: 100%;
          border-radius: 14px;
          overflow: hidden;
          border: 1px solid #ECECEC;
          margin-bottom: 24px;
        }

        .forum-details__cover img {
          width: 100%;
          height: auto;
          display: block;
          object-fit: cover;
        }

        .forum-details__content {
          font-family: 'Inter', system-ui, sans-serif;
          font-size: 1rem;
          line-height: 1.7;
          color: #3C3C3C;
        }

        .forum-details__content p {
          margin: 0 0 14px;
        }

        @media (max-width: 600px) {
          .forum-details__title {
            font-size: 1.7rem;
          }
        }
      `}</style>
    </article>
  );
};

export default ForumDetails;
