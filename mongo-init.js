db.createUser({
  user: `${MONGO_DATABASE_USER}`,
  pwd: `${MONGO_DATABASE_PASSWORD}`,
  roles: [
    {
      role: 'readWrite',
      db: `${MONGO_INITDB_DATABASE}`,
    },
  ],
});

db.createCollection('todo-list-items');
