create type public.chart_type as enum ('LINE', 'BAR', 'PIE', 'MULTI_LINE','STACKED_BAR','FUNNEL');

create table public.charts (
    id bigint generated by default as identity,
    name text not null,
    description text null,
    chart_type public.chart_type not null,
    project_id uuid not null,
    created_by uuid not null,
    updated_by uuid null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null,
    constraint charts_pkey primary key (id),
    constraint charts_project_id_fkey foreign key (project_id) references projects (id) on delete cascade,
    constraint charts_created_by_fkey foreign key (created_by) references users (id) on delete cascade,
    constraint charts_updated_by_fkey foreign key (updated_by) references users (id) on delete set null
) tablespace pg_default;

create type public.chart_condition_logical_operator as enum ('AND', 'OR');
create type public.chart_condition_operator as enum ('EQUALS', 'NOT_EQUALS');
create type public.chart_aggregation_type as enum ('SUM', 'AVG', 'COUNT', 'MIN', 'MAX', 'COUNT_DISTINCT', 'MEDIAN');
create type public.chart_condition_field_type as enum ('EVENT_NAME', 'TAG_KEY', 'TAG_VALUE','USER_ID');

create table public.chart_conditions (
    id bigint generated by default as identity,
    chart_id bigint not null,
    parent_id bigint null,
    field public.chart_condition_field_type not null,
    operator public.chart_condition_operator not null,
    logical_operator public.chart_condition_logical_operator null,
    value text not null,
    created_by uuid not null,
    updated_by uuid null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null,
    constraint chart_conditions_pkey primary key (id),
    constraint chart_conditions_chart_id_fkey foreign key (chart_id) references charts (id) on delete cascade,
    constraint chart_conditions_created_by_fkey foreign key (created_by) references users (id) on delete cascade,
    constraint chart_conditions_updated_by_fkey foreign key (updated_by) references users (id) on delete set null,
    constraint chart_conditions_parent_id_fkey foreign key (parent_id) references chart_conditions (id) on delete cascade
) tablespace pg_default;

create table public.chart_aggregations (
    id bigint generated by default as identity,
    chart_id bigint not null,
    aggregation_type public.chart_aggregation_type not null,
    field text null,
    created_by uuid not null,
    updated_by uuid null,
    created_at timestamp with time zone not null default now(),
    updated_at timestamp with time zone null,
    constraint chart_aggregations_pkey primary key (id),
    constraint chart_aggregations_chart_id_fkey foreign key (chart_id) references charts (id) on delete cascade,
    constraint chart_aggregations_created_by_fkey foreign key (created_by) references users (id) on delete cascade,
    constraint chart_aggregations_updated_by_fkey foreign key (updated_by) references users (id) on delete set null
) tablespace pg_default;

create trigger
  handle_updated_at before update
on public.charts
for each row execute
  procedure moddatetime(updated_at);

create trigger
    handle_updated_at before update
on public.chart_conditions
for each row execute
    procedure moddatetime(updated_at);

create trigger
    handle_updated_at before update
on public.chart_aggregations
for each row execute
    procedure moddatetime(updated_at);

alter table if exists public.charts enable row level security;
create policy self on public.charts as permissive for all to public using ((auth.uid() = created_by))
with check ((auth.uid() = created_by));

alter table if exists public.chart_conditions enable row level security;
create policy self on public.chart_conditions as permissive for all to public using ((auth.uid() = created_by))
with check ((auth.uid() = created_by));

alter table if exists public.chart_aggregations enable row level security;
create policy self on public.chart_aggregations as permissive for all to public using ((auth.uid() = created_by))
with check ((auth.uid() = created_by));