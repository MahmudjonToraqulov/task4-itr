const { faker } = require('@faker-js/faker');
const { fakerRU, fakerPL, fakerDE, fakerEN } = require('@faker-js/faker');
const { parsePhoneNumberFromString } = require('libphonenumber-js');
const { applyErrors } = require('../utils/errors')
const SeedRandom = require('random-seed');


function generateRandomData(region, errorsPerRecord, seed, pageNumber) {
    try {
        const combinedSeed = Number(seed) + Number(pageNumber);  
        const errorCount = Number(errorsPerRecord);
        faker.seed(combinedSeed);  
        const rng = SeedRandom(combinedSeed);  
        const data = [];

        for (let i = 0; i < 20; i++) {
            const record = {
                id: i + 1,
                uuid: faker.string.uuid(),
                name: generateName(region),
                address: generateAddress(region),
                phone: generatePhoneNumber(region),
            };
            applyErrors(record, errorCount, rng);  
            data.push(record);
        }
        return data;
    } catch (error) {
        console.error('Error in generateRandomData:', error);
        throw error;
    }
}

function generateName(region) {
    switch (region) {
        case 'by': 
            return fakerRU.person.fullName();
        case 'pl':  
            return fakerPL.person.fullName();
        case 'de': 
            return fakerDE.person.fullName();
        case 'en': 
            return fakerEN.person.fullName();
        default:    
            return fakerEN.person.fullName();
    }
}

function generateAddress(region) {
    switch (region) {
        case 'by': 
            return generateBelarusAddress();
        case 'en':  
            return generateUSAddress();
        case 'de':  
            return generateGermanyAddress();
        case 'pl':  
            return generatePolandAddress();
        default:
            return faker.location.streetAddress(); 
    }
}

function generateBelarusAddress() {

    const formats = [
        () => `${fakerRU.location.city()}, ${fakerRU.location.streetAddress()}, кв. ${faker.number.int({ min: 1, max: 500 })}`,
        () => `${fakerRU.location.city()}, ${fakerRU.location.secondaryAddress()}, ${fakerRU.location.state()}`,
        () => `${fakerRU.location.city()}, ул. ${fakerRU.location.street()}, д. ${faker.number.int({ min: 1, max: 100 })}, кв. ${faker.number.int({ min: 1, max: 500 })}`,
        () => `село ${fakerRU.location.city()}, ул. ${fakerRU.location.street()}, д. ${faker.number.int({ min: 1, max: 100 })}`
    ];
    return faker.helpers.arrayElement(formats)();
}

function generateUSAddress() {
    const formats = [
        () => `${faker.location.city()}, ${faker.location.state()}, ${faker.location.zipCode()}, ${faker.location.streetAddress()}`,
        () => `${faker.location.city()}, ${faker.location.zipCode()}, ${faker.location.secondaryAddress()}`,
    ];
    return faker.helpers.arrayElement(formats)();
}

function generateGermanyAddress() {
    const formats = [
        () => `${faker.location.city()}, ${faker.location.zipCode()}, ${faker.location.streetAddress()} ${faker.number.int({ min: 1, max: 100 })}`,
        () => `${faker.location.city()}, ${faker.location.zipCode()}, ${faker.location.street()} ${faker.number.int({ min: 1, max: 100 })}`,
    ];
    return faker.helpers.arrayElement(formats)();
}

function generatePolandAddress() {
    const formats = [
        () => `${faker.location.city()}, ${faker.location.zipCode()}, ${faker.location.street()} ${faker.number.int({ min: 1, max: 100 })}`,
        () => `${faker.location.city()}, ${faker.location.zipCode()}, ul. ${faker.location.street()} ${faker.number.int({ min: 1, max: 100 })}, m. ${faker.number.int({ min: 1, max: 500 })}`,
    ];
    return faker.helpers.arrayElement(formats)();
}

function generatePhoneNumber(region) {
    let phoneNumber;

    switch (region) {
        case 'by':
            phoneNumber = parsePhoneNumberFromString(faker.phone.number(), 'BY');
            break;
        case 'en':  
            phoneNumber = parsePhoneNumberFromString(faker.phone.number(), 'US');
            break;
        case 'de':  
            phoneNumber = parsePhoneNumberFromString(faker.phone.number(), 'DE');
            break;
        case 'pl':  
            phoneNumber = parsePhoneNumberFromString(faker.phone.number(), 'PL');
            break;
        default:
            phoneNumber = parsePhoneNumberFromString(faker.phone.number());
            break;
    }

    return phoneNumber ? phoneNumber.formatInternational() : faker.phone.number();
}



module.exports = { generateRandomData }