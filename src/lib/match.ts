import { db } from "./db";

// Rule-based job matching. Scores 0–100 across weighted signals.
// Never claims a "perfect" match — labels are Strong / Good / Possible.

export interface MatchResult {
  jobId: string;
  score: number;
  label: "Strong match" | "Good match" | "Possible match";
  reasons: string[];
}

export async function matchJobsForStudent(studentId: string, limit = 10): Promise<MatchResult[]> {
  const profile = await db.studentProfile.findUnique({
    where: { id: studentId },
    include: { skills: { include: { skill: true } }, location: true },
  });
  if (!profile) return [];

  const jobs = await db.job.findMany({
    where: { status: "ACTIVE" },
    take: 200,
    orderBy: { publishedAt: "desc" },
    include: { skills: { include: { skill: true } }, location: true, category: true },
  });

  const profileSkillNames = new Set(profile.skills.map((s) => s.skill.name.toLowerCase()));
  const results: MatchResult[] = [];

  for (const job of jobs) {
    let score = 0;
    const reasons: string[] = [];

    // Location (25)
    if (profile.locationId && job.locationId === profile.locationId) {
      score += 25; reasons.push("Same location");
    } else if (job.workArrangement === "REMOTE" && profile.preferredArrangement === "REMOTE") {
      score += 20; reasons.push("Remote-friendly");
    } else if (job.workArrangement === "REMOTE") {
      score += 10; reasons.push("Remote option");
    }

    // Job type (20)
    if (profile.preferredJobTypes.includes(job.jobType)) {
      score += 20; reasons.push("Matches preferred job type");
    }

    // Schedule overlap (20)
    const overlap = job.schedules.filter((s) => profile.preferredSchedules.includes(s));
    if (overlap.length > 0) {
      score += Math.min(20, overlap.length * 10);
      reasons.push(`Fits your ${overlap.length > 1 ? "schedules" : "schedule"}`);
    }

    // Skills (20)
    if (job.skills.length > 0 && profileSkillNames.size > 0) {
      const matched = job.skills.filter((js) => profileSkillNames.has(js.skill.name.toLowerCase()));
      if (matched.length > 0) {
        score += Math.min(20, matched.length * 7);
        reasons.push(`${matched.length} matching skill${matched.length > 1 ? "s" : ""}`);
      }
    }

    // Work arrangement (10)
    if (profile.preferredArrangement && job.workArrangement === profile.preferredArrangement) {
      score += 10; reasons.push("Preferred work arrangement");
    }

    // Salary expectation (5)
    if (profile.expectedSalaryMin && job.salaryMax && job.salaryType === profile.salaryType) {
      if (job.salaryMax >= profile.expectedSalaryMin) { score += 5; reasons.push("Meets salary expectation"); }
    }

    // Freshness boost (up to 5)
    if (job.publishedAt) {
      const daysOld = (Date.now() - job.publishedAt.getTime()) / 86400000;
      if (daysOld < 7) score += 5;
      else if (daysOld < 30) score += 2;
    }

    if (score >= 35) {
      results.push({
        jobId: job.id,
        score: Math.min(100, score),
        label: score >= 70 ? "Strong match" : score >= 50 ? "Good match" : "Possible match",
        reasons: reasons.slice(0, 3),
      });
    }
  }

  return results.sort((a, b) => b.score - a.score).slice(0, limit);
}

export function profileCompletion(profile: {
  headline?: string | null; bio?: string | null; locationId?: string | null;
  educationLevel?: string | null; college?: string | null; photoUrl?: string | null;
  cvFileId?: string | null;
}): number {
  const checks = [
    !!profile.headline, !!profile.bio, !!profile.locationId,
    !!profile.educationLevel, !!profile.college, !!profile.photoUrl, !!profile.cvFileId,
  ];
  return Math.round((checks.filter(Boolean).length / checks.length) * 100);
}
