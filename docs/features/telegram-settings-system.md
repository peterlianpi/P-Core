# 📱 Telegram Settings System Documentation

## 📁 **File**: `actions/settings/telegram-setting.ts`

### 🎯 **Purpose**
Manages Telegram bot configurations for multi-tenant notification system with user, organization, and super admin scopes.

---

## 🧩 **Components & Functions Overview**

### **1. getTelegramSetting()**
```typescript
getTelegramSetting({ userId, scope = "USER" })
```
**Purpose**: Retrieve a single active Telegram setting for a user  
**Use Case**: Check if user has Telegram notifications enabled  
**Returns**: `{ telegramChatId, telegramBotToken, isActive }`  
**Security**: Only returns active settings  
**Error Handling**: Returns null values on failure

**Why This Function**:
- Quick check for notification availability
- Used by notification systems to validate settings
- Prevents errors when sending notifications

### **2. getTelegramSettings()**
```typescript
getTelegramSettings({ userId })
```
**Purpose**: Get all Telegram settings for a user across all scopes  
**Use Case**: Display user's Telegram configuration dashboard  
**Returns**: Array of settings with full details  
**Security**: Only user's own settings  
**Sorting**: Most recent first

**Why This Function**:
- Settings management UI needs complete view
- Users may have multiple bot configurations
- Supports organization and personal notifications

### **3. createTelegramSetting()**
```typescript
createTelegramSetting({ userId, chatId, botToken, scope?, orgId? })
```
**Purpose**: Create new or update existing Telegram setting  
**Use Case**: User configures new Telegram bot integration  
**Logic**: Upsert pattern (update if exists, create if new)  
**Returns**: `{ success, data }` or `{ success: false, error }`  
**Security**: Validates user ownership

**Why This Function**:
- Prevents duplicate settings for same user/scope
- Handles both creation and updates gracefully
- Essential for settings configuration UI

### **4. deleteTelegramSetting()**
```typescript
deleteTelegramSetting({ settingId, userId })
```
**Purpose**: Permanently remove a Telegram setting  
**Use Case**: User removes bot integration  
**Security**: User can only delete their own settings  
**Returns**: Success/failure status  
**Data Protection**: Hard delete from database

**Why This Function**:
- Users need ability to remove integrations
- Security requirement for data ownership
- Clean up unused bot configurations

### **5. toggleTelegramSetting()**
```typescript
toggleTelegramSetting({ settingId, userId, isActive })
```
**Purpose**: Enable/disable setting without deletion  
**Use Case**: Temporarily pause notifications  
**Security**: User ownership validation  
**Returns**: Updated setting data  
**Benefit**: Non-destructive disable

**Why This Function**:
- Users may want temporary disable instead of deletion
- Preserves configuration while pausing notifications
- Better UX than delete/recreate cycle

---

## 🏗️ **System Architecture**

### **Database Schema Integration**
```prisma
TelegramSetting {
  id: String       # Unique identifier
  userId: String   # Owner of the setting
  orgId?: String   # Optional organization context
  chatId: String   # Telegram chat/channel ID
  botToken: String # Telegram bot authentication token
  scope: Enum      # USER | ORG | SUPERADMIN
  isActive: Bool   # Enable/disable flag
  timestamps       # Created/updated tracking
}
```

### **Multi-Tenant Scoping**
- **USER**: Personal notifications for individual users
- **ORG**: Organization-wide notifications (school alerts, team updates)
- **SUPERADMIN**: System-level critical notifications

### **Security Features**
- **User Isolation**: Users can only access their own settings
- **Ownership Validation**: All operations verify user ownership
- **Optional Org Context**: Settings can be organization-specific
- **Active/Inactive Toggle**: Non-destructive disable mechanism

---

## 🚀 **Extension Recommendations**

### **1. Notification Templates**
```typescript
// Future enhancement
interface TelegramTemplate {
  id: string;
  name: string;
  template: string;
  variables: string[];
  scope: TelegramScope;
}

export const createTelegramTemplate = async ({
  userId, name, template, scope
}) => {
  // Template management for consistent messaging
};
```

### **2. Notification Scheduling**
```typescript
// Future enhancement
interface ScheduledNotification {
  id: string;
  settingId: string;
  message: string;
  scheduledFor: DateTime;
  status: 'PENDING' | 'SENT' | 'FAILED';
  retryCount: number;
}

export const scheduleNotification = async ({
  settingId, message, sendAt
}) => {
  // Schedule notifications for later delivery
};
```

### **3. Notification History & Analytics**
```typescript
// Future enhancement
interface NotificationLog {
  id: string;
  settingId: string;
  messageId: string;
  status: 'SUCCESS' | 'FAILED';
  sentAt: DateTime;
  errorMessage?: string;
  deliveryTime: number; // ms
}

export const getNotificationHistory = async ({ userId, limit = 50 }) => {
  // Track notification delivery history
};
```

