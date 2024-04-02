export type Json = string | number | boolean | null | { [key: string]: Json | undefined } | Json[];

export type Database = {
  public: {
    Tables: {
      room_schedule: {
        Row: {
          created_at: string;
          created_by: string | null;
          end_date: string | null;
          id: string;
          room_id: string | null;
          start_date: string | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          end_date?: string | null;
          id?: string;
          room_id?: string | null;
          start_date?: string | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          end_date?: string | null;
          id?: string;
          room_id?: string | null;
          start_date?: string | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_room_schedule_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_room_schedule_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          }
        ];
      };
      rooms: {
        Row: {
          created_at: string;
          created_by: string | null;
          id: string;
          location: string | null;
          name: string | null;
          verified: boolean | null;
        };
        Insert: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          location?: string | null;
          name?: string | null;
          verified?: boolean | null;
        };
        Update: {
          created_at?: string;
          created_by?: string | null;
          id?: string;
          location?: string | null;
          name?: string | null;
          verified?: boolean | null;
        };
        Relationships: [
          {
            foreignKeyName: 'public_rooms_created_by_fkey';
            columns: ['created_by'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      userdata_room: {
        Row: {
          created_at: string;
          id: string;
          is_admin: boolean;
          room_id: string;
          start_location: string | null;
          user_id: string;
        };
        Insert: {
          created_at?: string;
          id?: string;
          is_admin?: boolean;
          room_id: string;
          start_location?: string | null;
          user_id: string;
        };
        Update: {
          created_at?: string;
          id?: string;
          is_admin?: boolean;
          room_id?: string;
          start_location?: string | null;
          user_id?: string;
        };
        Relationships: [
          {
            foreignKeyName: 'public_userdata_room_room_id_fkey';
            columns: ['room_id'];
            isOneToOne: false;
            referencedRelation: 'rooms';
            referencedColumns: ['id'];
          },
          {
            foreignKeyName: 'public_userdata_room_user_id_fkey';
            columns: ['user_id'];
            isOneToOne: false;
            referencedRelation: 'users';
            referencedColumns: ['id'];
          }
        ];
      };
      users: {
        Row: {
          created_at: string;
          id: string;
          name: string;
          profile_url: string | null;
        };
        Insert: {
          created_at?: string;
          id?: string;
          name: string;
          profile_url?: string | null;
        };
        Update: {
          created_at?: string;
          id?: string;
          name?: string;
          profile_url?: string | null;
        };
        Relationships: [];
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
    CompositeTypes: {
      [_ in never]: never;
    };
  };
};

type PublicSchema = Database[Extract<keyof Database, 'public'>];

export type Tables<
  PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views']) | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof (Database[PublicTableNameOrOptions['schema']]['Tables'] &
        Database[PublicTableNameOrOptions['schema']]['Views'])
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? (Database[PublicTableNameOrOptions['schema']]['Tables'] &
      Database[PublicTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R;
    }
    ? R
    : never
  : PublicTableNameOrOptions extends keyof (PublicSchema['Tables'] & PublicSchema['Views'])
  ? (PublicSchema['Tables'] & PublicSchema['Views'])[PublicTableNameOrOptions] extends {
      Row: infer R;
    }
    ? R
    : never
  : never;

export type TablesInsert<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Insert: infer I;
    }
    ? I
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Insert: infer I;
    }
    ? I
    : never
  : never;

export type TablesUpdate<
  PublicTableNameOrOptions extends keyof PublicSchema['Tables'] | { schema: keyof Database },
  TableName extends PublicTableNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicTableNameOrOptions['schema']]['Tables']
    : never = never
> = PublicTableNameOrOptions extends { schema: keyof Database }
  ? Database[PublicTableNameOrOptions['schema']]['Tables'][TableName] extends {
      Update: infer U;
    }
    ? U
    : never
  : PublicTableNameOrOptions extends keyof PublicSchema['Tables']
  ? PublicSchema['Tables'][PublicTableNameOrOptions] extends {
      Update: infer U;
    }
    ? U
    : never
  : never;

export type Enums<
  PublicEnumNameOrOptions extends keyof PublicSchema['Enums'] | { schema: keyof Database },
  EnumName extends PublicEnumNameOrOptions extends { schema: keyof Database }
    ? keyof Database[PublicEnumNameOrOptions['schema']]['Enums']
    : never = never
> = PublicEnumNameOrOptions extends { schema: keyof Database }
  ? Database[PublicEnumNameOrOptions['schema']]['Enums'][EnumName]
  : PublicEnumNameOrOptions extends keyof PublicSchema['Enums']
  ? PublicSchema['Enums'][PublicEnumNameOrOptions]
  : never;
