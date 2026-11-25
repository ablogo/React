function wrapper(originalFunction: any) {
    return function (...args: any) {
        try {
            const result = originalFunction(...args);
            return result;
        }
        catch (error) {
            return null;
        }
    }
}

function saveLocally(key: string, data: any) {
    localStorage.setItem(key, data);
}

function getLocally(key: string) {
    return localStorage.getItem(key);
}

function removeLocally(key: string) {
    localStorage.removeItem(key);
}

function deleteItemFromArrayLocally(key: string, itemId: number) {
    let data = getAsJsonItem(key);
    if (data) {
        let newData = data.filter(function (o: any) {
            return o.id != itemId;
        });
        localStorage.setItem(key, JSON.stringify(newData));
    }
}

function saveAsJsonLocally(key: string, data: any) {
    let oldData = getAsJsonItem(key);
    let newData = [];
    if (oldData) {
        newData = [...oldData, data];
    }
    else {
        newData.push(data);
    }

    localStorage.setItem(key, JSON.stringify(newData));
}

function getJsonLocally(key: string) {
    let data = localStorage.getItem(key);
    if (data) return JSON.parse(data);
    return null;
}

function exportKeys(id: number) {
    var keys = getAsJsonItem('2FA-codes');
    var otp_url = 'otpauth://totp/';
    var key = keys.find((x: any) => x.id === id);

    otp_url += key.name + ':' + key.tag + '?secret=' + key.key + '&issuer=' + key.name;
    return encodeURI(otp_url);
}

const saveItem = wrapper(saveLocally);
const getItem = wrapper(getLocally);
const removeItem = wrapper(removeLocally);
const deleteItemFromArray = wrapper(deleteItemFromArrayLocally);
const saveAsJsonItem = wrapper(saveAsJsonLocally);
const getAsJsonItem = wrapper(getJsonLocally);

export { saveItem, getItem, removeItem, deleteItemFromArray, saveAsJsonItem, getAsJsonItem, exportKeys };