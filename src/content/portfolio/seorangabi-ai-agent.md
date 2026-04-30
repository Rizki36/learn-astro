---
slug: seorangabi-ai-agent
title: SeorangAbi AI Agent
description: Bridge between SeorangAbi API and LLMs to transform natural language queries into optimized SQL statements.
startDate: 2025-06-01
endDate: 2025-06-30
publishDate: 2025-06-30
featured: false
technologies:
  - Python
  - Google Gemini
github: https://github.com/Rizki36/seorangabi-agent
order: 18
image: /media/22fc292c-f93d-4161-aa98-00580bf3f8ae.png
---

# SeorangAbi AI Agent

SeorangAbi AI Agent is a specialized component of the SeorangAbi platform that serves as an intelligent bridge between the SeorangAbi API and Large Language Models (LLMs). Its primary function is to transform natural language queries into optimized SQL statements, enabling team members to access database insights without SQL expertise.

This agent interprets user questions from Discord, processes them through an LLM, and generates secure, read-only SQL queries that interact with the SeorangAbi database system.

## Flow

<img width="2454" alt="shapes at 25-06-28 17 53 07" src="https://github.com/user-attachments/assets/16c47bbd-0464-4991-935f-ddd506a42ad3" />

## Preview

<img width="800" alt="Screenshot 2025-06-29 at 13 31 42" src="https://github.com/user-attachments/assets/111290c3-16e6-4c3c-8e73-ffd09ab6f1ea" />

<img width="800" alt="Screenshot 2025-06-28 at 20 17 12" src="https://github.com/user-attachments/assets/cd999202-23de-45f7-86f5-33aa76551292" />

<img width="800" alt="Screenshot 2025-06-28 at 20 16 59" src="https://github.com/user-attachments/assets/8ac05d66-20cd-41a1-af76-ec607bc7b255" />

<img width="800" alt="Screenshot 2025-06-29 at 13 32 37" src="https://github.com/user-attachments/assets/207ebf34-b059-4d4c-ba21-db27b7e2838b" />

## Configuration
- Copy the `.env.example` file to `.env` and fill in the necessary environment variables, including API keys and model parameters.

## Installation
1. Clone the repository:
   ```
   git clone <repository-url>
   cd gemini-agent
   ```

2. Create a virtual environment (optional but recommended):
   ```
   python -m venv venv
   source venv/bin/activate  # On Windows use `venv\Scripts\activate`
   ```

3. Install UV if you don't have it yet:
   ```
   curl -LsSf https://astral.sh/uv/install.sh | sh
   ```

4. Install the required dependencies using UV:
   ```
   uv pip install -e .
   ```
   
   Or from requirements.txt:
   ```
   uv pip sync requirements.txt
   ```

## Usage
- To start an api, run:
  ```
  uv run -m src.api
  ```

## Docker Deployment

You can run the agent API using Docker:

1. Make sure you have Docker and Docker Compose installed on your system.

2. Build and start the container:
  ```
  docker-compose up -d
  ```

3. The API will be available at `http://localhost:3021`.

4. View logs:
  ```
  docker-compose logs -f
  ```

5. Stop the container:
  ```
  docker-compose down
  ```