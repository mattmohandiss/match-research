import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { BuddyWithProfile } from "@/lib/types";

interface BuddyCardProps {
  buddy: BuddyWithProfile;
}

export function BuddyCard({ buddy }: BuddyCardProps) {
  const initials = buddy.profile?.full_name
    ?.split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase() || "??";

  return (
    <Card className="min-w-[300px] max-w-[350px] flex-shrink-0 hover:shadow-lg transition-shadow">
      <CardHeader className="pb-3">
        <div className="flex items-start gap-4">
          <Avatar className="w-14 h-14">
            <AvatarImage src={buddy.profile?.avatar_url || undefined} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
          <div className="flex-1 min-w-0">
            <CardTitle className="text-lg truncate">
              {buddy.profile?.full_name}
            </CardTitle>
            <CardDescription className="truncate">
              {buddy.institution}
            </CardDescription>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <p className="text-sm font-medium mb-1">Looking for</p>
          <p className="text-sm text-muted-foreground line-clamp-2">
            {buddy.looking_for}
          </p>
        </div>

        {buddy.research_interests && buddy.research_interests.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">Research Interests</p>
            <div className="flex flex-wrap gap-1">
              {buddy.research_interests.slice(0, 4).map((interest) => (
                <Badge key={interest} variant="secondary" className="text-xs">
                  {interest}
                </Badge>
              ))}
              {buddy.research_interests.length > 4 && (
                <Badge variant="outline" className="text-xs">
                  +{buddy.research_interests.length - 4}
                </Badge>
              )}
            </div>
          </div>
        )}

        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Profile
          </Button>
          <Button size="sm" className="flex-1">
            Add to Chatbox
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
