import dotenv from 'dotenv';
dotenv.config();

// Memory store fallback for robust development without external DB setup dependency
export class LocalDataStore {
  private static store: Record<string, any[]> = {
    users: [],
    events: [],
    speakers: [],
    blogPosts: [],
    jobBoard: [],
    communityNeeds: [],
    mockInterviews: [],
    interviewResults: []
  };

  static getCollection<T>(name: string): T[] {
    return (this.store[name] || []) as T[];
  }

  static setCollection<T>(name: string, data: T[]): void {
    this.store[name] = data;
  }

  static addItem<T>(name: string, item: T): T {
    if (!this.store[name]) this.store[name] = [];
    this.store[name].push(item);
    return item;
  }

  static updateItem<T extends { id: string }>(name: string, id: string, updates: Partial<T>): T | null {
    const list = this.store[name] || [];
    const index = list.findIndex(i => i.id === id);
    if (index === -1) return null;
    list[index] = { ...list[index], ...updates };
    return list[index];
  }

  static deleteItem(name: string, id: string): boolean {
    const list = this.store[name] || [];
    const initialLen = list.length;
    this.store[name] = list.filter(i => i.id !== id);
    return this.store[name].length < initialLen;
  }
}
