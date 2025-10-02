import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

const searchMedicines = async(req, res) => {
    const {query} = req.query;

    if(!query){
        return res.status(400).json({msg: 'Please enter a search query'});
    }

    try {
        const results = await prisma.price.findMany({
            where: {
                medicine: {
                    OR: [
                        {name: {contains: query, mode: 'insensitive'}},
                        {genericName: {contains: query, mode: 'insensitive'}}
                    ],
                },
            },
            include: {
                medicine: true,
                pharmacy: true
            },
            orderBy: {
                price: 'asc'
            },
        });
        res.json(results);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
};

export default searchMedicines;