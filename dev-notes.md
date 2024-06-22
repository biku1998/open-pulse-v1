# Dev notes

## Secrets

Production database password - ALh7aBYhmOqgElR6

## Commands

```sh
export SUPABASE_ACCESS_TOKEN=sbp_6b39cbc5139ae8bf75a85cc19677e62ea4852e92 && supabase link --project-ref kdyejbhoyojqmnttdeel
```

## Requirement from backend API

- Interact with supabase
- Accept events, process them, and store them
- UI will make request to get data in required shape with supabase auth token
- Global backends will make request to log their events using api tokens

## Todo

- [x] add created_by to events, insights and event_tags as well, so that we can use RLS on them also
- [x] all token value should be unique at database level
- [x] deploy a production version of supabase and link the local instance to it
- [x] add create public.users trigger fn in sql migrations
- [x] add empty state components
- [x] add edit channel from setting
- [x] add project skelton when loading
- [x] add 2fc feature to confirmation dialog
- [ ] try to add a lot of data and discover access patterns
- [ ] add auth loader ui
- [ ] update readme, make it a little attractive
- [ ] events search and filter

## Few important commands

### Generate supabase types

```sh
supabase gen types typescript --local > ./frontend/src/types/supabase-db.ts
```

```sh
supabase gen types typescript --local > ./backend/src/types/supabase-db.ts
```

## General points

- In backend `package.json` the start command has been updated from nest start to node dist/main
- The backend prod app is hosted on `https://app.cyclic.sh`

## Seed script parts

```sql
-- insert into
--   public.projects (name, created_by)
-- values
--   (
--     'Silicon valley',
--     (
--       select
--         id
--       from
--         auth.users
--       where
--         email = 'biku@gmail.com'
--     )
--   );

-- insert into
--   public.tokens (name, value, created_by)
-- values
--   (
--     'test-token',
--     'TM1CmENnCbRNaQT38HegK5XTx3aOw4s5WVN1bx09FuflNWfADN',
--     (
--       select
--         id
--       from
--         auth.users
--       where
--         email = 'biku@gmail.com'
--     )
--   );

-- insert into
--   public.project_tokens (token_id, project_id, created_by)
-- values
--   (
--     (
--       select
--         id
--       from
--         public.tokens
--       where
--         value = 'TM1CmENnCbRNaQT38HegK5XTx3aOw4s5WVN1bx09FuflNWfADN'
--     ),
--     (
--       select
--         id
--       from
--         public.projects
--       where
--         name = 'Silicon valley'
--     ),
--     (
--       select
--         id
--       from
--         auth.users
--       where
--         email = 'biku@gmail.com'
--     )
--   );

-- insert into
--   public.channels (name, created_by, project_id, position)
-- values
--   (
--     'the-new-internet',
--     (
--       select
--         id
--       from
--         auth.users
--       where
--         email = 'biku@gmail.com'
--     ),
--     (
--       select
--         id
--       from
--         public.projects
--       where
--         name = 'Silicon valley'
--     ),
--     1
--   );

```

## Notes

- The or conditions are completly separare from each other, so they can be evaluated separately and combine at the end
- The and conditions
  - If there is an event condition, evaluate it first then evaluate the tags
  - If not then just evaluate the tags
  
- Algo
  - fetch conditions from oldest to newest
  - break them by array of ORs
  - loop overthem and pass each of them to a function that accepts conditions(always ANDs), evaluates them and return events

## Where to go from here

1. Move to entire stack to JS/TS and deploy to vercel (Ship + Free) ✅
