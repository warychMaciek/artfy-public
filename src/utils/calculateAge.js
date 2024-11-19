export const calculateAge = birthDate => {
    const today = new Date();
    const birthDateTimestamp = new Date(birthDate);

    let age = today.getFullYear() - birthDateTimestamp.getFullYear();
    const monthDiff = today.getMonth() - birthDateTimestamp.getMonth();
    const dayDiff = today.getDay() - birthDateTimestamp.getDay();

    if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
        age--;
    }

    return age;
}