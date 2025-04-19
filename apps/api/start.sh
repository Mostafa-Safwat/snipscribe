./wait-for-it.sh "${DATABASE_HOST:-project_db}":"${DATABASE_PORT:-3306}" --strict --timeout=45
cd ../../packages/database && npm run db:migrate-prod
cd -
npm run seed
pm2-runtime start ./dist/main.js
