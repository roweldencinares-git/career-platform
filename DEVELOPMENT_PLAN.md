# Sage Career Platform - Development Plan

> **Project**: AI-Powered Career Development Platform
> **Approach**: Slow & Steady - Build it right, one feature at a time
> **Timeline**: 6-8 weeks to MVP
> **Date Created**: October 2, 2025

---

## 🎯 Core Philosophy

**Build Slowly, Build Right**
- One feature at a time, fully completed before moving to the next
- Test thoroughly at each step
- Document as we go
- Keep code clean and maintainable
- AI-assisted development using Claude Code

---

## 📊 Current State (Starting Point)

### ✅ What's Already Built (Foundation - 20%)

**Infrastructure**
- ✅ Next.js 15 + TypeScript setup
- ✅ Supabase PostgreSQL database (8 tables)
- ✅ Clerk authentication (multi-role support)
- ✅ Tailwind CSS styling
- ✅ Vercel deployment pipeline
- ✅ Git version control

**Database Schema** (Complete)
```
✅ clients - Job seekers
✅ coaches - Career coaches (admin/coach/employee roles)
✅ applications - Job tracking
✅ resumes - Resume versions + AI feedback
✅ interviews - Coaching sessions
✅ interview_types - Session templates
✅ coach_availability - Scheduling
✅ feedback - AI + Coach feedback
```

**UI Pages** (Shell Only - No Functionality)
```
✅ Landing page
✅ Sign-in / Sign-up
✅ /dashboard/client/home
✅ /dashboard/client/applications
✅ /dashboard/client/applications/new
✅ /dashboard/client/resumes
✅ /dashboard/client/sessions
✅ /dashboard/client/progress
```

### ❌ What Needs Building (80%)

**4 User Dashboards**
- ❌ Client dashboard (functional APIs)
- ❌ Coach dashboard (entire system)
- ❌ Employee dashboard (entire system)
- ❌ Admin panel (entire system)

**Core Features**
- ❌ Application tracking (CRUD)
- ❌ Resume upload & AI analysis
- ❌ Session booking system
- ❌ AI integrations (Claude API)
- ❌ Google Calendar sync
- ❌ Email notifications

---

## 🚀 Development Roadmap (Screen-by-Screen)

### **WEEK 1-2: CLIENT CORE FEATURES**
*Goal: Make the platform usable for job seekers*

#### Day 1-3: Application Tracking System
**Screen 1: Applications List** (`/dashboard/client/applications`)
- [ ] Build `GET /api/applications` endpoint
  - Fetch user's applications from database
  - Return sorted by created_at DESC
  - Include company, title, status, date
- [ ] Connect UI to API
- [ ] Add loading states
- [ ] Add empty state (no applications yet)

**Screen 2: Add Application** (`/dashboard/client/applications/new`)
- [ ] Build `POST /api/applications` endpoint
  - Validate input (company, title, url, date)
  - Save to database with user ID
  - Return created application
- [ ] Form validation (Zod schema)
- [ ] Success/error messages
- [ ] Redirect to applications list on success

**Screen 3: Edit Application** (`/dashboard/client/applications/[id]`)
- [ ] Create application detail page
- [ ] Build `PUT /api/applications/[id]` endpoint
  - Update status, notes, dates
  - Verify user owns the application
- [ ] Build `DELETE /api/applications/[id]` endpoint
- [ ] Status dropdown (applied → interviewing → offer → accepted/rejected)
- [ ] Notes textarea
- [ ] Delete confirmation modal

**Testing Checkpoint**: Client can add, view, edit, delete applications

---

#### Day 4-6: Resume Management System
**Screen 4: Resumes List** (`/dashboard/client/resumes`)
- [ ] Set up Supabase Storage bucket (resumes)
- [ ] Build `GET /api/resumes` endpoint
  - Fetch user's resumes
  - Include AI feedback status
- [ ] Upload button → file picker
- [ ] Display resume versions with dates

**Screen 5: Upload Resume** (Modal/Inline)
- [ ] Build `POST /api/resumes/upload` endpoint
  - Accept PDF/DOCX files
  - Upload to Supabase Storage
  - Save metadata to database
  - Return file URL
- [ ] File validation (type, size)
- [ ] Progress indicator
- [ ] Success notification

**Screen 6: Resume AI Feedback** (`/dashboard/client/resumes/[id]/feedback`)
- [ ] Create feedback view page
- [ ] Build `POST /api/resumes/[id]/analyze` endpoint
  - Send resume text to Claude API
  - Store AI response in database (JSONB)
  - Update ai_feedback_status
