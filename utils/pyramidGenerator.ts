/**
 * สร้าง String พีระมิดดาวตามจำนวนบรรทัดที่ต้องการ
 * @param {number} rows - จำนวนบรรทัดที่ต้องการสร้าง
 * @returns {string} - สตริงของพีระมิดดาว
 */
export function buildPyramid(rows: number): string {
    if (rows <= 0 || !Number.isInteger(rows)) {
        return "กรุณาใส่ตัวเลข";
    }

    let outputString = '';

    for (let i = 1; i <= rows; i++) {
        const spacesCount: number = rows - i;
        const starsCount: number = (2 * i) - 1;

        const currentSpaces: string = ' '.repeat(spacesCount);
        const currentStars: string = '*'.repeat(starsCount);

        const line: string = currentSpaces + currentStars;
        outputString += line + '\n';
    }

    return outputString;
}