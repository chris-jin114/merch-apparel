/**
 *
 * @param str string to be converted
 * @return converted string
 */
export function ucFirst(str: string): string {
    const words = str.trim().split(' ');
    for (let i = 0; i < words.length; i ++) {
        words[i] = words[i].charAt(0).toUpperCase() + words[i].slice(1);
    }
    return words.join(' ');
}

export function errorMessage(): void {
    
}