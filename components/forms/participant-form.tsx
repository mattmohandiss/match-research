"use client";

import { useState } from "react";
import { signupParticipant } from "@/lib/actions/auth";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  EDUCATION_LEVELS,
  GENDER_OPTIONS,
  MARITAL_STATUS_OPTIONS,
  DIVISIONS,
} from "@/lib/types";

export function ParticipantForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [gender, setGender] = useState("");
  const [division, setDivision] = useState("");
  const [maritalStatus, setMaritalStatus] = useState("");
  const [educationDegree, setEducationDegree] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsLoading(true);
    setError(null);

    const formData = new FormData(e.currentTarget);

    const result = await signupParticipant({
      email: formData.get("email") as string,
      password: formData.get("password") as string,
      full_name: formData.get("full_name") as string,
      nid_number: formData.get("nid_number") as string,
      age: parseInt(formData.get("age") as string),
      gender: gender,
      division: division,
      district: formData.get("district") as string,
      upazilla: formData.get("upazilla") as string,
      post_office: formData.get("post_office") as string,
      occupation: formData.get("occupation") as string,
      marital_status: maritalStatus,
      number_of_children: parseInt(formData.get("number_of_children") as string) || 0,
      education_degree: educationDegree,
      education_subject: formData.get("education_subject") as string,
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

      <div className="p-4 bg-muted rounded-lg mb-6">
        <p className="text-sm text-muted-foreground">
          <strong>Privacy Note:</strong> Your participant profile is completely private. 
          Only you can see this information. It will be used to match you with relevant 
          studies based on demographic criteria.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="full_name">Full Name *</Label>
          <Input
            id="full_name"
            name="full_name"
            placeholder="Your full name"
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
            placeholder="you@example.com"
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
          <Label htmlFor="nid_number">NID Number *</Label>
          <Input
            id="nid_number"
            name="nid_number"
            placeholder="National ID Number"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="space-y-2">
          <Label htmlFor="age">Age *</Label>
          <Input
            id="age"
            name="age"
            type="number"
            min={18}
            max={120}
            placeholder="25"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="gender">Gender *</Label>
          <Select value={gender} onValueChange={setGender} required>
            <SelectTrigger>
              <SelectValue placeholder="Select gender" />
            </SelectTrigger>
            <SelectContent>
              {GENDER_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="marital_status">Marital Status *</Label>
          <Select value={maritalStatus} onValueChange={setMaritalStatus} required>
            <SelectTrigger>
              <SelectValue placeholder="Select status" />
            </SelectTrigger>
            <SelectContent>
              {MARITAL_STATUS_OPTIONS.map((option) => (
                <SelectItem key={option} value={option}>
                  {option}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="division">Division *</Label>
          <Select value={division} onValueChange={setDivision} required>
            <SelectTrigger>
              <SelectValue placeholder="Select division" />
            </SelectTrigger>
            <SelectContent>
              {DIVISIONS.map((div) => (
                <SelectItem key={div} value={div}>
                  {div}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="district">District *</Label>
          <Input
            id="district"
            name="district"
            placeholder="Your district"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="upazilla">Upazilla *</Label>
          <Input
            id="upazilla"
            name="upazilla"
            placeholder="Your upazilla"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="post_office">Post Office *</Label>
          <Input
            id="post_office"
            name="post_office"
            placeholder="Your post office"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="occupation">Occupation *</Label>
          <Input
            id="occupation"
            name="occupation"
            placeholder="Your occupation"
            required
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="number_of_children">Number of Children</Label>
          <Input
            id="number_of_children"
            name="number_of_children"
            type="number"
            min={0}
            placeholder="0"
            defaultValue={0}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="education_degree">Education Degree *</Label>
          <Select value={educationDegree} onValueChange={setEducationDegree} required>
            <SelectTrigger>
              <SelectValue placeholder="Select degree" />
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

        <div className="space-y-2">
          <Label htmlFor="education_subject">Education Subject *</Label>
          <Input
            id="education_subject"
            name="education_subject"
            placeholder="Your field of study"
            required
            disabled={isLoading}
          />
        </div>
      </div>

      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Creating account..." : "Create Participant Account"}
      </Button>
    </form>
  );
}
