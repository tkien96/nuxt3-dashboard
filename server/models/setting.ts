import { prismaFindMany, prismaFindUnique, prismaUpdate } from ".";
const table = "setting";

export const settingFindUnique = async (id: Number) => {
	const user = await prismaFindUnique(table, { where: { id: id } });
	if (user) {
		return await settingTransform(user);
	} else throw createError({ statusCode: 404, message: "User not found" });
};

export const settingFindMany = async (queries: any) => {
	const setting = await prismaFindMany(table, queries);
	return await setting.map((user: any) => {
		return settingTransform(user);
	});
};

export const settingUpdate = async (id: Number, data: any) => {
	const user = await prismaUpdate("setting", Number(id), data);
	if (user) {
		return await settingTransform(user);
	} else throw createError({ statusCode: 404, message: "Update failed" });
};

function settingTransform(data: any) {
	const {
		name,
		email,
		phone,
		title,
		keyword,
		description,
		address,
		color,
		theme,
		favicon,
	} = data;
	return {
		name,
		email,
		phone,
		title,
		keyword,
		description,
		address,
		color,
		theme,
		favicon,
	};
}
