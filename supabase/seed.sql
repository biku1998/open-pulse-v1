insert into
  auth.users (
    instance_id,
    id,
    aud,
    role,
    email,
    encrypted_password,
    email_confirmed_at,
    recovery_sent_at,
    last_sign_in_at,
    raw_app_meta_data,
    raw_user_meta_data,
    created_at,
    updated_at,
    confirmation_token,
    email_change,
    email_change_token_new,
    recovery_token
  )
values
  (
    '00000000-0000-0000-0000-000000000000',
    gen_random_uuid (),
    'authenticated',
    'authenticated',
    'biku@gmail.com',
    crypt ('root_user', gen_salt ('bf')),
    current_timestamp,
    current_timestamp,
    current_timestamp,
    '{"provider":"email","providers":["email"]}',
    '{}',
    current_timestamp,
    current_timestamp,
    '',
    '',
    '',
    ''
  );

insert into
  auth.identities (
    id,
    user_id,
    provider_id,
    identity_data,
    provider,
    last_sign_in_at,
    created_at,
    updated_at
  )
values
  (
    gen_random_uuid (),
    (
      select
        id
      from
        auth.users
      where
        email = 'biku@gmail.com'
    ),
    (
      select
        id
      from
        auth.users
      where
        email = 'biku@gmail.com'
    ),
    format(
      '{"sub":"%s","email":"%s"}',
      (
        select
          id
        from
          auth.users
        where
          email = 'biku@gmail.com'
      )::text,
      'biku@gmail.com'
    )::jsonb,
    'email',
    current_timestamp,
    current_timestamp,
    current_timestamp
  );

  

insert into
  public.projects (name, created_by)
values
  (
    'Silicon valley',
    (
      select
        id
      from
        auth.users
      where
        email = 'biku@gmail.com'
    )
  );

insert into
  public.tokens (value, created_by)
values
  (
    'TM1CmENnCbRNaQT38HegK5XTx3aOw4s5WVN1bx09FuflNWfADN',
    (
      select
        id
      from
        auth.users
      where
        email = 'biku@gmail.com'
    )
  );

insert into
  public.project_tokens (token_id, project_id, created_by)
values
  (
    (
      select
        id
      from
        public.tokens
      where
        value = 'TM1CmENnCbRNaQT38HegK5XTx3aOw4s5WVN1bx09FuflNWfADN'
    ),
    (
      select
        id
      from
        public.projects
      where
        name = 'Silicon valley'
    ),
    (
      select
        id
      from
        auth.users
      where
        email = 'biku@gmail.com'
    )
  );

insert into
  public.channels (name, created_by, project_id, position)
values
  (
    'the-new-internet',
    (
      select
        id
      from
        auth.users
      where
        email = 'biku@gmail.com'
    ),
    (
      select
        id
      from
        public.projects
      where
        name = 'Silicon valley'
    ),
    1
  );
