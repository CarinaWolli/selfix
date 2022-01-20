db.createUser({
  user: 'selfix',
  pwd: '123456',
  roles: [
    {
      role: 'readWrite',
      db: 'selfix',
    },
  ],
});
db.selfix.createIndex({ _id: 1 }, { unique: true });

db.bikes.createIndex({
  name: 'text',
  description: 'text',
  'bikeType.name': 'text',
  'brand.name': 'text',
});

db.tutorials.createIndex({ name: 'text' });

db.tutorialvideosteps.createIndex({ title: 'text' });
db.tutorialtextsteps.createIndex({ title: 'text' });

let adminUser = db.users.insert([
  {
    username: "admin",
    password: "$2a$08$IbmWXNxY3AgccfHd8AMLu.x4.9yG/jPWfea5Z/fIuYZp4lF/REBCS",
    role: "admin"
  },
]);


printjson(adminUser);
