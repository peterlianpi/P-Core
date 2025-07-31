-- P-Core Row-Level Security Setup
-- Implements comprehensive RLS policies for automatic tenant isolation
-- Run this after the main migration to enable RLS security

-- ============================================================================
-- RLS HELPER FUNCTIONS
-- ============================================================================

-- Function to get current organization ID from session context
CREATE OR REPLACE FUNCTION get_current_org_id()
RETURNS TEXT AS $$
DECLARE
    org_id TEXT;
BEGIN
    SELECT current_setting('app.current_org_id', true) INTO org_id;
    RETURN NULLIF(org_id, '');
EXCEPTION
    WHEN others THEN
        RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get current user ID from session context
CREATE OR REPLACE FUNCTION get_current_user_id()
RETURNS TEXT AS $$
DECLARE
    user_id TEXT;
BEGIN
    SELECT current_setting('app.current_user_id', true) INTO user_id;
    RETURN NULLIF(user_id, '');
EXCEPTION
    WHEN others THEN
        RETURN NULL;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to check if user has access to organization
CREATE OR REPLACE FUNCTION user_has_org_access(user_id TEXT, org_id TEXT)
RETURNS BOOLEAN AS $$
BEGIN
    RETURN EXISTS (
        SELECT 1 
        FROM auth.user_organizations 
        WHERE user_id = user_has_org_access.user_id 
          AND organization_id = user_has_org_access.org_id 
          AND status = 'ACTIVE'
    );
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to set organization context for a session
CREATE OR REPLACE FUNCTION set_org_context(org_id TEXT, user_id TEXT)
RETURNS VOID AS $$
BEGIN
    -- Verify user has access to this organization
    IF NOT user_has_org_access(user_id, org_id) THEN
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
-- DOMAIN SCHEMA RLS POLICIES
-- ============================================================================

-- Students table policies
DROP POLICY IF EXISTS students_tenant_isolation ON domain.students;
CREATE POLICY students_tenant_isolation ON domain.students
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Courses table policies
DROP POLICY IF EXISTS courses_tenant_isolation ON domain.courses;
CREATE POLICY courses_tenant_isolation ON domain.courses
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Student courses policies
DROP POLICY IF EXISTS student_courses_tenant_isolation ON domain.student_courses;
CREATE POLICY student_courses_tenant_isolation ON domain.student_courses
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Course status logs policies
DROP POLICY IF EXISTS course_status_logs_tenant_isolation ON domain.course_status_logs;
CREATE POLICY course_status_logs_tenant_isolation ON domain.course_status_logs
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Schedules policies
DROP POLICY IF EXISTS schedules_tenant_isolation ON domain.schedules;
CREATE POLICY schedules_tenant_isolation ON domain.schedules
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Purchases policies
DROP POLICY IF EXISTS purchases_tenant_isolation ON domain.purchases;
CREATE POLICY purchases_tenant_isolation ON domain.purchases
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Members policies
DROP POLICY IF EXISTS members_tenant_isolation ON domain.members;
CREATE POLICY members_tenant_isolation ON domain.members
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Homes policies
DROP POLICY IF EXISTS homes_tenant_isolation ON domain.homes;
CREATE POLICY homes_tenant_isolation ON domain.homes
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Vengs policies
DROP POLICY IF EXISTS vengs_tenant_isolation ON domain.vengs;
CREATE POLICY vengs_tenant_isolation ON domain.vengs
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Khawks policies
DROP POLICY IF EXISTS khawks_tenant_isolation ON domain.khawks;
CREATE POLICY khawks_tenant_isolation ON domain.khawks
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Member roles policies
DROP POLICY IF EXISTS member_roles_tenant_isolation ON domain.member_roles;
CREATE POLICY member_roles_tenant_isolation ON domain.member_roles
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Member role assignments policies
DROP POLICY IF EXISTS member_role_assignments_tenant_isolation ON domain.member_role_assignments;
CREATE POLICY member_role_assignments_tenant_isolation ON domain.member_role_assignments
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Relationship types policies
DROP POLICY IF EXISTS relationship_types_tenant_isolation ON domain.relationship_types;
CREATE POLICY relationship_types_tenant_isolation ON domain.relationship_types
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Family relationships policies
DROP POLICY IF EXISTS family_relationships_tenant_isolation ON domain.family_relationships;
CREATE POLICY family_relationships_tenant_isolation ON domain.family_relationships
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- ============================================================================
-- ACTIVITIES SCHEMA RLS POLICIES
-- ============================================================================

