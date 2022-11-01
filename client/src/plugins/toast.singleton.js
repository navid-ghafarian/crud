import Swal from 'sweetalert2';

class Toast {
    constructor() {
        if (!Toast.instance) {
            Toast.instance = this
        }
        return Toast.instance
    }
    fire(title, icon, confirmButtonText) {
        Swal.fire({
            title,
            icon,
            confirmButtonText,
        });
    }
}

const toastInstance = new Toast()
Object.freeze(toastInstance)

export default toastInstance