import { db } from ".";

export const get_menu = async (id: Number) => {
    const menu = await db.menus.findUnique({
        where: {
            id: Number(id),
        },
    });
    if(menu) {
        return await transform(menu);
    } else throw createError({ statusCode: 404, message: 'menu not found' })
};

export const get_menus = async () => {
	const menus = await db.menus.findMany({
		where: {
			status: "ACTIVE",
		},
	});
	return await menus.map((menu) => {
		return transform(menu);
	});
};

export const update = async (id: Number, data: any) => {
    const menu = await db.menus.update({
        where: {
            id: Number(id)
        },
        data: data
    })
    if(menu) {
        return await transform(menu);
    } else throw createError({ statusCode: 404, message: 'Update failed' })
}

export const create = async(data: any) => {
    const menu = await db.menus.create({
        data: data
    })
    if(menu) {
        return await transform(menu);
    } else throw createError({ statusCode: 404, message: 'Create failed' })
}

function transform(data: any) {
	const { id, name, parent, to, icon, exact, tooltip, shortcuts, status } = data;
	return {
		id,
		name,
        parent,
		to,
		icon,
        exact,
		tooltip,
        shortcuts,
        status
	};
}
