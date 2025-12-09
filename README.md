# 🌤️ Weather Agent using LangChain.js & LangGraph.js

Intelligent weather notification system with AI agent orchestration, automated scheduling via BullMQ, and Redis-backed job queues.

## ✨ Features

- 🤖 **LangGraph AI Workflow** - State graph orchestration for weather operations
- ⏰ **Scheduled Emails** - Cron-based recurring emails with BullMQ
- 🌍 **Real-time Weather** - OpenWeatherMap API integration
- 📧 **Email Notifications** - Gmail SMTP delivery
- 📊 **Job Queue System** - BullMQ + Redis for reliable processing
- 🎯 **Type-safe** - TypeScript + Zod validation

## 🔧 Tech Stack

- Node.js, TypeScript, Express.js
- LangChain.js, LangGraph.js
- BullMQ 5.65+, IORedis, Redis
- OpenWeatherMap API, Gmail SMTP
- Zod validation

## 📋 Prerequisites

- Node.js 18+
- pnpm
- **Redis Server** - [Install](https://redis.io/docs/getting-started/)
- [OpenWeatherMap API Key](https://openweathermap.org/api)
- [Gmail App Password](https://myaccount.google.com/apppasswords)

## 🚀 Quick Start

```bash
# 1. Install
git clone https://github.com/yourusername/weather-agent-using-langchainjs-langgraphjs.git
cd weather-agent-using-langchainjs-langgraphjs/backend
pnpm install

# 2. Start Redis
brew services start redis  # macOS
# OR: sudo systemctl start redis  # Linux
# OR: docker run -d -p 6379:6379 redis:latest

# 3. Configure .env
cat > .env << EOF
PORT=5001
OPENWEATHER_API_KEY=your_api_key
GMAIL_USER=your-email@gmail.com
GMAIL_PASSWORD=your-app-password
REDIS_HOST=localhost
REDIS_PORT=6379
EOF

# 4. Run
pnpm run dev
```

## 📡 API Endpoints

### Instant Weather Email

```bash
POST /api/weatherEmail/sendWeatherEmail
```

```json
{
  "city": "Mumbai",
  "recipientEmail": "user@example.com"
}
```

### Scheduler Management

**Create Schedule**

```bash
POST /api/weatherEmailScheduler/create
```

```json
{
  "city": "New York",
  "recipientEmail": "user@example.com",
  "pattern": "0 17 * * *"
}
```

**Cron Pattern Examples:**

- `"0 17 * * *"` - Daily at 5 PM
- `"0 9 * * 1-5"` - Weekdays at 9 AM
- `"*/30 * * * *"` - Every 30 minutes

**Other Endpoints:**

- `GET /api/weatherEmailScheduler/list` - List all schedules
- `DELETE /api/weatherEmailScheduler/delete/:schedulerId` - Delete specific schedule
- `DELETE /api/weatherEmailScheduler/delete-all-schedules` - Delete all schedules

## 🏗️ Architecture

```
Express API → LangGraph Agent → Tools (Fetch Weather, Format, Send)
    ↓
BullMQ Queue (Redis) → Worker → Agent → Email Sent
```

**LangGraph Workflow:** `START → Fetch Weather → Format Email → Send Email → END`

## 📁 Project Structure

```
weather-ai-app/
│
├── apps/                              # Your microservices
│   ├── web/                           # React frontend
│   │   ├── src/
│   │   ├── Dockerfile
│   │   ├── nginx.conf
│   │   └── package.json
│   │
│   ├── backend/                       # Auth + API service
│   │   ├── src/
│   │   ├── Dockerfile
│   │   └── package.json
│   │
│   └── weather-agent/                 # LangGraph service
│       ├── src/
│       ├── Dockerfile
│       └── package.json
│
├── packages/                          # Shared code
│   ├── common/                        # Types & validations
│   │   ├── src/
│   │   │   ├── types.ts
│   │   │   └── validations.ts
│   │   └── package.json
│   │
│   └── database/                      # MongoDB models
│       ├── src/
│       │   └── models/
│       └── package.json
│
├── k8s/                               # Kubernetes configs
│   ├── web.yaml                       # Web deployment + service
│   ├── backend.yaml                   # Backend deployment + service
│   ├── weather-agent.yaml             # Agent deployment + service
│   ├── mongo.yaml                     # MongoDB StatefulSet
│   ├── redis.yaml                     # Redis deployment
│   └── ingress.yaml                   # Nginx Ingress routing
│
├── terraform/                         # Infrastructure (pick ONE cloud)
│   ├── main.tf                        # EKS/GKE cluster
│   ├── variables.tf
│   └── outputs.tf
│
├── .github/
│   └── workflows/
│       └── deploy.yaml                # Single simple CI/CD
│
├── docker-compose.yml                 # Local development
├── package.json                       # Root package.json
├── pnpm-workspace.yaml                # Workspace definition
├── turbo.json                         # Build config
└── README.md
```

## 📧 Email Output

```
Dear User,

Here's your daily weather update for Mumbai:

🌡️ Temperature: 31.99°C
🤔 Feels Like: 30.09°C
☁️ Conditions: smoke
💧 Humidity: 22%
💨 Wind Speed: 3.6 m/s

Have a great day!
```

## � Troubleshooting

| Issue                            | Solution                                                |
| -------------------------------- | ------------------------------------------------------- |
| OpenWeather API error            | Check `OPENWEATHER_API_KEY` in `.env`                   |
| Email send failed                | Use Gmail App Password, not regular password            |
| Redis connection failed          | Run `redis-cli ping` to verify Redis is running         |
| "Job belongs to scheduler" error | Use `/delete-all-schedules` endpoint to properly remove |

## 📝 License

Apache License 2.0

---

**Built with ❤️ using LangChain.js, LangGraph.js, and BullMQ**
