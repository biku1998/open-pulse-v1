alter table if exists public.users enable row level security;
create policy self on public.users as permissive for all to public using ((auth.uid() = id))
with check ((auth.uid() = id));

alter table if exists public.projects enable row level security;
create policy ownership on public.projects as permissive for all to public using ((auth.uid() = created_by))
with check ((auth.uid() = created_by));

alter table if exists public.channels enable row level security;
create policy ownership on public.channels as permissive for all to public using ((auth.uid() = created_by))
with check ((auth.uid() = created_by));

alter table if exists public.tokens enable row level security;
create policy ownership on public.tokens as permissive for all to public using ((auth.uid() = created_by))
with check ((auth.uid() = created_by));

alter table if exists public.project_tokens enable row level security;
create policy ownership on public.project_tokens as permissive for all to public using ((auth.uid() = created_by))
with check ((auth.uid() = created_by));

alter table if exists public.insights enable row level security;

alter table if exists public.events enable row level security;

alter table if exists public.event_tags enable row level security;