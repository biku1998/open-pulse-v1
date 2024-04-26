alter table public.event_tags
  add column project_id uuid null;

alter table public.event_tags
    add constraint event_tags_project_id_fkey
        foreign key (project_id) references projects (id) on delete set null;



alter table public.event_tags
  add column channel_id uuid null;

alter table public.event_tags
    add constraint event_tags_channel_id_fkey
        foreign key (channel_id) references channels (id) on delete set null;

