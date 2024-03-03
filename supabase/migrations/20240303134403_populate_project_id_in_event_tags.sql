update public.event_tags
set
    project_id = events.project_id,
    channel_id = events.channel_id
from public.events
where public.event_tags.event_id = public.events.id;