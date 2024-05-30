import { db } from ".";

export const get_user = async (id: Number) => {
    const user = await db.users.findUnique({
        where: {
            id: Number(id),
        },
    });
    if(user) {
        return await transform(user);
    } else throw createError({ statusCode: 404, message: 'User not found' })
};

export const get_users = async () => {
	const users = await db.users.findMany({
		where: {
			status: "ACTIVE",
		},
	});
	return await users.map((user) => {
		return transform(user);
	});
};

export const update = async (id: Number, data: any) => {
    const user = await db.users.update({
        where: {
            id: Number(id)
        },
        data: data
    })
    if(user) {
        return await transform(user);
    } else throw createError({ statusCode: 404, message: 'Update failed' })
}

export const create = async(data: any) => {
    const user = await db.users.create({
        data: data
    })
    if(user) {
        return await transform(user);
    } else throw createError({ statusCode: 404, message: 'Create failed' })
}

function transform(data: any) {
	const { id, name, email, phone, birthdate, address, avatar, classification, status } = data;
	return {
		id,
		name,
		email,
		phone,
        birthdate,
		address,
        avatar,
        classification,
        status
	};
}
