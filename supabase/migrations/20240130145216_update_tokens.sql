alter table public.tokens add column updated_at timestamp with time zone null;

create trigger
  handle_updated_at before update
on public.tokens
for each row execute
  procedure moddatetime(updated_at);

alter table public.project_tokens add column updated_at timestamp with time zone null;

alter table public.project_tokens add column updated_by uuid null;

alter table public.project_tokens add constraint project_tokens_updated_by_fkey foreign key (updated_by) references users (id) on delete cascade;

create trigger
  handle_updated_at before update
on public.project_tokens
for each row execute
  procedure moddatetime(updated_at);
