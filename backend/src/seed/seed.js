import { PrismaClient } from "../generated/prisma/index.js";
const prisma = new PrismaClient();

async function seedDatabase() {
  console.log('Checking if seeding is required...');

  try {
    const medicineCount = await prisma.medicine.count();
    if (medicineCount > 0) {
      console.log('Database already seeded. Skipping.');
      return;
    }

    console.log('Seeding database...');

    // Seed Medicines
    const med1 = await prisma.medicine.create({
      data: { name: 'Paracetamol 500mg', genericName: 'Acetaminophen', manufacturer: 'Cipla' },
    });
    const med2 = await prisma.medicine.create({
      data: { name: 'Aspirin 75mg', genericName: 'Acetylsalicylic acid', manufacturer: 'Sun Pharma' },
    });
    const med3 = await prisma.medicine.create({
      data: { name: 'Amoxicillin 250mg', genericName: 'Amoxicillin', manufacturer: 'Dr. Reddy\'s' },
    });
     const med4 = await prisma.medicine.create({
      data: { name: 'Crocin Advance', genericName: 'Acetaminophen', manufacturer: 'GSK' },
    });


    // Seed Pharmacies
    const pharm1 = await prisma.pharmacy.create({
      data: { name: 'Apollo Pharmacy', city: 'Delhi', state: 'Delhi', pincode: '110001' },
    });
    const pharm2 = await prisma.pharmacy.create({
      data: { name: 'MedPlus', city: 'Mumbai', state: 'Maharashtra', pincode: '400001' },
    });
    const pharm3 = await prisma.pharmacy.create({
      data: { name: 'Jan Aushadhi Kendra', city: 'Bangalore', state: 'Karnataka', pincode: '560001' },
    });

    // Seed Prices
    await prisma.price.createMany({
      data: [
        // Paracetamol
        { medicineId: med1.id, pharmacyId: pharm1.id, price: 20.50 },
        { medicineId: med1.id, pharmacyId: pharm2.id, price: 22.00 },
        { medicineId: med1.id, pharmacyId: pharm3.id, price: 15.00 }, // Generic store is cheaper
        // Crocin (same generic)
        { medicineId: med4.id, pharmacyId: pharm1.id, price: 30.00 },
        { medicineId: med4.id, pharmacyId: pharm2.id, price: 32.50 },
        // Aspirin
        { medicineId: med2.id, pharmacyId: pharm1.id, price: 10.00 },
        { medicineId: med2.id, pharmacyId: pharm2.id, price: 11.50 },
        // Amoxicillin
        { medicineId: med3.id, pharmacyId: pharm1.id, price: 55.00 },
        { medicineId: med3.id, pharmacyId: pharm3.id, price: 40.00 },
      ],
    });

    console.log('Database seeding completed successfully.');
  } catch (error) {
    console.error('Error seeding database:', error);
  } finally {
    await prisma.$disconnect();
  }
}

export { seedDatabase };