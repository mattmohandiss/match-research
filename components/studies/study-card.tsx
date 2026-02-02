import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { StudyWithCreator } from "@/lib/types";

interface StudyCardProps {
  study: StudyWithCreator;
}

export function StudyCard({ study }: StudyCardProps) {
  return (
    <Link href={`/studies/${study.id}`}>
      <Card className="h-full hover:shadow-lg transition-shadow cursor-pointer">
        <CardHeader>
          <div className="flex items-start justify-between gap-4">
            <CardTitle className="text-lg line-clamp-2">{study.title}</CardTitle>
          </div>
          <CardDescription className="line-clamp-2">
            {study.description}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-wrap gap-2 mb-4">
            {study.payment_bdt && (
              <Badge variant="secondary">
                ৳{study.payment_bdt.toLocaleString()} BDT
              </Badge>
            )}
            {study.duration_minutes && (
              <Badge variant="outline">{study.duration_minutes} min</Badge>
            )}
          </div>
          {study.keywords && study.keywords.length > 0 && (
            <div className="flex flex-wrap gap-1">
              {study.keywords.slice(0, 3).map((keyword) => (
                <span
                  key={keyword}
                  className="text-xs px-2 py-1 bg-muted rounded-full text-muted-foreground"
                >
                  {keyword}
                </span>
              ))}
              {study.keywords.length > 3 && (
                <span className="text-xs px-2 py-1 text-muted-foreground">
                  +{study.keywords.length - 3} more
                </span>
              )}
            </div>
          )}
          <div className="mt-4 pt-4 border-t text-sm text-muted-foreground">
            <p>By {study.creator?.full_name || "Anonymous"}</p>
          </div>
        </CardContent>
      </Card>
    </Link>
  );
}
