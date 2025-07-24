# P-Core Enhanced Architecture Deployment Checklist

## 🎯 Pre-Deployment Preparation

### ✅ Environment Setup
- [ ] **Database URL Configuration**
  ```bash
  # Update .env file
  DATABASE_URL="postgresql://user:password@host:port/p_core_unified"
  
  # Remove old database URLs (no longer needed)
  # USER_DATABASE_URL (delete)
  # FEATURES_DATABASE_URL (delete)
  ```

- [ ] **Install Dependencies**
  ```bash
  npm install
  npm run db:generate
  ```

- [ ] **Backup Existing Data**
  ```bash
  # Backup user database
  pg_dump $USER_DATABASE_URL > backup/user_database_$(date +%Y%m%d_%H%M%S).sql
  
  # Backup features database  
  pg_dump $FEATURES_DATABASE_URL > backup/features_database_$(date +%Y%m%d_%H%M%S).sql
  ```

### ✅ Code Review & Testing
- [ ] **Review Enhanced Schema**
  - Verify all tables include proper `org_id` fields
  - Check money fields are changed to `Decimal` type
  - Confirm indexes are optimized for multi-tenancy

- [ ] **API Routes Testing**
  - Test new member management endpoints
  - Test choir management endpoints  
  - Test library management endpoints
  - Verify organization security middleware

- [ ] **Frontend Components**
  - Test member cards and lists
  - Test choir cards and lists
  - Test book cards and lists
  - Verify dashboard integration

## 🗄️ Database Migration

### ✅ Phase 1: Schema Migration
```bash
# 1. Create new unified database
createdb p_core_unified

# 2. Run enhanced schema migration
psql $DATABASE_URL -f prisma/migrations/001_init_enhanced_schema.sql

# 3. Verify schema creation
psql $DATABASE_URL -c "\dt *.*" # List all tables in all schemas
```

### ✅ Phase 2: Data Migration
```bash
# 1. Set environment variables for migration
export OLD_USER_DATABASE_URL=$USER_DATABASE_URL
export OLD_FEATURES_DATABASE_URL=$FEATURES_DATABASE_URL
export DATABASE_URL="postgresql://user:password@host:port/p_core_unified"

# 2. Run data migration script
node scripts/migrate-data.js

# 3. Verify data migration
psql $DATABASE_URL -c "SELECT COUNT(*) FROM auth.users;"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM domain.students;"
psql $DATABASE_URL -c "SELECT COUNT(*) FROM domain.members;"
```

### ✅ Phase 3: RLS Setup
```bash
# 1. Apply Row-Level Security policies
psql $DATABASE_URL -f scripts/setup-rls.sql

# 2. Test RLS functionality
psql $DATABASE_URL -c "SELECT * FROM test_rls_policies('test_org_id', 'test_user_id');"

# 3. Verify RLS policies
psql $DATABASE_URL -c "SELECT * FROM rls_policy_status;"
```

## 🚀 Application Deployment

### ✅ Code Deployment
- [ ] **Update Import Paths**
  ```typescript
  // Update all imports to use new structure
  import { useGetMembers } from '@/features/members/api';
  import { useGetChoirs } from '@/features/choirs/api';
  import { useGetBooks } from '@/features/library/api';
  ```

- [ ] **Environment Variables**
  ```bash
  # Production environment variables
  DATABASE_URL="postgresql://..."
  ENABLE_RLS="true"
  ENABLE_AUDIT_LOGS="true"
  
  # Security settings
  NEXTAUTH_SECRET="your-secret-key"
  NEXTAUTH_URL="https://your-domain.com"
  ```

- [ ] **Build & Deploy**
  ```bash
  npm run build
  npm run lint
  npm run type-check
  ```

### ✅ Feature Activation
- [ ] **Enable New Features**
  ```typescript
  // Update feature flags
  export const FEATURE_FLAGS = {
    MEMBERS_ENABLED: true,
    CHOIRS_ENABLED: true,
    LIBRARY_ENABLED: true,
    DASHBOARD_ENABLED: true,
  };
  ```

- [ ] **Organization Type Configuration**
  ```typescript
  // Update organization types to support new features
  const orgFeatures = getOrganizationFeatures(organization.type);
  ```

## 🧪 Testing & Validation

### ✅ Functional Testing
- [ ] **Authentication Flow**
  - Login with existing accounts
  - Test organization switching
  - Verify role-based permissions

- [ ] **CRUD Operations**
  - Create, read, update, delete students
  - Create, read, update, delete members
  - Create, read, update, delete choirs
  - Create, read, update, delete books

- [ ] **Multi-Tenancy**
  - Test with multiple organizations
  - Verify data isolation between orgs
  - Test role-based access within orgs

### ✅ Performance Testing
- [ ] **Database Performance**
  ```sql
  -- Test query performance with RLS
  EXPLAIN ANALYZE SELECT * FROM domain.students LIMIT 100;
  EXPLAIN ANALYZE SELECT * FROM domain.members LIMIT 100;
  ```

