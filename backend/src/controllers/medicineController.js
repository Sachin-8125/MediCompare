import { PrismaClient } from "../generated/prisma/index";
const prisma = new PrismaClient();

//search for medicines
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
        console.log("Search Error: ",error);
        res.status(500).json({ error: 'Server error while searching for medicines' });
    }
};

export default searchMedicines;