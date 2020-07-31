const { defaults } = require("pg");

export default {
    host: "smtp.mailtrap.io",
    port: 2525,
    secure: false,
    auth: {
        user: "bd855a2f745bca",
        pass: "6de3e606676343"
    },
    default: {
        from: 'Equipe GoBarber <noreply@gobarber.com>',
    },
};