- [ ] Claude API integration
  - Extract text from PDF/DOCX
  - Send prompt for resume analysis
  - Parse and display feedback
- [ ] Feedback display UI
  - Strengths section
  - Improvements section
  - Action items
- [ ] Request Analysis button

**Testing Checkpoint**: Client can upload resumes and get AI feedback

---

#### Day 7-10: Session Booking System
**Screen 7: Sessions List** (`/dashboard/client/sessions`)
- [ ] Build `GET /api/sessions` endpoint
  - Fetch user's upcoming sessions
  - Include coach info, type, time
- [ ] Display sessions by date
- [ ] Join meeting button (when available)
- [ ] Cancel session button

**Screen 8: Book Session** (`/dashboard/client/sessions/book`)
- [ ] Create booking page
- [ ] Build `GET /api/coaches/available` endpoint
  - Fetch coaches list
  - Check availability by day/time
- [ ] Build `POST /api/sessions/book` endpoint
  - Check coach availability
  - Create interview record
  - Create Google Calendar event
  - Send confirmation email
- [ ] Coach selection
- [ ] Session type selection (from interview_types)
- [ ] Date/time picker (available slots only)
- [ ] Confirmation step

**Screen 9: Session Detail** (`/dashboard/client/sessions/[id]`)
- [ ] Create session detail page
- [ ] Display session info (coach, type, time)
- [ ] Meeting link (Zoom/Google Meet)
- [ ] Pre-session notes
- [ ] Cancel/Reschedule options

**Integrations**
- [ ] Google Calendar API setup
  - OAuth flow for coaches
  - Create/update/delete events
- [ ] Email service setup (SendGrid or Resend)
  - Booking confirmation template
  - Session reminder template
  - Cancellation template

**Testing Checkpoint**: Client can book, view, manage coaching sessions

---

### **WEEK 3: COACH DASHBOARD**
*Goal: Enable coaches to manage their clients*

#### Day 11-12: Coach Home Dashboard
**Screen 10: Coach Overview** (`/dashboard/coach`)
- [ ] Create coach layout component
- [ ] Build `GET /api/coach/stats` endpoint
  - Total clients count
  - Sessions this week
  - Pending feedback count
- [ ] Stats cards display
- [ ] Upcoming sessions widget (next 3)
- [ ] Recent clients widget

#### Day 13-14: Client Management
**Screen 11: Coach's Clients List** (`/dashboard/coach/clients`)
- [ ] Build `GET /api/coach/clients` endpoint
  - Fetch clients assigned to coach
  - Include application stats
- [ ] Client cards/table view
- [ ] Search/filter functionality
- [ ] Client status indicators

**Screen 12: Client Profile View** (`/dashboard/coach/clients/[id]`)
- [ ] Create client profile page
- [ ] Display client info
- [ ] Applications summary
- [ ] Session history
- [ ] Progress tracking
- [ ] Notes section (coach-only)

#### Day 15-17: Sessions & Feedback
**Screen 13: Coach Sessions** (`/dashboard/coach/sessions`)
- [ ] Build `GET /api/coach/sessions` endpoint
  - Fetch coach's sessions
  - Filter by status (upcoming/completed)
- [ ] Calendar view option
- [ ] Session cards with client info
- [ ] Add notes button

**Screen 14: Session Notes** (`/dashboard/coach/sessions/[id]`)
- [ ] Session detail page
- [ ] Notes editor (during/after session)
- [ ] Action items for client
- [ ] Mark as completed

**Screen 15: Provide Feedback** (`/dashboard/coach/feedback`)
- [ ] Feedback dashboard
- [ ] Pending feedback list
- [ ] Build `POST /api/feedback` endpoint
  - Save feedback to database
  - Link to client/resume/interview
  - Notify client
- [ ] Feedback form
  - Type: resume/interview/application
  - Rich text editor
  - Rating/scores
- [ ] Submit & notify client

**Screen 16: Coach Availability** (`/dashboard/coach/availability`)
- [ ] Weekly schedule grid
- [ ] Build `GET /api/coach/availability` endpoint
- [ ] Build `PUT /api/coach/availability` endpoint
  - Update weekly schedule
  - Set available hours per day
- [ ] Time slot toggles
- [ ] Timezone selector
- [ ] Save schedule

