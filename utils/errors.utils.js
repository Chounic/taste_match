module.exports.signUpErrors = (err) => {
    let errors = { pseudo: "", email: "", password: ""};

    if (err.message.includes("pseudo")) {
        errors.pseudo = "Pseudo incorrect / doit faire 5 cacatères minimum";
    }

    if (err.message.includes("email")) {
        errors.email = "Email incorrect";
    }

    if (err.message.includes("password")) {
        errors.password = "Le mot de passe doit faire 6 caractères minimum";
    }

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("pseudo")) {
        errors.pseudo = "Ce pseudo est déja pris";
    }

    if (err.code === 11000 && Object.keys(err.keyValue)[0].includes("email")) {
        errors.email = "Cet email est déja enregistré";
    }

    return errors;
};


module.exports.signInErrors = (err) => {
    let errors = { email: '', password: ''};

    if ( err.message.includes("email")) {
        errors.email = "Email inconnu";
    }

    if ( err.message.includes("password")) {
        errors.password = "Le mot de passe ne correspond pas";
    }

    return errors; 
}

module.exports.updateErrors = (err) => {
     let errors = { format: "", maxSize: "", pseudo: "" };

    if (err.message.includes('invalid file')) {
        errors.format = "Format incompatible";
    } 

    if (err.message.includes('max size')) {
        errors.maxSize = "Le fichier est trop volumineux" ;
    }

    if (err.errors && err.errors.hasOwnProperty('pseudo')) {
        errors.pseudo = "Le pseudo doit avoir au moins 5 caractères" ;
    }

    return errors;
}