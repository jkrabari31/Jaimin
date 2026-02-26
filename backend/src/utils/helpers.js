export const pickSchoolData = (items, schoolId) => items.filter((i) => i.schoolId === schoolId);

export const addAuditLog = (db, payload) => {
  db.auditLogs.push({
    id: crypto.randomUUID(),
    timestamp: new Date().toISOString(),
    ...payload
  });
};
