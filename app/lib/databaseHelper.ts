import postgres from 'postgres';
import {serviceDataType, userSignUpType, userLoginType} from './databaseType';

const sql = postgres(process.env.POSTGRES_URL!, { ssl: 'require' });
export type ServiceType = 'home' | 'experience' | 'services';

export async function fetchServices (serviceType: ServiceType): Promise<serviceDataType[]> {
        try {
                const selectedTable = `${serviceType}services`;            
                const data = await sql.unsafe<serviceDataType[]>(`SELECT * FROM ${selectedTable}`)
                return data;
        } catch(error) {
                console.error('Database Error:', error);
                return [];
        }
}
export const userSignUp = async (user: userSignUpType) => {
        const result = await sql`
        INSERT INTO host (username, m_password, servicetype, email, telephone)
        VALUES (${user.username}, ${user.password}, ${user.serviceType}, ${user.email}, ${user.telephone})
        RETURNING *;
        `;
        return result; // just return the result, don't return Response.json
}
export const userLogin = async (user:userLoginType) => {
        const result = await sql`SELECT * FROM host 
      WHERE username = ${user.username} AND m_password = ${user.password};`
      if (result.length === 0) {
      return { success: false, error: 'Invalid username or password' };
        }

        return { success: true, user: result[0] };
}