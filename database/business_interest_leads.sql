-- PontoAmado marketing-site lead inbox.
-- Safe to run more than once: existing table, index and policies are preserved.
-- This table is separate from active businesses, owners and invitations.

create table if not exists public.business_interest_leads (
  id uuid primary key default gen_random_uuid(),
  contact_name text not null check (char_length(btrim(contact_name)) between 2 and 120),
  business_name text not null check (char_length(btrim(business_name)) between 2 and 120),
  email text,
  phone text,
  business_type text check (business_type is null or business_type in (
    'cafe_restaurante',
    'padaria_confeitaria',
    'beleza',
    'loja_presentes',
    'pet_shop',
    'mercado_bairro',
    'outro'
  )),
  wants_presentation boolean not null default false,
  message text check (message is null or char_length(message) <= 600),
  contact_permission boolean not null check (contact_permission),
  status text not null default 'new' check (status in (
    'new', 'contacted', 'presentation_requested', 'converted', 'archived'
  )),
  source text not null default 'marketing_site' check (source = 'marketing_site'),
  created_at timestamptz not null default now(),
  constraint business_interest_leads_has_contact
    check (email is not null or phone is not null),
  constraint business_interest_leads_valid_email
    check (email is null or email ~* '^[^[:space:]@]+@[^[:space:]@]+\\.[^[:space:]@]+$')
);

create index if not exists business_interest_leads_created_at_idx
  on public.business_interest_leads (created_at desc);

alter table public.business_interest_leads enable row level security;

-- Remove broad table privileges before granting the minimum required access.
revoke all on public.business_interest_leads from public, anon, authenticated;

-- Visitors may submit only the fields collected by the public form.
grant insert (
  contact_name,
  business_name,
  email,
  phone,
  business_type,
  wants_presentation,
  message,
  contact_permission
) on public.business_interest_leads to anon;

-- CREATE POLICY has no IF NOT EXISTS; guard it through the catalog.
do $migration$
begin
  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'business_interest_leads'
      and policyname = 'Visitors can submit merchant interest'
  ) then
    create policy "Visitors can submit merchant interest"
      on public.business_interest_leads
      for insert
      to anon
      with check (
        char_length(btrim(contact_name)) between 2 and 120
        and char_length(btrim(business_name)) between 2 and 120
        and (email is not null or phone is not null)
        and contact_permission is true
      );
  end if;

  if not exists (
    select 1
    from pg_policies
    where schemaname = 'public'
      and tablename = 'business_interest_leads'
      and policyname = 'Platform admins can review merchant interest'
  ) then
    create policy "Platform admins can review merchant interest"
      on public.business_interest_leads
      for select
      to authenticated
      using (public.is_platform_admin());
  end if;
end;
$migration$;

-- Only authenticated platform administrators can read the lead inbox.
grant select on public.business_interest_leads to authenticated;
