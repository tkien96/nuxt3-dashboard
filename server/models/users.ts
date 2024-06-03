import { prismaCreate, prismaFindMany, prismaFindUnique, prismaUpdate } from ".";

const model = "users";

export const usersFindUnique = async (id: Number) => {
    const user = await prismaFindUnique(model, { where: { id: id } });
    if(user) {
        return await usersTransform(user);
    } else throw createError({ statusCode: 404, message: 'User not found' })
};

export const usersFindMany = async (queries: any) => {
    const users = await prismaFindMany(model, queries);
	return await users.map((user: any) => {
		return usersTransform(user);
	});
};

export const usersUpdate = async (id: Number, data: any) => {
    const user = await prismaUpdate(model, Number(id), data)
    if(user) {
        return await usersTransform(user);
    } else throw createError({ statusCode: 404, message: 'Update failed' })
}

export const usersCreate = async(data: any) => {
    const user = await prismaCreate(model, data)
    if(user) {
        return await usersTransform(user);
    } else throw createError({ statusCode: 404, message: 'Create failed' })
}

function usersTransform(data: any) {
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
