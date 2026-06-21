"use client";

import {
  Avatar,
  Button,
  Description,
  Label,
  TextArea,
  TextField,
} from "@heroui/react";
import { Heart, MessageCircle, Send } from "lucide-react";

export default function ForumComments() {
  const comments = [
    {
      id: 1,
      name: "Michael Carter",
      avatar: "https://i.pravatar.cc/150?img=11",
      time: "2 hours ago",
      likes: 24,
      comment:
        "Excellent guide for beginners. I followed a similar routine when I started training and saw noticeable improvements.",
      replies: [
        {
          id: 101,
          name: "Sarah Johnson",
          avatar: "https://i.pravatar.cc/150?img=32",
          time: "1 hour ago",
          likes: 8,
          comment:
            "Totally agree. Consistency matters more than lifting heavy in the beginning.",
        },
        {
          id: 102,
          name: "David Miller",
          avatar: "https://i.pravatar.cc/150?img=15",
          time: "45 mins ago",
          likes: 4,
          comment:
            "Progressive overload and proper recovery made the biggest difference for me.",
        },
      ],
    },
    {
      id: 2,
      name: "Emma Wilson",
      avatar: "https://i.pravatar.cc/150?img=25",
      time: "5 hours ago",
      likes: 17,
      comment:
        "Recovery is the most overlooked part of fitness. Sleep and nutrition changed everything for me.",
      replies: [
        {
          id: 201,
          name: "James Brown",
          avatar: "https://i.pravatar.cc/150?img=18",
          time: "3 hours ago",
          likes: 3,
          comment:
            "Absolutely. Most beginners underestimate the importance of recovery.",
        },
      ],
    },
  ];

  return (
    <section className="max-w-4xl mx-auto px-6 py-12 border-t border-gray-200 mt-12">
      {/* Header */}
      <div className="flex items-center gap-3 mb-8">
        <MessageCircle size={24} />
        <h2 className="text-2xl font-bold">Comments ({comments.length})</h2>
      </div>

      {/* Add Comment */}
      <div className="border border-gray-200 rounded-2xl p-5 mb-10 bg-white">
        <h3 className="font-semibold text-lg mb-4">Join the Discussion</h3>

        <TextField className="mb-4 flex flex-col gap-2">
          <Label className="font-medium text-sm">Comment</Label>
          <TextArea placeholder="Share your thoughts..." rows={4} fullWidth />
          <Description className="text-xs text-gray-500">
            Share your experience or ask a question.
          </Description>
        </TextField>

        <Button variant="primary" onPress={() => {}}>
          Post Comment
          <Send size={16} />
        </Button>
      </div>

      {/* Comments */}
      <div className="space-y-6">
        {comments.map((comment) => (
          <div
            key={comment.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white"
          >
            {/* Main Comment */}
            <div className="flex gap-4">
              <Avatar size="md">
                <Avatar.Image src={comment.avatar} alt={comment.name} />
                <Avatar.Fallback>
                  {comment.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </Avatar.Fallback>
              </Avatar>

              <div className="flex-1">
                <div className="flex items-center gap-2">
                  <h4 className="font-semibold text-gray-900">
                    {comment.name}
                  </h4>
                  <span className="text-sm text-gray-500">{comment.time}</span>
                </div>

                <p className="mt-3 text-gray-700 leading-7">
                  {comment.comment}
                </p>

                <div className="flex items-center gap-6 mt-4">
                  <button className="flex items-center gap-2 text-sm text-gray-500 hover:text-red-500 transition">
                    <Heart size={16} />
                    {comment.likes}
                  </button>

                  <button className="text-sm font-medium text-gray-500 hover:text-black">
                    Reply
                  </button>
                </div>

                {/* Replies */}
                {comment.replies?.length > 0 && (
                  <div className="mt-6 ml-4 border-l-2 border-gray-200 pl-5 space-y-5">
                    {comment.replies.map((reply) => (
                      <div key={reply.id} className="flex gap-3">
                        <Avatar size="sm">
                          <Avatar.Image src={reply.avatar} alt={reply.name} />
                          <Avatar.Fallback>
                            {reply.name
                              .split(" ")
                              .map((n) => n[0])
                              .join("")}
                          </Avatar.Fallback>
                        </Avatar>

                        <div className="flex-1">
                          <div className="flex items-center gap-2">
                            <h5 className="font-medium text-gray-900">
                              {reply.name}
                            </h5>
                            <span className="text-xs text-gray-500">
                              {reply.time}
                            </span>
                          </div>

                          <p className="mt-2 text-sm text-gray-700 leading-6">
                            {reply.comment}
                          </p>

                          <div className="flex items-center gap-5 mt-3">
                            <button className="flex items-center gap-1 text-xs text-gray-500 hover:text-red-500">
                              <Heart size={14} />
                              {reply.likes}
                            </button>

                            <button className="text-xs font-medium text-gray-500 hover:text-black">
                              Reply
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
