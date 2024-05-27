const { db } = require('@vercel/postgres');
const {users} = require('C:\\Users\\kamil\\Documents\\Infa\\Strona\\samorzad\\scripts\\placeholder-data.js');
const bcrypt = require('bcrypt');

async function seedUsers(client) {
    try {
        const insertedUsers = await Promise.all(
            users.map(async (user) => {
                const hashedPassword = await bcrypt.hash(user.password, 10);
                return client.sql`
                INSERT INTO users (name, surname, email, password, permission, image_url, date)
                VALUES (${user.name}, ${user.surname}, ${user.email}, ${hashedPassword}, ${user.permission}, ${user.image_url}, ${user.date})
                ON CONFLICT (id) DO NOTHING;
                `;
            }),
        );

        console.log(`Seeded ${insertedUsers.length} users`);

        return {
            users: insertedUsers,
        };

    } catch (error) {
        console.error('Error seeding users:', error);
        throw error;
    }
}

async function main() {
    const client = await db.connect();
    await seedUsers(client);
    await client.end();
}

main().catch((err) => {
    console.error(
        'An error occurred while attempting to seed the database:',
        err,
    );
});