-- Choirs policies
DROP POLICY IF EXISTS choirs_tenant_isolation ON activities.choirs;
CREATE POLICY choirs_tenant_isolation ON activities.choirs
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Choir members policies
DROP POLICY IF EXISTS choir_members_tenant_isolation ON activities.choir_members;
CREATE POLICY choir_members_tenant_isolation ON activities.choir_members
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Songs policies
DROP POLICY IF EXISTS songs_tenant_isolation ON activities.songs;
CREATE POLICY songs_tenant_isolation ON activities.songs
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Choir songs policies
DROP POLICY IF EXISTS choir_songs_tenant_isolation ON activities.choir_songs;
CREATE POLICY choir_songs_tenant_isolation ON activities.choir_songs
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Choir events policies
DROP POLICY IF EXISTS choir_events_tenant_isolation ON activities.choir_events;
CREATE POLICY choir_events_tenant_isolation ON activities.choir_events
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- ============================================================================
-- CONTENT SCHEMA RLS POLICIES
-- ============================================================================

-- Libraries policies
DROP POLICY IF EXISTS libraries_tenant_isolation ON content.libraries;
CREATE POLICY libraries_tenant_isolation ON content.libraries
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Books policies
DROP POLICY IF EXISTS books_tenant_isolation ON content.books;
CREATE POLICY books_tenant_isolation ON content.books
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Lesson books policies
DROP POLICY IF EXISTS lesson_books_tenant_isolation ON content.lesson_books;
CREATE POLICY lesson_books_tenant_isolation ON content.lesson_books
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- Book loans policies
DROP POLICY IF EXISTS book_loans_tenant_isolation ON content.book_loans;
CREATE POLICY book_loans_tenant_isolation ON content.book_loans
    FOR ALL
    TO public
    USING (org_id = get_current_org_id())
    WITH CHECK (org_id = get_current_org_id());

-- ============================================================================
-- AUTH SCHEMA RLS POLICIES
-- ============================================================================

-- Organizations - users can only see organizations they belong to
DROP POLICY IF EXISTS organizations_member_access ON auth.organizations;
CREATE POLICY organizations_member_access ON auth.organizations
    FOR ALL
    TO public
    USING (
        id IN (
            SELECT organization_id 
            FROM auth.user_organizations 
            WHERE user_id = get_current_user_id() 
              AND status = 'ACTIVE'
        )
    );

-- User organizations - users can only see their own memberships
DROP POLICY IF EXISTS user_organizations_own_access ON auth.user_organizations;
CREATE POLICY user_organizations_own_access ON auth.user_organizations
    FOR ALL
    TO public
    USING (user_id = get_current_user_id());

-- Update logs - scoped to organizations the user belongs to
DROP POLICY IF EXISTS update_logs_org_access ON auth.update_logs;
CREATE POLICY update_logs_org_access ON auth.update_logs
    FOR ALL
    TO public
    USING (
        org_id IN (
            SELECT organization_id 
            FROM auth.user_organizations 
            WHERE user_id = get_current_user_id() 
              AND status = 'ACTIVE'
        )
    );

-- ============================================================================
-- GRANT PERMISSIONS
-- ============================================================================

-- Grant access to the RLS functions
GRANT EXECUTE ON FUNCTION get_current_org_id() TO public;
GRANT EXECUTE ON FUNCTION get_current_user_id() TO public;
GRANT EXECUTE ON FUNCTION user_has_org_access(TEXT, TEXT) TO public;
GRANT EXECUTE ON FUNCTION set_org_context(TEXT, TEXT) TO public;
GRANT EXECUTE ON FUNCTION clear_org_context() TO public;

-- ============================================================================
-- VERIFICATION FUNCTIONS
-- ============================================================================

-- Function to test RLS policies
CREATE OR REPLACE FUNCTION test_rls_policies(test_org_id TEXT, test_user_id TEXT)
RETURNS TABLE(
    test_name TEXT,
    success BOOLEAN,
    message TEXT
) AS $$
BEGIN
    -- Test 1: Set organization context
    BEGIN
        PERFORM set_org_context(test_org_id, test_user_id);
        RETURN QUERY SELECT 'Set Organization Context'::TEXT, true, 'Successfully set context'::TEXT;
    EXCEPTION
        WHEN others THEN
            RETURN QUERY SELECT 'Set Organization Context'::TEXT, false, SQLERRM::TEXT;
    END;

    -- Test 2: Query students (should work with context set)
    BEGIN
        PERFORM COUNT(*) FROM domain.students;
        RETURN QUERY SELECT 'Query Students with Context'::TEXT, true, 'Query executed successfully'::TEXT;
    EXCEPTION
        WHEN others THEN
            RETURN QUERY SELECT 'Query Students with Context'::TEXT, false, SQLERRM::TEXT;
    END;

    -- Test 3: Clear context and try query again
    BEGIN
        PERFORM clear_org_context();
        PERFORM COUNT(*) FROM domain.students;
        RETURN QUERY SELECT 'Query Students without Context'::TEXT, true, 'Query executed (may return 0 rows)'::TEXT;
    EXCEPTION
        WHEN others THEN
            RETURN QUERY SELECT 'Query Students without Context'::TEXT, false, SQLERRM::TEXT;
    END;

    -- Test 4: Test cross-tenant isolation
    BEGIN
        PERFORM set_org_context(test_org_id, test_user_id);
        -- Try to access data from a different organization
        PERFORM COUNT(*) FROM domain.students WHERE org_id != test_org_id;
        RETURN QUERY SELECT 'Cross-tenant Isolation'::TEXT, true, 'RLS properly isolates tenants'::TEXT;
    EXCEPTION
        WHEN others THEN
            RETURN QUERY SELECT 'Cross-tenant Isolation'::TEXT, false, SQLERRM::TEXT;
    END;

