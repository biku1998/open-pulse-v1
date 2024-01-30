alter table public.tokens add column updated_by uuid null;

alter table public.tokens add constraint tokens_updated_by_fkey foreign key (updated_by) references users (id) on delete cascade;