**Testing Checkpoint**: Coach can manage clients, sessions, and provide feedback

---

### **WEEK 4: EMPLOYEE & ADMIN DASHBOARDS**
*Goal: Platform management and operations*

#### Day 18-20: Employee Dashboard
**Screen 17: Employee Home** (`/dashboard/employee`)
- [ ] Create employee layout
- [ ] Build `GET /api/employee/stats` endpoint
  - Assigned clients
  - Pending tasks
  - Reports generated
- [ ] Task dashboard
- [ ] Quick actions

**Screen 18: Employee Clients** (`/dashboard/employee/clients`)
- [ ] Assigned clients list
- [ ] Build `GET /api/employee/clients` endpoint
- [ ] Client assignment logic
- [ ] Status updates

**Screen 19: Employee Tasks** (`/dashboard/employee/tasks`)
- [ ] Task management interface
- [ ] Task creation/assignment
- [ ] Task tracking
- [ ] Reports generation

#### Day 21-24: Admin Panel
**Screen 20: Admin Overview** (`/dashboard/admin`)
- [ ] Create admin layout
- [ ] Build `GET /api/admin/stats` endpoint
  - Total users (all types)
  - Platform activity metrics
  - Revenue/subscriptions (future)
- [ ] Platform health dashboard
- [ ] Activity logs

**Screen 21: User Management** (`/dashboard/admin/users`)
- [ ] Tabs for each user type (clients/coaches/employees)
- [ ] Build `GET /api/admin/users` endpoint
  - List all users by type
  - Search & filters
- [ ] Build `POST /api/admin/users` endpoint (create user)
- [ ] Build `PUT /api/admin/users/[id]` endpoint (update)
- [ ] Build `DELETE /api/admin/users/[id]` endpoint (deactivate)
- [ ] User cards/table
- [ ] Role assignment
- [ ] Activate/deactivate toggle

**Screen 22: Platform Analytics** (`/dashboard/admin/analytics`)
- [ ] Build analytics endpoint
- [ ] Charts & graphs
  - User growth
  - Session volume
  - Application tracking trends
- [ ] Export reports (CSV/PDF)

**Screen 23: Platform Settings** (`/dashboard/admin/settings`)
- [ ] System configurations
- [ ] Email templates editor
- [ ] Integration settings (API keys)
- [ ] Feature flags

**Testing Checkpoint**: Employee & Admin can manage platform operations

---

### **WEEK 5: AI & AUTOMATION**
*Goal: AI-powered intelligence and automation*

#### Day 25-26: AI Job Matching
**Feature: AI Job Suggestions**
- [ ] Build `POST /api/ai/job-match` endpoint
  - Analyze client's resume
  - Match with job descriptions
  - Return compatibility score
