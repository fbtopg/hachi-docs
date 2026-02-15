create table if not exists page_views (
  id bigint generated always as identity primary key,
  page text not null,
  referrer text,
  user_agent text,
  created_at timestamptz default now()
);

create index idx_page_views_page on page_views(page);
create index idx_page_views_created_at on page_views(created_at desc);

alter table page_views enable row level security;

create policy "Anyone can insert page views"
  on page_views for insert
  with check (true);

create policy "Anyone can read page view counts"
  on page_views for select
  using (true);