### **4. Group Management**
```typescript
// Future enhancement
interface TelegramGroup {
  id: string;
  name: string;
  description: string;
  settingIds: string[];
  orgId: string;
  isActive: boolean;
}

export const createTelegramGroup = async ({
  name, settingIds, orgId
}) => {
  // Group multiple telegram settings for bulk operations
};
```

### **5. Webhook Integration**
```typescript
// Future enhancement
export const setupTelegramWebhook = async ({
  settingId, webhookUrl, events
}) => {
  // Two-way communication with Telegram bots
  // Handle incoming messages and commands
};
```

---

## 🎨 **UI Components Needed**

### **Settings Dashboard**
```typescript
// Component suggestions
<TelegramSettingsPage>
  <TelegramSettingsList />
  <CreateTelegramSettingForm />
  <TelegramTestButton />
  <NotificationHistoryView />
</TelegramSettingsPage>
```

### **Quick Actions**
- **Test Connection**: Send test message to verify bot setup
- **Import/Export**: Backup and restore settings
- **Bulk Operations**: Enable/disable multiple settings
- **Usage Analytics**: Show notification delivery stats

---

## 🔧 **Integration Points**

### **With Logging System**
```typescript
// lib/telegram/telegram.ts uses these settings
const settings = await getTelegramSettings(userId, role, orgId);
// Enhanced logging system automatically uses configured bots
```

### **With Notification System**
```typescript
// Future notification service integration
const notificationService = {
  send: async (userId, message, scope = 'USER') => {
    const setting = await getTelegramSetting({ userId, scope });
    if (setting.isActive) {
      await sendTelegramMessage(setting, message);
    }
  }
};
```

### **With Organization Management**
```typescript
// Organization settings inheritance
const orgSettings = await getTelegramSetting({ 
  userId: adminId, 
  scope: 'ORG' 
});
// All org members inherit these notification settings
```

---

## 🛡️ **Security Considerations**

### **Current Security**
✅ User ownership validation  
✅ Input sanitization  
✅ Error handling without information leakage  
✅ Database constraints prevent conflicts  

### **Future Security Enhancements**
- **Rate Limiting**: Prevent spam through bot configurations
- **Token Encryption**: Encrypt bot tokens in database
- **Audit Logging**: Track all configuration changes
- **Permission System**: Role-based access to telegram settings
- **Bot Validation**: Verify bot tokens before saving

---

## 📊 **Monitoring & Analytics**

### **Metrics to Track**
- **Setting Usage**: How many users have telegram configured
- **Notification Volume**: Messages sent per day/hour
- **Delivery Success Rate**: Percentage of successful deliveries
- **Error Types**: Common failure reasons
- **User Engagement**: Settings modification frequency

### **Health Checks**
```typescript
// Future health monitoring
export const healthCheckTelegramSettings = async () => {
  // Test all active bot tokens
  // Report configuration issues
  // Monitor API rate limits
};
```

---

## 🔄 **Change Management**

### **Version History**
- **v1.0**: Basic CRUD operations implemented
- **v1.1**: Multi-scope support added (USER/ORG/SUPERADMIN)
- **v1.2**: Enhanced error handling and validation

### **Breaking Changes**
- Changed from `role` parameter to `scope` parameter
- Added required `userId` validation for all operations
- Modified return types to include more metadata

### **Migration Path**
```typescript
// If updating existing installations
const migrateTelegramSettings = async () => {
  // Convert old role-based settings to new scope system
  // Update existing bot configurations
  // Preserve user data during upgrade
};
```

---

## 📝 **Testing Strategy**

### **Unit Tests Needed**
```typescript
describe('TelegramSettings', () => {
  test('createTelegramSetting creates new setting')
  test('createTelegramSetting updates existing setting')
  test('getTelegramSetting returns only active settings')
  test('deleteTelegramSetting requires ownership')
  test('toggleTelegramSetting updates status')
})
```

### **Integration Tests**
- **Database Operations**: Verify Prisma queries work correctly
- **Security Validation**: Test ownership checks
- **Error Scenarios**: Handle database failures gracefully
- **Concurrency**: Multiple users modifying settings simultaneously

### **E2E Tests**
- **Settings UI Flow**: Create → Test → Modify → Delete
- **Notification Delivery**: End-to-end message delivery
- **Organization Scope**: Org admin managing team settings

---

## 🎯 **Success Metrics**

### **Technical Metrics**
- **99.9% Uptime**: Settings management always available
- **<100ms Response**: Fast settings retrieval
- **Zero Data Loss**: No accidental setting deletions
- **100% Type Safety**: Full TypeScript coverage

### **User Experience Metrics**
- **Setup Time**: <5 minutes to configure first telegram bot
- **Error Rate**: <1% of setting operations fail
- **User Adoption**: >80% of active users configure telegram
- **Support Tickets**: <5% related to telegram settings

---

This comprehensive documentation provides the foundation for maintaining and extending the Telegram settings system! 🚀
