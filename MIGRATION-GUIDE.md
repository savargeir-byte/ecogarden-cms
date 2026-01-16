# 🔄 MIGRATION GUIDE - Old to New Architecture

**Purpose:** Migrate existing data from old `pages.content` JSONB to new `sections` table

---

## 📋 Migration Steps

### Step 1: Backup Existing Data

```sql
-- Create backup of old pages table
create table pages_backup as select * from pages;
```

### Step 2: Migrate Content to Sections

```sql
-- For each page with content in JSONB array, create sections
do $$
declare
  page_record record;
  section_item jsonb;
  section_position int;
begin
  for page_record in select * from pages where content is not null loop
    section_position := 0;

    -- Loop through each item in the content array
    for section_item in select * from jsonb_array_elements(page_record.content) loop
      insert into sections (
        page_id,
        type,
        content,
        position
      ) values (
        page_record.id,
        section_item->>'type',
        (section_item->'data')::jsonb, -- Extract 'data' field as content
        section_position
      );

      section_position := section_position + 1;
    end loop;
  end loop;
end $$;
```

### Step 3: Verify Migration

```sql
-- Check that sections were created
select
  p.slug,
  p.title,
  count(s.id) as section_count
from pages p
left join sections s on s.page_id = p.id
group by p.id, p.slug, p.title
order by p.slug;
```

### Step 4: Remove Old Content Column (Optional)

```sql
-- After verifying migration worked
alter table pages drop column content;
```

---

## 🔍 Data Format Differences

### OLD Format (pages.content):

```json
[
  {
    "id": "abc123",
    "type": "hero",
    "data": {
      "heading": "Welcome",
      "text": "Description"
    }
  },
  {
    "id": "def456",
    "type": "text",
    "data": {
      "html": "<p>Content</p>"
    }
  }
]
```

### NEW Format (sections table):

```
sections:
┌──────┬─────────┬────────┬────────────────────────────┬──────────┐
│  id  │ page_id │  type  │         content            │ position │
├──────┼─────────┼────────┼────────────────────────────┼──────────┤
│ uuid │  uuid   │ hero   │ {"heading":"Welcome",...}  │    0     │
│ uuid │  uuid   │ text   │ {"html":"<p>Content</p>"}  │    1     │
└──────┴─────────┴────────┴────────────────────────────┴──────────┘
```

**Key Change:** `data` field becomes root-level `content` field

---

## 🧪 Test Migration on Single Page

```sql
-- Test with one page first
do $$
declare
  test_page_id uuid;
  section_item jsonb;
  section_position int := 0;
begin
  -- Get test page
  select id into test_page_id from pages where slug = 'home';

  -- Delete existing sections (if any)
  delete from sections where page_id = test_page_id;

  -- Migrate content
  for section_item in
    select * from jsonb_array_elements(
      (select content from pages where id = test_page_id)
    )
  loop
    insert into sections (
      page_id,
      type,
      content,
      position
    ) values (
      test_page_id,
      section_item->>'type',
      (section_item->'data')::jsonb,
      section_position
    );

    section_position := section_position + 1;
  end loop;

  raise notice 'Migrated % sections for page %', section_position, test_page_id;
end $$;
```

---

## ✅ Verification Checklist

- [ ] Backup created successfully
- [ ] Test migration on one page works
- [ ] Section count matches old content array length
- [ ] Section types are correct
- [ ] Section content (JSONB) is valid
- [ ] Positions are sequential (0, 1, 2, ...)
- [ ] Admin can load and edit migrated sections
- [ ] Public site displays migrated content correctly
- [ ] Preview mode works with migrated data

---

## 🚨 Rollback Plan

If migration fails:

```sql
-- 1. Delete migrated sections
delete from sections where page_id in (select id from pages);

-- 2. Restore pages from backup
update pages
set content = pages_backup.content
from pages_backup
where pages.id = pages_backup.id;

-- 3. Drop backup when done
drop table pages_backup;
```

---

## 📝 Manual Migration Alternative

If you prefer to manually recreate content:

1. Open Admin UI (`/admin`)
2. Delete old page (if exists)
3. Create new page
4. Add sections one by one using the UI
5. Publish when ready

This ensures data is in the correct format from the start.
