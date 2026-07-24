create table if not exists public.users (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null unique,
  password text not null,
  created_at timestamp with time zone default now(),
  updated_at timestamp with time zone default now()
);
