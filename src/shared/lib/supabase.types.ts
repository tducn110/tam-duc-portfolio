/**
 * Auto-generated type definitions matching the `contact_leads` Supabase table.
 * Regenerate with: npx supabase gen types typescript --project-id cruapnqfpffwssmbzgww > src/shared/lib/supabase.types.ts
 */
export interface Database {
  public: {
    Tables: {
      contact_leads: {
        Row: {
          id: string;
          name: string;
          email: string;
          phone: string | null;
          service_type: "basic" | "standard" | "premium" | "custom";
          budget: string | null;
          message: string;
          status: "new" | "contacted" | "closed" | "rejected";
          notification_status: "pending" | "sent" | "failed";
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          name: string;
          email: string;
          phone?: string | null;
          service_type: "basic" | "standard" | "premium" | "custom";
          budget?: string | null;
          message: string;
          status?: "new" | "contacted" | "closed" | "rejected";
          notification_status?: "pending" | "sent" | "failed";
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          status?: "new" | "contacted" | "closed" | "rejected";
          notification_status?: "pending" | "sent" | "failed";
          updated_at?: string;
        };
      };
    };
  };
}
