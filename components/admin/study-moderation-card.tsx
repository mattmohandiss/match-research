"use client";

import { useState, useTransition } from "react";
import { updateStudyStatus } from "@/lib/actions/studies";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StudyWithCreator } from "@/lib/types";

interface StudyModerationCardProps {
  study: StudyWithCreator;
}

export function StudyModerationCard({ study }: StudyModerationCardProps) {
  const [isPending, startTransition] = useTransition();
  const [localStatus, setLocalStatus] = useState(study.status);

  const handleApprove = () => {
    startTransition(async () => {
      const result = await updateStudyStatus(study.id, "approved");
      if (result.success) {
        setLocalStatus("approved");
      }
    });
  };

  const handleReject = () => {
    startTransition(async () => {
      const result = await updateStudyStatus(study.id, "rejected");
      if (result.success) {
        setLocalStatus("rejected");
      }
    });
  };

  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-4">
          <div className="flex-1">
            <CardTitle className="text-lg">{study.title}</CardTitle>
            <CardDescription>
              By {study.creator?.full_name} • {study.creator?.email}
            </CardDescription>
          </div>
          <Badge
            variant={
              localStatus === "approved"
                ? "default"
                : localStatus === "pending"
                ? "secondary"
                : "destructive"
            }
          >
            {localStatus.charAt(0).toUpperCase() + localStatus.slice(1)}
          </Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-3">
          {study.description}
        </p>

        <div className="flex flex-wrap gap-2 text-sm">
          {study.payment_bdt && (
            <Badge variant="outline">৳{study.payment_bdt} BDT</Badge>
          )}
          {study.duration_minutes && (
            <Badge variant="outline">{study.duration_minutes} min</Badge>
          )}
          {study.keywords?.slice(0, 3).map((keyword) => (
            <Badge key={keyword} variant="secondary">
              {keyword}
            </Badge>
          ))}
        </div>

        <div className="text-xs text-muted-foreground">
          Submitted: {new Date(study.created_at).toLocaleString()}
        </div>

        {localStatus === "pending" && (
          <div className="flex gap-2 pt-2">
            <Button
              size="sm"
              onClick={handleApprove}
              disabled={isPending}
            >
              {isPending ? "..." : "Approve"}
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={handleReject}
              disabled={isPending}
            >
              {isPending ? "..." : "Reject"}
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
