# Row-Level Security (RLS) in P-Core

## What is RLS?
Row-Level Security (RLS) is a PostgreSQL feature that enables fine-grained access control over rows in a database table. In a multi-tenant system like P-Core, RLS ensures that each tenant (organization, school, church, etc.) can only access their own data, providing strong data isolation and security.

## How P-Core Uses RLS
- **Tenant Isolation:** Every query is automatically filtered by tenant ID, so users only see data belonging to their organization.
- **Automatic Enforcement:** RLS policies are defined in the database schema and enforced at the database level, not just in application code.
- **Flexible Policies:** RLS can be extended to support complex access rules, such as role-based access or conditional sharing.

## Example: Enabling RLS in PostgreSQL
```sql
ALTER TABLE organization ENABLE ROW LEVEL SECURITY;
CREATE POLICY org_isolation_policy ON organization
  USING (tenant_id = current_setting('app.current_tenant')::uuid);
```

## How to Set Up RLS in P-Core
1. **Define RLS Policies:** See `prisma/schema.prisma` and `lib/db/rls.sql` for policy definitions.
2. **Set Tenant Context:** The application sets the current tenant context for each request (see `lib/db/tenant.ts`).
3. **Test RLS:** Use the provided scripts and tests to verify that data is isolated per tenant.

## References
- [PostgreSQL RLS Documentation](https://www.postgresql.org/docs/current/ddl-rowsecurity.html)
- [P-Core Security Architecture Guide](./docs/architecture/SECURITY_ARCHITECTURE.md)

---

*For more details, see the security section in the main documentation.*
