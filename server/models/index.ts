import { PrismaClient } from "@prisma/client";
export const prisma = new PrismaClient({
	log: ["query"],
});

export const prismaCreate = async (model: string, data: object) => {
	try {
		return await (prisma as any)[model].create({
			data: data,
		});
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};
export const prismaFindMany = async (model: string, params?: any) => {
	try {
		const options: any = buildPrismaQueries(params);
		return await (prisma as any)[model].findMany(options || {});
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};
export const prismaFindUnique = async (model: string, params: any) => {
	const options: any = buildPrismaQueries(params);
	return await (prisma as any)[model].findUnique(options);
};
export const prismaUpdate = async (model: string, id: number, data: object) => {
	try {
		return await (prisma as any)[model].update({
			where: { id: id },
			data: data,
		});
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const prismaDelete = async (model: string, id: number) => {
	try {
		return await (prisma as any)[model].update({
			where: { id: id },
			data: { status: "NONACTIVE" },
		});
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const prismaRemove = async (model: string, id: number) => {
	try {
		return await (prisma as any)[model].delete({
			where: { id: id },
		});
	} catch (error) {
		console.error("Error: ", error);
		throw error;
	}
};

export const buildPrismaQueries = (params?: any): any => {
	const queryOptions: any = [];
	if (params) {
		if (params.take) queryOptions.take = params.take;
		if (params.skip) queryOptions.skip = params.skip;
		if (params.sort && params.order) queryOptions.orderBy = { [params.sort]: params.order };
		if (params.select) {
			queryOptions.select = [];
			params.select.map((item: any) => {
				queryOptions.select[item] = true;
			});
		}
		if (params.where) queryOptions.where = params.where;
	}
	return queryOptions;
};
