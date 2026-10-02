import { z } from "zod";

export const emailSchema = z.string().email("Please enter a valid email address.");
export const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters.")
  .max(128, "Password is too long.");

export const registerSchema = z.object({
  name: z.string().trim().min(2, "Please enter your full name."),
  email: emailSchema,
  phone: z.string().trim().min(7, "Please enter a valid phone number.").max(20).optional().or(z.literal("")),
  password: passwordSchema,
  role: z.enum(["STUDENT", "EMPLOYER", "INSTRUCTOR"]),
});

export const loginSchema = z.object({
  email: emailSchema,
  password: z.string().min(1, "Please enter your password."),
});

export const studentProfileSchema = z.object({
  headline: z.string().max(120).optional().or(z.literal("")),
  bio: z.string().max(2000).optional().or(z.literal("")),
  locationId: z.string().optional().or(z.literal("")),
  educationLevel: z.string().max(100).optional().or(z.literal("")),
  college: z.string().max(200).optional().or(z.literal("")),
  languages: z.array(z.string()).default([]),
  availability: z.record(z.string(), z.array(z.object({ start: z.string(), end: z.string() }))).optional(),
  preferredJobTypes: z.array(z.enum(["PART_TIME", "FULL_TIME", "INTERNSHIP", "TEMPORARY", "CONTRACT"])).default([]),
  preferredSchedules: z.array(z.enum(["MORNING", "AFTERNOON", "EVENING", "WEEKEND"])).default([]),
  preferredArrangement: z.enum(["ON_SITE", "REMOTE", "HYBRID"]).optional().or(z.literal("")),
  expectedSalaryMin: z.number().int().positive().optional(),
  expectedSalaryMax: z.number().int().positive().optional(),
  salaryType: z.enum(["HOURLY", "DAILY", "WEEKLY", "MONTHLY", "NEGOTIABLE"]).optional().or(z.literal("")),
  skills: z.array(z.object({ name: z.string().min(1).max(60), level: z.string().optional() })).default([]),
  portfolioLinks: z.array(z.object({ label: z.string().max(60), url: z.string().url("Please enter a valid URL.") })).default([]),
});

export const companyProfileSchema = z.object({
  name: z.string().trim().min(2, "Company name is required.").max(120),
  industry: z.string().max(100).optional().or(z.literal("")),
  description: z.string().max(3000).optional().or(z.literal("")),
  locationId: z.string().optional().or(z.literal("")),
  website: z.string().url("Please enter a valid URL.").optional().or(z.literal("")),
  size: z.string().max(50).optional().or(z.literal("")),
  logoUrl: z.string().max(500).optional().or(z.literal("")),
});

export const jobPostSchema = z.object({
  title: z.string().trim().min(5, "Job title must be at least 5 characters.").max(120),
  description: z.string().trim().min(50, "Description must be at least 50 characters."),
  responsibilities: z.string().max(3000).optional().or(z.literal("")),
  requirements: z.string().max(3000).optional().or(z.literal("")),
  benefits: z.string().max(2000).optional().or(z.literal("")),
  categoryId: z.string().optional().or(z.literal("")),
  jobType: z.enum(["PART_TIME", "FULL_TIME", "INTERNSHIP", "TEMPORARY", "CONTRACT"]),
  workArrangement: z.enum(["ON_SITE", "REMOTE", "HYBRID"]),
  schedules: z.array(z.enum(["MORNING", "AFTERNOON", "EVENING", "WEEKEND"])).default([]),
  locationId: z.string().optional().or(z.literal("")),
  salaryType: z.enum(["HOURLY", "DAILY", "WEEKLY", "MONTHLY", "NEGOTIABLE"]),
  salaryMin: z.number().int().nonnegative("Salary must be a valid number.").optional(),
  salaryMax: z.number().int().nonnegative("Salary must be a valid number.").optional(),
  openings: z.number().int().min(1).max(500).default(1),
  deadline: z.string().optional().or(z.literal("")),
  skills: z.array(z.string().min(1).max(60)).default([]),
  questions: z.array(z.string().max(300)).max(5).default([]),
});

export const applicationSchema = z.object({
  coverMessage: z.string().max(2000).optional().or(z.literal("")),
  answers: z.record(z.string(), z.string().max(2000)).optional(),
  availabilityNote: z.string().max(500).optional().or(z.literal("")),
});

export const reportSchema = z.object({
  targetType: z.enum(["JOB", "COMPANY", "USER", "MESSAGE"]),
  targetId: z.string().min(1),
  reason: z.enum(["SCAM", "FAKE_JOB", "MISLEADING_SALARY", "HARASSMENT", "SPAM", "UNSAFE_REQUEST", "OTHER"]),
  details: z.string().max(2000).optional().or(z.literal("")),
});

export const interviewProposeSchema = z.object({
  dateTime: z.string().min(1, "Please choose a date and time."),
  location: z.string().max(300).optional().or(z.literal("")),
  meetingLink: z.string().url("Please enter a valid meeting URL.").optional().or(z.literal("")),
  notes: z.string().max(1000).optional().or(z.literal("")),
});

export type RegisterInput = z.infer<typeof registerSchema>;