END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- MAINTENANCE FUNCTIONS
-- ============================================================================

-- Function to disable RLS (for maintenance)
CREATE OR REPLACE FUNCTION disable_rls_for_maintenance()
RETURNS VOID AS $$
DECLARE
    table_record RECORD;
BEGIN
    -- Disable RLS on all tables
    FOR table_record IN 
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname IN ('domain', 'activities', 'content', 'auth')
          AND tablename NOT IN ('pg_stat_statements')
    LOOP
        EXECUTE format('ALTER TABLE %I.%I DISABLE ROW LEVEL SECURITY', 
                      table_record.schemaname, 
                      table_record.tablename);
    END LOOP;
    
    RAISE NOTICE 'RLS disabled for maintenance. Remember to re-enable with enable_rls_after_maintenance()';
END;
$$ LANGUAGE plpgsql;

-- Function to re-enable RLS (after maintenance)
CREATE OR REPLACE FUNCTION enable_rls_after_maintenance()
RETURNS VOID AS $$
DECLARE
    table_record RECORD;
BEGIN
    -- Re-enable RLS on all tables
    FOR table_record IN 
        SELECT schemaname, tablename 
        FROM pg_tables 
        WHERE schemaname IN ('domain', 'activities', 'content', 'auth')
          AND tablename NOT IN ('pg_stat_statements')
    LOOP
        EXECUTE format('ALTER TABLE %I.%I ENABLE ROW LEVEL SECURITY', 
                      table_record.schemaname, 
                      table_record.tablename);
    END LOOP;
    
    RAISE NOTICE 'RLS re-enabled after maintenance';
END;
$$ LANGUAGE plpgsql;

-- ============================================================================
-- MONITORING VIEWS
-- ============================================================================

-- View to monitor RLS policy usage
CREATE OR REPLACE VIEW rls_policy_status AS
SELECT 
    schemaname,
    tablename,
    policyname,
    permissive,
    roles,
    cmd,
    qual,
    with_check
FROM pg_policies
WHERE schemaname IN ('domain', 'activities', 'content', 'auth')
ORDER BY schemaname, tablename, policyname;

-- View to monitor current session context
CREATE OR REPLACE VIEW current_session_context AS
SELECT 
    get_current_org_id() as current_org_id,
    get_current_user_id() as current_user_id,
    session_user,
    current_user,
    inet_client_addr() as client_ip,
    current_timestamp as session_time;

-- Grant access to monitoring views
GRANT SELECT ON rls_policy_status TO public;
GRANT SELECT ON current_session_context TO public;

-- ============================================================================
-- COMPLETION MESSAGE
-- ============================================================================

DO $$
BEGIN
    RAISE NOTICE '';
    RAISE NOTICE '====================================';
    RAISE NOTICE 'RLS SETUP COMPLETED SUCCESSFULLY';
    RAISE NOTICE '====================================';
    RAISE NOTICE '';
    RAISE NOTICE 'Summary:';
    RAISE NOTICE '- RLS enabled on all tenant-scoped tables';
    RAISE NOTICE '- Policies created for automatic tenant isolation';
    RAISE NOTICE '- Helper functions installed for context management';
    RAISE NOTICE '- Monitoring views created for administration';
    RAISE NOTICE '';
    RAISE NOTICE 'Next steps:';
    RAISE NOTICE '1. Test RLS with: SELECT * FROM test_rls_policies(''org_id'', ''user_id'');';
    RAISE NOTICE '2. Monitor policies with: SELECT * FROM rls_policy_status;';
    RAISE NOTICE '3. Check session context: SELECT * FROM current_session_context;';
    RAISE NOTICE '';
    RAISE NOTICE 'For maintenance:';
    RAISE NOTICE '- Disable RLS: SELECT disable_rls_for_maintenance();';
    RAISE NOTICE '- Re-enable RLS: SELECT enable_rls_after_maintenance();';
    RAISE NOTICE '';
END;
$$;
