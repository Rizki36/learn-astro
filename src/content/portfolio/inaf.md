---
slug: inaf
title: Inaf
description: Todo App Monorepo. Server - Express/GraphQL/Prisma. Client - Next.js/SWR/Material UI.
startDate: 2022-01-01
endDate: 2022-03-31
publishDate: 2022-03-31
featured: false
technologies:
  - Express
  - GraphQL
  - Prisma
  - Next.js
  - SWR
  - Material UI
github: https://github.com/Rizki36/inaf
order: 5
image: /media/162791755-2ed66cf7-1b3e-49db-98d6-b478385e1792.png
---

# InAF (Inaf Todo)

**InAF** is a robust, open-source task management platform tailored for institutions and companies. It integrates **Issues**, **Milestones**, and **Projects** into a single cohesive ecosystem.

![TechStack](https://user-images.githubusercontent.com/39044004/162791755-2ed66cf7-1b3e-49db-98d6-b478385e1792.png)

## ✨ Core Technical Highlights

  * **Monorepo Architecture:** Powered by **Turborepo** for high-performance build pipelines.
  * **End-to-End Type Safety:** Seamlessly share types between the server and client using **Prisma** and **TypeScript**.
  * **Hybrid API:** Robust implementation of both **GraphQL** and **REST API**.
  * **Comprehensive Testing:** Includes unit tests for REST API endpoints.
  * **Modern Stack:** Built with **Next.js (React)** on the frontend and **Express.js** on the backend.
  * **Database Management:** Type-safe database queries and migrations using **Prisma ORM**.

## 🚀 Getting Started

Follow these steps to set up the development environment:

1.  **Install Dependencies:**
    ```bash
    yarn install
    ```
2.  **Environment Setup:**
      * Copy `.env.example` to `.env`
      * Create a MySQL/PostgreSQL database named `inaf`.
3.  **Database Migration:**
    ```bash
    yarn prisma-push
    ```
4.  **Run Development Server:**
    ```bash
    yarn dev
    ```

## 📸 Preview

### Home Dashboard

> A centralized overview of your ongoing activities and projects.

![home](https://user-images.githubusercontent.com/39044004/153438183-6c64f1a7-3246-42fa-911b-5bc83c94da67.png)

### Group Tasks (Milestones)

> Organize related tasks into manageable milestones to track progress.

![group task](https://user-images.githubusercontent.com/39044004/153438299-0ffc057b-1cd5-4c88-9ec5-f2f4605b29e4.png)


### Task Details

> Detailed issue tracking with status updates and assignments.

![task](https://user-images.githubusercontent.com/39044004/153438373-6ce27625-21ec-46d5-a490-960cdabe0435.png)

### User Profile

> Manage personal settings and view individual task contributions.

![Profile](https://user-images.githubusercontent.com/39044004/153438468-5c6d9bc6-8e7b-43e1-8c09-66035c84be7a.png)


### Project Management

> High-level project organization for different organizational units.

![Project](https://user-images.githubusercontent.com/39044004/153438495-92e28420-1561-42e6-bbed-1155cd8c89ba.png)

### Database Schema & Architecture

> Structured data modeling for scalability and performance.

![Group 38 (1)](https://user-images.githubusercontent.com/39044004/153439231-90534900-ecf3-4c10-83d8-0cc537a9884f.png)
![db](https://user-images.githubusercontent.com/39044004/164988765-1a26bac7-0da3-40e2-be1d-911dc41240f8.jpg)