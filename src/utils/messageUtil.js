import { Store } from 'react-notifications-component';

export const invalidLogin = () => {
    Store.addNotification({
        title: "Login ou Senha inválidos",
        message: "Revise os campos",
        type: "danger",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const successSave = () => {
    Store.addNotification({
        title: "Registro salvo com sucesso",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const successDelete = () => {
    Store.addNotification({
        title: "Registro excluído com sucesso",
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const customWarning = (mensagem) => {
    Store.addNotification({
        title: mensagem,
        type: "warning",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 4000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const customSuccess = (mensagem) => {
    Store.addNotification({
        title: mensagem,
        type: "success",
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 2000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};

export const customMessage = (mensagem, tipo) => {
    Store.addNotification({
        title: mensagem,
        type: tipo,
        insert: "top",
        container: "top-right",
        animationIn: ["animate__animated", "animate__fadeIn"],
        animationOut: ["animate__animated", "animate__fadeOut"],
        dismiss: {
            duration: 4000,
            onScreen: true,
            pauseOnHover: true
        },
    });
};
