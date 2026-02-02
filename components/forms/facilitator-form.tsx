"use client";

import { useState } from "react";
import { signupFacilitator } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { EDUCATION_LEVELS } from "@/lib/types";

export function FacilitatorForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [interests, setInterests] = useState<string[]>([]);
  const [interestInput, setInterestInput] = useState("");
  const [education, setEducation] = useState("");

  const addInterest = () => {
    if (interestInput.trim() && !interests.includes(interestInput.trim())) {
      setInterests([...interests, interestInput.trim()]);
      setInterestInput("");
    }
  };

  const removeInterest = (interest: string) => {
    setInterests(interests.filter((i) => i !== interest));
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const result = await signupFacilitator({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      full_name: formData.get("full_name") as string,
      education: education,
      discipline: formData.get("discipline") as string,
      institution: formData.get("institution") as string,
      mobile: formData.get("mobile") as string,
      research_profile_url: formData.get("research_profile_url") as string,
      research_interests: interests,
    });

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
          {error}
        </div>
      )}

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            name="full_name"
            placeholder="Dr. Jane Smith"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            name="email"
            type="email"
            placeholder="jane@university.edu"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="password">Password *</Label>
          <Input
            id="password"
            name="password"
            type="password"
            placeholder="••••••••"
            minLength={6}
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="education">Education Level *</Label>
          <Select value={education} onValueChange={setEducation} required>
            <SelectTrigger>
              <SelectValue placeholder="Select education level" />
            </SelectTrigger>
            <SelectContent>
              {EDUCATION_LEVELS.map((level) => (
                <SelectItem key={level} value={level}>
                  {level}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="discipline">Discipline *</Label>
          <Input
            id="discipline"
            name="discipline"
            placeholder="e.g., Computer Science, Psychology"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="institution">Institution *</Label>
          <Input
            id="institution"
            name="institution"
            placeholder="University name"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile (Optional)</Label>
          <Input
            id="mobile"
            name="mobile"
            type="tel"
            placeholder="+880 1XXX-XXXXXX"
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="research_profile_url">Research Profile URL (Optional)</Label>
          <Input
            id="research_profile_url"
            name="research_profile_url"
            type="url"
            placeholder="https://scholar.google.com/..."
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label>Research Interests</Label>
        <div className="flex gap-2">
          <Input
            value={interestInput}
            onChange={(e) => setInterestInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                e.preventDefault();
                addInterest();
              }
            }}
            placeholder="Type an interest and press Enter"
            disabled={isLoading}
          />
          <Button type="button" variant="outline" onClick={addInterest}>
            Add
          </Button>
        </div>
        {interests.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-2">
            {interests.map((interest) => (
              <span
                key={interest}
                className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
              >
                {interest}
                <button
                  type="button"
                  onClick={() => removeInterest(interest)}
                  className="hover:text-destructive"
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        )}
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Facilitator Account"}
      </Button>
    </form>
  );
}
