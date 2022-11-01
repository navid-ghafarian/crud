export function validateEmail(value) {
    // if the field is empty
    if (!value) {
        return "ایمیل ضروری است!";
    }

    // if the field is not a valid email
    const regex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
    if (!regex.test(value)) {
        return "ایمیل نامعتبر است!";
    }

    // All is good
    return true;
}
export function validatePassword(value) {
    // if the field is empty
    if (!value) {
        return "رمز عبور ضروری است!";
    }

    // if the field is not a valid password
    if (value.length < 8) {
        return `رمز عبور حداقل باید 8 کاراکتر باشد.`;
    }

    if (!value.toLowerCase().includes("part")) {
        return `رمز عبور باید شامل عبارت part باشد.`;
    }

    if (value.search(/[0-9]/) == -1) {
        return `رمز عبور باید شامل حداقل یک عدد باشد.`;
    }

    if (value.search(/[A-Z]/) == -1) {
        return `رمز عبور باید شامل حداقل حرف بزرگ باشد.`;
    }

    // All is good
    return true;
}
export function validateId(value) {
    // if the field is empty
    if (!value) {
        return "کدملی ضروری است!";
    }

    // if the field is not a valid IdNumber
    var yy = 0;
    var yv = parseInt(yv);
    for (let i = 0; i < value.length; i++) {
        yv = value[i] * (value.length - i);
        yy += yv;
    }
    var x = yy % 11;

    if (value.length < 10 || x !== 0) {
        return "فرمت کد ملی صحیح نیست!";
        yy = 0;
    }

    // All is good
    return true;
}
export function validatePhone(value) {
    // if the field is empty
    if (!value) {
        return "شماره همراه ضروری است!";
    }

    // if the field is not a valid phone
    const regex = /^(09|989|9|\+989|\+9|00989)(1[0-9]|3[1-9]|2[1-9])-?[0-9]{3}-?[0-9]{4}$/;
    if (!regex.test(value)) {
        return "شماره همراه نامعتبر است!";
    }

    // All is good
    return true;
}
export function validateUsername(value) {
    // if the field is empty
    if (!value) {
        return "نام کاربری ضروری است!";
    }

    // All is good
    return true;
}
export function validateFullName(value) {
    // if the field is empty
    if (!value) {
        return "نام و نام خانوادگی ضروری است!";
    }

    // All is good
    return true;
}
export function validateJobTitle(value) {
    // if the field is empty
    if (!value) {
        return "عنوان شغلی ضروری است!";
    }

    // All is good
    return true;
}
export function validateJobSkill(value) {
    // if the field is empty
    if (!value) {
        return "مهارت شغلی ضروری است!";
    }

    // All is good
    return true;
}
export function validateEducation(value) {
    // if the field is empty
    if (!value) {
        return "تحصیلات ضروری است!";
    }

    // All is good
    return true;
}
export function validateLoginPassword(value) {
    // if the field is empty
    if (!value) {
        return "رمز عبور ضروری است!";
    }

    // All is good
    return true;
}

export default {
    validateEmail,
    validatePassword,
    validateId,
    validatePhone,
    validateUsername,
    validateFullName,
    validateJobTitle,
    validateJobSkill,
    validateEducation,
    validateLoginPassword,
}