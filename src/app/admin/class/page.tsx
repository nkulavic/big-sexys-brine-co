import { createClient } from "@/lib/supabase/server";
import { requireAuth } from "@/lib/supabase/auth-guard";
import { ClassForm } from "@/components/admin/class-form";

export default async function AdminClassPage() {
  await requireAuth();
  const supabase = await createClient();
  const { data: classInfo } = await supabase
    .from("class_info")
    .select("*")
    .eq("id", 1)
    .single();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-display text-2xl font-bold">Class Info</h1>
        <p className="text-sm text-muted-foreground">
          Manage preservation class details
        </p>
      </div>
      <ClassForm classInfo={classInfo} />
    </div>
  );
}
