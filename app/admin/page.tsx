import { getAllStudies } from "@/lib/actions/studies";
import { getUserStats } from "@/lib/actions/admin";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { StudyModerationCard } from "@/components/admin/study-moderation-card";

export default async function AdminPage() {
  const studies = await getAllStudies();
  const stats = await getUserStats();

  const pendingStudies = studies.filter((s) => s.status === "pending");
  const approvedStudies = studies.filter((s) => s.status === "approved");
  const rejectedStudies = studies.filter((s) => s.status === "rejected");

  return (
    <div className="container py-8">
      {/* Stats Overview */}
      <div className="grid md:grid-cols-4 gap-4 mb-8">
        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Total Users</CardDescription>
            <CardTitle className="text-3xl">{stats?.users.total || 0}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">
              {stats?.users.facilitators || 0} facilitators •{" "}
              {stats?.users.buddies || 0} buddies •{" "}
              {stats?.users.participants || 0} participants
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Pending Studies</CardDescription>
            <CardTitle className="text-3xl text-yellow-600">
              {stats?.studies.pending || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Awaiting review</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Approved Studies</CardDescription>
            <CardTitle className="text-3xl text-green-600">
              {stats?.studies.approved || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Published & active</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="pb-2">
            <CardDescription>Rejected Studies</CardDescription>
            <CardTitle className="text-3xl text-red-600">
              {stats?.studies.rejected || 0}
            </CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-xs text-muted-foreground">Did not meet criteria</p>
          </CardContent>
        </Card>
      </div>

      {/* Study Moderation */}
      <Tabs defaultValue="pending" className="space-y-4">
        <TabsList>
          <TabsTrigger value="pending">
            Pending ({pendingStudies.length})
          </TabsTrigger>
          <TabsTrigger value="approved">
            Approved ({approvedStudies.length})
          </TabsTrigger>
          <TabsTrigger value="rejected">
            Rejected ({rejectedStudies.length})
          </TabsTrigger>
          <TabsTrigger value="all">All ({studies.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="pending" className="space-y-4">
          {pendingStudies.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No pending studies to review
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {pendingStudies.map((study) => (
                <StudyModerationCard key={study.id} study={study} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="approved" className="space-y-4">
          {approvedStudies.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No approved studies yet
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {approvedStudies.map((study) => (
                <StudyModerationCard key={study.id} study={study} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="rejected" className="space-y-4">
          {rejectedStudies.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No rejected studies
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {rejectedStudies.map((study) => (
                <StudyModerationCard key={study.id} study={study} />
              ))}
            </div>
          )}
        </TabsContent>

        <TabsContent value="all" className="space-y-4">
          {studies.length === 0 ? (
            <Card>
              <CardContent className="py-8 text-center text-muted-foreground">
                No studies in the system
              </CardContent>
            </Card>
          ) : (
            <div className="grid md:grid-cols-2 gap-4">
              {studies.map((study) => (
                <StudyModerationCard key={study.id} study={study} />
              ))}
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}
