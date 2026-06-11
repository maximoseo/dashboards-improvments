create index if not exists dashboard_credentials_dashboard_id_idx on public.dashboard_credentials(dashboard_id);
create index if not exists integrations_dashboard_id_kind_idx on public.integrations(dashboard_id, kind);
create index if not exists scan_jobs_dashboard_status_idx on public.scan_jobs(dashboard_id, status);
create index if not exists scans_job_id_idx on public.scans(job_id);
create index if not exists findings_scan_dimension_severity_idx on public.findings(scan_id, dimension, severity);
create index if not exists competitors_scan_id_idx on public.competitors(scan_id);
create index if not exists artifacts_scan_id_kind_idx on public.artifacts(scan_id, kind);
create index if not exists memory_notes_dashboard_kind_idx on public.memory_notes(dashboard_id, kind);
