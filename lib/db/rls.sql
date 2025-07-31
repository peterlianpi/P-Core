-- Row-Level Security (RLS) Policies for Multi-Tenant Isolation
-- This script implements automatic tenant isolation at the database level
-- Provides defense-in-depth security by enforcing access control in PostgreSQL

-- ============================================================================
-- SETUP: Create RLS helper function
-- ============================================================================

-- Function to get current organization ID from session context
CREATE OR REPLACE FUNCTION get_current_org_id()
RETURNS TEXT AS $$
BEGIN
  RETURN current_setting('app.current_org_id', true);
EXCEPTION
  WHEN others THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- DOMAIN SCHEMA: Enable RLS on all tenant-scoped tables
-- ============================================================================

-- Students table
ALTER TABLE domain.students ENABLE ROW LEVEL SECURITY;

CREATE POLICY students_tenant_isolation ON domain.students
  FOR ALL
  TO public
  USING (org_id = get_current_org_id())
  WITH CHECK (org_id = get_current_org_id());

-- Courses table
ALTER TABLE domain.courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY courses_tenant_isolation ON domain.courses
  FOR ALL
  TO public
  USING (org_id = get_current_org_id())
  WITH CHECK (org_id = get_current_org_id());

-- StudentCourse junction table
ALTER TABLE domain.student_courses ENABLE ROW LEVEL SECURITY;

CREATE POLICY student_courses_tenant_isolation ON domain.student_courses
  FOR ALL
  TO public
  USING (org_id = get_current_org_id())
  WITH CHECK (org_id = get_current_org_id());

-- Course status logs
ALTER TABLE domain.course_status_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY course_status_logs_tenant_isolation ON domain.course_status_logs
  FOR ALL
  TO public
  USING (org_id = get_current_org_id())
  WITH CHECK (org_id = get_current_org_id());

-- Lesson books
ALTER TABLE domain.lesson_books ENABLE ROW LEVEL SECURITY;

CREATE POLICY lesson_books_tenant_isolation ON domain.lesson_books
  FOR ALL
  TO public
  USING (org_id = get_current_org_id())
  WITH CHECK (org_id = get_current_org_id());

-- Schedules
ALTER TABLE domain.schedules ENABLE ROW LEVEL SECURITY;

CREATE POLICY schedules_tenant_isolation ON domain.schedules
  FOR ALL
  TO public
  USING (org_id = get_current_org_id())
  WITH CHECK (org_id = get_current_org_id());

-- Purchases
ALTER TABLE domain.purchases ENABLE ROW LEVEL SECURITY;

CREATE POLICY purchases_tenant_isolation ON domain.purchases
  FOR ALL
  TO public
  USING (org_id = get_current_org_id())
  WITH CHECK (org_id = get_current_org_id());

-- ============================================================================
-- AUTH SCHEMA: Organization-based access control
-- ============================================================================

-- Organizations - users can only see organizations they belong to
ALTER TABLE auth.organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY organizations_member_access ON auth.organizations
  FOR ALL
  TO public
  USING (
    id IN (
      SELECT organization_id 
      FROM auth.user_organizations 
      WHERE user_id = current_user_id() 
        AND status = 'ACTIVE'
    )
  );

-- User organizations - users can only see their own memberships
ALTER TABLE auth.user_organizations ENABLE ROW LEVEL SECURITY;

CREATE POLICY user_organizations_own_access ON auth.user_organizations
  FOR ALL
  TO public
  USING (user_id = current_user_id());

-- Update logs - scoped to organizations the user belongs to
ALTER TABLE auth.update_logs ENABLE ROW LEVEL SECURITY;

CREATE POLICY update_logs_org_access ON auth.update_logs
  FOR ALL
  TO public
  USING (
    org_id IN (
      SELECT organization_id 
      FROM auth.user_organizations 
      WHERE user_id = current_user_id() 
        AND status = 'ACTIVE'
    )
  );

-- ============================================================================
-- HELPER FUNCTIONS
-- ============================================================================

-- Function to get current user ID (to be implemented based on your auth system)
CREATE OR REPLACE FUNCTION current_user_id()
RETURNS TEXT AS $$
BEGIN
  -- This should return the authenticated user's ID
  -- Implementation depends on your authentication system
  RETURN current_setting('app.current_user_id', true);
EXCEPTION
  WHEN others THEN
    RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to set organization context for a session
CREATE OR REPLACE FUNCTION set_org_context(org_id TEXT, user_id TEXT)
RETURNS VOID AS $$
BEGIN
  -- Verify user has access to this organization
  IF NOT EXISTS (
    SELECT 1 FROM auth.user_organizations 
    WHERE user_id = set_org_context.user_id 
      AND organization_id = set_org_context.org_id 
      AND status = 'ACTIVE'
  ) THEN
    RAISE EXCEPTION 'User % does not have access to organization %', user_id, org_id;
  END IF;

  -- Set the context variables
  PERFORM set_config('app.current_org_id', org_id, true);
  PERFORM set_config('app.current_user_id', user_id, true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to clear organization context
CREATE OR REPLACE FUNCTION clear_org_context()
RETURNS VOID AS $$
BEGIN
  PERFORM set_config('app.current_org_id', '', true);
  PERFORM set_config('app.current_user_id', '', true);
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- ============================================================================
-- GRANTS: Ensure proper permissions
-- ============================================================================

-- Grant access to the RLS functions
GRANT EXECUTE ON FUNCTION get_current_org_id() TO public;
GRANT EXECUTE ON FUNCTION current_user_id() TO public;
GRANT EXECUTE ON FUNCTION set_org_context(TEXT, TEXT) TO public;
GRANT EXECUTE ON FUNCTION clear_org_context() TO public;

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================

-- Test RLS policies (run these to verify setup)
/*
-- Set context for testing
SELECT set_org_context('org_123', 'user_456');

-- This should only return students from org_123
SELECT * FROM domain.students;

-- Clear context
SELECT clear_org_context();

-- This should return no students (RLS blocks access)
SELECT * FROM domain.students;
*/
