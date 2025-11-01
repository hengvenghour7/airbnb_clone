import postgres from 'postgres';
import {serviceDataType, userSignUpType, userLoginType, newServiceType, uploadImageDataType, 
        responseImageType} from './databaseType';

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
export const createNewService = async (service:newServiceType) => {
        const result = await sql`
        INSERT INTO homeservices (hostname, servicetype, accomodation, placename, placelocation, subdescription, description, services, price, startdate, enddate)
        VALUES (${service.hostname}, ${service.serviceType}, ${service.accomodation}, ${service.placename}, ${service.placeLocation}, ${service.subDescription}, ${service.description}, ${service.services}, ${service.price}, ${service.startDate}, ${service.endDate})
        RETURNING *;
        `;
}
export const uploadImage = async (data: uploadImageDataType) => {
        const result = await sql`
        INSERT INTO hostimage (username, email, servicetype, placename, imagelinks)
        VALUES (${data.username}, ${data.email}, ${data.servicetype}, ${data.placename}, ${data.imagelinks})
        RETURNING *;
        `
}
export const getAvailableServices = async (serviceType: string = 'all', placeName: string = 'all') => {
        // let result: postgres.RowList<(postgres.Row & Iterable<postgres.Row>)[]>;
        const result = serviceType === 'all' ?  await sql`SELECT * from homeservices` :
        await sql`SELECT * from homeservices WHERE hostname = ${placeName}`
        const imageResult = await sql`SELECT * from hostimage`;
        const mergeResult = result.map(item => {
                const obj2 = imageResult.find(obj => obj.placename === item.placename)
                return {...item, imagelinks: obj2 !== undefined ? obj2?.imagelinks : []}
        }).reverse();
        return mergeResult;
}
export const getServiceDetail = async (placeName: string = 'all') => {
        // let result: postgres.RowList<(postgres.Row & Iterable<postgres.Row>)[]>;
        let result = await sql`SELECT * from homeservices WHERE placename = ${placeName} LIMIT 1`
        let imageResult = await sql<responseImageType[]>`SELECT * from hostimage WHERE placename = ${placeName} LIMIT 1`;
        if (result.length === 0) {
                result = [
                {
                id: 13,
                servicetype: 'Room',
                hostname: 'N/A',
                accomodation: 'housing',
                placename: 'Opera House',
                placelocation: 'Parkmore',
                subdescription: '',
                description: '',
                services: [ 'Bed cleaning' ],
                price: '40',
                isfavorite: null
                }
                ] as unknown as postgres.RowList<postgres.Row[]>
                imageResult = [
                                {
                                        id: 7,
                                        username: 'N/A',
                                        email: '',
                                        servicetype: 'Room',
                                        placename: 'Opera House',
                                        imagelinks: []
                                }
                        ] as unknown as postgres.RowList<responseImageType[]>
        }
        if (imageResult[0].imagelinks.length < 5) {                
                while (imageResult[0].imagelinks.length < 5) {
                        imageResult[0].imagelinks.push('/noImage.png')
                }
        }
        if (imageResult[0].imagelinks.length > 5) {
                imageResult[0].imagelinks = imageResult[0].imagelinks.slice(0, 5);
        }
        const mergeResult = result.map(item => {
                const obj2 = imageResult.find(obj => obj.placename === item.placename)
                return {...item, imagelinks: obj2 !== undefined ? obj2?.imagelinks : []}
        }).reverse();
        return mergeResult;
}