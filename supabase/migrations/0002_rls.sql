alter table public.users_meta enable row level security;
alter table public.dashboards enable row level security;
alter table public.dashboard_credentials enable row level security;
alter table public.integrations enable row level security;
alter table public.scan_jobs enable row level security;
alter table public.scans enable row level security;
alter table public.findings enable row level security;
alter table public.competitors enable row level security;
alter table public.artifacts enable row level security;
alter table public.audit_log enable row level security;
alter table public.memory_notes enable row level security;

do $$ declare t text; begin
  foreach t in array array['users_meta','dashboards','dashboard_credentials','integrations','scan_jobs','scans','findings','competitors','artifacts','audit_log','memory_notes'] loop
    execute format('drop policy if exists "%1$s owner read" on public.%1$I', t);
    execute format('drop policy if exists "%1$s owner write" on public.%1$I', t);
    execute format('create policy "%1$s owner read" on public.%1$I for select using (owner_id = auth.uid())', t);
    execute format('create policy "%1$s owner write" on public.%1$I for all using (owner_id = auth.uid()) with check (owner_id = auth.uid())', t);
  end loop;
end $$;
