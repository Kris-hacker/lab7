import * as db from '../helpers/database';

export const getById = async (id: any) => {
    let query = 'SELECT * FROM articles WHERE ID = ?';
    let values = [id];
    let data = await db.run_query(query, values);
    return data;
}

export const getAll = async() => {
    let query = 'SELECT * FROM articles';
    let data = await db.run_query(query, null);
    return data;
}

export const add = async(article: any) => {

}