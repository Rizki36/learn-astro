---
slug: seorangabi-api
title: SeorangAbi API
description: Central data provider and integration bridge with Discord for the ecosystem.
startDate: 2024-12-01
endDate: 2025-01-31
publishDate: 2025-01-31
featured: false
technologies:
  - TypeScript
  - Hono
  - Prisma ORM
github: https://github.com/seorangabi/seorangabi-api
order: 13
---

# SeorangAbi Api

SeorangAbi API is a core component of the SeorangAbi platform that serves as the central data provider for the ecosystem. It delivers structured data to the SeorangAbi Dashboard and acts as an integration bridge with Discord, enabling seamless communication and data exchange between various platform components.

This API provides a robust and secure interface for managing projects, teams, tasks, and other essential business resources within the SeorangAbi creative agency platform

## Key Features

- **RESTful API**: Comprehensive endpoints for all platform data needs
- **Discord Bot Integration**: Seamless communication with Discord for team notifications and commands
- **AI Query Interface**: Natural language database queries via integration with SeorangAbi Agent
- **Authentication & Authorization**: Secure access control for all resources
- **Real-time Data**: Up-to-date information for dashboard visualizations
- **Analytics Support**: Endpoints for statistics and reporting

## System Architecture

SeorangAbi API serves as the central hub in the following architecture:

```mermaid
graph TD
    Dashboard["SeorangAbi Dashboard"]
    API["SeorangAbi API"]
    DB["PostgreSQL DB"]
    DiscordBot["Discord Bot"]
    Agent["SeorangAbi AI Agent"]
    
    Dashboard <--> API
    API --> DB
    DiscordBot <--> API
    API <--> Agent
```

## Technology Stack

- **Hono**: Fast and lightweight web framework
- **Prisma** ORM: Type-safe database client and ORM
- **PostgreSQL**: Primary database
- **Redis**: Caching and session management
- **TypeScript**: Type-safe JavaScript
- **Discord**.js: Discord bot integration
- **JWT**: Authentication mechanism
- **Docker**: Containerization for easy deployment

## API Endpoints

The API provides endpoints for managing the following resources:
- `/team` - Team management
- `/project` - Project management
- `/task` - Task management
- `/offering` - Project offering management
- `/payroll` - Payroll management
- `/statistic` - Platform statistics
- `/discord` - Discord webhook endpoints

## Discord Integration
- `/projects` - View team projects
- `/done` - Mark a project as complete
- `/image-production-per-week` - View weekly production statistics
- `/ask-ai` - Query the database using natural language