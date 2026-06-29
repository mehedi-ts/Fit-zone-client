# 🏋️‍♂️ FitZone — Fitness & Gym Management Platform

FitZone is a full-stack fitness and gym management platform that connects **Members**, **Trainers**, and **Admins** in one seamless ecosystem. Members can discover and book fitness classes, engage in community discussions, and track their fitness journey. Trainers can manage their classes and share knowledge through the community forum. Admins oversee the entire platform — users, trainers, classes, and content — ensuring a safe and high-quality experience for everyone.

🔗 **Live Site:** [https://fit-zone-client.vercel.app/](https://fit-zone-client.vercel.app/)

---

## ✨ Key Features

- 🔐 **Role-Based Access Control** — Separate, secure dashboards for Members, Trainers, and Admins, each with tailored permissions and views.
- 🏃 **Class Discovery & Booking** — Browse, search, and filter approved fitness classes by name and category, then book seamlessly via Stripe checkout.
- ⭐ **Favorites System** — Save favorite classes for quick access, with duplicate-proof logic and instant toast feedback.
- 💬 **Community Forum** — Trainers and Admins publish posts; logged-in users can like, dislike, and comment with full edit/delete control over their own comments.
- 🧑‍🏫 **Trainer Application Flow** — Members apply to become trainers; Admins review, approve, or reject with feedback — visible directly on the member's dashboard.
- 🛡️ **Soft-Block Moderation** — Admins can restrict misbehaving users from taking actions (booking, commenting, applying) without fully banning them from browsing.
- 💳 **Stripe Payments** — Secure checkout for class bookings, with a complete, admin-visible transaction history.
- 📊 **Live Dashboard Analytics** — Real-time stat cards for bookings, enrolled students, total users, and total classes across all three roles.
- 🔑 **Secure Authentication** — Better Auth with email/password and Google OAuth, backed by JWT stored in HTTPOnly cookies and verified via middleware.
- 📱 **Fully Responsive UI** — Polished, professional design across mobile, tablet, and desktop, with smooth Framer Motion animations.
- 🌀 **Server-Side Pagination** — Efficient, paginated data loading for the Community Forum and All Classes pages.

---

## 🛠️ Tech Stack

**Frontend**
- Next.js (App Router)
- JavaScript
- Tailwind CSS v4
- HeroUI v3

**Backend**
- Express.js
- MongoDB
- Better Auth (JWT + Google OAuth)

---

## 📦 Repositories

| Part | Link |
|------|------|
| 🌐 Client (Frontend) | [Fit-zone-client](https://github.com/mehedi-ts/Fit-zone-client.git) |
| ⚙️ Server (Backend) | [Fit-zone-server](https://github.com/mehedi-ts/Fit-zone-server.git) |

---
