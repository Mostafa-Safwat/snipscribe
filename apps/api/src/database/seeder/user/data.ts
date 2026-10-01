const getAdmins = () => {
    const { SEED_ADMIN_USERNAME, SEED_ADMIN_EMAIL, SEED_ADMIN_PASSWORD } = process.env;
    if (!SEED_ADMIN_USERNAME || !SEED_ADMIN_EMAIL || !SEED_ADMIN_PASSWORD) {
        return [];
    }

    return [
        {
            username: SEED_ADMIN_USERNAME,
            email: SEED_ADMIN_EMAIL,
            password: SEED_ADMIN_PASSWORD,
            role: 'ADMIN',
        },
    ];
};

export const getUsers = () => [...getAdmins()];
