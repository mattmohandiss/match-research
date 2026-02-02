"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { createStudy } from "@/lib/actions/studies";
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
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { GENDER_OPTIONS, DIVISIONS } from "@/lib/types";

export function StudyForm() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [keywords, setKeywords] = useState<string[]>([]);
  const [keywordInput, setKeywordInput] = useState("");
  const [geography, setGeography] = useState<string[]>([]);
  const [participantGender, setParticipantGender] = useState("");

  const addKeyword = () => {
    if (keywordInput.trim() && !keywords.includes(keywordInput.trim())) {
      setKeywords([...keywords, keywordInput.trim()]);
      setKeywordInput("");
    }
  };

  const removeKeyword = (keyword: string) => {
    setKeywords(keywords.filter((k) => k !== keyword));
  };

  const toggleGeography = (division: string) => {
    if (geography.includes(division)) {
      setGeography(geography.filter((g) => g !== division));
    } else {
      setGeography([...geography, division]);
    }
  };

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const result = await createStudy({
      title: formData.get("title") as string,
      description: formData.get("description") as string,
      keywords,
      payment_bdt: formData.get("payment_bdt")
        ? parseInt(formData.get("payment_bdt") as string)
        : undefined,
      duration_minutes: formData.get("duration_minutes")
        ? parseInt(formData.get("duration_minutes") as string)
        : undefined,
      participant_age_min: formData.get("participant_age_min")
        ? parseInt(formData.get("participant_age_min") as string)
        : undefined,
      participant_age_max: formData.get("participant_age_max")
        ? parseInt(formData.get("participant_age_max") as string)
        : undefined,
      participant_gender: participantGender || undefined,
      participant_geography: geography.length > 0 ? geography : undefined,
    });

    if (result?.error) {
      setError(result.error);
      setIsLoading(false);
    } else {
      router.push("/account?created=true");
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {error && (
        <div className="p-3 text-sm text-destructive bg-destructive/10 rounded-md">
          {error}
        </div>
      )}

      {/* Basic Information */}
      <Card>
        <CardHeader>
          <CardTitle>Basic Information</CardTitle>
          <CardDescription>
            Provide the essential details about your research study.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Research Title *</Label>
            <Input
              id="title"
              name="title"
              placeholder="Enter your research study title"
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              name="description"
              placeholder="Describe your research study, objectives, and what participants will do..."
              rows={5}
              required
              disabled={isLoading}
            />
          </div>

          <div className="space-y-2">
            <Label>Keywords</Label>
            <div className="flex gap-2">
              <Input
                value={keywordInput}
                onChange={(e) => setKeywordInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    addKeyword();
                  }
                }}
                placeholder="Type a keyword and press Enter"
                disabled={isLoading}
              />
              <Button type="button" variant="outline" onClick={addKeyword}>
                Add
              </Button>
            </div>
            {keywords.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2">
                {keywords.map((keyword) => (
                  <span
                    key={keyword}
                    className="inline-flex items-center gap-1 px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
                  >
                    {keyword}
                    <button
                      type="button"
                      onClick={() => removeKeyword(keyword)}
                      className="hover:text-destructive"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Compensation & Duration */}
      <Card>
        <CardHeader>
          <CardTitle>Compensation & Duration</CardTitle>
          <CardDescription>
            Set the payment and time commitment for participants.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payment_bdt">Payment Amount (BDT)</Label>
              <Input
                id="payment_bdt"
                name="payment_bdt"
                type="number"
                min={0}
                placeholder="e.g., 500"
                disabled={isLoading}
              />
              <p className="text-xs text-muted-foreground">
                Leave empty if unpaid study
              </p>
            </div>

            <div className="space-y-2">
              <Label htmlFor="duration_minutes">Duration (minutes)</Label>
              <Input
                id="duration_minutes"
                name="duration_minutes"
                type="number"
                min={1}
                placeholder="e.g., 30"
                disabled={isLoading}
              />
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Participant Criteria (Optional) */}
      <Card>
        <CardHeader>
          <CardTitle>Participant Criteria (Optional)</CardTitle>
          <CardDescription>
            Define who can participate in your study. Leave empty for no restrictions.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="participant_age_min">Minimum Age</Label>
              <Input
                id="participant_age_min"
                name="participant_age_min"
                type="number"
                min={18}
                max={120}
                placeholder="e.g., 18"
                disabled={isLoading}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="participant_age_max">Maximum Age</Label>
              <Input
                id="participant_age_max"
                name="participant_age_max"
                type="number"
                min={18}
                max={120}
                placeholder="e.g., 65"
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Preferred Gender</Label>
            <Select value={participantGender} onValueChange={setParticipantGender}>
              <SelectTrigger>
                <SelectValue placeholder="Any gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="any">Any gender</SelectItem>
                {GENDER_OPTIONS.map((option) => (
                  <SelectItem key={option} value={option}>
                    {option}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Geographic Regions</Label>
            <p className="text-xs text-muted-foreground mb-2">
              Select the divisions where participants should be located
            </p>
            <div className="flex flex-wrap gap-2">
              {DIVISIONS.map((division) => (
                <button
                  key={division}
                  type="button"
                  onClick={() => toggleGeography(division)}
                  className={`px-3 py-1 rounded-full text-sm border transition-colors ${
                    geography.includes(division)
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background border-input hover:bg-muted"
                  }`}
                >
                  {division}
                </button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Submit */}
      <div className="flex gap-4">
        <Button type="submit" size="lg" disabled={isLoading}>
          {isLoading ? "Submitting..." : "Submit for Review"}
        </Button>
        <p className="text-sm text-muted-foreground self-center">
          Your study will be reviewed by an admin before being published.
        </p>
      </div>
    </form>
  );
}
