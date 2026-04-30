---
slug: e-scoring-paskibra
title: E-Scoring Paskibra
description: Scoring application for high school Paskibra competition.
startDate: 2019-02-01
endDate: 2019-04-30
publishDate: 2019-04-30
updatedDate: 2025-07-06
featured: false
technologies:
  - Laravel
  - Mysql
github: https://github.com/Rizki36/Escoring
order: 2
image: /media/160567334-ee3c8819-bba3-4b44-8f93-0c287634f96b.png
---

# E-Scoring V2

A comprehensive scoring system specifically designed for **Paskibra** (marching band/youth leadership) competitions. Originally developed and successfully implemented for events at **SMAN 3 Jombang**.

## 🛠 Tech Stack & Requirements

  * **Backend:** PHP 7.3+ (Laravel Framework)
  * **Dependency Manager:** Composer
  * **Database:** MySQL

## 🚀 Installation & Setup

Follow these steps to get the project running locally:

1.  **Navigate to the project directory:**
    ```bash
    cd imlucky
    ```
2.  **Database Configuration:**
      * Create a new database named `imlucky`.
      * Import `database_contoh.sql` (for sample data) or `database_kosong.sql` (for a clean slate).
3.  **Environment Setup:**
      * Copy `.env.example` to `.env`.
      * Configure your database credentials inside the `.env` file.
4.  **Launch the Application:**
      * Run the following command:
    <!-- end list -->
    ```bash
    php artisan serve
    ```
      * Access the application at `http://127.0.0.1:8000`.

## 📖 Key Concepts & Terminology

To better understand the scoring workflow, here are the core terms used in this system:

  * **Category & Sub-Category:** A hierarchical system for scoring. A `Category` contains multiple `Sub-Categories`, which then break down into specific `Sub2 Categories` (the granular criteria judged by the Jury).
  * **Jury (Juri):** The official scorers assigned to specific Category Groups.
  * **Category Group:** A logical grouping of Categories and Juries used to generate the **Scoring Forms**.
  * **Platoon (Peleton):** The competing teams/participants.
  * **Penalty (Pinalti):** Points deducted due to rules violations.
  * **Ballot:** Bonus or supplementary scores.
  * **Sorting (Sortasi):** The final leaderboard and winner determination list.

## 👥 Access Roles

### 🛡️ Admin

  * Full Management (CRUD) of Categories, Sub-Categories, and Scoring Criteria.
  * Manage Jury accounts and Group assignments.
  * Participant (Platoon) management with **Excel Import** support.
  * Generate digital Scoring Forms.
  * Override Jury ratings and apply Penalties.
  * Generate and Print score reports and final Winner Lists (Sortasi).

### ⚖️ Jury

  * Real-time scoring interface to provide ratings for each Platoon during the performance.

## 📸 Screenshots

### Admin Dashboard

> Overview of competition progress and statistics.

![image](https://user-images.githubusercontent.com/39044004/160555032-dd3047d6-aee6-4d70-bd7b-a6508978f8d8.png)


### Category Management

> Interface for managing hierarchical scoring criteria.

![image](https://user-images.githubusercontent.com/39044004/160567188-ee789280-da66-46b8-bee3-a019d4fc4b71.png)


### Scoring Leaderboard (Sortasi)

> Real-time winner determination and point calculation.

![image](https://user-images.githubusercontent.com/39044004/160567334-ee3c8819-bba3-4b44-8f93-0c287634f96b.png)


### Jury Interface

> Optimized view for Juries to input scores quickly.

![image](https://user-images.githubusercontent.com/39044004/160555196-8a418b57-950a-4076-8504-8906d6c1d668.png)
