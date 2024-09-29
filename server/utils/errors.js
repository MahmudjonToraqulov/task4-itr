function applyErrors(record, errorCount) {

    if (errorCount === 0) {
        return;  
    }

    const fields = ['name', 'address', 'phone'];

    for (let i = 0; i < Math.floor(errorCount); i++) {
        const fieldIndex = Math.floor(Math.random() * fields.length);
        const field = fields[fieldIndex];

        const errorType = Math.floor(Math.random() * 3);
        switch (errorType) {
            case 0:
                record[field] = deleteRandomCharacter(record[field]);
                break;
            case 1:
                record[field] = addRandomCharacter(record[field]);
                break;
            case 2:
                record[field] = swapAdjoiningCharacters(record[field]);
                break;
        }
    }

    if (Math.random() < (errorCount % 1)) {
        const fieldIndex = Math.floor(Math.random() * fields.length);
        const field = fields[fieldIndex];
        record[field] = deleteRandomCharacter(record[field]);
    }

}


function deleteRandomCharacter(str) {
    if (str.length === 0) return str;
    const index = Math.floor(Math.random() * str.length);
    return str.slice(0, index) + str.slice(index + 1);
}

function addRandomCharacter(str) {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const randomChar = chars[Math.floor(Math.random() * chars.length)];
    const index = Math.floor(Math.random() * (str.length + 1));
    return str.slice(0, index) + randomChar + str.slice(index);
}

function swapAdjoiningCharacters(str) {
    if (str.length < 2) return str;
    const index = Math.floor(Math.random() * (str.length - 1));
    const arr = str.split('');
    [arr[index], arr[index + 1]] = [arr[index + 1], arr[index]];
    return arr.join('');
}

module.exports = { applyErrors }