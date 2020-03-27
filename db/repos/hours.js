const sql = require('../sql').hours;
const cs = {}  // Reusale ColumnSet objects.

/*
 This repository mixes hard-coded and dynamic SQL, primarily to show a diverse example of using both.
 */

class HoursRepository {
    constructor(db, pgp) {
        this.db = db;
        this.pgp = pgp;

        // set-up all ColumnSet objects, if needed:
        createColumnsets(pgp);
    }

    // Creates the table;
    async create() {
        return this.db.none(sql.create);
    }

    // Initializes the table with some user records, and return their id-s;
    // async init() {
    //     return this.db.map(sql.init, [], row => row.id);
    // }

    // Drops the table;
    // async drop() {
    //     return this.db.none(sql.drop);
    // }

    // Removes all records from the table;
    // async empty() {
    //     return this.db.none(sql.empty);
    // }

    // Adds a new user, and returns the new object;
    // async add(name) {
    //     return this.db.one(sql.add, name);
    // }

    // Tries to delete a user by id, and returns the number of records deleted;
    // async remove(id) {
    //     return this.db.result('DELETE FROM users WHERE id = $1', +id, r => r.rowCount);
    // }

    // Tries to find a user from id;
    // async findById(id) {
    //     return this.db.oneOrNone('SELECT * FROM hascategory WHERE id = $1', +id);
    // }

    // Returns all user records;
    async all() {
        return this.db.any('SELECT * FROM hours');
    }

    // Returns the total number of users;
    async total() {
        return this.db.one('SELECT count(*) FROM hours', [], a => +a.count);
    }
}

//////////////////////////////////////////////////////////
// Example of statically initializing ColumnSet objects:
function createColumnsets(pgp) {
    // create all ColumnSet objects only once:
    if (!cs.insert) {
        // Type TableName is useful when schema isn't default "public" ,
        // otherwise you can just pass in a string for the table name.
        const table = new pgp.helpers.TableName({table: 'hours', schema: 'public'});
        // cs.insert = new pgp.helpers.ColumnSet(['name'], {table});
        // cs.update = cs.insert.extend(['?id']);
    }
    return cs;
}

export default HoursRepository;