- [ ] **API Response Times**
  ```bash
  # Test API endpoints
  curl -w "@curl-format.txt" -s -o /dev/null https://your-domain.com/api/students
  curl -w "@curl-format.txt" -s -o /dev/null https://your-domain.com/api/members
  ```

- [ ] **Frontend Performance**
  - Check bundle sizes
  - Test page load times
  - Verify caching behavior

### ✅ Security Testing
- [ ] **RLS Validation**
  ```sql
  -- Test tenant isolation
  SELECT set_org_context('org1', 'user1');
  SELECT COUNT(*) FROM domain.students; -- Should only show org1 data
  
  SELECT clear_org_context();
  SELECT COUNT(*) FROM domain.students; -- Should show 0 or error
  ```

- [ ] **API Security**
  - Test without orgId parameter
  - Test with invalid orgId
  - Test cross-organization access attempts

## 📊 Monitoring & Health Checks

### ✅ Database Monitoring
- [ ] **Connection Pool**
  ```sql
  -- Monitor active connections
  SELECT COUNT(*) FROM pg_stat_activity;
  SELECT state, COUNT(*) FROM pg_stat_activity GROUP BY state;
  ```

- [ ] **RLS Performance**
  ```sql
  -- Monitor RLS policy execution
  SELECT schemaname, tablename, COUNT(*) as policy_count 
  FROM pg_policies 
  WHERE schemaname IN ('domain', 'activities', 'content') 
  GROUP BY schemaname, tablename;
  ```

### ✅ Application Monitoring
- [ ] **Health Endpoints**
  ```bash
  # Test health endpoints
  curl https://your-domain.com/api/health
  curl https://your-domain.com/api/health/db
  curl https://your-domain.com/api/health/system
  ```

- [ ] **Error Tracking**
  - Monitor application logs
  - Set up error alerting
  - Track API response codes

### ✅ Performance Metrics
- [ ] **Dashboard Analytics**
  - Test dashboard loading times
  - Verify statistics accuracy
  - Check growth trend calculations

- [ ] **Feature Usage**
  - Monitor feature adoption
  - Track user engagement
  - Analyze performance bottlenecks

## 🔄 Rollback Plan

### ✅ Emergency Rollback
- [ ] **Database Rollback**
  ```bash
  # If needed, restore from backup
  pg_restore -d p_core_unified backup/user_database_YYYYMMDD_HHMMSS.sql
  pg_restore -d p_core_unified backup/features_database_YYYYMMDD_HHMMSS.sql
  ```

- [ ] **Code Rollback**
  ```bash
  # Revert to previous version
  git revert <commit-hash>
  npm run build
  npm run deploy
  ```

- [ ] **Environment Rollback**
  ```bash
  # Restore old environment variables
  USER_DATABASE_URL="postgresql://..."
  FEATURES_DATABASE_URL="postgresql://..."
  ```

## 📝 Post-Deployment Tasks

### ✅ Documentation Updates
- [ ] Update API documentation
- [ ] Update user guides
- [ ] Update admin documentation
- [ ] Create feature tutorials

### ✅ Team Training
- [ ] Train team on new features
- [ ] Update development workflows
- [ ] Share architecture changes
- [ ] Document troubleshooting guides

### ✅ User Communication
- [ ] Announce new features
- [ ] Provide migration guides
- [ ] Set up support channels
- [ ] Gather user feedback

## 🎉 Success Criteria

### ✅ Deployment Success Indicators
- [ ] **All health checks pass**
- [ ] **No data loss during migration**
- [ ] **Performance metrics within acceptable range**
- [ ] **All new features functional**
- [ ] **RLS security working correctly**
- [ ] **No critical errors in logs**
- [ ] **User authentication working**
- [ ] **Multi-tenancy isolation verified**

### ✅ Performance Benchmarks
- [ ] **Database queries < 100ms average**
- [ ] **API responses < 500ms average**
- [ ] **Page load times < 2s**
- [ ] **No memory leaks detected**
- [ ] **Connection pool stable**

### ✅ Feature Validation
- [ ] **School management features working**
- [ ] **Church management features working**
- [ ] **Library management features working**
- [ ] **Music ministry features working**
- [ ] **Dashboard analytics accurate**
- [ ] **Cross-feature integration working**

---

## 🆘 Emergency Contacts

- **Database Admin**: [Contact Info]
- **DevOps Team**: [Contact Info]  
- **Product Owner**: [Contact Info]
- **Technical Lead**: [Contact Info]

## 📞 Support Resources

- **Documentation**: [Link to docs]
- **Issue Tracker**: [Link to tracker]
- **Monitoring Dashboard**: [Link to monitoring]
- **Log Aggregation**: [Link to logs]

---

*Complete this checklist step by step to ensure a successful deployment of the enhanced P-Core architecture.*
