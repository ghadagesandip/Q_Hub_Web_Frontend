const URL = 'http://localhost:8088/api/';

//login
const LOGIN = URL+'login';

//Questions
const QUE_SAVE = URL+'saveQuestions';
const QUE_UPDATE = URL+'updateQuestion';
const QUE_GET = URL+'getQuestions';
const QUE_ANSWER = URL+'saveAnswer';

//Clients
const CLIENTS_GET = URL+'getClients';
const CLIENTS_SAVE = URL+'saveClient';
const CLIENTS_UPDATE = URL+'updateClient';

//Technologies
const TECH_GET = URL+'getTechnologies';
const TECH_SAVE = URL+'saveTechnology';
const TECH_UPDATE = URL+'updateTechnology';

//Employees
const EMP_GET = URL+'getEmployee';
const EMP_SAVE = URL+'saveEmployee';
const EMP_UPDATE = URL+'updateEmployee';

export const API = {
    login: (callback, data) => {
        request(callback, data, 'POST', LOGIN);
    },
    que_save: (callback, data) => {
        request(callback, data, 'POST', QUE_SAVE);
    },
    que_update: (callback, data) => {
        request(callback, data, 'POST', QUE_UPDATE);
    },
    que_get: (callback, data) => {
        request(callback, data, 'GET', QUE_GET);
    },
    ans_save: (callback, data) => {
        request(callback, data, 'POST', QUE_ANSWER);
    },
    clients_get: (callback, data) => {
        request(callback, data, 'GET', CLIENTS_GET);
    },
    clients_save: (callback, data) => {
        request(callback, data, 'POST', CLIENTS_SAVE);
    },
    clients_update: (callback, data) => {
        request(callback, data, 'POST', CLIENTS_UPDATE);
    },
    tech_get: (callback, data) => {
        request(callback, data, 'GET', TECH_GET);
    },
    tech_save: (callback, data) => {
        request(callback, data, 'POST', TECH_SAVE);
    },
    tech_update: (callback, data) => {
        request(callback, data, 'POST', TECH_UPDATE);
    },
    emp_get: (callback, data) => {
        request(callback, data, 'GET', EMP_GET);
    },
    emp_save: (callback, data) => {
        request(callback, data, 'POST', EMP_SAVE);
    },
    emp_update: (callback, data) => {
        request(callback, data, 'POST', EMP_UPDATE);
    },
}

export const buildHeader = (headerParams = {}) => {
    var header = {
        'Accept': 'application/json',
        'Content-Type': 'application/x-www-form-urlencoded',
        'Cache-Control': 'no-cache'
    }
    Object.assign(header, headerParams);
    return header;
}

const getRequestData = (data) => {
    let dataStr = "";
    for (var key in data) {
        if (data.hasOwnProperty(key)) {
            dataStr += (dataStr == "") ? key + "=" + data[key] : "&" + key + "=" + data[key];
        }
    }
    return dataStr;
}

async function request(onResponse, data, type, featureURL, secureRequest = buildHeader()) {

    let response = '';
    console.log('API URL', featureURL);
    console.log('Sending Data:', data);
    console.log('Sending Header:', secureRequest);
    try {
        if (type === 'GET') {
            //TODO PARAMETER CHECK
            response = await fetch(featureURL, {
                method: type,
                headers: secureRequest
            });
        }
        else {
            response = await fetch(featureURL, {
                method: type,
                headers: secureRequest,
                body: getRequestData(data)
                //body: data
            });
        }
        let responseJSON = await response.json();
        console.log('Response: ',responseJSON);
        if (responseJSON.success == true || responseJSON.status == true) {
            onResponse.success(responseJSON.data);
        } else {
            onResponse.error(responseJSON);
        }
        if (onResponse.complete) {
            onResponse.complete();
        }
    } catch (error) {
        console.log('Error catch', error);
        error = "Error: In api catch";
        onResponse.error(error);
        if (onResponse.complete) {
            onResponse.complete();
        }
    }
}
