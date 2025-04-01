// Verify if all required fields are present in an object by type

const fieldsValidator = <T extends object>(object: T): { valid: boolean; missingKeys: (keyof T)[] } => {
    // Get all keys of the object as an array of strings
    const requiredKeys = Object.keys(object) as (keyof T)[];
    // Array to store missing keys
    const missingKeys: (keyof T)[] = [];

    // Check if each required key is present in the object else push it to missingKeys
    for (const key of requiredKeys) {
        if (object[key] === undefined || object[key] === null) {
            missingKeys.push(key);
        }
    }
    
    return {
        valid: missingKeys.length === 0,
        missingKeys,
    };
};

export default fieldsValidator;