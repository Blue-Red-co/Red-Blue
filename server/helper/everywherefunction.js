const { MySQLDB_Helper, ApplicationError } = require("node_helper");

/**
 * Generates a customizable One-Time Password (OTP).
 *
 * @param {object} [options={}] - The options for OTP generation.
 * @param {string} [options.type='alphanumeric'] - The type of OTP ('numeric' or 'alphanumeric').
 * @param {number} [options.length=6] - The desired length of the OTP.
 * @param {boolean} [options.allowRepetition=true] - Whether to allow repeated characters in the OTP.
 * @returns {string} The generated OTP.
 */
function generateOTP(options = {}) {
    // 1. Set defaults for any options not provided.
    const {
        type = 'alphanumeric',
        length = 6,
        allowRepetition = true
    } = options;

    // 2. Define the available character sets.
    // Using only uppercase letters with numbers is common for better readability.
    const numericChars = '0123456789';
    const alphaChars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const alphanumericChars = numericChars + alphaChars;

    // 3. Select the correct character set based on the 'type' option.
    let sourceChars = '';
    if (type === 'numeric') {
        sourceChars = numericChars;
    } else if (type === 'alphanumeric') {
        sourceChars = alphanumericChars;
    } else {
        // Throw an error if an invalid type is specified.
        throw new Error(`Invalid OTP type: '${type}'. Must be 'numeric' or 'alphanumeric'.`);
    }

    // 4. Check for an impossible scenario: asking for a non-repeating OTP
    // that is longer than the number of available unique characters.
    if (!allowRepetition && length > sourceChars.length) {
        throw new Error(
            `Cannot generate a non-repeating OTP of length ${length} from a character set of only ${sourceChars.length} unique characters.`
        );
    }

    // 5. Generate the OTP.
    let otp = '';
    if (allowRepetition) {
        // Simple case: Pick random characters, repetition is allowed.
        for (let i = 0; i < length; i++) {
            const randomIndex = Math.floor(Math.random() * sourceChars.length);
            otp += sourceChars[randomIndex];
        }
    } else {
        // Complex case: Shuffle the characters and pick the first 'length' ones
        // to guarantee no repetition.
        const charsArray = sourceChars.split('');
        // Fisher-Yates shuffle algorithm for an unbiased shuffle.
        for (let i = charsArray.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [charsArray[i], charsArray[j]] = [charsArray[j], charsArray[i]];
        }
        otp = charsArray.slice(0, length).join('');
    }

    // 6. Return the final generated OTP.
    return otp;
}

try {
    // This will fail because you can't have 11 unique digits when only 10 exist (0-9).
    console.log("Attempting impossible OTP (numeric, 11, NO repeats):");
    generateOTP({ type: 'numeric', length: 11, allowRepetition: false });
} catch (error) {
    console.error(`Caught expected error: ${error.message}`);
}






const logToDatabase = async (tableName, recordId, action, userId, data = []) => {
    try {
        sql = `   INSERT INTO AuditLog ( table_name, record_id, action_type, performed_by, timestamp, changes)
                VALUES(?,?,?,?,?,?)`;
        const result = await MySQLDB_Helper.executeQuery(sql, [tableName, recordId, action, userId, Date.now(), data])
    } catch (err) {
        if (err) {
            throw new ApplicationError({ location: __locationObject, errorObject: new Error(err.message) })
        }
    }

}

/**
 * Converts a 4-digit OTP string into the 'marks' object format for the visual OTP template.
 * The color order is fixed: 1st digit is red, 2nd is blue, 3rd is green, 4th is orange.
 *
 * @param {string} otpString - The 4-digit OTP (e.g., "8159").
 * @returns {object} An object in the format { marks: { '8': 'red', '1': 'blue', ... } }.
 * @throws {Error} If the input is not a 4-digit string.
 */
function generateOtpValues(otpString) {
    // 1. Define the fixed color order as specified in the email template.
    const colorOrder = ['red', 'blue', 'green', 'orange'];

    // 2. Validate the input to ensure it's a 4-digit string.
    if (!/^\d{4}$/.test(otpString)) {
        throw new Error("Invalid input: OTP must be a 4-digit string.");
    }

    // 3. Create the 'marks' object by mapping each digit to its corresponding color.
    const marks = {};
    otpString.split('').forEach((digit, index) => {
        marks[digit] = colorOrder[index];
    });

    // 4. Return the final object in the required structure.
    return {
        marks: marks
    };
}

module.exports = {
    generateOTP,
    logToDatabase,
    generateOtpValues
}
