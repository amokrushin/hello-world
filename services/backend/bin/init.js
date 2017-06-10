const pool = require('../lib/database');

const SQL_DROP_TABLE_USERS = `
DROP TABLE IF EXISTS users;`;

const SQL_CREATE_TABLE_USERS = `
CREATE TABLE users (
    id          SERIAL          PRIMARY KEY,
    email       VARCHAR (255)   UNIQUE NOT NULL,
    name        VARCHAR (50)    NOT NULL,
    age         INT             NOT NULL,
    address     TEXT
);`;

const SAMPLE_USERS = [
    {
        email: 'DelorseMOrr@dayrep.com',
        name: 'Delorse M. Orr',
        age: 46,
        address: '2766 Bond Street Providence, RI 02905',
    },
    {
        email: 'ElmerMGreen@armyspy.com',
        name: 'Elmer M. Green',
        age: 49,
        address: '1149 Columbia Road, Newark, DE 19714',
    },
    {
        email: 'BrianGTrevino@rhyta.com',
        name: 'McClaine',
        age: 75,
        address: '1350 Sarah Drive, Lafayette, LA 70501',
    }
];

async function init() {
    await pool.query(SQL_DROP_TABLE_USERS, []);
    await pool.query(SQL_CREATE_TABLE_USERS, []);
    return Promise.all(
        SAMPLE_USERS.map(({ email, name, age, address }) => {
            return pool.query(
                `INSERT INTO users(email, name, age, address) values($1, $2, $3, $4)`,
                [email, name, age, address],
            )
        })
    );
}

init()
    .catch((err) => {
        console.error(err);
    })
    .then(() => {
        pool.end();
    });