- [ ] Job suggestions widget (client dashboard)
- [ ] Match explanation (why it's a good fit)

#### Day 27-28: AI Interview Prep
**Feature: AI Interview Question Generator**
- [ ] Build `POST /api/ai/interview-prep` endpoint
  - Input: job description + resume
  - Output: practice questions
- [ ] Interview prep page
- [ ] Question generator
- [ ] Answer evaluation (AI feedback)

#### Day 29-30: Automation Workflows
**Feature: Automated Reminders**
- [ ] Build cron job system
  - Session reminders (1 day before, 1 hour before)
  - Follow-up prompts (after applications)
  - Inactive client check-ins
- [ ] Email automation
- [ ] In-app notifications

**Feature: Application Insights**
- [ ] Build `GET /api/ai/insights` endpoint
  - Analyze application patterns
  - Success rate analysis
  - Recommendations
- [ ] Insights dashboard (client)

**Testing Checkpoint**: AI features working and providing value

---

### **WEEK 6: POLISH & LAUNCH**
*Goal: Production-ready platform*

#### Day 31-33: Quality Assurance
- [ ] **Mobile Responsiveness**
  - Test all screens on mobile devices
  - Fix layout issues
  - Optimize touch interactions

- [ ] **Error Handling**
  - Add error boundaries
  - User-friendly error messages
  - Logging system (Sentry)

- [ ] **Performance Optimization**
  - Image optimization
  - Code splitting
  - Lazy loading
  - Bundle size reduction

- [ ] **Security Audit**
  - API route protection
  - Data validation
  - SQL injection prevention
  - XSS protection

#### Day 34-36: Testing & Bug Fixes
- [ ] **User Acceptance Testing**
  - Test all user flows (4 personas)
  - Create test accounts
  - Document bugs

- [ ] **Bug Fixes**
  - Priority bugs
  - Edge cases
  - Browser compatibility

- [ ] **Data Validation**
  - Form validation (all forms)
  - API input validation (Zod)
  - Database constraints

#### Day 37-40: Documentation & Deployment
- [ ] **Developer Documentation**
  - API documentation
  - Database schema docs
  - Setup instructions
  - Architecture overview

- [ ] **User Documentation**
  - User guides (per role)
  - Video tutorials (optional)
  - FAQ section

- [ ] **Production Deployment**
  - Environment variables
  - Database migrations
  - Monitoring setup
  - Backup strategy

- [ ] **Launch Checklist**
  - SSL certificate
  - Domain configuration
  - Analytics setup (Google Analytics/PostHog)
  - Error monitoring (Sentry)
  - Uptime monitoring

**Final Testing Checkpoint**: Production-ready platform

---

## 🏗️ Development Best Practices

### Code Standards
- **TypeScript strict mode** - No `any` types
- **ESLint + Prettier** - Auto-format on save
- **Component structure** - Atomic design pattern
- **API routes** - RESTful conventions
- **Error handling** - Try-catch blocks, user-friendly messages
- **Comments** - Document complex logic

### Git Workflow
```bash
# Feature branch naming
feat/client-applications-crud
feat/resume-upload
feat/coach-dashboard

# Commit message format
feat(applications): add create application API endpoint
fix(resumes): resolve upload file size limit issue
docs(readme): update setup instructions
```

### Testing Strategy (Optional but Recommended)
- **Unit tests** - Critical business logic
- **Integration tests** - API endpoints
- **E2E tests** - Key user flows (Playwright)

### AI Development Approach
- **Claude Code** for rapid development
- **Code review** before committing
- **Understand AI-generated code** - Don't blindly accept
- **Refactor** - Improve AI suggestions

---

## 📦 Technology Stack

### Frontend
- **Next.js 15** - App Router, Server Components
- **TypeScript** - Strict type safety
- **Tailwind CSS** - Utility-first styling
- **Shadcn/UI** - Component library (optional)
- **React Hook Form** - Form management
- **Zod** - Schema validation

### Backend
- **Next.js API Routes** - Serverless functions
- **Supabase** - PostgreSQL database + Storage
- **Clerk** - Authentication (multi-role)

### Integrations
- **Claude API** - AI resume analysis & insights
- **Google Calendar API** - Session scheduling
- **SendGrid/Resend** - Email notifications
- **Vercel** - Hosting & deployment

### Development Tools
- **Claude Code** - AI coding assistant
- **Git/GitHub** - Version control
- **Vercel CLI** - Preview deployments
- **Supabase CLI** - Database migrations

---

## 📈 Success Metrics (MVP)

### Feature Completion
- ✅ All 4 user dashboards functional
- ✅ Core features working (applications, resumes, sessions)
- ✅ AI features integrated (resume feedback, job matching)
- ✅ Automation workflows active

### Technical Metrics
- ⏱️ Page load time < 2 seconds
- 📱 Mobile responsive (100% screens)
- 🔒 Zero security vulnerabilities
- 🐛 < 5 critical bugs at launch

### User Experience
- 👤 Complete onboarding flow (all 4 user types)
- 📧 Email notifications working
- 🔔 In-app notifications
- ℹ️ Help documentation available

---

## 🚀 Next Steps

### Immediate Actions (Today)
1. **Start Sprint 1.1**: Application Tracking CRUD
   - Begin with `POST /api/applications` endpoint
   - Test with Postman/Thunder Client
   - Connect to UI

2. **Set up Development Environment**
   - Ensure Supabase is running
   - Verify Clerk authentication
   - Test database connection

3. **Create Feature Branch**
   ```bash
   git checkout -b feat/client-applications-crud
   ```

### Tomorrow
- Complete Application CRUD APIs
- Test thoroughly
- Move to Resume Upload system

---

## 📝 Notes

- **Build Slowly**: Quality over speed
- **One Feature at a Time**: Complete before moving forward
- **Test Everything**: Don't assume it works
- **Document as You Go**: Future you will thank you
- **Ask Questions**: If something is unclear, clarify first
- **Use AI Wisely**: Review and understand all generated code

---

**Last Updated**: October 2, 2025
**Current Phase**: Planning Complete ✅
**Next Phase**: Week 1 - Client Core Features 🚀
