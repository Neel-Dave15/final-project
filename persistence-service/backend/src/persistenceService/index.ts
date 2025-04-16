import { USE_MOCK_DB } from '../config/env';
import MockPersistenceService from './mock';
import AppDataSource from '../strategy/postgresql/configure';
import IPersistenceService from './persistenceService';
import PostgresPersistenceService from './postgresPersistence';

let persistenceService: IPersistenceService;

export async function initializePersistenceService(): Promise<void> {
  if (USE_MOCK_DB) {
    console.log('Using Mock persistence service as configured');
    persistenceService = new MockPersistenceService();
  } else {
    try {
      if (!AppDataSource.isInitialized) {
        await AppDataSource.initialize();
        console.log('PostgreSQL database initialized');
      }
      persistenceService = new PostgresPersistenceService(AppDataSource);
    } catch (error) {
      console.error('Failed to initialize PostgreSQL. Falling back to Mock.', error);
      persistenceService = new MockPersistenceService();
    }
  }
}

export function getPersistenceService(): IPersistenceService {
  if (!persistenceService) {
    throw new Error('Persistence service not initialized. Call initializePersistenceService() first.');
  }
  return persistenceService;
}
