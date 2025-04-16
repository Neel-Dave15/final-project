import express from 'express';
import 'reflect-metadata';
import { initializePersistenceService } from './persistenceService';
import { AppDataSource } from './strategy/postgresql/configure';

import PersonApi from './strategy/postgresql/person/personApi';
import RoleApi from './strategy/postgresql/role/roleApi';
import MovieApi from './strategy/postgresql/movie/movieApi';
import AwardApi from './strategy/postgresql/award/awardApi';

const app = express();
const PORT = process.env.PORT || 8000;

app.use(express.json());

// Setup for error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Express error:', err);
  res.status(500).json({ error: 'Internal server error' });
});

// Health check endpoint
app.get('/health', (_, res) => {
  res.json({
    status: 'ok',
    dbConnected: AppDataSource.isInitialized,
    timestamp: new Date().toISOString(),
  });
});

// Start the app
async function startApp() {
  try {
    await initializePersistenceService();

    // Attach routes
  
    new PersonApi(app);
    new RoleApi(app);
    new MovieApi(app);
    new AwardApi(app);

    app.listen(PORT, () => {
      console.log(`Server started on http://localhost:${PORT}`);
      console.log(
        `Database connection status: ${AppDataSource.isInitialized ? 'Connected' : 'Using mock'}`
      );
    });
  } catch (error) {
    console.error('Failed to start application:', error);
    process.exit(1);
  }
}

startApp();
