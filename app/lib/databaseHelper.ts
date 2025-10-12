import postgres from 'postgres';
import {serviceDataType} from './databaseType';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
export type ServiceType = 'home' | 'experience' | 'services';

export async function fetchServices (serviceType: ServiceType): Promise<serviceDataType[]> {
    try {
            const selectedTable = `${serviceType}services`
            console.log("bbbb", selectedTable);
            
            const data = await sql.unsafe<serviceDataType[]>(`SELECT * FROM ${selectedTable}`)
            return data;
    } catch(error) {
            console.error('Database Error:', error);
            return [];
    }
}